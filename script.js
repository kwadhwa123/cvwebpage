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

const chatToggle = document.getElementById("chat-toggle");
const chatWidget = document.getElementById("chat-widget");
const chatClose = document.getElementById("chat-close");
const chatMinimize = document.getElementById("chat-minimize");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function appendChatMessage(text, type) {
  if (!chatMessages) {
    return;
  }

  const messageEl = document.createElement("div");
  messageEl.className = `chat-message ${type}`;
  messageEl.textContent = text;
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(input) {
  const text = input.toLowerCase();

  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return "Hello! I can help with Krishna's experience, certifications, skills, education, and contact details.";
  }
  if (text.includes("experience") || text.includes("work") || text.includes("career")) {
    return "Krishna has around 10 years of ServiceNow experience and has worked at Gartner, HCL Technologies, NTT Data Services, and Coforge.";
  }
  if (text.includes("certification") || text.includes("certified")) {
    return "Krishna holds CSA, CAD, CIS-ITSM, CIS-SP, and CIS-HRSD certifications.";
  }
  if (text.includes("skill") || text.includes("technology") || text.includes("tech")) {
    return "Key skills include ServiceNow ITSM/ITOM, Service Portal, UI Builder, Flow Designer, REST APIs, JavaScript, HTML, CSS, ITIL, and Agile.";
  }
  if (text.includes("education") || text.includes("degree")) {
    return "Krishna completed MCA and BCA from Guru Gobind Singh Indraprastha University, and schooling from BBPS (CBSE).";
  }
  if (text.includes("contact") || text.includes("email") || text.includes("phone")) {
    return "You can reach Krishna at Krishna.wadhwa1992@gmail.com or +91 9971019707.";
  }
  if (text.includes("current") || text.includes("gartner")) {
    return "Krishna is currently a Senior Software Engineer at Gartner, working on ITSM PRO, Virtual Agent, integrations, SAM PRO, and technical leadership.";
  }

  return "I can answer questions about experience, certifications, skills, education, and contact info. Try asking: 'What certifications does Krishna have?'";
}

function openChat() {
  if (!chatWidget || !chatToggle) {
    return;
  }

  chatWidget.hidden = false;
  chatWidget.classList.remove("collapsed");
  chatToggle.setAttribute("aria-expanded", "true");
  if (chatMinimize) {
    chatMinimize.textContent = "-";
    chatMinimize.setAttribute("aria-label", "Minimize chat");
    chatMinimize.setAttribute("aria-expanded", "true");
  }
  if (chatInput) {
    chatInput.focus();
  }
}

function closeChat() {
  if (!chatWidget || !chatToggle) {
    return;
  }

  chatWidget.hidden = true;
  chatToggle.setAttribute("aria-expanded", "false");
}

function toggleMinimizeChat() {
  if (!chatWidget || !chatMinimize) {
    return;
  }

  const isCollapsed = chatWidget.classList.toggle("collapsed");
  if (isCollapsed) {
    chatMinimize.textContent = "+";
    chatMinimize.setAttribute("aria-label", "Expand chat");
    chatMinimize.setAttribute("aria-expanded", "false");
  } else {
    chatMinimize.textContent = "-";
    chatMinimize.setAttribute("aria-label", "Minimize chat");
    chatMinimize.setAttribute("aria-expanded", "true");
    if (chatInput) {
      chatInput.focus();
    }
  }
}

if (chatToggle && chatWidget) {
  chatToggle.addEventListener("click", () => {
    if (chatWidget.hidden) {
      openChat();
    } else {
      closeChat();
    }
  });
}

if (chatClose) {
  chatClose.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeChat();
  });
}

if (chatMinimize) {
  chatMinimize.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleMinimizeChat();
  });
}

if (chatForm && chatInput) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userText = chatInput.value.trim();
    if (!userText) {
      return;
    }

    appendChatMessage(userText, "user");
    const reply = getBotReply(userText);

    setTimeout(() => {
      appendChatMessage(reply, "bot");
    }, 250);

    chatInput.value = "";
  });
}
