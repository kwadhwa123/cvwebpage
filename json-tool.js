(function () {
  "use strict";

  var input = document.getElementById("json-input");
  var output = document.getElementById("json-output");
  var status = document.getElementById("json-status");
  var formatBtn = document.getElementById("json-format");
  var minifyBtn = document.getElementById("json-minify");
  var copyBtn = document.getElementById("json-copy");
  var clearBtn = document.getElementById("json-clear");

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function setStatus(text, kind) {
    status.textContent = text;
    status.classList.remove("error", "success");
    if (kind) {
      status.classList.add(kind);
    }
  }

  function locateError(text, message) {
    var match = /position (\d+)/.exec(message);
    if (!match) {
      return message;
    }
    var position = Number(match[1]);
    var before = text.slice(0, position);
    var line = before.split("\n").length;
    var column = position - before.lastIndexOf("\n");
    return message + " (line " + line + ", column " + column + ")";
  }

  function parseInput() {
    var text = input.value.trim();
    if (!text) {
      throw new Error("Input is empty.");
    }
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new Error(locateError(text, err.message));
    }
  }

  formatBtn.addEventListener("click", function () {
    try {
      var data = parseInput();
      output.value = JSON.stringify(data, null, 2);
      setStatus("Valid JSON. Formatted.", "success");
    } catch (err) {
      output.value = "";
      setStatus(err.message, "error");
    }
  });

  minifyBtn.addEventListener("click", function () {
    try {
      var data = parseInput();
      output.value = JSON.stringify(data);
      setStatus("Valid JSON. Minified.", "success");
    } catch (err) {
      output.value = "";
      setStatus(err.message, "error");
    }
  });

  copyBtn.addEventListener("click", function () {
    if (!output.value) {
      setStatus("Nothing to copy yet.", "error");
      return;
    }
    navigator.clipboard
      .writeText(output.value)
      .then(function () {
        setStatus("Output copied to clipboard.", "success");
      })
      .catch(function () {
        setStatus("Could not copy to clipboard.", "error");
      });
  });

  clearBtn.addEventListener("click", function () {
    input.value = "";
    output.value = "";
    setStatus("Paste some JSON and press Format or Minify.");
    input.focus();
  });
})();
