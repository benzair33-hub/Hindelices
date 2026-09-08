/* Hin Délices — Safari/iOS hardening + WebMCP ordering tools */
(function () {
  "use strict";

  /* Safari/iOS runtime hardening is intentionally outside the WebMCP feature gate. */
  (function safariHardening() {
    var root = document.documentElement;
    root.style.webkitTextSizeAdjust = "100%";
    root.style.textSizeAdjust = "100%";
    root.style.webkitTapHighlightColor = "transparent";
    root.classList.add("is-ios-safe");

    var styleId = "hind-ios-safari-style";
    if (!document.getElementById(styleId)) {
      var style = document.createElement("style");
      style.id = styleId;
      style.textContent = [
        "html{-webkit-text-size-adjust:100%;text-size-adjust:100%;-webkit-tap-highlight-color:transparent}",
        "button,a,input,select,textarea{font:inherit;-webkit-tap-highlight-color:transparent;touch-action:manipulation}",
        "input,select,textarea{font-size:16px}",
        "input[type=date],select{min-height:48px;-webkit-appearance:none;appearance:none;color-scheme:light}",
        "textarea{min-height:120px}",
        ".quantity-chip,.zone-chip,.radio-pill,.cat-option,.btn{min-height:48px}",
        ".sticky-cta{padding-bottom:max(10px,env(safe-area-inset-bottom))}",
        ".site-footer{padding-bottom:max(24px,env(safe-area-inset-bottom))}",
        ".lightbox{padding-top:max(12px,env(safe-area-inset-top));padding-right:max(12px,env(safe-area-inset-right));padding-bottom:max(12px,env(safe-area-inset-bottom));padding-left:max(12px,env(safe-area-inset-left))}",
        ".lightbox-close{min-width:48px;min-height:48px}",
        ".hero,.order-section,.delivery-zones-section{scroll-margin-top:calc(76px + env(safe-area-inset-top))}",
        "@supports (-webkit-touch-callout:none){.site-header{padding-top:env(safe-area-inset-top)}}",
        "@media(max-width:760px){.container{padding-left:max(18px,env(safe-area-inset-left));padding-right:max(18px,env(safe-area-inset-right))}.form-actions .btn,.single-submit-row .btn{min-height:52px}}",
        "@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}"
      ].join("");
      document.head.appendChild(style);
    }

    function syncVisualViewport() {
      var vv = window.visualViewport;
      var h = vv && vv.height ? vv.height : window.innerHeight;
      root.style.setProperty("--app-vh", h + "px");
    }
    syncVisualViewport();
    window.addEventListener("resize", syncVisualViewport, { passive: true });
    if (window.visualViewport) window.visualViewport.addEventListener("resize", syncVisualViewport, { passive: true });

    document.addEventListener("DOMContentLoaded", function () {
      Array.prototype.forEach.call(document.querySelectorAll("video"), function (video) {
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        video.muted = true;
      });
      Array.prototype.forEach.call(document.querySelectorAll('a[href*="wa.me/"]'), function (a) {
        var href = a.getAttribute("href") || "";
        var match = href.match(/^https:\/\/wa\.me\/(\d+)(\?.*)?$/);
        if (!match) return;
        a.href = "https://api.whatsapp.com/send?phone=" + match[1] + (match[2] || "");
        a.removeAttribute("target");
        a.removeAttribute("rel");
      });
    });

    var timer;
    document.addEventListener("focusin", function (event) {
      var el = event.target;
      if (!el || !/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (document.activeElement !== el) return;
        try { el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" }); }
        catch (e) { el.scrollIntoView(); }
      }, 220);
    });
  })();

  var modelContext = document.modelContext;
  if (!modelContext || typeof modelContext.registerTool !== "function") return;

  var PHONE = "212660530382";
  var CATEGORIES = {
    "Biscuits du quotidien": { price: 130, quantities: ["36 pièces", "72 pièces", "Sur mesure"] },
    "Gâteaux sur mesure": { price: 350, quantities: ["6–8 pers.", "10–12 pers.", "Sur mesure"] },
    "Plateaux cadeaux": { price: 240, quantities: ["1 plateau", "2 plateaux", "Sur mesure"] },
    "Coffrets saisonniers": { price: 180, quantities: ["1 coffret", "2 coffrets", "Sur mesure"] },
    "À discuter": { price: null, quantities: ["Sur mesure"] }
  };

  function clean(v) { return String(v == null ? "" : v).trim(); }
  function getForm() { return document.getElementById("orderForm"); }
  function getValues() {
    var f = getForm(); if (!f) return {};
    var d = new FormData(f);
    return {
      category: clean(d.get("categorie")), quantity: clean(d.get("quantite")), date: clean(d.get("date")),
      occasion: clean(d.get("occasion")), details: clean(d.get("details")),
      fulfillment: clean(d.get("mode")) || "Retrait", neighborhood: clean(d.get("quartier")),
      name: clean(d.get("nom")), phone: clean(d.get("telephone"))
    };
  }
  function getZones() {
    var select = document.getElementById("quartier"); if (!select) return [];
    return Array.prototype.map.call(select.options, function (o) {
      return { value: o.value, label: o.textContent.trim(), group: o.parentElement && o.parentElement.tagName === "OPTGROUP" ? o.parentElement.label : "" };
    }).filter(function (z) { return z.value; });
  }
  function minimumDate(category) {
    if (window.HinDelices && typeof window.HinDelices.getMinimumOrderDate === "function") return window.HinDelices.getMinimumOrderDate(category);
    var d = new Date(); d.setHours(d.getHours() + (category === "Gâteaux sur mesure" ? 48 : 24));
    return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
  }
  function validPhone(phone) {
    if (window.HinDelices && typeof window.HinDelices.isValidMoroccanPhone === "function") return window.HinDelices.isValidMoroccanPhone(phone);
    var n = clean(phone).replace(/[\s().-]/g, "").replace(/^00/, "+");
    return /^(?:\+212|0)[5-7]\d{8}$/.test(n);
  }
  function fire(el, type) { if (el) el.dispatchEvent(new Event(type, { bubbles: true })); }
  function choose(name, value) {
    var f = getForm(); var found = false; if (!f) return false;
    Array.prototype.forEach.call(f.querySelectorAll('input[name="' + name + '"]'), function (r) { r.checked = r.value === value; if (r.checked) { found = true; fire(r, "change"); } });
    return found;
  }
  function browseCreations() {
    return Object.keys(CATEGORIES).map(function (name) {
      var c = CATEGORIES[name];
      return { category: name, startingPriceMAD: c.price, priceLabel: c.price == null ? "Sur devis" : "Dès " + c.price + " MAD", quantityOptions: c.quantities };
    });
  }
  function validateOrder(input) {
    var v = Object.assign({}, getValues(), input || {}), errors = [];
    if (!CATEGORIES[clean(v.category)]) errors.push("category");
    if (!clean(v.quantity)) errors.push("quantity");
    if (!clean(v.date) || clean(v.date) < minimumDate(clean(v.category))) errors.push("date");
    if (!["Retrait", "Livraison"].includes(clean(v.fulfillment) || "Retrait")) errors.push("fulfillment");
    if (clean(v.fulfillment) === "Livraison" && !clean(v.neighborhood)) errors.push("neighborhood");
    if (!clean(v.name)) errors.push("name");
    if (!validPhone(v.phone)) errors.push("phone");
    return { valid: errors.length === 0, errors: errors, minimumDate: minimumDate(clean(v.category)) };
  }
  function prepareOrder(input) {
    input = input || {}; var f = getForm(); if (!f) return { ok: false, error: "Order form unavailable." };
    if (input.category && !CATEGORIES[input.category]) return { ok: false, error: "Unknown category.", allowedCategories: Object.keys(CATEGORIES) };
    if (input.category) choose("categorie", input.category);
    var q = document.getElementById("quantite"), date = document.getElementById("dateSouhaitee"), zone = document.getElementById("quartier");
    if (q && input.quantity !== undefined) { q.value = clean(input.quantity); fire(q,"input"); fire(q,"change"); }
    if (date && input.date !== undefined) { date.value = clean(input.date); fire(date,"input"); fire(date,"change"); }
    if (input.fulfillment !== undefined && !choose("mode", input.fulfillment)) return { ok:false, error:"Unknown fulfillment mode." };
    if (zone && input.neighborhood !== undefined) { zone.value = clean(input.neighborhood); fire(zone,"change"); }
    var order = document.getElementById("order"); if (order) order.scrollIntoView({behavior:"smooth",block:"start"});
    return { ok:true, order:getValues() };
  }
  function whatsapp(input) {
    var v = Object.assign({}, getValues(), input || {}), check = validateOrder(v);
    if (!check.valid) return { ready:false, requiresCorrection:true, validation:check };
    var ar = document.documentElement.lang === "ar";
    var message = ar
      ? ["السلام عليكم هند، بغيت ندوز كوماند لـ Hin Délices.","الفئة: "+v.category,"التاريخ: "+v.date,"الكمية: "+v.quantity,"المناسبة: "+(v.occasion||"غير محددة"),"التفاصيل: "+(v.details||"لا توجد"),"طريقة الاستلام: "+v.fulfillment,"الحي / المنطقة: "+(v.neighborhood||"غير محدد"),"الاسم: "+v.name,"الهاتف: "+v.phone].join("\n")
      : ["*Nouvelle demande — Hin Délices*","• Produit : "+v.category,"• Date : "+v.date,"• Quantité : "+v.quantity,"• Occasion : "+(v.occasion||"Non précisée"),"• Détails : "+(v.details||"Aucun"),"• Mode : "+v.fulfillment+(v.neighborhood?" (Zone : "+v.neighborhood+")":""),"• Client : "+v.name+" — "+v.phone].join("\n");
    return { ready:true, requiresUserConfirmation:true, reviewMessage:message, encodedText:encodeURIComponent(message), url:"https://wa.me/"+PHONE+"?text="+encodeURIComponent(message) };
  }

  var tools = [
    { name:"browse_creations", title:"Browse Hin Délices creations", description:"Read categories, starting MAD prices and quantity options. No page mutation.", inputSchema:{type:"object",properties:{}}, annotations:{readOnlyHint:true}, execute:async function(){return {currency:"MAD",creations:browseCreations()};} },
    { name:"get_delivery_zones", title:"Check Marrakech delivery zones", description:"Read current delivery zones and Quick Targa pickup. No order submission.", inputSchema:{type:"object",properties:{}}, annotations:{readOnlyHint:true}, execute:async function(){return {city:"Marrakech",pickup:"Quick Targa",zones:getZones()};} },
    { name:"get_current_order", title:"Read current order draft", description:"Read the visible order draft without submitting it.", inputSchema:{type:"object",properties:{}}, annotations:{readOnlyHint:true}, execute:async function(){return {order:getValues()};} },
    { name:"prepare_order", title:"Prepare an order", description:"Populate the existing visible order form. Never submits an order.", inputSchema:{type:"object",properties:{category:{type:"string",enum:Object.keys(CATEGORIES)},quantity:{type:"string"},date:{type:"string",format:"date"},fulfillment:{type:"string",enum:["Retrait","Livraison"]},neighborhood:{type:"string"}},required:["category"]}, annotations:{readOnlyHint:false}, execute:async function(i){return prepareOrder(i||{});} },
    { name:"validate_order", title:"Validate an order", description:"Validate category, quantity, lead time, delivery zone, and Moroccan phone format without sending.", inputSchema:{type:"object",properties:{category:{type:"string"},quantity:{type:"string"},date:{type:"string",format:"date"},fulfillment:{type:"string",enum:["Retrait","Livraison"]},neighborhood:{type:"string"},name:{type:"string"},phone:{type:"string"}}}, annotations:{readOnlyHint:true}, execute:async function(i){return validateOrder(i||{});} },
    { name:"prepare_whatsapp_order", title:"Prepare WhatsApp order", description:"Build the final WhatsApp message for review. Never opens WhatsApp.", inputSchema:{type:"object",properties:{category:{type:"string"},quantity:{type:"string"},date:{type:"string",format:"date"},occasion:{type:"string"},details:{type:"string"},fulfillment:{type:"string",enum:["Retrait","Livraison"]},neighborhood:{type:"string"},name:{type:"string"},phone:{type:"string"}}}, annotations:{readOnlyHint:true,untrustedContentHint:true}, execute:async function(i){return whatsapp(i||{});} },
    { name:"open_order_form", title:"Open the order form", description:"Scroll to the visible order form; does not submit.", inputSchema:{type:"object",properties:{category:{type:"string",enum:Object.keys(CATEGORIES)}}}, annotations:{readOnlyHint:false}, execute:async function(i){if(i&&i.category)prepareOrder({category:i.category});var o=document.getElementById("order");if(o)o.scrollIntoView({behavior:"smooth",block:"start"});return {opened:true};} },
    { name:"open_whatsapp_order", title:"Open reviewed order in WhatsApp", description:"Open WhatsApp only after the user explicitly confirms the prepared order.", inputSchema:{type:"object",properties:{confirmed:{type:"boolean"}},required:["confirmed"]}, annotations:{readOnlyHint:false,consequentialHint:true,untrustedContentHint:true}, execute:async function(i){if(!i||i.confirmed!==true)return {opened:false,requiresConfirmation:true,message:"User confirmation is required before opening WhatsApp."};var p=whatsapp({});if(!p.ready)return {opened:false,...p};window.location.href=p.url;return {opened:true,destination:"WhatsApp"};} }
  ];

  Promise.all(tools.map(function (tool) { return modelContext.registerTool(tool); }))
    .then(function () { document.documentElement.setAttribute("data-webmcp","ready"); })
    .catch(function (error) { console.warn("[Hin Délices] WebMCP registration unavailable:", error); });
})();
