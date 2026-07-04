/*
  Addon info panel. Clicking an orbiting planet (or the central Cosmos
  icon) opens a modal panel themed in that addon's color.

  Addon copy, store links, and release status live in the
  <script type="application/json" id="addonData"> block in index.html —
  edit that JSON to change any addon's name, color, glow, about text,
  store links, or "released" flag (false greys out Modrinth/CurseForge
  and turns the download button into a red "Unreleased" state). It's
  read directly from the page (not fetched) so this works whether the
  site is opened straight from disk or served over http.
*/
(function () {
  const dataEl = document.getElementById("addonData");
  const ADDON_DATA = dataEl ? JSON.parse(dataEl.textContent) : {};

  const backdrop = document.getElementById("addonBackdrop");
  const panel = document.getElementById("addonPanel");
  const closeBtn = document.getElementById("addonPanelClose");
  const nameEl = document.getElementById("addonPanelName");
  const aboutEl = document.getElementById("addonPanelAbout");
  const modrinthEl = document.getElementById("addonPanelModrinth");
  const curseforgeEl = document.getElementById("addonPanelCurseforge");
  const downloadEl = document.getElementById("addonPanelDownload");

  if (!backdrop || !panel) return;

  let lastFocused = null;

  function openPanel(slug) {
    const addon = ADDON_DATA[slug];
    if (!addon) return;

    const released = addon.released !== false;

    nameEl.textContent = addon.name;
    nameEl.style.color = addon.color;
    aboutEl.textContent = addon.about;

    panel.style.setProperty("--panel-color", addon.color);
    panel.style.setProperty("--panel-glow", addon.glow);

    modrinthEl.href = released ? (addon.modrinth || "#") : "#";
    curseforgeEl.href = released ? (addon.curseforge || "#") : "#";
    modrinthEl.classList.toggle("is-disabled", !released);
    curseforgeEl.classList.toggle("is-disabled", !released);
    if (!released) {
      modrinthEl.setAttribute("aria-disabled", "true");
      curseforgeEl.setAttribute("aria-disabled", "true");
    } else {
      modrinthEl.removeAttribute("aria-disabled");
      curseforgeEl.removeAttribute("aria-disabled");
    }

    downloadEl.href = released ? (addon.modrinth || "#") : "#";
    downloadEl.textContent = released ? "Download" : "! Unreleased";
    downloadEl.classList.toggle("is-unreleased", !released);
    if (!released) {
      downloadEl.setAttribute("aria-disabled", "true");
    } else {
      downloadEl.removeAttribute("aria-disabled");
    }

    lastFocused = document.activeElement;
    backdrop.classList.add("is-open");
    panel.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closePanel() {
    backdrop.classList.remove("is-open");
    panel.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  [modrinthEl, curseforgeEl, downloadEl].forEach((el) => {
    el.addEventListener("click", (e) => {
      if (el.getAttribute("aria-disabled") === "true") {
        e.preventDefault();
      }
    });
  });

  document.querySelectorAll("[data-addon]").forEach((el) => {
    el.style.cursor = "pointer";
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");

    el.addEventListener("click", () => {
      openPanel(el.dataset.addon);
    });

    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPanel(el.dataset.addon);
      }
    });
  });

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closePanel();
  });
  closeBtn.addEventListener("click", closePanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("is-open")) {
      closePanel();
    }
  });
})();
