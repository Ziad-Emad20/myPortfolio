const navLinks = [
  { label: "service", href: "/index.html#services" },
  { label: "course", href: "/index.html#courses" },
  { label: "contact", href: "/pages/contact.html" },
];

const homeLink = "/index.html#home";

const whatsappLink =
  "https://wa.me/201225699265?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%AD%D8%AA%D8%A7%D8%AC%20%D8%A5%D9%84%D9%89%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9.%0A%0AHello%2C%20I%20need%20a%20consultation.%0A%0A%28%D8%A7%D9%83%D8%AA%D8%A8%20%D9%85%D9%88%D8%B6%D9%88%D8%B9%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%87%D9%86%D8%A7%20%2F%20Write%20your%20consultation%20topic%20here%29";

function generateLinks(className) {
  return navLinks
    .map(
      (link) => `<a href="${link.href}" class="${className}">${link.label}</a>`
    )
    .join("");
}

const navbarTemplate = `
  <header class="site-header">
    <div class="container">
      <div class="navbar">
        <a href="${homeLink}" class="logo">ZIAD</a>

        <nav class="nav-desktop">
          ${generateLinks("nav-link")}
          <a href="${whatsappLink}" class="consultation-btn" target="_blank" rel="noopener noreferrer">
            free consultation
          </a>
        </nav>

        <div class="nav-mobile">
          <a href="${homeLink}" class="mobile-icon-btn home-btn" aria-label="Go to home">
            <i class="fa-solid fa-house"></i>
          </a>

          <a href="${whatsappLink}" class="consultation-btn" target="_blank" rel="noopener noreferrer">
            free consultation
          </a>

          <button class="mobile-icon-btn menu-toggle" type="button" aria-label="Open menu">
            <i class="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>

      <div class="mobile-menu" id="mobileMenu">
        ${generateLinks("mobile-menu-link")}
      </div>
    </div>
  </header>
`;

function renderNavbar() {
  const navbarContainer = document.getElementById("navbar-container");
  if (!navbarContainer) return;

  navbarContainer.innerHTML = navbarTemplate;

  const header = navbarContainer.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

renderNavbar();