const yearEl = document.getElementById("year");
const form = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form && formNote) {
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    if (submitButton) {
      submitButton.disabled = true;
    }
    formNote.textContent = "Sending your message...";

    try {
      const response = await fetch("https://formsubmit.co/ajax/Krishna.wadhwa1992@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Website inquiry from ${name}`,
          _replyto: email,
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      formNote.textContent = "Message sent successfully. I'll get back to you soon.";
      form.reset();
    } catch {
      formNote.textContent =
        "Unable to send right now. Please email Krishna.wadhwa1992@gmail.com directly.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
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
    return "Hello! I can help with Krishna's experience, certifications, skills, education, biography, and contact details. Ask about a specific company (e.g. McKinsey, Gartner, HCL, NTT, Coforge) for full detail.";
  }

  if (text.includes("mckinsey") || text.includes("now assist") || (text.includes("ai") && text.includes("agent"))) {
    return "Senior Software Engineer 1 at McKinsey (January 2026 - Present): configuring and customizing Now Assist features, building AI Agents and conversational workflows, developing Virtual Agent conversations and integrations, implementing AI-driven self-service solutions, integrating backend workflows and catalog items with AI interactions, customizing prompts/topics/conversational experiences, and testing/optimizing AI agent performance within ServiceNow environments.";
  }

  if (text.includes("gartner") || text.includes("sam pro") || text.includes("predictive intelligence")) {
    return "Senior Software Engineer at Gartner (May 2024 - January 2026): hands-on with ITSM PRO offerings (Virtual Agent, Predictive Intelligence, Employee Center), end-to-end ServiceNow implementation, Predictive Intelligence for ITSM and custom apps to improve ticket routing, integrations with Salesforce, JIRA, Workday, Nexthink, Tangoe, and Okta, collaboration with Incident/Change Management, Agile process improvements with peer review, version upgrades/cloning/production rollouts, custom App Engine Studio apps and Virtual Agent topics, mobile app screens, ongoing Software Asset Management PRO implementation, and technical SME duties for estimation and story reviews.";
  }

  if (text.includes("hcl")) {
    return "Lead Technical Specialist at HCL Technologies (May 2022 - May 2024): led full implementation lifecycle (requirements, demos, design workshops, development, testing, UAT, training, hyper-care, BAU handover) across dedicated and domain-separated MSP environments, led a development team, built a utility that cleared a backlog of 11,000+ customer feedback tickets, delivered integrations with Lucy, BMC Remedy, Qualys CMDB sync, Azure AD, SAP, SolarWinds, and SCCM, implemented ITOM and Service Mapping on Azure, delivered Demand Management end to end, automated standard Change creation/closure, migrated 500+ service requests to User Criteria, and supported POCs, upgrades, cloning, and production rollouts.";
  }

  if (text.includes("ntt")) {
    return "Senior Software Development Specialist at NTT Data Services (November 2018 - May 2022): worked across a multi-domain environment with 30+ clients using Agile, built scripted REST APIs for ITSM (request, incident, change, problem), designed client-specific Service Portal themes, configured ServiceNow Agent Mobile and Virtual Agent, created client surveys and trigger conditions, implemented Flow Designer automation and converted 300+ service requests, built archiving rules for high-volume tables, handled upgrades/cloning/post-upgrade fixes, built UI Builder pages for P1 incident SMS and device updates, and integrated with Bitly for URL shortening.";
  }

  if (text.includes("coforge") || text.includes("niit")) {
    return "Associate IT Ops at Coforge Ltd, formerly NIIT Technologies (July 2016 - November 2018): developed Service Catalogs, Record Producers, and workflows, configured Service Requests/Incident/Change/Problem/CMDB modules, resolved ServiceNow tickets, built email notifications and inbound actions for automated ticket creation, defined SLAs and notifications, configured forms/views/ACLs/client and server-side scripts, and supported weekly production rollouts.";
  }

  if (text.includes("integration")) {
    return "Krishna has delivered third-party integrations across roles including Salesforce, JIRA, Workday, Nexthink, Tangoe, Okta, Azure AD, SAP, BMC Remedy, Qualys CMDB sync, SolarWinds, SCCM, and Bitly.";
  }

  if (text.includes("certification") || text.includes("certified") || text.includes("csa") || text.includes("cad") || text.includes("cis")) {
    return "Certifications: ServiceNow Certified System Administrator (CSA), Certified Application Developer (CAD), Certified Implementation Specialist - ITSM (CIS-ITSM), CIS - Service Portal (CIS-SP), CIS - HR Service Delivery (CIS-HRSD), and CIS - Data Foundation.";
  }

  if (text.includes("skill") || text.includes("technology") || text.includes("tech") || text.includes("tool")) {
    return "Technical skills: JavaScript, HTML, CSS, Bootstrap, ITIL, and Agile, alongside ServiceNow ITSM, ITOM, Service Portal, UI Builder, Flow Designer, and REST API development. Across roles Krishna has also worked with Now Assist/AI Agents, Virtual Agent, Predictive Intelligence, App Engine Studio, Employee Center, and integrations with Salesforce, JIRA, Workday, Okta, Azure AD, SAP, BMC Remedy, and SolarWinds.";
  }

  if (text.includes("experience") || text.includes("work") || text.includes("career") || text.includes("job") || text.includes("company") || text.includes("companies")) {
    return "Krishna has around 10 years of ServiceNow experience: Senior Software Engineer 1 at McKinsey (Jan 2026-Present), Senior Software Engineer at Gartner (May 2024-Jan 2026), Lead Technical Specialist at HCL Technologies (May 2022-May 2024), Senior Software Development Specialist at NTT Data Services (Nov 2018-May 2022), and Associate IT Ops at Coforge/NIIT Technologies (Jul 2016-Nov 2018). Ask about any of these companies by name for full role details.";
  }

  if (text.includes("education") || text.includes("degree") || text.includes("mca") || text.includes("bca") || text.includes("school") || text.includes("university")) {
    return "Education: Master's in Computer Applications (MCA), 2013-2016, and Bachelor's in Computer Applications (BCA), 2010-2013, both from Guru Gobind Singh Indraprastha University; 12th in 2010 and 10th in 2008 from BBPS, CBSE Board.";
  }

  if (text.includes("bio") || text.includes("hobby") || text.includes("hobbies") || text.includes("personal") || text.includes("language") || text.includes("birth") || text.includes("married")) {
    return "Biography: born 19th February 1992, married, hobbies include Cricket, Listening to Music, Cooking, and Hot Wheels, and fluent in English and Hindi.";
  }

  if (text.includes("contact") || text.includes("email") || text.includes("phone") || text.includes("reach") || text.includes("connect")) {
    return "You can reach Krishna at Krishna.wadhwa1992@gmail.com or +91 9971019707, or use the contact form on this page for ServiceNow consulting, implementation, or collaboration opportunities.";
  }

  if (text.includes("current") || text.includes("role") || text.includes("title")) {
    return "Krishna is currently a Senior Software Engineer 1 at McKinsey (since January 2026), working on Now Assist, AI Agents, Virtual Agent conversations, and AI-driven self-service solutions.";
  }

  return "I can answer questions about experience, certifications, skills, integrations, education, biography, and contact info. Try asking: 'Tell me about Gartner', 'What certifications does Krishna have?', or 'What integrations has Krishna worked on?'";
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
