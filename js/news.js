(function () {
  const list = document.getElementById("newsList");
  if (!list) return;

  render(window.COSMOS_NEWS || []);

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
        type === "NORMAL" ? "news-card--normal" :
        type === "WARNING" ? "news-card--warning" :
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
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }
})();
