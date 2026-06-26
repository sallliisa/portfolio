// southneuhof — live contribution slices
// Fetches the full GitHub contribution graph for sallliisa via
// github-contributions-api and renders one vertical slice per day.

(function () {
  'use strict';

  const GITHUB_USER = 'sallliisa';
  const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;
  const strip = document.getElementById('commit-strip');

  /**
   * Render slices into the strip.
   * Each contribution entry has { date, count, level (0–4) }.
   */
  function render(contributions) {
    const fragment = document.createDocumentFragment();
    contributions.forEach(function (entry, i) {
      const slice = document.createElement('span');
      slice.className = 'commit-slice';
      slice.dataset.level = entry.level;
      slice.dataset.date = entry.date;
      slice.title = entry.date + ' — ' + entry.count + ' contribution' + (entry.count !== 1 ? 's' : '');
      slice.style.animationDelay = (i * 2) + 'ms';
      fragment.appendChild(slice);
    });
    strip.appendChild(fragment);
  }

  // ---- go ----

  fetch(API_URL)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      render(data.contributions);
    })
    .catch(function () {
      // Silently degrade — the header still shows the name.
    });
})();
