/* Hin Délices — production order UX + mobile hardening
   Single source of truth for category/quantity compatibility, resilient
   rendering for Safari/iOS, delivery cleanup, bilingual quantity labels,
   and graceful recovery for missing optional portrait assets.
*/
(function () {
  "use strict";

  var CONFIG = {
    "Biscuits du quotidien": {
      price: 130,
      quantities: [
        { fr: "36 pièces", ar: "36 قطعة", value: "36 biscuits sablés" },
        { fr: "72 pièces", ar: "72 قطعة", value: "72 biscuits sablés" },
        { fr: "Sur mesure", ar: "حسب الطلب", value: "", custom: true }
      ]
    },
    "Gâteaux sur mesure": {
      price: 350,
      quantities: [
        { fr: "6–8 pers.", ar: "6–8 أشخاص", value: "6–8 personnes" },
        { fr: "10–12 pers.", ar: "10–12 شخصًا", value: "10–12 personnes" },
        { fr: "Sur mesure", ar: "حسب الطلب", value: "", custom: true }
      ]
    },
    "Plateaux cadeaux": {
      price: 240,
      quantities: [
        { fr: "1 plateau", ar: "صينية واحدة", value: "1 plateau" },
        { fr: "2 plateaux", ar: "صينيتان", value: "2 plateaux" },
        { fr: "Sur mesure", ar: "حسب الطلب", value: "", custom: true }
      ]
    },
    "Coffrets saisonniers": {
      price: 180,
      quantities: [
        { fr: "1 coffret", ar: "علبة واحدة", value: "1 coffret" },
        { fr: "2 coffrets", ar: "علبتان", value: "2 coffrets" },
        { fr: "Sur mesure", ar: "حسب الطلب", value: "", custom: true }
      ]
    },
    "À discuter": {
      price: null,
      quantities: [
        { fr: "Sur mesure", ar: "حسب الطلب", value: "", custom: true }
      ]
    }
  };

  var state = {
    category: "",
    quantity: "",
    mode: "Retrait",
    neighborhood: ""
  };

  function $(id) { return document.getElementById(id); }
  function form() { return $("orderForm"); }
  function lang() { return document.documentElement.lang === "ar" ? "ar" : "fr"; }
  function checked(name) {
    var f = form();
    return f ? f.querySelector('input[name="' + name + '"]:checked') : null;
  }
  function category() {
    var r = checked("categorie");
    return r ? r.value : "";
  }
  function inputValue(id) {
    var el = $(id);
    return el ? String(el.value || "").trim() : "";
  }
  function dispatch(el, type) {
    if (!el) return;
    try { el.dispatchEvent(new Event(type, { bubbles: true })); } catch (e) {
      var evt = document.createEvent("Event");
      evt.initEvent(type, true, true);
      el.dispatchEvent(evt);
    }
  }
  function updateStateFromDom() {
    state.category = category();
    state.quantity = inputValue("quantite");
    var mode = checked("mode");
    state.mode = mode ? mode.value : "Retrait";
    var zone = $("quartier");
    state.neighborhood = zone ? String(zone.value || "").trim() : "";
    return state;
  }
  function setQuantity(value, userAction) {
    var input = $("quantite");
    if (!input) return;
    input.value = value || "";
    state.quantity = input.value;
    dispatch(input, "input");
    dispatch(input, "change");
    if (userAction) updateSummaryIfAvailable();
  }
  function currentPreset(list, value) {
    return list.find(function (item) { return !item.custom && item.value === value; }) || null;
  }
  function placeholderFor(cat) {
    if (cat === "À discuter") return lang() === "ar" ? "صفوا الكمية أو الحجم المرغوب" : "Décrivez la quantité ou le format souhaité";
    if (cat === "Gâteaux sur mesure") return lang() === "ar" ? "مثال: لـ 10 أشخاص أو كعكة من طابقين" : "Ex. pour 10 personnes, ou gâteau à 2 étages";
    if (cat === "Biscuits du quotidien") return lang() === "ar" ? "مثال: 36 أو 72 قطعة، أو كمية مخصصة" : "Ex. 36 ou 72 biscuits, ou quantité personnalisée";
    if (cat === "Plateaux cadeaux") return lang() === "ar" ? "مثال: صينية واحدة أو صينية مخصصة" : "Ex. 1 plateau, 2 plateaux, ou format personnalisé";
    if (cat === "Coffrets saisonniers") return lang() === "ar" ? "مثال: علبة واحدة أو علبتان" : "Ex. 1 coffret, 2 coffrets, ou format personnalisé";
    return lang() === "ar" ? "حددوا الكمية أو الحجم" : "Indiquez la quantité ou le format";
  }
  function setCustomInputMode(isCustom) {
    var input = $("quantite");
    if (!input) return;
    input.placeholder = placeholderFor(category());
    input.setAttribute("inputmode", isCustom ? "text" : "text");
    input.setAttribute("autocomplete", "off");
  }
  function render() {
    var wrap = $("quantityChips");
    var input = $("quantite");
    if (!wrap || !input) return;

    updateStateFromDom();
    var cat = state.category;
    var cfg = CONFIG[cat];
    wrap.innerHTML = "";

    if (!cfg) {
      setQuantity("");
      setCustomInputMode(true);
      return;
    }

    var list = cfg.quantities;
    var current = state.quantity;
    var preset = currentPreset(list, current);
    var customActive = !!current && !preset;

    list.forEach(function (item) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "quantity-chip";
      button.setAttribute("data-quantity", item.value);
      button.setAttribute("aria-pressed", item.custom ? (customActive ? "true" : "false") : (item.value === current ? "true" : "false"));
      button.setAttribute("aria-label", item.custom
        ? (lang() === "ar" ? "كمية مخصصة" : "Quantité personnalisée")
        : item[lang()]);
      button.textContent = item[lang()];
      if ((!item.custom && item.value === current) || (item.custom && customActive)) {
        button.classList.add("is-selected");
      }

      button.addEventListener("click", function () {
        var chips = wrap.querySelectorAll(".quantity-chip");
        Array.prototype.forEach.call(chips, function (chip) {
          chip.classList.remove("is-selected");
          chip.setAttribute("aria-pressed", "false");
        });
        button.classList.add("is-selected");
        button.setAttribute("aria-pressed", "true");
        if (item.custom) {
          setQuantity("");
          setCustomInputMode(true);
          try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
        } else {
          setQuantity(item.value, true);
          setCustomInputMode(false);
        }
        updateStateFromDom();
      });

      wrap.appendChild(button);
    });

    if (!preset && current && !customActive) setQuantity("");
    setCustomInputMode(customActive || !!(list.find(function (item) { return item.custom; }) && !current));
  }
  function clearQuantity() {
    var input = $("quantite");
    if (!input) return;
    input.value = "";
    state.quantity = "";
    dispatch(input, "input");
    dispatch(input, "change");
  }
  function updateSummaryIfAvailable() {
    updateStateFromDom();
    if (window.HinDelices && typeof window.HinDelices.readValues === "function") {
      try { window.HinDelices.readValues(); } catch (e) {}
    }
  }
  function syncCategory() {
    state.category = category();
    clearQuantity();
    render();
    var date = $("dateSouhaitee");
    if (date) dispatch(date, "change");
    updateSummaryIfAvailable();
  }
  function syncLanguage() {
    window.setTimeout(function () {
      render();
      updateSummaryIfAvailable();
    }, 0);
  }
  function syncDelivery() {
    var f = form();
    if (!f) return;
    var mode = checked("mode");
    var isDelivery = mode && mode.value === "Livraison";
    var zone = $("quartier");
    var extra = $("deliveryExtra");

    if (extra) {
      extra.classList.toggle("show", !!isDelivery);
      extra.classList.toggle("is-active", !!isDelivery);
      extra.setAttribute("aria-hidden", isDelivery ? "false" : "true");
    }
    if (zone) {
      zone.disabled = false;
      zone.required = !!isDelivery;
      if (!isDelivery) zone.value = "";
    }
    updateStateFromDom();
    updateSummaryIfAvailable();
  }
  function addIOSHardening() {
    var root = document.documentElement;
    root.style.webkitTextSizeAdjust = "100%";
    root.style.textSizeAdjust = "100%";
    var id = "hind-production-mobile-style";
    if (!$(id)) {
      var style = document.createElement("style");
      style.id = id;
      style.textContent = [
        "html{-webkit-text-size-adjust:100%;text-size-adjust:100%;overflow-x:hidden}",
        "body{overflow-x:hidden;-webkit-overflow-scrolling:touch}",
        "button,a,input,select,textarea{touch-action:manipulation}",
        ".quantity-chip,.cat-option,.radio-pill,.btn{min-height:48px}",
        "input,select,textarea{font-size:16px}",
        "#quantite{min-height:48px}",
        ".delivery-extra{scroll-margin-top:calc(88px + env(safe-area-inset-top))}",
        ".sticky-cta{padding-bottom:max(10px,env(safe-area-inset-bottom))}",
        ".lightbox{padding:max(12px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left))}",
        "@media(max-width:760px){.container{padding-left:max(18px,env(safe-area-inset-left));padding-right:max(18px,env(safe-area-inset-right))}.order-card{padding-bottom:calc(24px + env(safe-area-inset-bottom))}}"
      ].join("");
      document.head.appendChild(style);
    }

    var vv = window.visualViewport;
    function syncVH() {
      var h = vv && vv.height ? vv.height : window.innerHeight;
      root.style.setProperty("--app-vh", h + "px");
    }
    syncVH();
    window.addEventListener("resize", syncVH, { passive: true });
    if (vv) vv.addEventListener("resize", syncVH, { passive: true });

    document.addEventListener("focusin", function (event) {
      var el = event.target;
      if (!el || !/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) return;
      window.setTimeout(function () {
        if (document.activeElement !== el) return;
        try { el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" }); } catch (e) { el.scrollIntoView(); }
      }, 220);
    });

    var portrait = document.querySelector(".hind-image img");
    if (portrait) {
      portrait.addEventListener("error", function () {
        if (portrait.dataset.fallbackApplied === "1") return;
        portrait.dataset.fallbackApplied = "1";
        var picture = portrait.parentElement;
        if (picture && picture.tagName === "PICTURE") {
          Array.prototype.forEach.call(picture.querySelectorAll("source"), function (source) { source.removeAttribute("srcset"); });
        }
        portrait.src = "images/hind-delices-logo.webp";
        portrait.alt = "Hin Délices";
        portrait.classList.add("asset-fallback");
      }, { once: true });
    }

    Array.prototype.forEach.call(document.querySelectorAll("video"), function (video) {
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.muted = true;
    });
  }
  function boot() {
    var f = form();
    if (!f) return;

    addIOSHardening();

    f.addEventListener("change", function (event) {
      var target = event.target;
      if (target && target.name === "categorie") syncCategory();
      else if (target && target.name === "mode") syncDelivery();
      else if (target && target.name === "quartier") updateSummaryIfAvailable();
    }, true);

    var fr = $("langFr"), ar = $("langAr");
    if (fr) fr.addEventListener("click", syncLanguage);
    if (ar) ar.addEventListener("click", syncLanguage);

    var input = $("quantite");
    if (input) {
      input.addEventListener("input", function () {
        updateStateFromDom();
        var cat = state.category;
        var list = CONFIG[cat] ? CONFIG[cat].quantities : [];
        var value = input.value.trim();
        var preset = currentPreset(list, value);
        var wrap = $("quantityChips");
        if (wrap) Array.prototype.forEach.call(wrap.querySelectorAll(".quantity-chip"), function (chip) {
          var isCustom = chip.getAttribute("data-quantity") === "";
          chip.classList.toggle("is-selected", !preset && isCustom && !!value || (!!preset && chip.getAttribute("data-quantity") === value));
          chip.setAttribute("aria-pressed", chip.classList.contains("is-selected") ? "true" : "false");
        });
      });
    }

    render();
    syncDelivery();
    updateStateFromDom();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
