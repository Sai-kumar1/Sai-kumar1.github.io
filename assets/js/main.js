// Site interactions: theme toggle, TOC, heading anchors, code copy,
// reading progress, blog tag filter. No dependencies.
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      function apply() {
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
      }

      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!document.startViewTransition || reduce) { apply(); return; }

      // Light opens radially from the bottom, dark from the top.
      var w = window.innerWidth, h = window.innerHeight;
      var x = w / 2, y = next === "light" ? h : 0;
      var r = Math.hypot(w / 2, h);
      var at = " at " + x + "px " + y + "px)";

      document.startViewTransition(apply).ready.then(function () {
        root.animate(
          { clipPath: ["circle(0px" + at, "circle(" + r + "px" + at] },
          { duration: 600, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      });
    });
  });

  /* ---------- Post page ---------- */
  var prose = document.querySelector("[data-prose]");
  if (prose) {
    var headings = prose.querySelectorAll("h2[id], h3[id]");

    // Heading anchors
    headings.forEach(function (h) {
      var a = document.createElement("a");
      a.className = "heading-anchor";
      a.href = "#" + h.id;
      a.setAttribute("aria-label", "Link to this section");
      a.textContent = "#";
      h.prepend(a);
    });

    // Table of contents (only when there's enough structure)
    var toc = document.querySelector("[data-toc]");
    var list = toc && toc.querySelector("[data-toc-list]");
    if (list && headings.length >= 3) {
      var links = [];
      headings.forEach(function (h) {
        var li = document.createElement("li");
        if (h.tagName === "H3") li.className = "toc__sub";
        var a = document.createElement("a");
        a.href = "#" + h.id;
        // Exclude the "#" anchor we added
        a.textContent = h.textContent.replace(/^#/, "").trim();
        li.appendChild(a);
        list.appendChild(li);
        links.push(a);
      });
      toc.hidden = false;

      // Collapse on small screens by default
      if (window.matchMedia("(max-width: 1279px)").matches) {
        toc.querySelector("details").removeAttribute("open");
      }

      // Highlight the section being read
      if ("IntersectionObserver" in window) {
        var visible = new Map();
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { visible.set(e.target.id, e.isIntersecting); });
          var activeId = null;
          for (var i = 0; i < headings.length; i++) {
            if (visible.get(headings[i].id)) { activeId = headings[i].id; break; }
          }
          if (!activeId) return;
          links.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + activeId);
          });
        }, { rootMargin: "-70px 0px -60% 0px" });
        headings.forEach(function (h) { io.observe(h); });
      }
    }

    // Copy buttons on code blocks
    prose.querySelectorAll("pre").forEach(function (pre) {
      var wrap = pre.closest(".highlighter-rouge, figure.highlight") || pre;
      if (wrap === pre) {
        var div = document.createElement("div");
        pre.parentNode.insertBefore(div, pre);
        div.appendChild(pre);
        wrap = div;
      }
      wrap.classList.add("code-wrap");

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code to clipboard");
      btn.addEventListener("click", function () {
        var code = pre.querySelector("code") || pre;
        var text = code.innerText.replace(/\n$/, "");
        var done = function () {
          btn.textContent = "Copied!";
          btn.classList.add("is-copied");
          setTimeout(function () { btn.textContent = "Copy"; btn.classList.remove("is-copied"); }, 1600);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(done, function () {});
        } else {
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); done(); } catch (e) {}
          ta.remove();
        }
      });
      wrap.appendChild(btn);
    });
  }

  /* ---------- Reading progress ---------- */
  var bar = document.querySelector("[data-progress]");
  var article = document.querySelector("[data-post]");
  if (bar && article) {
    var ticking = false;
    var update = function () {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      bar.style.transform = "scaleX(" + p + ")";
      ticking = false;
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ---------- Blog tag filter ---------- */
  var filter = document.querySelector("[data-tag-filter]");
  var postList = document.querySelector("[data-post-list]");
  if (filter && postList) {
    var chips = filter.querySelectorAll(".chip");
    var cards = postList.querySelectorAll(".post-card");
    var empty = document.querySelector("[data-filter-empty]");

    var apply = function (tag) {
      var shown = 0;
      cards.forEach(function (card) {
        var tags = (card.getAttribute("data-tags") || "").split(" ");
        var match = !tag || tags.indexOf(tag) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", String(c.getAttribute("data-tag") === tag));
      });
      if (empty) empty.hidden = shown > 0;
    };

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var tag = chip.getAttribute("data-tag");
        apply(tag);
        history.replaceState(null, "", tag ? "#" + tag : location.pathname);
      });
    });

    // Support links like /blog/#go from post tag pills
    if (location.hash) {
      var wanted = decodeURIComponent(location.hash.slice(1));
      chips.forEach(function (c) {
        if (c.getAttribute("data-tag") === wanted) apply(wanted);
      });
    }
  }
})();
