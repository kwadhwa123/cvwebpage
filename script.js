const yearEl = document.getElementById("year");
const form = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form && formNote) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = encodeURIComponent(formData.get("name") || "");
    const email = encodeURIComponent(formData.get("email") || "");
    const message = encodeURIComponent(formData.get("message") || "");

    const subject = `Website inquiry from ${name}`;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;

    window.location.href = `mailto:Krishna.wadhwa1992@gmail.com?subject=${subject}&body=${body}`;
    formNote.textContent = "Opening your email app...";
    form.reset();
  });
}
