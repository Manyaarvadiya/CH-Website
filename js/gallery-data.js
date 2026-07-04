/*
  Gallery image manifest. Browsers can't list a folder's contents by
  themselves, so list the filenames that live in each addon's assets
  folder here. Order doesn't matter — the gallery scrolls them in a
  loop either direction regardless.

  To add a new row for a future addon: add another entry with the
  folder name, display name, and glow color (matching the addon's
  color from addons.json), then add the row in gallery.html /
  gallery.js.
*/
window.COSMOS_GALLERY = [
  {
    slug: "cosmos",
    name: "Cosmic Horizons",
    folder: "assets/cosmos/",
    glow: "65, 145, 230",
    direction: "left-to-right",
    images: Array.from({ length: 20 }, (_, i) => `${i}.png`)
  },
  {
    slug: "spheromatic",
    name: "Spheromatic",
    folder: "assets/spheromatic/",
    glow: "152, 102, 199",
    direction: "right-to-left",
    images: Array.from({ length: 20 }, (_, i) => `${i}.png`)
  }
];
