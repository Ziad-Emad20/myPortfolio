// =========================
// Shopify projects (device mockups)
// To add a store: add an object here and put its screenshots in /assets/projects/
//   desktop: full-page desktop screenshot (tall image, ~1440px wide)
//   mobile:  full-page mobile screenshot  (tall image, ~390px wide)
//   typeKey / quoteKey: keys inside translations.<lang>.shopifyPage
// =========================

const shopifyProjects = [
  {
    name: "sis.sportswear",
    logo: "/assets/sis.jpg",
    typeKey: "work.p1",
    desktop: "/assets/projects/placeholder-desktop.svg",
    mobile: "/assets/projects/placeholder-mobile.svg",
    rating: 5,
    quoteKey: "testimonials.q2",
  },
  {
    name: "Marvel Menswear",
    logo: "/assets/marvel.jpg",
    typeKey: "work.p2",
    desktop: "/assets/projects/placeholder-desktop.svg",
    mobile: "/assets/projects/placeholder-mobile.svg",
    rating: 5,
    quoteKey: "testimonials.q1",
  },
  {
    name: "Vertex Store",
    logo: "/assets/vertex.jpg",
    typeKey: "work.p3",
    desktop: "/assets/projects/placeholder-desktop.svg",
    mobile: "/assets/projects/placeholder-mobile.svg",
    rating: 4,
    quoteKey: "testimonials.q3",
  },
];

function renderShopifyStars(rating) {
  return "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);
}

function renderShopifyProjects() {
  const container = document.getElementById("shopify-projects");
  if (!container) return;

  container.innerHTML = shopifyProjects
    .map(
      (p) => `
      <article class="svc-card svc-project">
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
        </div>

        <div class="svc-project__body">
          <img class="svc-project__logo" src="${p.logo}" alt="${p.name}" loading="lazy">
          <div class="svc-project__info">
            <h3>${p.name}</h3>
            <p data-i18n="shopifyPage.${p.typeKey}"></p>
          </div>
          ${p.rating ? `<span class="svc-project__stars" aria-label="${p.rating}/5">${renderShopifyStars(p.rating)}</span>` : ""}
        </div>

        ${p.quoteKey ? `<p class="svc-project__quote" data-i18n="shopifyPage.${p.quoteKey}"></p>` : ""}
      </article>`
    )
    .join("");

  // Play the scroll animation only while a mockup is on screen
  const mockups = container.querySelectorAll(".svc-mockup");

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
    { threshold: 0.35 }
  );

  mockups.forEach((m) => observer.observe(m));
}

renderShopifyProjects();
