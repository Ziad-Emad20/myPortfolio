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
    name: "Ottomani",
    logo: "/assets/ottomani.jpg",
    typeKey: "work.ottomani",
    desktop: "/assets/projects/ottomani-desktop.webp",
    mobile: "/assets/projects/ottomani-mobile.webp",
    mobileBar: "/assets/projects/ottomani-mobile-bar.webp",
    rating: 5,
    quoteKey: "testimonials.ottomani",
    beforeAfter: {
      // full redesign: both screens compare before vs after
      desktopBefore: "/assets/projects/ottomani-home-desktop-before.webp",
      desktopAfter: "/assets/projects/ottomani-home-desktop-after.webp",
      before: "/assets/projects/ottomani-home-mobile-before.webp",
      after: "/assets/projects/ottomani-home-mobile-after.webp",
      mobileRatio: "430 / 758",
      changesKey: "work.ottomaniChanges",
      changesCount: 5,
    },
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
    name: "CHANCE",
    logo: "/assets/chance.jpg",
    typeKey: "work.chance",
    desktop: "/assets/projects/chance-desktop.webp",
    mobile: "/assets/projects/chance-mobile.webp",
    floatIcon: "/assets/projects/chance-chat.svg",
    rating: 5,
    quoteKey: "testimonials.chance",
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
      mobileRatio: "430 / 786",
      changesKey: "work.scrubioChanges",
      changesCount: 5,
    },
  },
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

function getCompareTemplate(before, after, ratio, extraClass = "") {
  return `
    <div class="svc-compare swiper-no-swiping ${extraClass}" dir="ltr" style="--pos:50%;--ratio:${ratio}">
      <img class="svc-compare__img" src="${after}" alt="" loading="lazy" draggable="false">
      <div class="svc-compare__before">
        <img class="svc-compare__img" src="${before}" alt="" loading="lazy" draggable="false">
      </div>
      <span class="svc-compare__tag svc-compare__tag--before" data-i18n="shopifyPage.work.before">${shopifyText("work.before", "Before")}</span>
      <span class="svc-compare__tag svc-compare__tag--after" data-i18n="shopifyPage.work.after">${shopifyText("work.after", "After")}</span>
      <div class="svc-compare__line" aria-hidden="true">
        <span class="svc-compare__knob"><i class="fa-solid fa-left-right"></i></span>
      </div>
      <input class="svc-compare__range" type="range" min="0" max="100" value="50" step="0.5" aria-label="Before / After">
    </div>`;
}

const mobileCompare = (ba, cls = "") => getCompareTemplate(ba.before, ba.after, ba.mobileRatio || "430 / 786", cls);
const desktopCompare = (ba, cls = "") => getCompareTemplate(ba.desktopBefore, ba.desktopAfter, ba.desktopRatio || "1200 / 702", cls);

function getBeforeAfterMockupTemplate(p) {
  const ba = p.beforeAfter;
  return `
    <div class="svc-mockup svc-mockup--ba">
      <div class="svc-laptop">
        <div class="svc-laptop__screen">
          ${
            ba.desktopBefore
              ? desktopCompare(ba, "svc-compare--laptop")
              : `<div class="svc-screen svc-screen--static" style="background-image:url('${ba.desktop}')"></div>`
          }
        </div>
        <div class="svc-laptop__base"></div>
      </div>
      <div class="svc-phone svc-phone--compare">
        ${mobileCompare(ba)}
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

      <div class="svc-project__extra">
        ${
          p.quoteKey
            ? `<div class="svc-project__quote">
                <p data-i18n="shopifyPage.${p.quoteKey}"></p>
              </div>`
            : ""
        }

        ${
          ba
            ? `<div class="svc-project__changes" aria-hidden="true">
                <span class="svc-project__changes-title" data-i18n="shopifyPage.${ba.changesKey}.title"></span>
                <ul>${changes}</ul>
              </div>`
            : ""
        }
      </div>

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
  let dragging = false;

  const stopAuto = () => compare.classList.add("is-touched");

  const setFromX = (clientX) => {
    const rect = compare.getBoundingClientRect();
    if (!rect.width) return;
    setComparePos(compare, ((clientX - rect.left) / rect.width) * 100);
  };

  // Pointer events cover mouse, touch and pen. touch-action: pan-y in CSS keeps
  // vertical page scrolling working while horizontal drags move the line.
  compare.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true;
    stopAuto();
    compare.classList.add("is-dragging");
    try {
      compare.setPointerCapture(e.pointerId);
    } catch (err) {}
    setFromX(e.clientX);
  });

  compare.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    e.preventDefault();
    setFromX(e.clientX);
  });

  const endDrag = () => {
    dragging = false;
    compare.classList.remove("is-dragging");
  };
  ["pointerup", "pointercancel", "lostpointercapture"].forEach((type) => compare.addEventListener(type, endDrag));

  // Keyboard support through the (visually hidden) range input
  if (range) {
    range.addEventListener("input", () => {
      stopAuto();
      compare.style.setProperty("--pos", range.value + "%");
    });
    range.addEventListener("keydown", stopAuto);
  }
}

// Gentle automatic sweep so visitors see the difference without touching anything
const svcAutoCompares = new Set();
let svcCompareRaf = null;

function runCompareSweep(time) {
  svcAutoCompares.forEach((compare) => {
    if (compare.classList.contains("is-touched")) return;
    const start = Number(compare.dataset.sweepStart || time);
    if (!compare.dataset.sweepStart) compare.dataset.sweepStart = time;
    const t = (time - start) / 1000 + Number(compare.dataset.phase || 0);
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
  const compares = card.querySelectorAll(".svc-view[data-view='ba'] .svc-compare");
  compares.forEach(bindCompare);

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
      const quote = card.querySelector(".svc-project__quote");
      const changesEl = card.querySelector(".svc-project__changes");
      if (quote) quote.setAttribute("aria-hidden", String(view === "ba"));
      if (changesEl) changesEl.setAttribute("aria-hidden", String(view !== "ba"));

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      compares.forEach((c, i) => {
        // the two screens sweep slightly out of step so it doesn't look mechanical
        if (view === "ba") c.dataset.phase = String(i * 1.2);
        setCompareAuto(c, view === "ba" && !reduce && !c.classList.contains("is-touched"));
      });
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
  const ba = project.beforeAfter;
  const hasDesktop = Boolean(ba.desktopBefore);
  const startDesktop = hasDesktop && window.matchMedia("(min-width: 768px)").matches;

  const modal = document.createElement("div");
  modal.className = "svc-modal" + (startDesktop ? " is-desktop" : "");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `
    <div class="svc-modal__backdrop"></div>
    <div class="svc-modal__panel">
      <div class="svc-modal__head">
        <img src="${project.logo}" alt="">
        <div>
          <strong>${project.name}</strong>
          <span>${shopifyText(ba.changesKey + ".title", "Redesign")}</span>
        </div>
        <button class="svc-modal__close" type="button" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      ${
        hasDesktop
          ? `<div class="svc-modal__devices" role="tablist">
              <button type="button" data-device="desktop" class="${startDesktop ? "is-active" : ""}"><i class="fa-solid fa-desktop"></i>${shopifyText("work.desktop", "Desktop")}</button>
              <button type="button" data-device="mobile" class="${startDesktop ? "" : "is-active"}"><i class="fa-solid fa-mobile-screen"></i>${shopifyText("work.mobile", "Mobile")}</button>
            </div>`
          : ""
      }
      <div class="svc-modal__stage">
        ${hasDesktop ? `<div class="svc-modal__laptop">${desktopCompare(ba, "svc-compare--big")}</div>` : ""}
        <div class="svc-modal__phone">${mobileCompare(ba, "svc-compare--big")}</div>
      </div>
      <p class="svc-modal__hint"><i class="fa-solid fa-hand-pointer"></i> ${shopifyText("work.dragHint", "Drag to compare")}</p>
    </div>`;

  document.body.appendChild(modal);
  document.body.classList.add("svc-modal-open");

  const compares = modal.querySelectorAll(".svc-compare");
  compares.forEach(bindCompare);

  modal.querySelectorAll(".svc-modal__devices button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const desktop = btn.dataset.device === "desktop";
      modal.classList.toggle("is-desktop", desktop);
      modal.querySelectorAll(".svc-modal__devices button").forEach((b) => b.classList.toggle("is-active", b === btn));
    });
  });

  const close = () => {
    compares.forEach((c) => setCompareAuto(c, false));
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
// Hero mockup: plays whenever it's on screen.
// Project cards (data-needs-focus): only the card the visitor is on plays —
// hover on desktop, the active slide on touch screens. Leaving pauses it in place.
function updateMockupPlayback(m) {
  const ready = m.dataset.revealed === "true" && m.dataset.inView === "true";

  if (m.dataset.needsFocus !== "true") {
    m.classList.toggle("is-active", ready);
    m.classList.toggle("is-playing", ready);
    return;
  }

  if (ready) m.classList.add("is-active");
  m.classList.toggle("is-playing", ready && m.dataset.focus === "true");
}

const svcCanHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function setCardFocus(card, on) {
  card.querySelectorAll(".svc-mockup").forEach((m) => {
    m.dataset.focus = String(on);
    updateMockupPlayback(m);
  });
}

// Touch screens: the active slide is the one being viewed
function focusActiveSlide(swiper) {
  if (svcCanHover || !swiper) return;
  swiper.slides.forEach((slide, i) => setCardFocus(slide, i === swiper.activeIndex));
}

// Called by service-animations.js when a block has finished animating in
window.svcRevealMockups = function (scope) {
  if (!scope) return;
  const rotator = scope.matches && scope.matches(".svc-rotator") ? scope : scope.querySelector && scope.querySelector(".svc-rotator");
  if (rotator && rotator._rotator) rotator._rotator.reveal();
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
    on: {
      init: (sw) => focusActiveSlide(sw),
      slideChange: (sw) => focusActiveSlide(sw),
    },
    breakpoints: {
      641: { slidesPerView: 1.45, spaceBetween: 20 },
      900: { slidesPerView: 2.1, spaceBetween: 22 },
      1100: { slidesPerView: 2.35, spaceBetween: 22 },
    },
  });
}

// =========================
// Hero rotator: shows every store in turn.
// First store waits 1s, then scrolls; every few seconds it crossfades to the
// next store, which starts scrolling right away. Pauses when off screen.
// =========================

const HERO_DWELL = 3000; // ms each store stays on screen (after the first wait)
const HERO_FIRST_WAIT = 1000;
const HERO_FADE = 800;

function heroLayer(p, kind) {
  const src = kind === "desktop" ? p.desktop : p.mobile;
  const bar = kind === "mobile" && p.mobileBar ? `<img class="svc-screen__bar" src="${p.mobileBar}" alt="">` : "";
  const float = p.floatIcon ? `<img class="svc-screen__float" src="${p.floatIcon}" alt="">` : "";
  return `<div class="svc-layer" data-src="${src}">${bar}${float}</div>`;
}

function initHeroRotator(hero, featured) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const list = [featured, ...shopifyProjects.filter((p) => p !== featured)];

  hero.innerHTML = `
    <div class="svc-mockup svc-rotator" aria-hidden="true">
      <div class="svc-laptop">
        <div class="svc-laptop__screen">
          <div class="svc-screen svc-screen--stack">${list.map((p) => heroLayer(p, "desktop")).join("")}</div>
        </div>
        <div class="svc-laptop__base"></div>
      </div>
      <div class="svc-phone">
        <div class="svc-screen svc-screen--mobile svc-screen--stack">${list.map((p) => heroLayer(p, "mobile")).join("")}</div>
      </div>
      <div class="svc-rotator__label">
        <span class="svc-rotator__logos">${list
          .map((p, i) => `<img src="${p.logo}" alt="" class="${i === 0 ? "is-current" : ""}">`)
          .join("")}</span>
        <span class="svc-rotator__names">${list
          .map((p, i) => `<span class="${i === 0 ? "is-current" : ""}">${p.name}</span>`)
          .join("")}</span>
        <span class="svc-rotator__progress"><i></i></span>
      </div>
    </div>`;

  const root = hero.querySelector(".svc-rotator");
  const desk = root.querySelectorAll(".svc-laptop .svc-layer");
  const mob = root.querySelectorAll(".svc-phone .svc-layer");
  const logos = root.querySelectorAll(".svc-rotator__logos img");
  const names = root.querySelectorAll(".svc-rotator__names span");
  const bar = root.querySelector(".svc-rotator__progress i");

  const load = (i) => {
    [desk[i], mob[i]].forEach((l) => {
      if (l && !l.style.backgroundImage) l.style.backgroundImage = `url('${l.dataset.src}')`;
    });
  };

  let index = 0;
  let timer = null;
  let revealed = false;
  let inView = true;
  let first = true;

  // Scroll is driven from JS (requestAnimationFrame) so it behaves the same in
  // every browser, including iOS Safari.
  const HERO_SCROLL_MS = 14000;
  let scrollStart = 0; // timestamp when the current layer starts moving
  let pausedAt = 0;
  let raf = null;

  const tick = (now) => {
    const t = Math.max(0, now - scrollStart);
    const pos = Math.min(100, (t / HERO_SCROLL_MS) * 100);
    [desk[index], mob[index]].forEach((l) => {
      if (l) l.style.backgroundPosition = `50% ${pos}%`;
    });
    raf = requestAnimationFrame(tick);
  };

  const startScroll = () => {
    if (reduce || raf) return;
    raf = requestAnimationFrame(tick);
  };

  const stopScroll = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  };

  const setCurrent = (i, delay) => {
    [desk, mob].forEach((layers) => {
      layers.forEach((l, j) => {
        if (j === i) {
          l.style.backgroundPosition = "50% 0%";
          l.classList.remove("is-leaving");
          l.classList.add("is-current");
        } else if (l.classList.contains("is-current")) {
          // leaving layer keeps its last position while it fades out
          l.classList.remove("is-current");
          l.classList.add("is-leaving");
          setTimeout(() => {
            if (!l.classList.contains("is-current")) l.classList.remove("is-leaving");
          }, HERO_FADE + 50);
        }
      });
    });
    scrollStart = performance.now() + delay;
    logos.forEach((el, j) => el.classList.toggle("is-current", j === i));
    names.forEach((el, j) => el.classList.toggle("is-current", j === i));
    load((i + 1) % list.length); // preload next
  };

  const runProgress = (ms) => {
    bar.style.transition = "none";
    bar.style.transform = "scaleX(0)";
    void bar.offsetWidth;
    bar.style.transition = `transform ${ms}ms linear`;
    bar.style.transform = "scaleX(1)";
  };

  const schedule = () => {
    clearTimeout(timer);
    if (!revealed || !inView || document.hidden || reduce || list.length < 2) return;
    const wait = first ? HERO_FIRST_WAIT + HERO_DWELL : HERO_DWELL;
    runProgress(wait);
    timer = setTimeout(() => {
      first = false;
      index = (index + 1) % list.length;
      setCurrent(index, 0);
      schedule();
    }, wait);
  };

  const pause = () => {
    clearTimeout(timer);
    stopScroll();
    pausedAt = pausedAt || performance.now();
    root.classList.add("is-paused");
    bar.style.transition = "none";
  };

  const resume = () => {
    if (!revealed) return;
    if (pausedAt) {
      scrollStart += performance.now() - pausedAt; // continue where it stopped
      pausedAt = 0;
    }
    root.classList.remove("is-paused");
    startScroll();
    schedule();
  };

  load(0);
  load(1);

  root._rotator = {
    reveal() {
      if (revealed) return;
      revealed = true;
      root.classList.add("is-live");
      setCurrent(0, reduce ? 0 : HERO_FIRST_WAIT);
      if (reduce) root.classList.add("is-paused");
      if (inView && !document.hidden) startScroll();
      schedule();
    },
  };

  // Static fallback until revealed: show the first store at the top
  desk[0].classList.add("is-current");
  mob[0].classList.add("is-current");

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        inView ? resume() : pause();
      },
      { threshold: 0.3 }
    ).observe(root);
  }

  document.addEventListener("visibilitychange", () => (document.hidden ? pause() : resume()));

  // Without the entrance animation guard, start right away
  if (!document.documentElement.classList.contains("svc-anim-pending")) root._rotator.reveal();
}

function renderShopifyProjects() {
  // Hero mockup
  const hero = document.getElementById("shopify-hero-mockup");
  const featured = shopifyProjects.find((p) => p.featured) || shopifyProjects[0];

  if (hero && featured) {
    initHeroRotator(hero, featured);
  }

  // Projects slider
  const container = document.getElementById("shopify-projects");
  if (!container) return;

  container.innerHTML = shopifyProjects.map(getShopifyProjectTemplate).join("");
  container.querySelectorAll(".svc-mockup").forEach((m) => (m.dataset.needsFocus = "true"));
  container.querySelectorAll(".svc-project").forEach((card) => {
    bindProjectCard(card);
    if (svcCanHover) {
      card.addEventListener("mouseenter", () => setCardFocus(card, true));
      card.addEventListener("mouseleave", () => setCardFocus(card, false));
    }
  });
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
