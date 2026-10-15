// =========================
// Service page animations (same feel as the home page: soft fade-up + blur, expo.out)
// =========================

window.addEventListener("load", () => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  const CLEAR = "transform,opacity,filter";
  const hidden = { y: 26, opacity: 0, filter: "blur(6px)" };
  const shown = { y: 0, opacity: 1, filter: "blur(0px)", ease: "expo.out", clearProps: CLEAR };

  // ---------- Hero ----------
  function animateHero() {
    const card = $(".svc-hero__card");
    if (!card) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.08 });

    tl.from(card, { y: 30, opacity: 0, filter: "blur(8px)", duration: 1, clearProps: CLEAR })
      .from(".svc-badge", { y: 14, opacity: 0, filter: "blur(6px)", duration: 0.6, clearProps: CLEAR }, "-=0.7")
      .from(".svc-hero__title", { y: 22, opacity: 0, filter: "blur(8px)", duration: 0.85, clearProps: CLEAR }, "-=0.45")
      .from(".svc-hero__text", { y: 16, opacity: 0, filter: "blur(6px)", duration: 0.75, clearProps: CLEAR }, "-=0.55")
      .from(".svc-hero__content .svc-btn", { y: 14, opacity: 0, duration: 0.55, stagger: 0.08, ease: "power3.out", clearProps: CLEAR }, "-=0.5")
      .from(".svc-hero__visual .svc-stat", { y: 18, opacity: 0, filter: "blur(6px)", duration: 0.65, stagger: 0.07, clearProps: CLEAR }, "-=0.75")
      .from(".svc-hero__mockup", { y: 24, opacity: 0, scale: 0.97, filter: "blur(8px)", duration: 0.9, clearProps: CLEAR }, "-=0.5");
  }

  // ---------- Section heads (eyebrow → title → description) ----------
  function animateHeads() {
    $$(".svc-section .svc-head, .svc-cta").forEach((head) => {
      const parts = $$(":scope > .svc-eyebrow, :scope > .svc-title, :scope > .svc-description, :scope > .svc-hero__actions", head);
      if (!parts.length) return;

      gsap.from(parts, {
        scrollTrigger: { trigger: head, start: "top 86%", once: true },
        y: 18,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.8,
        stagger: 0.08,
        ease: "expo.out",
        clearProps: CLEAR,
      });
    });
  }

  // ---------- Cards that come in groups ----------
  function batchReveal(selector, stagger = 0.07) {
    const items = $$(selector);
    if (!items.length) return;

    gsap.set(items, hidden);

    ScrollTrigger.batch(items, {
      start: "top 90%",
      once: true,
      onEnter: (batch) => gsap.to(batch, { ...shown, duration: 0.75, stagger }),
    });
  }

  // ---------- Single blocks ----------
  function reveal(selector, extra = {}) {
    $$(selector).forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        y: 26,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.9,
        ease: "expo.out",
        clearProps: CLEAR,
        ...extra,
      });
    });
  }

  animateHero();
  animateHeads();

  batchReveal(".svc-feature");
  batchReveal(".svc-step", 0.09);
  batchReveal(".svc-package", 0.1);
  batchReveal(".svc-faq__item", 0.06);

  reveal(".svc-work");
  reveal(".svc-included", { y: 18 });
  reveal(".svc-note", { y: 12, filter: "blur(4px)", duration: 0.7 });
  reveal(".svc-cta", { y: 30, scale: 0.98 });

  ScrollTrigger.refresh();
});
