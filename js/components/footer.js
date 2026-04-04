const socialLinks = [
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: "fa-brands fa-youtube",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: "fa-brands fa-linkedin-in",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: "fa-brands fa-instagram",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/",
    icon: "fa-brands fa-facebook-f",
  },
];

function generateSocialLinks() {
  return socialLinks
    .map(
      (item) => `
        <a 
          href="${item.href}" 
          class="footer-social-link" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="${item.label}"
        >
          <i class="${item.icon}"></i>
        </a>
      `
    )
    .join("");
}

const footerTemplate = `
  <div class="site-footer">
    <div class="footer-inner">
      <div class="footer-content">
        <a href="#home" class="footer-logo">ZIAD</a>

        <p class="footer-text">
          Building modern websites, Shopify experiences, and digital content with a clean premium touch.
        </p>

        <div class="footer-socials">
          ${generateSocialLinks()}
        </div>

        <p class="footer-copy">© 2024 - All Rights Reserved.</p>
      </div>
    </div>
  </div>
`;

function renderFooter() {
  const footerContainer = document.getElementById("footer-container");
  if (!footerContainer) return;

  footerContainer.innerHTML = footerTemplate;
}

renderFooter();