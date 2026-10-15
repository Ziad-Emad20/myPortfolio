// =========================
// Shopify projects (device mockups + slider)
// To add a store: add an object to `shopifyProjects` and put its screenshots in /assets/projects/
//   desktop: full-page desktop screenshot (tall image, ~1200px wide, .webp)
//   mobile:  full-page mobile screenshot  (tall image, ~430px wide, .webp)
//   typeKey / quoteKey: keys inside translations.<lang>.shopifyPage (js/i18n/pages/shopify.js)
// =========================

const shopifyProjects = [
  {
    name: "One&All",
    logo: "/assets/oneandall.jpg",
    typeKey: "work.oneandall",
    desktop: "/assets/projects/oneandall-desktop.webp",
    mobile: "/assets/projects/oneandall-mobile.webp",
    rating: 5,
    quoteKey: "testimonials.oneandall",
    featured: true, // shown in the hero
  },
  {
    name: "sis.sportswear",
    logo: "/assets/sis.jpg",
    typeKey: "work.sis",
    desktop: "/assets/projects/sis-desktop.webp",
    mobile: "/assets/projects/sis-mobile.webp",
    rating: 5,
    quoteKey: "testimonials.sis",
  },
];

function renderShopifyStars(rating) {
  return "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);
}

function getShopifyMockupTemplate(p) {
  return `
    <div class="svc-mockup" aria-hidden="true">
      <div class="svc-laptop">
        <div class="svc-laptop__screen">
          <div class="svc-screen" style="background-image:url('${p.desktop}')"></div>
        </div>
        <div class="svc-laptop__base"></div>
      </div>
      <div class="svc-phone">
        <div class="svc-screen svc-screen--mobile" style="background-image:url('${p.mobile}')"></div>
      </div>
    </div>`;
}

function getShopifyProjectTemplate(p) {
  return `
    <article class="swiper-slide svc-card svc-project">
      ${getShopifyMockupTemplate(p)}

      <div class="svc-project__body">
        <img class="svc-project__logo" src="${p.logo}" alt="${p.name}" loading="lazy">
        <div class="svc-project__info">
          <h3>${p.name}</h3>
          <p data-i18n="shopifyPage.${p.typeKey}"></p>
        </div>
        ${p.rating ? `<span class="svc-project__stars" aria-label="${p.rating}/5">${renderShopifyStars(p.rating)}</span>` : ""}
      </div>

      ${
        p.quoteKey
          ? `<div class="svc-project__quote">
              ${p.rating ? `<span class="svc-project__stars svc-project__stars--mobile" aria-hidden="true">${renderShopifyStars(p.rating)}</span>` : ""}
              <p data-i18n="shopifyPage.${p.quoteKey}"></p>
            </div>`
          : ""
      }
    </article>`;
}

// Play the scroll animation only while a mockup is on screen
function observeShopifyMockups(root) {
  const mockups = root.querySelectorAll(".svc-mockup");

  if (!("IntersectionObserver" in window)) {
    mockups.forEach((m) => m.classList.add("is-playing"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-playing", entry.isIntersecting);
      });
    },
    { threshold: 0.3 }
  );

  mockups.forEach((m) => observer.observe(m));
}

let shopifySwiper = null;

function initShopifySlider() {
  const el = document.querySelector(".svc-work-slider");
  if (!el || typeof Swiper === "undefined") return;

  if (shopifySwiper) {
    shopifySwiper.destroy(true, true);
    shopifySwiper = null;
  }

  // Swiper reads direction on init, so mirror the page direction first
  el.setAttribute("dir", document.documentElement.dir || "ltr");

  shopifySwiper = new Swiper(el, {
    slidesPerView: 1.08,
    spaceBetween: 14,
    grabCursor: true,
    watchOverflow: true,
    pagination: {
      el: ".svc-work-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".svc-work-next",
      prevEl: ".svc-work-prev",
    },
    breakpoints: {
      641: { slidesPerView: 1.4, spaceBetween: 20 },
      900: { slidesPerView: 2, spaceBetween: 24 },
    },
  });
}

function renderShopifyProjects() {
  // Hero mockup
  const hero = document.getElementById("shopify-hero-mockup");
  const featured = shopifyProjects.find((p) => p.featured) || shopifyProjects[0];

  if (hero && featured) {
    hero.innerHTML = getShopifyMockupTemplate(featured);
    observeShopifyMockups(hero);
  }

  // Projects slider
  const container = document.getElementById("shopify-projects");
  if (!container) return;

  container.innerHTML = shopifyProjects.map(getShopifyProjectTemplate).join("");
  observeShopifyMockups(container);
}

renderShopifyProjects();

document.addEventListener("DOMContentLoaded", () => {
  initShopifySlider();

  // Re-init the slider when the language (and direction) changes
  let lastDir = document.documentElement.dir;
  new MutationObserver(() => {
    if (document.documentElement.dir !== lastDir) {
      lastDir = document.documentElement.dir;
      initShopifySlider();
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
});
