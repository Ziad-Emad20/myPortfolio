const WHATSAPP_CHAT_LINK =
  "https://wa.me/201225699265?text=Hi%20Ziad%2C%20I%20want%20to%20know%20more%20about%20the%20Shopify%20course.";

const WHATSAPP_GROUP_LINK =
  "https://chat.whatsapp.com/L8e7j2zvEVE8gBgEk25bbv";

const coursePageData = {
  hero: {
    eyebrow: "Shopify Course / No-Code / Practical Learning",
    title: "Build a professional Shopify store from scratch — without code.",
    description:
      "A practical Shopify course that helps beginners, brand owners, and freelancers build real stores step by step with clarity, confidence, and a workflow they can actually apply.",
    tags: ["Design", "Development", "No Code"],
    primaryCta: {
      label: "Join Now & Get Early Access",
      href: WHATSAPP_GROUP_LINK,
    },
    secondaryCta: {
      label: "Have a question? Chat on WhatsApp",
      href: WHATSAPP_CHAT_LINK,
    },
    currentPrice: "2300 EGP",
    oldPrice: "4000 EGP",
    note: "First round only • Limited launch price",
    image:
      "https://cdn.shopify.com/b/shopify-brochure2-assets/49bbf17e5d43dcd0bd09ad39724ae7ac.png",
    language: "Arabic",
  },

  highlights: [
    { value: "Beginner", label: "Friendly" },
    { value: "No", label: "Code" },
    { value: "3", label: "Practical Stores" },
    { value: "Step by", label: "Step" },
  ],

  fit: {
    title: "Is this for you ?",
    items: [
      "Ready to start your online business",
      "Want a clear step-by-step path",
      "Want to build a professional store without coding",
      "Want to launch faster with less confusion",
      "Want to turn your skills into real income",
      "Want to understand Shopify the practical way",
    ],
  },

  achievements: {
    title: "What You'll Achieve !",
    items: [
      "Launch a professional Shopify store",
      "Build a store optimized for conversions",
      "Manage your business with confidence",
      "Understand store setup, products, and workflows",
      "Create a strong foundation for long-term growth",
    ],
  },

  content: {
    title: "Course Content",
    modules: [
      {
        title: "Build a Professional Shopify Store from Scratch",
        text: "Learn how Shopify works, how to set up your store the right way, and how to build a strong foundation from day one.",
      },
      {
        title: "Product Management & Store Setup",
        text: "Organize products, collections, and key store settings in a practical way that makes your store easier to manage and grow.",
      },
      {
        title: "Store Design & User Experience Optimization",
        text: "Create a cleaner layout, improve the shopping experience, and make your store feel more polished and more trustworthy.",
      },
      {
        title: "Payment & Shipping Configuration",
        text: "Set up the most important operational settings every real Shopify store needs before launch.",
      },
      {
        title: "Sales & Marketing Strategies for Growth",
        text: "Understand the basics that help your store build trust, improve performance, and prepare for long-term growth.",
      },
    ],
  },

  difference: {
    title: "Why This Course Is Different",
    items: [
      "Practical, not just theory",
      "No-code and beginner friendly",
      "Built around real store creation",
      "Clear learning path without random confusion",
      "Focused on execution, not information overload",
      "Designed for real-world use",
    ],
  },

  audience: {
    title: "Who This Course Is Built For",
    cards: [
      {
        title: "Beginners",
        text: "Want a simple and practical way to start with Shopify without feeling lost.",
      },
      {
        title: "Brand Owners",
        text: "Want to build or understand their own store better and make smarter decisions.",
      },
      {
        title: "Freelancers",
        text: "Want to add Shopify as a real service they can confidently offer to clients.",
      },
    ],
  },

  instructor: {
    title: "Learn From Real Experience",
    name: "Ziad Emad",
    role: "Web & Shopify Developer",
    text: "This course is built from real Shopify implementation experience, with a focus on clarity, practical execution, and helping you reach a real result instead of just watching lessons.",
    points: [
      "Real Shopify implementation experience",
      "Practical teaching style",
      "Focused on clarity and actual outcomes",
    ],
    image: "/assets/me.jpg",
  },

  proof: {
    title: "What You Can Build",
    cards: [
      {
        title: "Fashion Store",
        text: "A clean, premium layout built with conversion and clarity in mind.",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Beauty Store",
        text: "A polished store experience designed for premium products and strong presentation.",
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "General Product Store",
        text: "A flexible store structure that helps you understand real Shopify workflow.",
        image:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Is this course beginner friendly?",
        answer:
          "Yes. The course is designed to be clear, practical, and suitable even if you are starting from zero.",
      },
      {
        question: "Do I need coding experience?",
        answer:
          "No. The course is built to help you work with Shopify without needing coding skills.",
      },
      {
        question: "Will I build a real store during the course?",
        answer:
          "Yes. The course is designed around practical implementation, not passive watching.",
      },
      {
        question: "Is this course useful for freelancers?",
        answer:
          "Yes. It helps freelancers understand Shopify workflow and build a service they can offer.",
      },
      {
        question: "Can brand owners benefit from it too?",
        answer:
          "Absolutely. It is useful for anyone who wants to build or better understand a Shopify store.",
      },
    ],
  },

  cta: {
    title: "Ready to build your Shopify store the right way?",
    description:
      "Get the full course details, ask your questions, and join the first round with the launch price before it moves to 4000 EGP.",
    currentPrice: "2300 EGP",
    oldPrice: "4000 EGP",
    primaryCta: {
      label: "Join The Early Access Group",
      href: WHATSAPP_GROUP_LINK,
    },
    secondaryCta: {
      label: "Have a question? Chat on WhatsApp",
      href: WHATSAPP_CHAT_LINK,
    },
  },
};

function createSectionHead(title, description = "", eyebrow = "") {
  return `
    <div class="section-head">
      ${eyebrow ? `<span class="section-eyebrow">${eyebrow}</span>` : ""}
      <h2 class="section-title">${title}</h2>
      ${description ? `<p class="section-description">${description}</p>` : ""}
    </div>
  `;
}

function renderHero() {
  const container = document.getElementById("course-hero-container");
  if (!container) return;

  const hero = coursePageData.hero;

  container.innerHTML = `
    <div class="course-hero-card">
      <div class="course-hero-card__media">
        <img src="${hero.image}" alt="Shopify Course Preview" class="course-hero-card__image" />

        <div class="course-hero-card__topbar">
          <span class="course-hero-card__mini-label">shopify course</span>

          <button class="course-hero-card__lang" type="button" aria-label="Course language">
            <i class="fa-solid fa-globe"></i>
            <span>${hero.language}</span>
          </button>
        </div>
      </div>

      <div class="course-hero-card__content">
        <span class="course-hero-card__eyebrow">${hero.eyebrow}</span>

        <h1 class="course-hero-card__title">${hero.title}</h1>

        <p class="course-hero-card__description">${hero.description}</p>

        <div class="course-hero-card__tags">
          ${hero.tags
            .map(
              (tag) => `
              <span class="course-tag">${tag}</span>
            `
            )
            .join("")}
        </div>

        <div class="course-hero-card__pricing">
          <div class="course-price-meta">
            <span class="course-price-meta__old">${hero.oldPrice}</span>
            <span class="course-price-meta__new">${hero.currentPrice}</span>
          </div>

          <a href="${hero.primaryCta.href}" target="_blank" rel="noopener noreferrer" class="course-price-button">
            ${hero.primaryCta.label}
          </a>
        </div>

        <div class="course-hero-card__actions">
          <a href="${hero.secondaryCta.href}" target="_blank" rel="noopener noreferrer" class="course-secondary-link">
            ${hero.secondaryCta.label}
          </a>
        </div>

        <p class="course-hero-card__note">${hero.note}</p>
      </div>
    </div>
  `;
}

function renderHighlights() {
  const container = document.getElementById("course-highlights-container");
  if (!container) return;

  const items = coursePageData.highlights;

  container.innerHTML = `
    <div class="course-highlights-card">
      ${items
        .map(
          (item) => `
            <div class="course-highlight-item">
              <h3 class="course-highlight-item__value">${item.value}</h3>
              <p class="course-highlight-item__label">${item.label}</p>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function createListCard(title, items, iconClass = "fa-regular fa-circle-check") {
  return `
    ${createSectionHead(title)}

    <div class="course-list-card">
      ${items
        .map(
          (item) => `
            <div class="course-list-item">
              <div class="course-list-item__icon">
                <i class="${iconClass}"></i>
              </div>
              <p class="course-list-item__text">${item}</p>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderFitSection() {
  const container = document.getElementById("course-fit-container");
  if (!container) return;

  const data = coursePageData.fit;
  container.innerHTML = createListCard(data.title, data.items, "fa-regular fa-circle-check");
}

function renderAchievementsSection() {
  const container = document.getElementById("course-achievements-container");
  if (!container) return;

  const data = coursePageData.achievements;
  container.innerHTML = createListCard(data.title, data.items, "fa-solid fa-rocket");
}

function renderCourseContent() {
  const container = document.getElementById("course-content-container");
  if (!container) return;

  const data = coursePageData.content;

  container.innerHTML = `
    ${createSectionHead(data.title)}

    <div class="course-list-card course-list-card--modules">
      ${data.modules
        .map(
          (module) => `
            <article class="course-module-item">
              <h3 class="course-module-item__title">${module.title}</h3>
              <p class="course-module-item__text">${module.text}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderDifferenceSection() {
  const container = document.getElementById("course-difference-container");
  if (!container) return;

  const data = coursePageData.difference;

  container.innerHTML = `
    ${createSectionHead(data.title)}

    <div class="course-info-grid">
      ${data.items
        .map(
          (item) => `
            <article class="course-info-card">
              <div class="course-info-card__icon">
                <i class="fa-solid fa-star"></i>
              </div>
              <p class="course-info-card__text">${item}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderAudienceSection() {
  const container = document.getElementById("course-audience-container");
  if (!container) return;

  const data = coursePageData.audience;

  container.innerHTML = `
    ${createSectionHead(data.title)}

    <div class="course-audience-grid">
      ${data.cards
        .map(
          (card) => `
            <article class="course-audience-card">
              <h3 class="course-audience-card__title">${card.title}</h3>
              <p class="course-audience-card__text">${card.text}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderInstructorSection() {
  const container = document.getElementById("course-instructor-container");
  if (!container) return;

  const data = coursePageData.instructor;

  container.innerHTML = `
    ${createSectionHead(data.title)}

    <div class="course-instructor-card">
      <div class="course-instructor-card__media">
        <img src="${data.image}" alt="${data.name}" class="course-instructor-card__image" />
      </div>

      <div class="course-instructor-card__content">
        <h3 class="course-instructor-card__name">${data.name}</h3>
        <p class="course-instructor-card__role">${data.role}</p>
        <p class="course-instructor-card__text">${data.text}</p>

        <div class="course-instructor-card__points">
          ${data.points
            .map(
              (point) => `
                <div class="course-instructor-card__point">
                  <i class="fa-solid fa-check"></i>
                  <span>${point}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function renderProofSection() {
  const container = document.getElementById("course-proof-container");
  if (!container) return;

  const data = coursePageData.proof;

  container.innerHTML = `
    ${createSectionHead(data.title)}

    <div class="course-proof-grid">
      ${data.cards
        .map(
          (card) => `
            <article class="course-proof-card">
              <div class="course-proof-card__image-wrap">
                <img src="${card.image}" alt="${card.title}" class="course-proof-card__image" />
              </div>

              <div class="course-proof-card__content">
                <h3 class="course-proof-card__title">${card.title}</h3>
                <p class="course-proof-card__text">${card.text}</p>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderFaqSection() {
  const container = document.getElementById("course-faq-container");
  if (!container) return;

  const data = coursePageData.faq;

  container.innerHTML = `
    ${createSectionHead(data.title)}

    <div class="course-faq-list">
      ${data.items
        .map(
          (item, index) => `
            <article class="course-faq-item ${index === 0 ? "is-open" : ""}">
              <button class="course-faq-item__question" type="button">
                <span>${item.question}</span>
                <i class="fa-solid fa-plus"></i>
              </button>

              <div class="course-faq-item__answer-wrap">
                <p class="course-faq-item__answer">${item.answer}</p>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderCtaSection() {
  const container = document.getElementById("course-cta-container");
  if (!container) return;

  const data = coursePageData.cta;

  container.innerHTML = `
    <div class="course-cta-card">
      <div class="course-cta-card__content">
        <span class="section-eyebrow">First Round Offer</span>
        <h2 class="section-title">${data.title}</h2>
        <p class="section-description">${data.description}</p>

        <div class="course-cta-card__price">
          <span class="course-cta-card__old">${data.oldPrice}</span>
          <span class="course-cta-card__new">${data.currentPrice}</span>
        </div>

        <div class="course-cta-card__actions">
          <a href="${data.primaryCta.href}" target="_blank" rel="noopener noreferrer" class="course-main-btn">
            ${data.primaryCta.label}
          </a>

          <a href="${data.secondaryCta.href}" target="_blank" rel="noopener noreferrer" class="course-ghost-btn">
            ${data.secondaryCta.label}
          </a>
        </div>
      </div>
    </div>
  `;
}

function initFaq() {
  const faqItems = document.querySelectorAll(".course-faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".course-faq-item__question");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((faq) => faq.classList.remove("is-open"));

      if (!isOpen) {
        item.classList.add("is-open");
      }
    });
  });
}

function renderCoursePage() {
  renderHero();
  renderHighlights();
  renderFitSection();
  renderAchievementsSection();
  renderCourseContent();
  renderDifferenceSection();
  renderAudienceSection();
  renderInstructorSection();
  renderProofSection();
  renderFaqSection();
  renderCtaSection();
  initFaq();
}

/* =========================
   Course Animations
   Same style as home/contact
   ========================= */

window.addEventListener("load", () => {
  renderCoursePage();

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  function waitForSelectors(selectors, callback, timeout = 5000) {
    const start = performance.now();

    function check() {
      const ready = selectors.every((selector) => document.querySelector(selector));
      if (ready) {
        callback();
        return;
      }

      if (performance.now() - start < timeout) {
        requestAnimationFrame(check);
      }
    }

    check();
  }

  function revealTitle(sectionSelector, titleSelector) {
    const section = $(sectionSelector);
    const title = $(titleSelector);

    if (!section || !title) return;

    gsap.from(title, {
      scrollTrigger: {
        trigger: section,
        start: "top 84%",
        once: true,
      },
      yPercent: 20,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.85,
      ease: "expo.out",
      clearProps: "opacity,filter",
    });
  }

  function animateHero() {
    const card = $(".course-hero-card");
    const media = $(".course-hero-card__media");
    const image = $(".course-hero-card__image");
    const topbar = $(".course-hero-card__topbar");
    const eyebrow = $(".course-hero-card__eyebrow");
    const title = $(".course-hero-card__title");
    const description = $(".course-hero-card__description");
    const tags = $$(".course-tag");
    const priceMeta = $(".course-price-meta");
    const primaryBtn = $(".course-price-button");
    const secondaryBtn = $(".course-secondary-link");
    const note = $(".course-hero-card__note");

    if (!card) return;

    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      delay: 0.08,
    });

    tl.from(card, {
      yPercent: 8,
      opacity: 0,
      filter: "blur(8px)",
      duration: 1,
      clearProps: "opacity,filter",
    });

    if (media) {
      tl.from(
        media,
        {
          yPercent: 10,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.85,
          clearProps: "opacity,filter",
        },
        "-=0.72"
      );
    }

    if (topbar) {
      tl.from(
        topbar,
        {
          yPercent: 10,
          opacity: 0,
          duration: 0.45,
          ease: "power3.out",
          clearProps: "opacity",
        },
        "-=0.5"
      );
    }

    if (eyebrow) {
      tl.from(
        eyebrow,
        {
          yPercent: 16,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.62,
          clearProps: "opacity,filter",
        },
        "-=0.48"
      );
    }

    if (title) {
      tl.from(
        title,
        {
          yPercent: 18,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.8,
          clearProps: "opacity,filter",
        },
        "-=0.45"
      );
    }

    if (description) {
      tl.from(
        description,
        {
          yPercent: 14,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.75,
          clearProps: "opacity,filter",
        },
        "-=0.52"
      );
    }

    if (tags.length) {
      tl.from(
        tags,
        {
          yPercent: 12,
          opacity: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "opacity",
        },
        "-=0.35"
      );
    }

    if (priceMeta) {
      tl.from(
        priceMeta,
        {
          yPercent: 12,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.55,
          clearProps: "opacity,filter",
        },
        "-=0.28"
      );
    }

    if (primaryBtn) {
      tl.from(
        primaryBtn,
        {
          yPercent: 10,
          opacity: 0,
          duration: 0.45,
          ease: "power3.out",
          clearProps: "opacity",
        },
        "-=0.2"
      );
    }

    if (secondaryBtn) {
      tl.from(
        secondaryBtn,
        {
          yPercent: 10,
          opacity: 0,
          duration: 0.45,
          ease: "power3.out",
          clearProps: "opacity",
        },
        "-=0.28"
      );
    }

    if (note) {
      tl.from(
        note,
        {
          yPercent: 10,
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
          clearProps: "opacity",
        },
        "-=0.24"
      );
    }

    if (image) {
      gsap.to(image, {
        scale: 1.015,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }

  function animateHighlights() {
    const section = $(".course-highlights");
    const items = $$(".course-highlight-item");

    if (!section || !items.length) return;

    gsap.from(items, {
      scrollTrigger: {
        trigger: section,
        start: "top 84%",
        once: true,
      },
      yPercent: 16,
      opacity: 0,
      filter: "blur(6px)",
      duration: 0.65,
      stagger: 0.06,
      ease: "expo.out",
      clearProps: "opacity,filter",
    });
  }

  function animateListSection(sectionSelector) {
    const section = $(sectionSelector);
    if (!section) return;

    const title = $(".section-title", section);
    const eyebrow = $(".section-eyebrow", section);
    const description = $(".section-description", section);
    const items = $$(".course-list-item, .course-module-item", section);

    const headTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 84%",
        once: true,
      },
    });

    if (eyebrow) {
      headTl.from(eyebrow, {
        yPercent: 14,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
        clearProps: "opacity",
      });
    }

    if (title) {
      headTl.from(
        title,
        {
          yPercent: 20,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.8,
          ease: "expo.out",
          clearProps: "opacity,filter",
        },
        eyebrow ? "-=0.22" : 0
      );
    }

    if (description) {
      headTl.from(
        description,
        {
          yPercent: 12,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.7,
          ease: "expo.out",
          clearProps: "opacity,filter",
        },
        "-=0.45"
      );
    }

    if (items.length) {
      gsap.from(items, {
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
        yPercent: 12,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.62,
        stagger: 0.07,
        ease: "expo.out",
        clearProps: "opacity,filter",
      });
    }
  }

  function animateDifference() {
    const section = $(".course-difference");
    const cards = $$(".course-info-card");

    if (!section || !cards.length) return;

    revealTitle(".course-difference", ".course-difference .section-title");

    cards.forEach((card, index) => {
      const icon = $(".course-info-card__icon", card);
      const text = $(".course-info-card__text", card);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          once: true,
        },
        delay: index * 0.06,
      });

      if (icon) {
        tl.from(icon, {
          yPercent: 12,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.5,
          ease: "expo.out",
          clearProps: "opacity,filter",
        });
      }

      if (text) {
        tl.from(
          text,
          {
            yPercent: 10,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.65,
            ease: "expo.out",
            clearProps: "opacity,filter",
          },
          "-=0.32"
        );
      }
    });
  }

  function animateAudience() {
    const section = $(".course-audience");
    const cards = $$(".course-audience-card");

    if (!section || !cards.length) return;

    revealTitle(".course-audience", ".course-audience .section-title");

    cards.forEach((card, index) => {
      const title = $(".course-audience-card__title", card);
      const text = $(".course-audience-card__text", card);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          once: true,
        },
        delay: index * 0.06,
      });

      if (title) {
        tl.from(title, {
          yPercent: 14,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.58,
          ease: "expo.out",
          clearProps: "opacity,filter",
        });
      }

      if (text) {
        tl.from(
          text,
          {
            yPercent: 10,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.7,
            ease: "expo.out",
            clearProps: "opacity,filter",
          },
          "-=0.34"
        );
      }
    });
  }

  function animateInstructor() {
    const section = $(".course-instructor");
    const card = $(".course-instructor-card");

    if (!section || !card) return;

    const image = $(".course-instructor-card__image", card);
    const name = $(".course-instructor-card__name", card);
    const role = $(".course-instructor-card__role", card);
    const text = $(".course-instructor-card__text", card);
    const points = $$(".course-instructor-card__point", card);

    revealTitle(".course-instructor", ".course-instructor .section-title");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        once: true,
      },
    });

    tl.from(card, {
      yPercent: 8,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.85,
      ease: "expo.out",
      clearProps: "opacity,filter",
    });

    if (image) {
      tl.from(
        image,
        {
          yPercent: 10,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.7,
          ease: "expo.out",
          clearProps: "opacity,filter",
        },
        "-=0.56"
      );

      gsap.to(image, {
        scale: 1.012,
        duration: 4.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (name) {
      tl.from(
        name,
        {
          yPercent: 14,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.58,
          ease: "expo.out",
          clearProps: "opacity,filter",
        },
        "-=0.44"
      );
    }

    if (role) {
      tl.from(
        role,
        {
          yPercent: 10,
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
          clearProps: "opacity",
        },
        "-=0.36"
      );
    }

    if (text) {
      tl.from(
        text,
        {
          yPercent: 10,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.7,
          ease: "expo.out",
          clearProps: "opacity,filter",
        },
        "-=0.28"
      );
    }

    if (points.length) {
      tl.from(
        points,
        {
          yPercent: 10,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "opacity",
        },
        "-=0.22"
      );
    }
  }

  function animateProof() {
    const section = $(".course-proof");
    const cards = $$(".course-proof-card");

    if (!section || !cards.length) return;

    revealTitle(".course-proof", ".course-proof .section-title");

    cards.forEach((card, index) => {
      const imageWrap = $(".course-proof-card__image-wrap", card);
      const content = $(".course-proof-card__content", card);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          once: true,
        },
        delay: index * 0.07,
      });

      if (imageWrap) {
        tl.from(imageWrap, {
          yPercent: 10,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.7,
          ease: "expo.out",
          clearProps: "opacity,filter",
        });
      }

      if (content) {
        tl.from(
          content,
          {
            yPercent: 10,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.75,
            ease: "expo.out",
            clearProps: "opacity,filter",
          },
          "-=0.48"
        );
      }
    });
  }

  function animateFaq() {
    const section = $(".course-faq");
    const cards = $$(".course-faq-item");

    if (!section || !cards.length) return;

    revealTitle(".course-faq", ".course-faq .section-title");

    gsap.from(cards, {
      scrollTrigger: {
        trigger: section,
        start: "top 84%",
        once: true,
      },
      yPercent: 12,
      opacity: 0,
      filter: "blur(6px)",
      duration: 0.62,
      stagger: 0.07,
      ease: "expo.out",
      clearProps: "opacity,filter",
    });
  }

  function animateCta() {
    const card = $(".course-cta-card");
    const eyebrow = $(".course-cta-card .section-eyebrow");
    const title = $(".course-cta-card .section-title");
    const description = $(".course-cta-card .section-description");
    const price = $(".course-cta-card__price");
    const actions = $$(".course-cta-card__actions a");

    if (!card) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        once: true,
      },
    });

    tl.from(card, {
      yPercent: 8,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.9,
      ease: "expo.out",
      clearProps: "opacity,filter",
    });

    if (eyebrow) {
      tl.from(
        eyebrow,
        {
          yPercent: 10,
          opacity: 0,
          duration: 0.35,
          ease: "power3.out",
          clearProps: "opacity",
        },
        "-=0.54"
      );
    }

    if (title) {
      tl.from(
        title,
        {
          yPercent: 14,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.65,
          ease: "expo.out",
          clearProps: "opacity,filter",
        },
        "-=0.26"
      );
    }

    if (description) {
      tl.from(
        description,
        {
          yPercent: 10,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.65,
          ease: "expo.out",
          clearProps: "opacity,filter",
        },
        "-=0.36"
      );
    }

    if (price) {
      tl.from(
        price,
        {
          yPercent: 10,
          opacity: 0,
          duration: 0.42,
          ease: "power3.out",
          clearProps: "opacity",
        },
        "-=0.25"
      );
    }

    if (actions.length) {
      tl.from(
        actions,
        {
          yPercent: 10,
          opacity: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "opacity",
        },
        "-=0.18"
      );
    }
  }

  function animateFooter() {
    const footer = document.getElementById("footer-container");
    const logo = $(".footer-logo");
    const text = $(".footer-text");
    const socials = $$(".footer-social-link");
    const copy = $(".footer-copy");

    if (!footer) return;

    if (logo) {
      gsap.from(logo, {
        scrollTrigger: {
          trigger: footer,
          start: "top 92%",
          once: true,
        },
        yPercent: 20,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.75,
        ease: "expo.out",
        clearProps: "opacity,filter",
      });
    }

    if (text) {
      gsap.from(text, {
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          once: true,
        },
        yPercent: 16,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.7,
        delay: 0.05,
        ease: "expo.out",
        clearProps: "opacity,filter",
      });
    }

    if (socials.length) {
      gsap.from(socials, {
        scrollTrigger: {
          trigger: footer,
          start: "top 88%",
          once: true,
        },
        yPercent: 12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "opacity",
      });
    }

    if (copy) {
      gsap.from(copy, {
        scrollTrigger: {
          trigger: footer,
          start: "top 86%",
          once: true,
        },
        yPercent: 10,
        opacity: 0,
        duration: 0.45,
        delay: 0.06,
        ease: "power3.out",
        clearProps: "opacity",
      });
    }
  }

  waitForSelectors(
    [
      ".course-hero-card",
      ".course-highlights-card",
      ".course-fit .course-list-card",
      ".course-achievements .course-list-card",
      ".course-content .course-list-card",
      ".course-difference .course-info-grid",
      ".course-audience .course-audience-grid",
      ".course-instructor .course-instructor-card",
      ".course-proof .course-proof-grid",
      ".course-faq .course-faq-list",
      ".course-cta-card",
    ],
    () => {
      animateHero();
      animateHighlights();
      animateListSection(".course-fit");
      animateListSection(".course-achievements");
      animateListSection(".course-content");
      animateDifference();
      animateAudience();
      animateInstructor();
      animateProof();
      animateFaq();
      animateCta();
      animateFooter();
      ScrollTrigger.refresh();
    }
  );
});