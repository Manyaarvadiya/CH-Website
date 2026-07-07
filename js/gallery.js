(function () {
  const rowsContainer = document.getElementById("galleryRows");
  const backdrop = document.getElementById("galleryBackdrop");
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("galleryLightboxImg");
  const lightboxClose = document.getElementById("galleryLightboxClose");

  if (!rowsContainer) return;

  const GALLERY = window.COSMOS_GALLERY || [];
  let lastFocused = null;

  if (GALLERY.length === 0) {
    rowsContainer.innerHTML = '<p class="news-empty">No gallery images yet — check back soon.</p>';
    return;
  }

  render(GALLERY);

  function render(rows) {
    rowsContainer.innerHTML = "";

    rows.forEach((row) => {
      const section = document.createElement("section");
      section.className = "gallery-row";
      if (row.slug !== "cosmos") section.classList.add("gallery-row--bordered");
      section.style.setProperty("--row-glow", row.glow);

      const heading = document.createElement("h2");
      heading.className = "gallery-row-title";
      heading.textContent = row.name;
      section.appendChild(heading);

      const track = document.createElement("div");
      track.className = "gallery-track";
      track.classList.add(row.direction === "right-to-left" ? "gallery-track--rtl" : "gallery-track--ltr");

      const strip = document.createElement("div");
      strip.className = "gallery-strip";

      const images = row.images || [];
      images.concat(images).forEach((filename) => {
        const src = row.folder + filename;
        const item = document.createElement("div");
        item.className = "gallery-item";

        const img = document.createElement("img");
        img.src = src;
        img.alt = row.name;
        img.loading = "lazy";
        img.addEventListener("click", () => openLightbox(src, row.name, row.glow));
        img.addEventListener("error", () => item.remove());

        item.appendChild(img);
        strip.appendChild(item);
      });

      track.appendChild(strip);
      section.appendChild(track);
      rowsContainer.appendChild(section);
    });
  }

  function openLightbox(src, alt, glow) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.style.setProperty("--lightbox-glow", glow);

    lastFocused = document.activeElement;
    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
    lightboxImg.src = "";
    if (lastFocused) lastFocused.focus();
  }

  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeLightbox();
    });
  }
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("is-open")) closeLightbox();
  });
})();
