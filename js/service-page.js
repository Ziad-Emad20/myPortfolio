// FAQ accordion for service pages
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".svc-faq__item").forEach((item) => {
    const btn = item.querySelector(".svc-faq__q");
    if (!btn) return;

    btn.setAttribute("aria-expanded", String(item.classList.contains("is-open")));

    btn.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });
});
