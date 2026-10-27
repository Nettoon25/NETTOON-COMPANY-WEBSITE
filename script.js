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
      toast.textContent = "Your email app should open. Confirm nettoon254@gmail.com is an active inbox before publishing.";
      toast.classList.add("is-visible");
      window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
    });
  }
})();



const countries = [
    ["Afghanistan", "af"],
    ["Albania", "al"],
    ["Algeria", "dz"],
    ["Andorra", "ad"],
    ["Angola", "ao"],
    ["Antigua and Barbuda", "ag"],
    ["Argentina", "ar"],
    ["Armenia", "am"],
    ["Australia", "au"],
    ["Austria", "at"],
    ["Azerbaijan", "az"],
    ["Bahamas", "bs"],
    ["Bahrain", "bh"],
    ["Bangladesh", "bd"],
    ["Barbados", "bb"],
    ["Belarus", "by"],
    ["Belgium", "be"],
    ["Belize", "bz"],
    ["Benin", "bj"],
    ["Bhutan", "bt"],
    ["Bolivia", "bo"],
    ["Bosnia and Herzegovina", "ba"],
    ["Botswana", "bw"],
    ["Brazil", "br"],
    ["Brunei", "bn"],
    ["Bulgaria", "bg"],
    ["Burkina Faso", "bf"],
    ["Burundi", "bi"],
    ["Cabo Verde", "cv"],
    ["Cambodia", "kh"],
    ["Cameroon", "cm"],
    ["Canada", "ca"],
    ["Central African Republic", "cf"],
    ["Chad", "td"],
    ["Chile", "cl"],
    ["China", "cn"],
    ["Colombia", "co"],
    ["Comoros", "km"],
    ["Congo", "cg"],
    ["Costa Rica", "cr"],
    ["Côte d'Ivoire", "ci"],
    ["Croatia", "hr"],
    ["Cuba", "cu"],
    ["Cyprus", "cy"],
    ["Czechia", "cz"],
    ["Democratic Republic of the Congo", "cd"],
    ["Denmark", "dk"],
    ["Djibouti", "dj"],
    ["Dominica", "dm"],
    ["Dominican Republic", "do"],
    ["Ecuador", "ec"],
    ["Egypt", "eg"],
    ["El Salvador", "sv"],
    ["Equatorial Guinea", "gq"],
    ["Eritrea", "er"],
    ["Estonia", "ee"],
    ["Eswatini", "sz"],
    ["Ethiopia", "et"],
    ["Fiji", "fj"],
    ["Finland", "fi"],
    ["France", "fr"],
    ["Gabon", "ga"],
    ["Gambia", "gm"],
    ["Georgia", "ge"],
    ["Germany", "de"],
    ["Ghana", "gh"],
    ["Greece", "gr"],
    ["Grenada", "gd"],
    ["Guatemala", "gt"],
    ["Guinea", "gn"],
    ["Guinea-Bissau", "gw"],
    ["Guyana", "gy"],
    ["Haiti", "ht"],
    ["Honduras", "hn"],
    ["Hungary", "hu"],
    ["Iceland", "is"],
    ["India", "in"],
    ["Indonesia", "id"],
    ["Iran", "ir"],
    ["Iraq", "iq"],
    ["Ireland", "ie"],
    ["Israel", "il"],
    ["Italy", "it"],
    ["Jamaica", "jm"],
    ["Japan", "jp"],
    ["Jordan", "jo"],
    ["Kazakhstan", "kz"],
    ["Kenya", "ke"],
    ["Kiribati", "ki"],
    ["Kuwait", "kw"],
    ["Kyrgyzstan", "kg"],
    ["Laos", "la"],
    ["Latvia", "lv"],
    ["Lebanon", "lb"],
    ["Lesotho", "ls"],
    ["Liberia", "lr"],
    ["Libya", "ly"],
    ["Liechtenstein", "li"],
    ["Lithuania", "lt"],
    ["Luxembourg", "lu"],
    ["Madagascar", "mg"],
    ["Malawi", "mw"],
    ["Malaysia", "my"],
    ["Maldives", "mv"],
    ["Mali", "ml"],
    ["Malta", "mt"],
    ["Marshall Islands", "mh"],
    ["Mauritania", "mr"],
    ["Mauritius", "mu"],
    ["Mexico", "mx"],
    ["Micronesia", "fm"],
    ["Moldova", "md"],
    ["Monaco", "mc"],
    ["Mongolia", "mn"],
    ["Montenegro", "me"],
    ["Morocco", "ma"],
    ["Mozambique", "mz"],
    ["Myanmar", "mm"],
    ["Namibia", "na"],
    ["Nauru", "nr"],
    ["Nepal", "np"],
    ["Netherlands", "nl"],
    ["New Zealand", "nz"],
    ["Nicaragua", "ni"],
    ["Niger", "ne"],
    ["Nigeria", "ng"],
    ["North Korea", "kp"],
    ["North Macedonia", "mk"],
    ["Norway", "no"],
    ["Oman", "om"],
    ["Pakistan", "pk"],
    ["Palau", "pw"],
    ["Palestine", "ps"],
    ["Panama", "pa"],
    ["Papua New Guinea", "pg"],
    ["Paraguay", "py"],
    ["Peru", "pe"],
    ["Philippines", "ph"],
    ["Poland", "pl"],
    ["Portugal", "pt"],
    ["Qatar", "qa"],
    ["Romania", "ro"],
    ["Russia", "ru"],
    ["Rwanda", "rw"],
    ["Saint Kitts and Nevis", "kn"],
    ["Saint Lucia", "lc"],
    ["Saint Vincent and the Grenadines", "vc"],
    ["Samoa", "ws"],
    ["San Marino", "sm"],
    ["Sao Tome and Principe", "st"],
    ["Saudi Arabia", "sa"],
    ["Senegal", "sn"],
    ["Serbia", "rs"],
    ["Seychelles", "sc"],
    ["Sierra Leone", "sl"],
    ["Singapore", "sg"],
    ["Slovakia", "sk"],
    ["Slovenia", "si"],
    ["Solomon Islands", "sb"],
    ["Somalia", "so"],
    ["South Africa", "za"],
    ["South Korea", "kr"],
    ["South Sudan", "ss"],
    ["Spain", "es"],
    ["Sri Lanka", "lk"],
    ["Sudan", "sd"],
    ["Suriname", "sr"],
    ["Sweden", "se"],
    ["Switzerland", "ch"],
    ["Syria", "sy"],
    ["Tajikistan", "tj"],
    ["Tanzania", "tz"],
    ["Thailand", "th"],
    ["Timor-Leste", "tl"],
    ["Togo", "tg"],
    ["Tonga", "to"],
    ["Trinidad and Tobago", "tt"],
    ["Tunisia", "tn"],
    ["Türkiye", "tr"],
    ["Turkmenistan", "tm"],
    ["Tuvalu", "tv"],
    ["Uganda", "ug"],
    ["Ukraine", "ua"],
    ["United Arab Emirates", "ae"],
    ["United Kingdom", "gb"],
    ["United States", "us"],
    ["Uruguay", "uy"],
    ["Uzbekistan", "uz"],
    ["Vanuatu", "vu"],
    ["Vatican City", "va"],
    ["Venezuela", "ve"],
    ["Vietnam", "vn"],
    ["Yemen", "ye"],
    ["Zambia", "zm"],
    ["Zimbabwe", "zw"],

    // Additional countries to complete the 195-country convention
    ["Andorra", "ad"]
];

const ticker = document.getElementById("countryTicker");

if (ticker) {
    // Remove accidental duplicates and preserve the first occurrence.
    const uniqueCountries = [
        ...new Map(countries.map(([name, code]) => [name, [name, code]])).values()
    ];

    function createCountrySequence(label) {
        const fragment = document.createDocumentFragment();

        uniqueCountries.forEach(([name, code], index) => {
            const item = document.createElement("span");
            item.className = "country";

            const flag = document.createElement("img");
            flag.src = `https://flagcdn.com/w80/${code}.png`;
            flag.alt = "";
            flag.width = 28;
            flag.height = 21;
            flag.loading = "lazy";
            flag.decoding = "async";

            item.append(flag, document.createTextNode(` ${name}`));
            fragment.appendChild(item);

     const separator = document.createElement("span");
separator.className = "ticker-star";
separator.setAttribute("aria-hidden", "true");

const star = document.createElement("img");
star.src = "Kevin's Star.png";
star.alt = "";
star.width = 16;
star.height = 16;
star.loading = "lazy";

separator.appendChild(star);
fragment.appendChild(separator);
        });

        return fragment;
    }

    ticker.replaceChildren(createCountrySequence());
    ticker.setAttribute("aria-label", "Countries represented around the world");
}
