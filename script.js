(() => {
  "use strict";
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const year = document.querySelector("#year");
  const toast = document.querySelector(".toast");
  const themeButton = document.querySelector(".theme-toggle");
  const themeLabel = document.querySelector(".theme-label");
  const themeIcon = document.querySelector(".theme-icon");
  const savedTheme = (() => { try { return localStorage.getItem("nettoon-theme"); } catch (_) { return null; } })();
  const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    if (themeButton) themeButton.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    if (themeLabel) themeLabel.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "☼" : "◐";
    const meta = document.querySelector("meta[name=theme-color]"); if (meta) meta.content = theme === "dark" ? "#090909" : "#f7f5f2";
  }
  applyTheme(savedTheme || (systemDark ? "dark" : "light"));
  if (themeButton) themeButton.addEventListener("click", () => { const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; applyTheme(next); try { localStorage.setItem("nettoon-theme", next); } catch (_) {} });
  if (year) year.textContent = new Date().getFullYear();

  function closeMenu() {
    if (!menuButton || !nav) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menuButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  const contactLink = document.querySelector(".contact-email");
  if (contactLink && toast) {
    contactLink.addEventListener("click", () => {
      toast.textContent = "Your email app should open. Confirm hello@nettoon.co is an active inbox before publishing.";
      toast.classList.add("is-visible");
      window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
    });
  }
})();
