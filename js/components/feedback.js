// =========================
// Feedback Data (Dynamic from translations)
// =========================

function getFeedbackData() {
  const lang = getCurrentLanguage();
  return translations[lang]?.feedback?.items || [];
}

let feedbackSwiperInstance = null;

// =========================
// Helpers
// =========================

function createStars(rating) {
  return Array.from({ length: 5 }, (_, index) => {
    return `<span class="feedback-card__star ${
      index < rating ? "is-active" : ""
    }">★</span>`;
  }).join("");
}

function createFeedbackCard(item) {
  const lang = getCurrentLanguage();
  const ariaText =
    translations[lang]?.feedback?.ariaStars || "out of 5 stars";

  return `
    <article class="feedback-card">
      <div class="feedback-card__top">
        <div class="feedback-card__user">
          <div class="feedback-card__avatar">
            <img src="${item.avatar}" alt="${item.name}">
          </div>
          <h3 class="feedback-card__name">${item.name}</h3>
        </div>

        <div class="feedback-card__rating" aria-label="${item.rating} ${ariaText}">
          ${createStars(item.rating)}
        </div>
      </div>

      <p class="feedback-card__text">${item.text}</p>
    </article>
  `;
}

// =========================
// Render Section
// =========================

function renderFeedbackSection() {
  const container = document.getElementById("feedback-container");
  if (!container) return;

  const lang = getCurrentLanguage();
  const dict = translations[lang];
  const feedbackData = getFeedbackData();

  const title = dict?.feedback?.title || "Feedback";

  container.innerHTML = `
    <div class="feedback-head">
      <h2 class="feedback-title">${title}</h2>
    </div>

    <div class="swiper feedback-swiper">
      <div class="swiper-wrapper">
        ${feedbackData
          .map(
            (item) => `
              <div class="swiper-slide">
                ${createFeedbackCard(item)}
              </div>
            `
          )
          .join("")}
      </div>

      <div class="feedback-swiper-pagination"></div>
    </div>
  `;

  initFeedbackSwiper();
}

// =========================
// Swiper
// =========================

function initFeedbackSwiper() {
  if (typeof Swiper === "undefined") return;

  const feedbackData = getFeedbackData();

  if (feedbackSwiperInstance) {
    feedbackSwiperInstance.destroy(true, true);
  }

  feedbackSwiperInstance = new Swiper(".feedback-swiper", {
    loop: feedbackData.length > 3,
    speed: 700,
    grabCursor: true,
    watchOverflow: true,
    centeredSlides: false,
    spaceBetween: 14,
    slidesPerView: 1.08,

    autoplay: {
      delay: 2600,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: {
      el: ".feedback-swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      576: {
        slidesPerView: 1.2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      992: {
        slidesPerView: 2.6,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 22,
      },
    },
  });
}

// =========================
// Init Section
// =========================

function initFeedbackSection() {
  renderFeedbackSection();
}

// =========================
// Resize Handling
// =========================

let feedbackResizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(feedbackResizeTimer);
  feedbackResizeTimer = setTimeout(() => {
    initFeedbackSwiper();
  }, 150);
});

// =========================
// Init on Load
// =========================

document.addEventListener("DOMContentLoaded", () => {
  initFeedbackSection();
});