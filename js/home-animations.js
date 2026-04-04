window.addEventListener("load", () => {
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

  function animateHero() {
    const avatar = $(".hero-avatar");
    const card = $(".hero-card");
    const title = $(".hero-title");
    const role = $(".hero-role");
    const description = $(".hero-description");
    const socials = $$(".hero-social");

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

    if (avatar) {
      tl.from(
        avatar,
        {
          yPercent: 12,
          scale: 0.95,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.9,
          clearProps: "opacity,filter",
        },
        "-=0.7"
      );

      gsap.to(avatar, {
        y: -3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const avatarImg = $(".hero-avatar img");
      if (avatarImg) {
        gsap.to(avatarImg, {
          scale: 1.015,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
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
        "-=0.55"
      );
    }

    if (role) {
      tl.from(
        role,
        {
          yPercent: 16,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.75,
          clearProps: "opacity,filter",
        },
        "-=0.58"
      );
    }

    if (description) {
      tl.from(
        description,
        {
          yPercent: 14,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.78,
          clearProps: "opacity,filter",
        },
        "-=0.54"
      );
    }

    if (socials.length) {
      tl.from(
        socials,
        {
          yPercent: 12,
          opacity: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "opacity",
        },
        "-=0.42"
      );
    }
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

  function animateStats() {
    const section = $(".stats-section");
    const items = $$(".stat-item");

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
      ease: "expo.out",
      clearProps: "opacity,filter",
    });
  }

  function animateOffers() {
    const section = $(".offers-section");
    const cards = $$(".offer-card");

    if (!section || !cards.length) return;

    revealTitle(".offers-section", ".offers-title");

    cards.forEach((card, index) => {
      const imageWrap = $(".offer-card__image-wrap", card);
      const content = $(".offer-card__content", card);

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

  function animateFeedback() {
    const section = $(".feedback-section");
    const cards = $$(".feedback-card");

    if (!section || !cards.length) return;

    revealTitle(".feedback-section", ".feedback-title");

    cards.forEach((card, index) => {
      const top = $(".feedback-card__top", card);
      const text = $(".feedback-card__text", card);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          once: true,
        },
        delay: index * 0.07,
      });

      if (top) {
        tl.from(top, {
          yPercent: 12,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.65,
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
            duration: 0.9,
            ease: "expo.out",
            clearProps: "opacity,filter",
          },
          "-=0.38"
        );
      }
    });
  }

  function animateFooter() {
    const footer = $("#footer-container");
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

  function animateMobileMenu() {
    const mobileMenu = $("#mobileMenu");
    if (!mobileMenu) return;

    const mobileLinks = $$("a", mobileMenu);

    function openAnimation() {
      gsap.killTweensOf([mobileMenu, mobileLinks]);

      gsap.set(mobileMenu, {
        display: "flex",
        opacity: 1,
        visibility: "visible",
        pointerEvents: "auto",
      });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        mobileMenu,
        {
          y: -10,
          opacity: 0,
          scale: 0.97,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.4,
          clearProps: "filter",
        }
      ).fromTo(
        mobileLinks,
        {
          y: -8,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.26,
          stagger: 0.05,
        },
        "-=0.18"
      );
    }

    function closeAnimation() {
      gsap.killTweensOf([mobileMenu, mobileLinks]);

      gsap.to(mobileLinks, {
        y: -4,
        opacity: 0,
        duration: 0.14,
        stagger: 0.02,
        ease: "power2.in",
      });

      gsap.to(mobileMenu, {
        y: -8,
        opacity: 0,
        scale: 0.985,
        duration: 0.22,
        ease: "power2.inOut",
        delay: 0.03,
      });
    }

    const observer = new MutationObserver(() => {
      if (mobileMenu.classList.contains("active")) {
        openAnimation();
      } else {
        closeAnimation();
      }
    });

    observer.observe(mobileMenu, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  waitForSelectors(
    [
      ".hero-card",
      ".stat-item",
      ".offer-card__content",
      ".feedback-card__text",
      ".footer-logo",
      "#mobileMenu",
    ],
    () => {
      animateHero();
      animateStats();
      animateOffers();
      animateFeedback();
      animateFooter();
      animateMobileMenu();
      ScrollTrigger.refresh();
    }
  );
});