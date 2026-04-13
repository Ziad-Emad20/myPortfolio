function renderContactPoints() {
  const container = document.getElementById("contactPoints");
  if (!container) return;

  const lang = getCurrentLanguage();
  const points = translations[lang]?.contact?.side?.points || [];

  container.innerHTML = points
    .map((item) => `<div class="mini-point">${item}</div>`)
    .join("");
}

function initContactSection() {
  renderContactPoints();
}

document.addEventListener("DOMContentLoaded", () => {
  initContactSection();

  const form = document.querySelector(".contact-form");
  const messageBox = document.getElementById("formMessage");

  if (!form || !messageBox) return;

  const submitBtn = form.querySelector(".send-btn");
  const nameInput = form.querySelector('input[name="name"]');
  const phoneInput = form.querySelector('input[name="phone"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  let messageTimer;

  const getFormText = (key, fallback) => {
    const lang = getCurrentLanguage();
    const dict = translations[lang];
    return getNestedValue(dict, key) || fallback;
  };

  const showFormMessage = (key, fallback, type = "success") => {
    clearTimeout(messageTimer);

    const text = getFormText(key, fallback);

    messageBox.textContent = text;
    messageBox.classList.remove("show", "is-error", "is-success");
    messageBox.classList.add("show", type === "error" ? "is-error" : "is-success");

    messageTimer = setTimeout(() => {
      messageBox.classList.remove("show");
    }, 4000);
  };

  const sanitizeName = (value) => {
    return value.replace(/\s{2,}/g, " ").trim();
  };

  const sanitizePhone = (value) => {
    let cleaned = value.replace(/[^\d+]/g, "");

    if (cleaned.includes("+")) {
      cleaned = cleaned[0] + cleaned.slice(1).replace(/\+/g, "");
    }

    if (cleaned.startsWith("00")) {
      cleaned = "+" + cleaned.slice(2);
    }

    if (cleaned.includes("+") && !cleaned.startsWith("+")) {
      cleaned = cleaned.replace(/\+/g, "");
    }

    return cleaned;
  };

  const isValidName = (value) => {
    return sanitizeName(value).length >= 3;
  };

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
  };

  const isValidPhone = (value) => {
    const phone = sanitizePhone(value);
    if (!phone) return true;
    return /^\+?\d{7,15}$/.test(phone);
  };

  const isValidMessage = (value) => {
    return value.trim().length >= 10;
  };

  if (nameInput) {
    nameInput.addEventListener("input", () => {
      nameInput.value = nameInput.value.replace(/\s{2,}/g, " ");
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = sanitizePhone(phoneInput.value);
    });

    phoneInput.addEventListener("paste", () => {
      setTimeout(() => {
        phoneInput.value = sanitizePhone(phoneInput.value);
      }, 0);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameValue = nameInput ? sanitizeName(nameInput.value) : "";
    const phoneValue = phoneInput ? sanitizePhone(phoneInput.value) : "";
    const emailValue = emailInput ? emailInput.value.trim() : "";
    const messageValue = messageInput ? messageInput.value.trim() : "";

    if (nameInput) nameInput.value = nameValue;
    if (phoneInput) phoneInput.value = phoneValue;
    if (emailInput) emailInput.value = emailValue;
    if (messageInput) messageInput.value = messageValue;

    if (!isValidName(nameValue)) {
      showFormMessage(
        "contact.form.nameError",
        "Name must be at least 3 characters.",
        "error"
      );
      nameInput?.focus();
      return;
    }

    if (!isValidPhone(phoneValue)) {
      showFormMessage(
        "contact.form.phoneError",
        "Please enter a valid phone number.",
        "error"
      );
      phoneInput?.focus();
      return;
    }

    if (!isValidEmail(emailValue)) {
      showFormMessage(
        "contact.form.emailError",
        "Please enter a valid email address.",
        "error"
      );
      emailInput?.focus();
      return;
    }

    if (!isValidMessage(messageValue)) {
      showFormMessage(
        "contact.form.messageError",
        "Message must be at least 10 characters.",
        "error"
      );
      messageInput?.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = getFormText(
        "contact.form.sending",
        "Sending..."
      );
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();

        showFormMessage(
          "contact.form.success",
          "Message sent successfully. We’ll contact you as soon as possible 🚀",
          "success"
        );
      } else {
        showFormMessage(
          "contact.form.error",
          "Something went wrong. Please try again.",
          "error"
        );
      }
    } catch (error) {
      showFormMessage(
        "contact.form.networkError",
        "Unable to send your message right now. Please try again later.",
        "error"
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = getFormText(
          "contact.form.send",
          "Send"
        );
      }
    }
  });
});