// ------------------------------------------------------------
// Reveal timeline items as they enter the viewport
// ------------------------------------------------------------
(function () {
  var items = document.querySelectorAll(".timeline-item");

  // Items are visible by default (see CSS). Only if IntersectionObserver
  // is available do we prime them for a fade-up entrance, so a JS error
  // or unsupported browser never leaves the timeline blank.
  if (!("IntersectionObserver" in window) || !items.length) {
    return;
  }

  items.forEach(function (item) { item.classList.add("pre-reveal"); });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("pre-reveal");
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach(function (item) { observer.observe(item); });
})();

// ------------------------------------------------------------
// Live "together" counter — Años / Días / Minutos / Segundos
// elapsed since 22 de agosto de 2025 (local time).
// ------------------------------------------------------------
(function () {
  var startDate = new Date(2025, 7, 22, 0, 0, 0); // month is 0-indexed: 7 = agosto

  var yearsEl = document.getElementById("count-years");
  var daysEl = document.getElementById("count-days");
  var minutesEl = document.getElementById("count-minutes");
  var secondsEl = document.getElementById("count-seconds");

  if (!yearsEl || !daysEl || !minutesEl || !secondsEl) return;

  function fullYearsElapsed(start, now) {
    var years = now.getFullYear() - start.getFullYear();
    var anniversary = new Date(start.getTime());
    anniversary.setFullYear(start.getFullYear() + years);
    if (anniversary > now) years -= 1;
    return Math.max(0, years);
  }

  function formatNumber(n) {
    return n.toLocaleString("es-AR");
  }

  function tick() {
    var now = new Date();
    var diffMs = now - startDate;
    if (diffMs < 0) diffMs = 0;

    var years = fullYearsElapsed(startDate, now);
    var totalDays = Math.floor(diffMs / 86400000);
    var totalMinutes = Math.floor(diffMs / 60000);
    var totalSeconds = Math.floor(diffMs / 1000);

    yearsEl.textContent = formatNumber(years);
    daysEl.textContent = formatNumber(totalDays);
    minutesEl.textContent = formatNumber(totalMinutes);
    secondsEl.textContent = formatNumber(totalSeconds);
  }

  tick();
  setInterval(tick, 1000);
})();

// ------------------------------------------------------------
// Background music (music2.mp3) with a manual toggle button.
// Browsers block audio with sound from autoplaying, so we try
// a silent-safe autoplay first and always let the user control it.
// ------------------------------------------------------------
(function () {
  var audio = document.getElementById("bg-music");
  var toggleBtn = document.getElementById("music-toggle");

  if (!audio || !toggleBtn) return;

  audio.volume = 0.55;

  function setPlayingState(isPlaying) {
    toggleBtn.classList.toggle("is-playing", isPlaying);
    toggleBtn.setAttribute("aria-pressed", String(isPlaying));
    toggleBtn.querySelector(".music-toggle__label").textContent =
      isPlaying ? "Pausar" : "Música";
  }

  // Try to autoplay; if the browser blocks it, wait for a user click.
  audio.play()
    .then(function () { setPlayingState(true); })
    .catch(function () { setPlayingState(false); });

  toggleBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play().then(function () { setPlayingState(true); });
    } else {
      audio.pause();
      setPlayingState(false);
    }
  });
})();
