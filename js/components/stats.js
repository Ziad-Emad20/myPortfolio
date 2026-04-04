const statsData = [
  { value: 31, prefix: "+", suffix: "", label: "Clients" },
  { value: 12, prefix: "+", suffix: "", label: "Countries" },
  { value: 4, prefix: "+", suffix: "M", label: "Reach" },
];

function renderStats() {
  const container = document.getElementById("statsCard");
  if (!container) return;

  container.innerHTML = statsData
    .map(
      (item) => `
      <div class="stat-item">
        <h3 
          class="stat-value" 
          data-target="${item.value}" 
          data-prefix="${item.prefix}" 
          data-suffix="${item.suffix}"
        >
          ${item.prefix}0${item.suffix}
        </h3>
        <p class="stat-label">${item.label}</p>
      </div>
    `
    )
    .join("");
}

function animateCount(el, target, prefix, suffix) {
  let current = 0;
  const increment = target / 90; // السرعة (قلل الرقم = أسرع)

  function update() {
    current += increment;

    if (current < target) {
      el.textContent = `${prefix}${Math.floor(current)}${suffix}`;
      requestAnimationFrame(update);
    } else {
      el.textContent = `${prefix}${target}${suffix}`;
    }
  }

  update();
}

function initStatsAnimation() {
  const section = document.querySelector(".stats-section");
  const values = document.querySelectorAll(".stat-value");

  let triggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          values.forEach((el) => {
            const target = Number(el.dataset.target);
            const prefix = el.dataset.prefix;
            const suffix = el.dataset.suffix;

            animateCount(el, target, prefix, suffix);
          });

          triggered = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(section);
}

renderStats();
initStatsAnimation();