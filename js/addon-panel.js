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

    modrinthEl.href = released ? addon.modrinth || "#" : "#";
    curseforgeEl.href = released ? addon.curseforge || "#" : "#";
    modrinthEl.classList.toggle("is-disabled", !released);
    curseforgeEl.classList.toggle("is-disabled", !released);

    [modrinthEl, curseforgeEl].forEach((el) => {
      if (released) el.removeAttribute("aria-disabled");
      else el.setAttribute("aria-disabled", "true");
    });

    downloadEl.href = released ? addon.modrinth || "#" : "#";
    downloadEl.textContent = released ? "Download" : "! Unreleased";
    downloadEl.classList.toggle("is-unreleased", !released);
    if (released) downloadEl.removeAttribute("aria-disabled");
    else downloadEl.setAttribute("aria-disabled", "true");

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
      if (el.getAttribute("aria-disabled") === "true") e.preventDefault();
    });
  });

  document.querySelectorAll("[data-addon]").forEach((el) => {
    el.style.cursor = "pointer";
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");

    el.addEventListener("click", () => openPanel(el.dataset.addon));
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
    if (e.key === "Escape" && panel.classList.contains("is-open")) closePanel();
  });
})();
