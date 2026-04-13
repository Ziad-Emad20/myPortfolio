function getCurrentLanguage() {
  return localStorage.getItem("lang") || "en";
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.body.classList.toggle("rtl", lang === "ar");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = getNestedValue(dict, key);
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    const value = getNestedValue(dict, key);
    if (value) el.setAttribute("placeholder", value);
  });
}

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyLanguage(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(getCurrentLanguage());
});