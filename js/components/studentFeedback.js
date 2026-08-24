// =========================
// Student Feedback Data
// =========================

function getStudentFeedbackData() {
  const lang = getCurrentLanguage();

  return translations[lang]?.coursePage?.studentFeedback?.items || [];
}

let studentFeedbackSwiperInstance = null;

// =========================
// Render Card
// =========================

function createStudentFeedbackCard(item) {
  return `
    <article class="student-feedback-card">
      <div class="student-feedback-card__image-wrapper">
        <img
          class="student-feedback-card__image"
          src="${item.image}"
          alt="${item.alt || "Student feedback"}"
          loading="lazy"
        />
      </div>
    </article>
  `;
}

// =========================
// Render Section
// =========================

function renderStudentFeedbackSection() {
  const container = document.getElementById(
    "student-feedback-container"
  );

  if (!container) return;

  const lang = getCurrentLanguage();
  const dict = translations[lang];

  const section = dict?.coursePage?.studentFeedback;

  if (!section) return;

  const feedbackData = section.items || [];

  if (!feedbackData.length) return;

  container.innerHTML = `
    <div class="student-feedback-head">
      <h2 class="student-feedback-title">
        ${section.title}
      </h2>

      ${
        section.subtitle
          ? `
            <p class="student-feedback-subtitle">
              ${section.subtitle}
            </p>
          `
          : ""
      }
    </div>

    <div
      class="swiper student-feedback-swiper"
      aria-label="${section.ariaLabel || "Student feedback slider"}"
    >
      <div class="swiper-wrapper">
        ${feedbackData
          .map(
            (item) => `
              <div class="swiper-slide">
                ${createStudentFeedbackCard(item)}
              </div>
            `
          )
          .join("")}
      </div>

      <div class="student-feedback-pagination"></div>
    </div>
  `;

  initStudentFeedbackSwiper();
}

// =========================
// Swiper
// =========================

function initStudentFeedbackSwiper() {
  if (typeof Swiper === "undefined") return;

  const feedbackData = getStudentFeedbackData();

  if (studentFeedbackSwiperInstance) {
    studentFeedbackSwiperInstance.destroy(true, true);
    studentFeedbackSwiperInstance = null;
  }

  const swiperElement = document.querySelector(
    ".student-feedback-swiper"
  );

  if (!swiperElement) return;

  studentFeedbackSwiperInstance = new Swiper(
    ".student-feedback-swiper",
    {
      loop: feedbackData.length > 3,

      speed: 700,

      grabCursor: true,

      watchOverflow: true,

      centeredSlides: false,

      spaceBetween: 14,

      slidesPerView: 1.08,

      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: true,
      // },

      pagination: {
        el: ".student-feedback-pagination",
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
          slidesPerView: 2.5,
          spaceBetween: 20,
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 22,
        },
      },
    }
  );
}

// =========================
// Init
// =========================

function initStudentFeedbackSection() {
  renderStudentFeedbackSection();
}

// =========================
// Resize Handling
// =========================

let studentFeedbackResizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(studentFeedbackResizeTimer);

  studentFeedbackResizeTimer = setTimeout(() => {
    initStudentFeedbackSwiper();
  }, 150);
});

// =========================
// Init on Load
// =========================

document.addEventListener("DOMContentLoaded", () => {
  initStudentFeedbackSection();
});