// =========================
// Service page animations (same feel as the home page: soft fade-up + blur, expo.out)
//
// Flow:
// 1. An inline script in <head> adds `svc-anim-pending` to <html>, and CSS keeps the animated
//    elements invisible, so the content is never shown first and then re-animated.
// 2. Every tween here is a fromTo with explicit end values; once they are set up the pending
//    class is removed.
// 3. Store mockups only start scrolling 1s after their own reveal animation has finished.
// =========================

(function () {
  const root = document.documentElement;

  function finish() {
    root.classList.remove("svc-anim-pending");
  }

  function revealMockups(scope) {
    if (typeof window.svcRevealMockups === "function") {
      window.svcRevealMockups(scope || document);
    }
  }

  function init() {
    const canAnimate =
      typeof gsap !== "undefined" &&
      typeof ScrollTrigger !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canAnimate) {
      finish();
      revealMockups(document);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

    const CLEAR = "transform,opacity,filter";
    const from = (y = 26, blur = 6) => ({ y, opacity: 0, filter: `blur(${blur}px)` });
    const to = (extra = {}) => ({
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      ease: "expo.out",
      clearProps: CLEAR,
      ...extra,
    });

    // ---------- Hero (on load) ----------
    const heroCard = $(".svc-hero__card");
    if (heroCard) {
      const heroMockup = $("#shopify-hero-mockup");
      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => revealMockups(heroMockup),
      });

      tl.fromTo(heroCard, from(30, 8), to({ duration: 1 }))
        .fromTo(".svc-badge", from(14), to({ duration: 0.6 }), "-=0.7")
        .fromTo(".svc-hero__title", from(22, 8), to({ duration: 0.85 }), "-=0.45")
        .fromTo(".svc-hero__text", from(16), to({ duration: 0.75 }), "-=0.55")
        .fromTo(".svc-hero__content .svc-btn", from(14, 0), to({ duration: 0.55, stagger: 0.08, ease: "power3.out" }), "-=0.5")
        .fromTo(".svc-hero__visual .svc-stat", from(18), to({ duration: 0.65, stagger: 0.07 }), "-=0.75")
        .fromTo(heroMockup, { ...from(24, 8), scale: 0.97 }, to({ duration: 0.9 }), "-=0.5");
    }

    // ---------- Section heads (eyebrow → title → description) ----------
    $$(".svc-section .svc-head, .svc-cta").forEach((head) => {
      const parts = $$(
        ":scope > .svc-eyebrow, :scope > .svc-title, :scope > .svc-description, :scope > .svc-hero__actions",
        head
      );
      if (!parts.length) return;

      gsap.fromTo(
        parts,
        from(18),
        to({
          duration: 0.8,
          stagger: 0.08,
          scrollTrigger: { trigger: head, start: "top 86%", once: true },
        })
      );
    });

    // ---------- Cards that come in groups ----------
    function batchReveal(selector, stagger = 0.07) {
      const items = $$(selector);
      if (!items.length) return;

      gsap.set(items, from());

      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, to({ duration: 0.75, stagger })),
      });
    }

    batchReveal(".svc-feature");
    batchReveal(".svc-step", 0.09);
    batchReveal(".svc-package", 0.1);
    batchReveal(".svc-faq__item", 0.06);

    // ---------- Single blocks ----------
    function reveal(selector, start = {}, extra = {}) {
      $$(selector).forEach((el) => {
        gsap.fromTo(
          el,
          { ...from(26, 8), ...start },
          to({
            duration: 0.9,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            ...extra,
          })
        );
      });
    }

    reveal(".svc-work", {}, { onComplete: () => revealMockups($(".svc-work")) });
    reveal(".svc-included", { y: 18 });
    reveal(".svc-note", { y: 12, filter: "blur(4px)" }, { duration: 0.7 });
    reveal(".svc-cta", { y: 30, scale: 0.98 });

    // All start states are applied inline now, so the CSS guard can go
    finish();

    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
