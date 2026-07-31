(function () {
  "use strict";

  var DOWNLOAD_URL = "https://speed.cloudflare.com/__down?bytes=";
  var UPLOAD_URL = "https://speed.cloudflare.com/__up";
  var PING_URL = "https://speed.cloudflare.com/__down?bytes=0";

  var DOWNLOAD_BYTES = 26214400; // 25 MB
  var UPLOAD_BYTES = 10485760; // 10 MB
  var PING_ROUNDS = 5;

  var startBtn = document.getElementById("speed-start");
  var statusEl = document.getElementById("speed-status");
  var pingEl = document.getElementById("metric-ping");
  var downloadEl = document.getElementById("metric-download");
  var uploadEl = document.getElementById("metric-upload");

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function resetMetrics() {
    pingEl.textContent = "--";
    downloadEl.textContent = "--";
    uploadEl.textContent = "--";
    pingEl.classList.remove("active");
    downloadEl.classList.remove("active");
    uploadEl.classList.remove("active");
  }

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function measurePing() {
    var times = [];

    function roundTrip(i) {
      var url = PING_URL + "&cache=" + Date.now() + "-" + i;
      var start = performance.now();
      return fetch(url, { cache: "no-store", mode: "cors" }).then(function () {
        times.push(performance.now() - start);
      });
    }

    var chain = Promise.resolve();
    for (var i = 0; i < PING_ROUNDS; i++) {
      (function (round) {
        chain = chain.then(function () {
          return roundTrip(round);
        });
      })(i);
    }

    return chain.then(function () {
      // Drop the first round (connection warm-up) when possible.
      var samples = times.length > 1 ? times.slice(1) : times;
      var best = Math.min.apply(null, samples);
      return Math.round(best);
    });
  }

  function measureDownload() {
    return new Promise(function (resolve, reject) {
      var url = DOWNLOAD_URL + DOWNLOAD_BYTES + "&cache=" + Date.now();
      var xhr = new XMLHttpRequest();
      var startTime = null;

      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";

      xhr.onprogress = function (event) {
        if (startTime === null) {
          startTime = performance.now();
        }
        var elapsedSeconds = (performance.now() - startTime) / 1000;
        if (elapsedSeconds > 0 && event.loaded > 0) {
          var mbps = (event.loaded * 8) / elapsedSeconds / 1e6;
          downloadEl.textContent = mbps.toFixed(1);
          downloadEl.classList.add("active");
        }
      };

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          var totalSeconds = (performance.now() - startTime) / 1000;
          var mbps = (DOWNLOAD_BYTES * 8) / totalSeconds / 1e6;
          resolve(mbps);
        } else {
          reject(new Error("Download test failed (status " + xhr.status + ")"));
        }
      };

      xhr.onerror = function () {
        reject(new Error("Download test failed."));
      };

      xhr.send();
    });
  }

  function buildRandomBlob(size) {
    var chunkSize = 65536;
    var chunks = [];
    var remaining = size;
    while (remaining > 0) {
      var len = Math.min(chunkSize, remaining);
      var arr = new Uint8Array(len);
      crypto.getRandomValues(arr);
      chunks.push(arr);
      remaining -= len;
    }
    return new Blob(chunks);
  }

  function measureUpload() {
    return new Promise(function (resolve, reject) {
      var blob = buildRandomBlob(UPLOAD_BYTES);
      var xhr = new XMLHttpRequest();
      var startTime = null;

      xhr.open("POST", UPLOAD_URL, true);

      xhr.upload.onprogress = function (event) {
        if (startTime === null) {
          startTime = performance.now();
        }
        var elapsedSeconds = (performance.now() - startTime) / 1000;
        if (elapsedSeconds > 0 && event.loaded > 0) {
          var mbps = (event.loaded * 8) / elapsedSeconds / 1e6;
          uploadEl.textContent = mbps.toFixed(1);
          uploadEl.classList.add("active");
        }
      };

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          var totalSeconds = (performance.now() - startTime) / 1000;
          var mbps = (UPLOAD_BYTES * 8) / totalSeconds / 1e6;
          resolve(mbps);
        } else {
          reject(new Error("Upload test failed (status " + xhr.status + ")"));
        }
      };

      xhr.onerror = function () {
        reject(new Error("Upload test failed."));
      };

      xhr.send(blob);
    });
  }

  function runTest() {
    startBtn.disabled = true;
    resetMetrics();

    setStatus("Measuring ping...");
    measurePing()
      .then(function (ping) {
        pingEl.textContent = ping;
        pingEl.classList.add("active");

        setStatus("Measuring download speed...");
        return measureDownload();
      })
      .then(function (downloadMbps) {
        downloadEl.textContent = downloadMbps.toFixed(1);

        setStatus("Measuring upload speed...");
        return measureUpload();
      })
      .then(function (uploadMbps) {
        uploadEl.textContent = uploadMbps.toFixed(1);
        setStatus("Test complete.");
      })
      .catch(function (err) {
        setStatus(err && err.message ? err.message : "Speed test failed. Please try again.");
      })
      .finally(function () {
        startBtn.disabled = false;
      });
  }

  startBtn.addEventListener("click", runTest);
})();
