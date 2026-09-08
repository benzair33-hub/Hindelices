/* Hin Délices — Safari / iOS runtime hardening */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("is-safari-safe");

  /* Keep iOS Safari/WKWebView viewport height aligned with the visual viewport.
     This avoids layouts getting trapped behind the dynamic browser chrome/keyboard. */
  function syncViewportHeight() {
    var vv = window.visualViewport;
    var height = vv && vv.height ? vv.height : window.innerHeight;
    root.style.setProperty("--app-vh", height + "px");
  }

  syncViewportHeight();
  window.addEventListener("resize", syncViewportHeight, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", syncViewportHeight, { passive: true });
    window.visualViewport.addEventListener("scroll", syncViewportHeight, { passive: true });
  }

  /* iOS date inputs can retain an invalid value after category/lead-time changes. */
  function refreshDateInput() {
    var date = document.getElementById("dateSouhaitee");
    if (!date) return;
    date.setAttribute("autocomplete", "off");
    date.style.minHeight = "48px";
    if (date.min && date.value && date.value < date.min) {
      date.value = "";
      date.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    refreshDateInput();

    /* Never let stale popup attributes survive on WhatsApp links in Instagram,
       Safari, or other embedded WebKit browsers. */
    Array.prototype.forEach.call(document.querySelectorAll('a[href*="wa.me/"]'), function (link) {
      var href = link.getAttribute("href") || "";
      var match = href.match(/^https:\/\/wa\.me\/(\d+)(?:\?(.*))?$/);
      if (!match) return;
      var number = match[1];
      var query = match[2] ? "?" + match[2] : "";
      link.setAttribute("href", "https://api.whatsapp.com/send?phone=" + number + query.replace(/^\?phone=\d+/, ""));
      link.removeAttribute("target");
      link.removeAttribute("rel");
    });

    /* Give Safari a user-gesture-safe fallback for media controls. */
    Array.prototype.forEach.call(document.querySelectorAll("video"), function (video) {
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.muted = true;
      if (video.autoplay && !video.muted) video.autoplay = false;
      video.addEventListener("error", function () {
        var parent = video.parentElement;
        if (!parent) return;
        parent.classList.add("media-failed");
      }, { passive: true });
    });
  });

  /* iOS keyboard: keep the focused field above the keyboard without fighting
     Safari's native scroll behavior. */
  var focusTimer = null;
  document.addEventListener("focusin", function (event) {
    var target = event.target;
    if (!target || !/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
    clearTimeout(focusTimer);
    focusTimer = setTimeout(function () {
      if (document.activeElement !== target) return;
      try {
        target.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
      } catch (e) {
        target.scrollIntoView();
      }
    }, 220);
  });
})();
