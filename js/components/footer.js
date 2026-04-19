// =========================
// Social Links (Static)
// =========================

const socialLinks = [
  {
    key: "youtube",
    href: "https://www.youtube.com/@ziademad2023",
    icon: "fa-brands fa-youtube",
  },
  {
    key: "instagram",
    href: "https://www.instagram.com/ziiademad_/",
    icon: "fa-brands fa-instagram",
  },
  {
    key: "facebook",
    href: "https://www.facebook.com/ZiadEmad2004",
    icon: "fa-brands fa-facebook-f",
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/ziad-emad2004/",
    icon: "fa-brands fa-linkedin-in",
  },
];

// =========================
// Generate Social Links (Translated)
// =========================

function generateSocialLinks() {
  const lang = getCurrentLanguage();
  const dict = translations[lang];

  return socialLinks
    .map((item) => {
      const label =
        dict?.footer?.socials?.[item.key] || item.key;

      return `
        <a 
          href="${item.href}" 
          class="footer-social-link" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="${label}"
        >
          <i class="${item.icon}"></i>
        </a>
      `;
    })
    .join("");
}

// =========================
// Render Footer
// =========================

function renderFooter() {
  const footerContainer = document.getElementById("footer-container");
  if (!footerContainer) return;

  const lang = getCurrentLanguage();
  const dict = translations[lang];

  const text =
    dict?.footer?.text ||
    "Building modern websites, Shopify experiences, and digital content with a clean premium touch.";

  const copy =
    dict?.footer?.copy ||
    "© 2024 - All Rights Reserved.";

  footerContainer.innerHTML = `
    <div class="site-footer">
      <div class="footer-inner">
        <div class="footer-content">
          <a href="#home" class="footer-logo">ZIAD</a>

          <p class="footer-text">
            ${text}
          </p>

          <div class="footer-socials">
            ${generateSocialLinks()}
          </div>

          <p class="footer-copy">${copy}</p>
        </div>
      </div>
    </div>
  `;
}

// =========================
// Init
// =========================

function initFooter() {
  renderFooter();
}

// =========================
// First Load
// =========================

document.addEventListener("DOMContentLoaded", () => {
  initFooter();
});