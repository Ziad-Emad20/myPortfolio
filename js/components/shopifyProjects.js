// =========================
// Shopify projects (device mockups + slider)
// To add a store: add an object to `shopifyProjects` and put its screenshots in /assets/projects/
//   desktop: full-page desktop screenshot (tall image, ~1200px wide, .webp)
//   mobile:  full-page mobile screenshot  (tall image, ~430px wide, .webp)
//   typeKey / quoteKey: keys inside translations.<lang>.shopifyPage (js/i18n/pages/shopify.js)
//   beforeAfter (optional): adds a "Before & After" tab to the same card
//     desktop: the redesigned page on desktop (static, ~1200px wide)
//     before / after: mobile screens of the same page, same size (~430x786)
//     changesKey: key of the "what changed" list (c1..cN) in translations
// =========================

const shopifyProjects = [
  {
    name: "One&All",
    logo: "/assets/oneandall.jpg",
    typeKey: "work.oneandall",
    desktop: "/assets/projects/oneandall-desktop.webp",
    mobile: "/assets/projects/oneandall-mobile.webp",
    mobileBar: "/assets/projects/oneandall-mobile-bar.webp", // sticky bottom toolbar, stays fixed while the page scrolls
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
  {
    name: "Scrubio",
    logo: "/assets/scrubio.jpg",
    typeKey: "work.scrubio",
    desktop: "/assets/projects/scrubio-desktop.webp",
    mobile: "/assets/projects/scrubio-mobile.webp",
    floatIcon: "/assets/projects/scrubio-chat.svg", // floating chat button, stays fixed while the page scrolls
    rating: 5,
    quoteKey: "testimonials.scrubio",
    beforeAfter: {
      desktop: "/assets/projects/scrubio-product-desktop.webp",
      before: "/assets/projects/scrubio-product-before.webp",
      after: "/assets/projects/scrubio-product-after.webp",
      changesKey: "work.scrubioChanges",
      changesCount: 5,
    },
  },
];

// Small helper for text that is built on the fly (modal, aria labels)
function shopifyText(path, fallback) {
  const lang = typeof getCurrentLanguage === "function" ? getCurrentLanguage() : localStorage.getItem("lang") || "en";
  const dict = typeof translations !== "undefined" ? translations[lang] : null;
  const value = path.split(".").reduce((acc, key) => acc?.[key], dict?.shopifyPage);
  return value || fallback;
}

function renderShopifyStars(rating) {
  return "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);
}

function getShopifyMockupTemplate(p) {
  return `
    <div class="svc-mockup" aria-hidden="true">
      <div class="svc-laptop">
        <div class="svc-laptop__screen">
          <div class="svc-screen" style="background-image:url('${p.desktop}')">
            ${p.floatIcon ? `<img class="svc-screen__float" src="${p.floatIcon}" alt="" loading="lazy">` : ""}
          </div>
        </div>
        <div class="svc-laptop__base"></div>
      </div>
      <div class="svc-phone">
        <div class="svc-screen svc-screen--mobile" style="background-image:url('${p.mobile}')">
          ${p.mobileBar ? `<img class="svc-screen__bar" src="${p.mobileBar}" alt="" loading="lazy">` : ""}
          ${p.floatIcon ? `<img class="svc-screen__float" src="${p.floatIcon}" alt="" loading="lazy">` : ""}
        </div>
      </div>
    </div>`;
}

function getCompareTemplate(ba, extraClass = "") {
  return `
    <div class="svc-compare swiper-no-swiping ${extraClass}" dir="ltr" style="--pos:50%">
      <img class="svc-compare__img" src="${ba.after}" alt="" loading="lazy" draggable="false">
      <div class="svc-compare__before">
        <img class="svc-compare__img" src="${ba.before}" alt="" loading="lazy" draggable="false">
      </div>
      <span class="svc-compare__tag svc-compare__tag--before" data-i18n="shopifyPage.work.before">Before</span>
      <span class="svc-compare__tag svc-compare__tag--after" data-i18n="shopifyPage.work.after">After</span>
      <div class="svc-compare__line" aria-hidden="true">
        <span class="svc-compare__knob"><i class="fa-solid fa-left-right"></i></span>
      </div>
      <input class="svc-compare__range" type="range" min="0" max="100" value="50" step="0.5" aria-label="Before / After">
    </div>`;
}

function getBeforeAfterMockupTemplate(p) {
  const ba = p.beforeAfter;
  return `
    <div class="svc-mockup svc-mockup--ba">
      <div class="svc-laptop" aria-hidden="true">
        <div class="svc-laptop__screen">
          <div class="svc-screen svc-screen--static" style="background-image:url('${ba.desktop}')"></div>
        </div>
        <div class="svc-laptop__base"></div>
      </div>
      <div class="svc-phone svc-phone--compare">
        ${getCompareTemplate(ba)}
        <button class="svc-compare__expand swiper-no-swiping" type="button" data-project="${p.name}">
          <i class="fa-solid fa-expand"></i>
          <span data-i18n="shopifyPage.work.expand">Compare</span>
        </button>
      </div>
    </div>`;
}

function getShopifyProjectTemplate(p) {
  const ba = p.beforeAfter;

  const changes = ba
    ? Array.from({ length: ba.changesCount || 0 }, (_, i) =>
        `<li><i class="fa-solid fa-check"></i><span data-i18n="shopifyPage.${ba.changesKey}.c${i + 1}"></span></li>`
      ).join("")
    : "";

  return `
    <article class="swiper-slide svc-card svc-project${ba ? " has-ba" : ""}">
      <div class="svc-views">
        <div class="svc-view is-active" data-view="store">
          ${getShopifyMockupTemplate(p)}
        </div>
        ${ba ? `<div class="svc-view" data-view="ba">${getBeforeAfterMockupTemplate(p)}</div>` : ""}
      </div>

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
              <p data-i18n="shopifyPage.${p.quoteKey}"></p>
            </div>`
          : ""
      }

      ${
        ba
          ? `<div class="svc-project__changes">
              <span class="svc-project__changes-title" data-i18n="shopifyPage.${ba.changesKey}.title"></span>
              <ul>${changes}</ul>
            </div>`
          : ""
      }

      ${
        ba
          ? `<div class="svc-tabs swiper-no-swiping" role="tablist">
              <button class="svc-tab is-active" type="button" role="tab" aria-selected="true" data-view="store">
                <i class="fa-solid fa-store"></i><span data-i18n="shopifyPage.work.tabStore">Full store</span>
              </button>
              <button class="svc-tab" type="button" role="tab" aria-selected="false" data-view="ba">
                <i class="fa-solid fa-wand-magic-sparkles"></i><span data-i18n="shopifyPage.work.tabBA">Before &amp; After</span>
              </button>
            </div>`
          : ""
      }
    </article>`;
}

// =========================
// Before / After compare
// =========================

function setComparePos(compare, value) {
  const v = Math.max(0, Math.min(100, value));
  compare.style.setProperty("--pos", v + "%");
  const range = compare.querySelector(".svc-compare__range");
  if (range && document.activeElement !== range) range.value = v;
}

function bindCompare(compare) {
  const range = compare.querySelector(".svc-compare__range");
  if (!range) return;

  const stopAuto = () => compare.classList.add("is-touched");

  range.addEventListener("input", () => {
    stopAuto();
    compare.style.setProperty("--pos", range.value + "%");
  });
  range.addEventListener("pointerdown", stopAuto);
  range.addEventListener("keydown", stopAuto);
}

// Gentle automatic sweep so visitors see the difference without touching anything
const svcAutoCompares = new Set();
let svcCompareRaf = null;

function runCompareSweep(time) {
  svcAutoCompares.forEach((compare) => {
    if (compare.classList.contains("is-touched")) return;
    const start = Number(compare.dataset.sweepStart || time);
    if (!compare.dataset.sweepStart) compare.dataset.sweepStart = time;
    const t = (time - start) / 1000;
    // starts in the middle, sweeps between ~15% and ~85%
    setComparePos(compare, 50 + 35 * Math.sin(t * 0.9));
  });

  svcCompareRaf = svcAutoCompares.size ? requestAnimationFrame(runCompareSweep) : null;
}

function setCompareAuto(compare, on) {
  if (on) {
    delete compare.dataset.sweepStart;
    svcAutoCompares.add(compare);
  } else {
    svcAutoCompares.delete(compare);
  }
  if (svcAutoCompares.size && !svcCompareRaf) svcCompareRaf = requestAnimationFrame(runCompareSweep);
}

function bindProjectCard(card) {
  const tabs = card.querySelectorAll(".svc-tab");
  const views = card.querySelectorAll(".svc-view");
  const compare = card.querySelector(".svc-view[data-view='ba'] .svc-compare");

  if (compare) bindCompare(compare);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const view = tab.dataset.view;

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });

      views.forEach((v) => v.classList.toggle("is-active", v.dataset.view === view));
      card.classList.toggle("is-ba", view === "ba");

      if (compare) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setCompareAuto(compare, view === "ba" && !reduce && !compare.classList.contains("is-touched"));
      }
    });
  });

  const expand = card.querySelector(".svc-compare__expand");
  if (expand) {
    const project = shopifyProjects.find((p) => p.name === expand.dataset.project);
    expand.addEventListener("click", () => openCompareModal(project));
  }
}

// =========================
// Compare modal (big view)
// =========================

function openCompareModal(project) {
  if (!project || !project.beforeAfter) return;

  const modal = document.createElement("div");
  modal.className = "svc-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `
    <div class="svc-modal__backdrop"></div>
    <div class="svc-modal__panel">
      <div class="svc-modal__head">
        <img src="${project.logo}" alt="">
        <div>
          <strong>${project.name}</strong>
          <span>${shopifyText(project.beforeAfter.changesKey + ".title", "Product page redesign")}</span>
        </div>
        <button class="svc-modal__close" type="button" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="svc-modal__phone">
        ${getCompareTemplate(project.beforeAfter, "svc-compare--big")}
      </div>
      <p class="svc-modal__hint"><i class="fa-solid fa-hand-pointer"></i> ${shopifyText("work.dragHint", "Drag to compare")}</p>
    </div>`;

  modal.querySelectorAll(".svc-compare__tag--before").forEach((el) => (el.textContent = shopifyText("work.before", "Before")));
  modal.querySelectorAll(".svc-compare__tag--after").forEach((el) => (el.textContent = shopifyText("work.after", "After")));

  document.body.appendChild(modal);
  document.body.classList.add("svc-modal-open");

  const compare = modal.querySelector(".svc-compare");
  bindCompare(compare);

  const close = () => {
    setCompareAuto(compare, false);
    modal.classList.remove("is-open");
    document.body.classList.remove("svc-modal-open");
    document.removeEventListener("keydown", onKey);
    setTimeout(() => modal.remove(), 250);
  };
  const onKey = (e) => {
    if (e.key === "Escape") close();
  };

  modal.querySelector(".svc-modal__close").addEventListener("click", close);
  modal.querySelector(".svc-modal__backdrop").addEventListener("click", close);
  document.addEventListener("keydown", onKey);

  requestAnimationFrame(() => {
    modal.classList.add("is-open");
    modal.querySelector(".svc-modal__close").focus({ preventScroll: true });
  });
}

// A mockup plays only when it is on screen AND its reveal animation has finished
// (the CSS adds a 1s delay before the scroll starts).
function updateMockupPlayback(m) {
  m.classList.toggle("is-playing", m.dataset.inView === "true" && m.dataset.revealed === "true");
}

// Called by service-animations.js when a block has finished animating in
window.svcRevealMockups = function (scope) {
  if (!scope) return;
  const mockups = scope.matches && scope.matches(".svc-mockup") ? [scope] : scope.querySelectorAll(".svc-mockup");
  mockups.forEach((m) => {
    m.dataset.revealed = "true";
    updateMockupPlayback(m);
  });
};

function observeShopifyMockups(root) {
  const mockups = root.querySelectorAll(".svc-mockup");

  // If the page isn't running entrance animations, mockups count as revealed right away
  const waitForReveal = document.documentElement.classList.contains("svc-anim-pending");
  mockups.forEach((m) => {
    m.dataset.revealed = waitForReveal ? "false" : "true";
  });

  if (!("IntersectionObserver" in window)) {
    mockups.forEach((m) => {
      m.dataset.inView = "true";
      updateMockupPlayback(m);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.dataset.inView = String(entry.isIntersecting);
        updateMockupPlayback(entry.target);
      });
    },
    { threshold: 0.5 }
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
    slidesPerView: 1.1,
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
      641: { slidesPerView: 1.45, spaceBetween: 20 },
      900: { slidesPerView: 2.1, spaceBetween: 22 },
      1100: { slidesPerView: 2.35, spaceBetween: 22 },
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
  container.querySelectorAll(".svc-project").forEach(bindProjectCard);
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
