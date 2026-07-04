/*
  News data. Edit the array below to add, remove, or reorder news —
  it's just JSON wrapped in a variable assignment so it can load via
  a <script> tag (fetch() of local files is blocked by browsers when
  a page is opened directly from disk, this isn't).

  The FIRST entry in the array is treated as the latest news and
  gets the pulsing dot next to its title — reorder entries to change
  what counts as "latest".

  "type" controls the card's left border color:
    "IMPORTANT" -> gold
    "NORMAL"    -> green
    "WARNING"   -> red
    anything else (or missing) -> grey
*/
window.COSMOS_NEWS = [
  {
    "date": "2026-07-04",
    "title": "Release of Spheromatic",
    "body": "Not a fan of the cubic look of Cosmic Horizons? We've got you covered. Introducing Spheromatic, transforming planets, rings, black holes, and every other cubic aspect of Cosmic Horizons into beautiful, smooth spheres.",
    "type": "NORMAL"
  },
  {
    "date": "2026-07-04",
    "title": "Alpha Notice",
    "body": "Spheromatic is currently in Alpha and should be used with caution. We do not recommend adding it to worlds you care about, as future updates may introduce breaking changes or world corruption while development is ongoing.",
    "type": "WARNING"
  },
  {
    "date": "2026-07-04",
    "title": "Release of Cosmic Horizons",
    "body": "The long-awaited release of Cosmic Horizons has finally arrived. Explore a vast new universe filled with planets, stars, black holes, and countless cosmic wonders.",
    "type": "NORMAL"
  },
  {
    "date": "2026-07-04",
    "title": "The Beginning",
    "body": "Every great journey begins with a single step. Welcome to the dawn of the Cosmos.",
    "type": "IMPORTANT"
  }
];
