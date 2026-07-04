/*
  News page renderer. Edit the NEWS array below to add, remove, or
  reorder news. The FIRST entry is treated as the latest news and
  gets the pulsing dot next to its title — reorder entries to
  change what counts as "latest".

  Each entry's "type" controls its left border color:
    IMPORTANT -> gold
    NORMAL    -> green
    WARNING   -> red
    anything else (or missing) -> grey
*/
(function () {
  const NEWS = [
    {
      date: "2026-07-04",
      title: "Release of Spheromatic",
      body: "Not a fan of the cubic look of Cosmic Horizons? We've got you covered. Introducing Spheromatic, transforming planets, rings, black holes, and every other cubic aspect of Cosmic Horizons into beautiful, smooth spheres.",
      type: "NORMAL",
    },
    {
      date: "2026-07-04",
      title: "Alpha Notice",
      body: "Cosmic Horizons is currently in Alpha and should be used with caution. We do not recommend adding it to worlds you care about, as future updates may introduce breaking changes or world corruption while development is ongoing.",
      type: "WARNING",
    },
    {
      date: "2026-07-04",
      title: "Release of Cosmic Horizons",
      body: "The long-awaited release of Cosmic Horizons has finally arrived. Explore a vast new universe filled with planets, stars, black holes, and countless cosmic wonders.",
      type: "NORMAL",
    },
    {
      date: "2026-07-04",
      title: "The Beginning",
      body: "Every great journey begins with a single step. Welcome to the dawn of the Cosmos.",
      type: "IMPORTANT",
    },
  ];

  const list = document.getElementById("newsList");
  if (!list) return;

  render(NEWS);

  function render(entries) {
    if (entries.length === 0) {
      list.innerHTML = '<p class="news-empty">No news yet — check back soon.</p>';
      return;
    }

    list.innerHTML = "";

    entries.forEach((entry, index) => {
      const type = (entry.type || "").toUpperCase();
      const typeClass =
        type === "IMPORTANT" ? "news-card--important" :
        type === "NORMAL"    ? "news-card--normal" :
        type === "WARNING"   ? "news-card--warning" :
                                "news-card--default";

      const card = document.createElement("article");
      card.className = `news-card ${typeClass}`;

      const head = document.createElement("div");
      head.className = "news-card-head";

      const title = document.createElement("h2");
      title.className = "news-card-title";
      title.textContent = entry.title || "Untitled";
      head.appendChild(title);

      if (index === 0) {
        const dot = document.createElement("span");
        dot.className = "news-dot";
        dot.setAttribute("aria-label", "Latest news");
        head.appendChild(dot);
      }

      const date = document.createElement("p");
      date.className = "news-card-date";
      date.textContent = formatDate(entry.date);

      const body = document.createElement("p");
      body.className = "news-card-body";
      body.textContent = entry.body || "";

      card.appendChild(head);
      card.appendChild(date);
      card.appendChild(body);
      list.appendChild(card);
    });
  }

  function formatDate(str) {
    if (!str) return "";
    const d = new Date(str);
    if (isNaN(d.getTime())) return str;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
})();
