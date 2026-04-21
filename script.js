document.documentElement.classList.add("js");

const themeToggles = document.querySelectorAll(".theme-toggle");
let storedTheme = "light";

try {
  storedTheme = localStorage.getItem("theme") || "light";
} catch {
  storedTheme = document.documentElement.dataset.theme || "light";
}

document.documentElement.dataset.theme = storedTheme;

const updateThemeToggle = () => {
  const isDark = document.documentElement.dataset.theme === "dark";

  themeToggles.forEach((toggle) => {
    const label = toggle.querySelector(".theme-label");

    if (label) {
      label.textContent = isDark ? "Light" : "Dark";
    }

    toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    toggle.setAttribute("aria-pressed", String(isDark));
  });
};

themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // The visual toggle should still work when storage is unavailable.
    }

    updateThemeToggle();
  });
});

updateThemeToggle();

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 220)}ms`);
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
