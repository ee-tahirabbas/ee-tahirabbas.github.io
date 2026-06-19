/* ============================================================
   Shared site behaviour: mobile nav, scroll reveals,
   3D tilt on project cards, copy-to-clipboard on contact.
   ============================================================ */

// ---- Mobile nav toggle ----
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    nav.classList.toggle("menu-open");
    toggle.classList.toggle("open");
  });
  // close menu when a link is tapped
  nav.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("menu-open");
      toggle.classList.remove("open");
    });
  });
})();

// ---- Scroll reveal ----
(function () {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach(function (el) { observer.observe(el); });
})();

// ---- 3D tilt on project / featured cards ----
(function () {
  var cards = document.querySelectorAll(".tilt-card");
  if (!cards.length) return;
  var isTouch = window.matchMedia("(hover: none)").matches;
  if (isTouch) return;

  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        "perspective(900px) rotateX(" + (-y * 7) + "deg) rotateY(" + (x * 9) + "deg) translateY(-4px)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
})();

// ---- Copy email to clipboard ----
(function () {
  var btn = document.querySelector("[data-copy]");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var value = btn.getAttribute("data-copy");
    navigator.clipboard.writeText(value).then(function () {
      var original = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(function () { btn.textContent = original; }, 1600);
    });
  });
})();

// ---- Animated stat counters on the hero ----
(function () {
  var stats = document.querySelectorAll("[data-count]");
  if (!stats.length) return;
  stats.forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var current = 0;
    var steps = 30;
    var increment = target / steps;
    var i = 0;
    var timer = setInterval(function () {
      i++;
      current = Math.min(target, Math.round(increment * i));
      el.textContent = current + suffix;
      if (i >= steps) clearInterval(timer);
    }, 40);
  });
})();
