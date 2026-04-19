const statsData = [
  { value: 45, prefix: "+", suffix: "", labelKey: "stats.clients", fallback: "Clients" },
  { value: 10, prefix: "+", suffix: "", labelKey: "stats.countries", fallback: "Countries" },
  { value: 5, prefix: "+", suffix: "M", labelKey: "stats.reach", fallback: "Reach" },
];

function getStatsDictionary() {
  const lang =
    typeof getCurrentLanguage === "function"
      ? getCurrentLanguage()
      : localStorage.getItem("lang") || "en";

  if (typeof translations !== "undefined" && translations[lang]) {
    return translations[lang];
  }

  return null;
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function getTranslatedText(dict, key, fallback) {
  if (!dict) return fallback;
  return getNestedValue(dict, key) || fallback;
}

function renderStats() {
  const container = document.getElementById("statsCard");
  if (!container) return;

  const dict = getStatsDictionary();

  container.innerHTML = statsData
    .map((item) => {
      const label = getTranslatedText(dict, item.labelKey, item.fallback);

      return `
        <div class="stat-item">
          <h3 
            class="stat-value" 
            data-target="${item.value}" 
            data-prefix="${item.prefix}" 
            data-suffix="${item.suffix}"
          >
            ${item.prefix}0${item.suffix}
          </h3>
          <p class="stat-label">${label}</p>
        </div>
      `;
    })
    .join("");
}

function animateCount(el, target, prefix, suffix) {
  let current = 0;
  const increment = target / 90;

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

  if (!section || !values.length) return;

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

function initStatsSection() {
  renderStats();
  initStatsAnimation();
}

document.addEventListener("DOMContentLoaded", initStatsSection);