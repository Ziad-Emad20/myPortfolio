const navLinks = [
  { labelKey: "nav.services", fallback: "Services", href: "/index.html#services" },
  { labelKey: "nav.courses", fallback: "Courses", href: "/pages/course.html" },
  { labelKey: "nav.contact", fallback: "Contact", href: "/pages/contact.html" },
];

const homeLink = "/index.html#home";

const whatsappLink =
  "https://wa.me/201225699265?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%AD%D8%AA%D8%A7%D8%AC%20%D8%A5%D9%84%D9%89%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9.%0A%0AHello%2C%20I%20need%20a%20consultation.%0A%0A%28%D8%A7%D9%83%D8%AA%D8%A8%20%D9%85%D9%88%D8%B6%D9%88%D8%B9%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%87%D9%86%D8%A7%20%2F%20Write%20your%20consultation%20topic%20here%29";

// =========================
// Language Helpers
// =========================

function safeGetCurrentLanguage() {
  if (typeof getCurrentLanguage === "function") {
    return getCurrentLanguage();
  }
  return localStorage.getItem("lang") || "en";
}

function safeSetLanguage(lang) {
  if (typeof setLanguage === "function") {
    setLanguage(lang);
    return;
  }

  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", lang === "ar");
}

// =========================
// Utils
// =========================

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function getNavbarDictionary() {
  const lang = safeGetCurrentLanguage();

  if (typeof translations !== "undefined" && translations[lang]) {
    return translations[lang];
  }

  return null;
}

function getTranslatedText(dict, key, fallback) {
  if (!dict) return fallback;
  return getNestedValue(dict, key) || fallback;
}

function getLanguageToggleLabel(lang) {
  return lang === "en" ? "العربية" : "EN";
}

// =========================
// Generate Links
// =========================

function generateLinks(className, dict) {
  return navLinks
    .map((link) => {
      const label = getTranslatedText(dict, link.labelKey, link.fallback);
      return `<a href="${link.href}" class="${className}">${label}</a>`;
    })
    .join("");
}

// =========================
// Navbar Template
// =========================

function getNavbarTemplate() {
  const lang = safeGetCurrentLanguage();
  const dict = getNavbarDictionary();

  const consultationText = getTranslatedText(
    dict,
    "nav.freeConsultation",
    "Free Consultation"
  );

  const homeAria = getTranslatedText(dict, "nav.homeAriaLabel", "Go to home");
  const menuAria = getTranslatedText(dict, "nav.menuAriaLabel", "Open menu");
  const changeLanguageAria = getTranslatedText(
    dict,
    "nav.changeLanguageAriaLabel",
    "Change language"
  );

  const languageLabel = getLanguageToggleLabel(lang);

  return `
    <header class="site-header">
      <div class="container">
        <div class="navbar">
          <a href="${homeLink}" class="logo">ZIAD</a>

          <nav class="nav-desktop">
            ${generateLinks("nav-link", dict)}
            <a href="${whatsappLink}" class="consultation-btn" target="_blank" rel="noopener noreferrer">
              ${consultationText}
            </a>
          </nav>

          <button id="langToggle" class="lang-toggle-btn" type="button" aria-label="${changeLanguageAria}">
            <span>${languageLabel}</span>
          </button>

          <div class="nav-mobile">
            <a href="${homeLink}" class="mobile-icon-btn home-btn" aria-label="${homeAria}">
              <i class="fa-solid fa-house"></i>
            </a>

            <a href="${whatsappLink}" class="consultation-btn" target="_blank" rel="noopener noreferrer">
              ${consultationText}
            </a>

            <div class="mobile-actions-group">
              <button class="mobile-icon-btn menu-toggle" type="button" aria-label="${menuAria}">
                <i class="fa-solid fa-ellipsis"></i>
              </button>

              <button id="langToggleMobile" class="lang-toggle-btn lang-toggle-btn--mobile" type="button" aria-label="${changeLanguageAria}">
                <span>${languageLabel}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="mobile-menu" id="mobileMenu">
          ${generateLinks("mobile-menu-link", dict)}
        </div>
      </div>
    </header>
  `;
}

// =========================
// Events
// =========================

function bindNavbarEvents(navbarContainer) {
  const header = navbarContainer.querySelector(".site-header");
  const langBtns = navbarContainer.querySelectorAll("#langToggle, #langToggleMobile");
  const menuToggle = navbarContainer.querySelector(".menu-toggle");
  const mobileMenu = navbarContainer.querySelector("#mobileMenu");

  if (header) {
    const handleScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
  }

  langBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = safeGetCurrentLanguage();
      const next = current === "en" ? "ar" : "en";

      safeSetLanguage(next);
      renderNavbar();

      if (typeof applyLanguage === "function") {
        applyLanguage(next);
      }

      if (typeof renderCoursePage === "function") {
        renderCoursePage();
      } else {
        if (typeof initStatsSection === "function") initStatsSection();
        if (typeof initOffersSection === "function") initOffersSection();
        if (typeof initFeedbackSection === "function") initFeedbackSection();
        if (typeof initContactSection === "function") initContactSection();
      }

      if (typeof initFooter === "function") {
        initFooter();
      }
    });
  });

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });

    document.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  }
}

// =========================
// Render
// =========================

function renderNavbar() {
  const navbarContainer = document.getElementById("navbar-container");
  if (!navbarContainer) return;

  navbarContainer.innerHTML = getNavbarTemplate();
  bindNavbarEvents(navbarContainer);
}

// =========================
// Init
// =========================

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
});