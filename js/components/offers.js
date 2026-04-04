const offersData = [
  {
    title: "shopify",
    subtitle: "Design & development",
    description: "Lorem ipsum dolor sit amet consecte, adipisicing elit.",
    count: 5,
    label: "client",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "content creator",
    subtitle: "Ideas, design & storytelling",
    description: "Lorem ipsum dolor sit amet consecte, adipisicing elit.",
    count: 3,
    label: "brands",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "website",
    subtitle: "Front-end & back-end developer",
    description: "Lorem ipsum dolor sit amet consecte, adipisicing elit.",
    count: 7,
    label: "client",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
];

let offersSwiperInstance = null;

function createOfferCard(item) {
  return `
    <article class="offer-card">
      <div class="offer-card__image-wrap">
        <img src="${item.image}" alt="${item.title}" class="offer-card__image">
      </div>

      <div class="offer-card__content">
        <div class="offer-card__text">
          <h3 class="offer-card__title">${item.title}</h3>
          <p class="offer-card__subtitle">${item.subtitle}</p>
          <p class="offer-card__description">${item.description}</p>
        </div>

        <div class="offer-card__footer">
          <div class="offer-card__meta">
            <span class="offer-card__count">+${item.count}</span>
            <span class="offer-card__label">${item.label}</span>
          </div>

          <a href="${item.link}" class="offer-card__arrow" aria-label="Open ${item.title}">
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderOffersSection() {
  const container = document.getElementById("offers-container");
  if (!container) return;

  container.innerHTML = `
    <div class="offers-head">
      <h2 class="offers-title">What I Offer</h2>
    </div>

    <div class="swiper offers-swiper">
      <div class="swiper-wrapper">
        ${offersData
          .map(
            (item) => `
              <div class="swiper-slide">
                ${createOfferCard(item)}
              </div>
            `
          )
          .join("")}
      </div>
      <!-- Pagination -->
      <div class="offers-swiper-pagination"></div>
    </div>
  `;

  initOffersSwiper();
}

function initOffersSwiper() {
  if (typeof Swiper === "undefined") return;

  if (offersSwiperInstance) {
    offersSwiperInstance.destroy(true, true);
  }

  offersSwiperInstance = new Swiper(".offers-swiper", {
    grabCursor: true,
    speed: 600,
    watchOverflow: true,
    spaceBetween: 16,
    slidesPerView: 1.08,

    pagination: {
      el: ".offers-swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      576: {
        slidesPerView: 1.18,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}
let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initOffersSwiper();
  }, 150);
});

document.addEventListener("DOMContentLoaded", renderOffersSection);