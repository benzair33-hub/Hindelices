/* Hin Délices — WebMCP ordering tools
 * Progressive enhancement: the normal website works unchanged without WebMCP.
 */
(function () {
  "use strict";

  var modelContext = document.modelContext;
  if (!modelContext || typeof modelContext.registerTool !== "function") return;

  var PHONE = "212660530382";
  var CATEGORIES = {
    "Biscuits du quotidien": { price: 130, quantities: ["36 pièces", "72 pièces", "Sur mesure"] },
    "Plateaux cadeaux": { price: 240, quantities: ["1 plateau", "2 plateaux", "Sur mesure"] },
    "Coffrets saisonniers": { price: 180, quantities: ["1 coffret", "2 coffrets", "Sur mesure"] },
    "Gâteaux sur mesure": { price: 350, quantities: ["6–8 pers.", "10–12 pers.", "Sur mesure"] },
    "À discuter": { price: null, quantities: ["Sur mesure"] }
  };

  function clean(v) { return String(v == null ? "" : v).trim(); }

  function form() { return document.getElementById("orderForm"); }

  function values() {
    var f = form();
    if (!f) return {};
    var fd = new FormData(f);
    return {
      category: clean(fd.get("categorie")),
      quantity: clean(fd.get("quantite")),
      date: clean(fd.get("date")),
      occasion: clean(fd.get("occasion")),
      details: clean(fd.get("details")),
      fulfillment: clean(fd.get("mode")) || "Retrait",
      neighborhood: clean(fd.get("quartier")),
      name: clean(fd.get("nom")),
      phone: clean(fd.get("telephone"))
    };
  }

  function zones() {
    var select = document.getElementById("quartier");
    if (!select) return [];
    return Array.prototype.map.call(select.options, function (o) {
      return {
        value: o.value,
        label: o.textContent.trim(),
        group: o.parentElement && o.parentElement.tagName === "OPTGROUP"
          ? o.parentElement.label : ""
      };
    }).filter(function (z) { return z.value; });
  }

  function minimumDate(category) {
    if (window.HinDelices && typeof window.HinDelices.getMinimumOrderDate === "function") {
      return window.HinDelices.getMinimumOrderDate(category);
    }
    var d = new Date();
    d.setHours(d.getHours() + (category === "Gâteaux sur mesure" ? 48 : 24));
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }

  function validPhone(phone) {
    if (window.HinDelices && typeof window.HinDelices.isValidMoroccanPhone === "function") {
      return window.HinDelices.isValidMoroccanPhone(phone);
    }
    var n = clean(phone).replace(/[\s().-]/g, "").replace(/^00/, "+");
    return /^(?:\+212|0)[5-7]\d{8}$/.test(n);
  }

  function dispatch(el, type) {
    if (el) el.dispatchEvent(new Event(type, { bubbles: true }));
  }

  function selectRadio(name, value) {
    var f = form();
    if (!f) return false;
    var found = false;
    Array.prototype.forEach.call(f.querySelectorAll('input[name="' + name + '"]'), function (r) {
      var match = r.value === value;
      r.checked = match;
      if (match) { found = true; dispatch(r, "change"); }
    });
    return found;
  }

  function browseCreations() {
    return Object.keys(CATEGORIES).map(function (name) {
      var c = CATEGORIES[name];
      return {
        category: name,
        startingPriceMAD: c.price,
        priceLabel: c.price == null ? "Sur devis" : "Dès " + c.price + " MAD",
        quantityOptions: c.quantities
      };
    });
  }

  function getDeliveryZones() {
    return {
      city: "Marrakech",
      pickup: "Quick Targa",
      zones: zones()
    };
  }

  function validateOrder(input) {
    var v = Object.assign({}, values(), input || {});
    var errors = [];
    var category = clean(v.category);
    var quantity = clean(v.quantity);
    var date = clean(v.date);
    var fulfillment = clean(v.fulfillment) || "Retrait";
    var neighborhood = clean(v.neighborhood);
    var name = clean(v.name);
    var phone = clean(v.phone);

    if (!CATEGORIES[category]) errors.push("category");
    if (!quantity) errors.push("quantity");
    if (!date || date < minimumDate(category)) errors.push("date");
    if (fulfillment !== "Retrait" && fulfillment !== "Livraison") errors.push("fulfillment");
    if (fulfillment === "Livraison" && !neighborhood) errors.push("neighborhood");
    if (!name) errors.push("name");
    if (!validPhone(phone)) errors.push("phone");

    return {
      valid: errors.length === 0,
      errors: errors,
      minimumDate: minimumDate(category),
      fulfillment: fulfillment,
      message: errors.length
        ? "Order needs correction before WhatsApp handoff."
        : "Order is valid and ready for user review."
    };
  }

  function prepareOrder(input) {
    input = input || {};
    var f = form();
    if (!f) return { ok: false, error: "Order form unavailable." };

    if (input.category && !CATEGORIES[input.category]) {
      return { ok: false, error: "Unknown category.", allowedCategories: Object.keys(CATEGORIES) };
    }

    if (input.category) selectRadio("categorie", input.category);

    var qty = document.getElementById("quantite");
    if (input.quantity !== undefined && qty) {
      qty.value = clean(input.quantity);
      dispatch(qty, "input");
      dispatch(qty, "change");
    }

    var date = document.getElementById("dateSouhaitee");
    if (input.date !== undefined && date) {
      date.value = clean(input.date);
      dispatch(date, "input");
      dispatch(date, "change");
    }

    if (input.fulfillment !== undefined) {
      if (!selectRadio("mode", input.fulfillment)) {
        return { ok: false, error: "Unknown fulfillment mode." };
      }
    }

    var zone = document.getElementById("quartier");
    if (input.neighborhood !== undefined && zone) {
      zone.value = clean(input.neighborhood);
      dispatch(zone, "change");
    }

    if (window.HinDelices && typeof window.HinDelices.readValues === "function") {
      window.HinDelices.readValues();
    }

    var current = values();
    return {
      ok: true,
      order: {
        category: current.category,
        quantity: current.quantity,
        date: current.date,
        fulfillment: current.fulfillment,
        neighborhood: current.neighborhood
      },
      startingPriceMAD: CATEGORIES[current.category] ? CATEGORIES[current.category].price : null
    };
  }

  function prepareWhatsApp(input) {
    var v = Object.assign({}, values(), input || {});
    var check = validateOrder(v);
    if (!check.valid) return { ready: false, requiresCorrection: true, validation: check };

    var message;
    if (document.documentElement.lang === "ar") {
      message = [
        "السلام عليكم هند، بغيت ندوز كوماند لـ Hin Délices.",
        "الفئة: " + v.category,
        "التاريخ: " + v.date,
        "الكمية: " + v.quantity,
        "المناسبة: " + (v.occasion || "غير محددة"),
        "التفاصيل: " + (v.details || "لا توجد"),
        "طريقة الاستلام: " + v.fulfillment,
        "الحي / المنطقة: " + (v.neighborhood || "غير محدد"),
        "الاسم: " + v.name,
        "الهاتف: " + v.phone
      ].join("\n");
    } else {
      message = [
        "*Nouvelle demande — Hin Délices*",
        "• Produit : " + v.category,
        "• Date : " + v.date,
        "• Quantité : " + v.quantity,
        "• Occasion : " + (v.occasion || "Non précisée"),
        "• Détails : " + (v.details || "Aucun"),
        "• Mode : " + v.fulfillment + (v.neighborhood ? " (Zone : " + v.neighborhood + ")" : ""),
        "• Client : " + v.name + " — " + v.phone
      ].join("\n");
    }

    return {
      ready: true,
      requiresUserConfirmation: true,
      reviewMessage: message,
      encodedText: encodeURIComponent(message),
      url: "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(message)
    };
  }

  var tools = [
    {
      name: "browse_creations",
      title: "Browse Hin Délices creations",
      description: "Read current Hin Délices categories, starting prices in MAD, and suitable quantity options. Read-only.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async function () {
        return { currency: "MAD", creations: browseCreations() };
      }
    },
    {
      name: "get_delivery_zones",
      title: "Check Marrakech delivery zones",
      description: "Read the delivery zones exposed by the current Hin Délices order form and the Quick Targa pickup location. Read-only.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async function () {
        return getDeliveryZones();
      }
    },
    {
      name: "get_current_order",
      title: "Read current order draft",
      description: "Read the current visible order draft from the Hin Délices form. Does not submit or send anything.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async function () {
        return { order: values() };
      }
    },
    {
      name: "prepare_order",
      title: "Prepare an order",
      description: "Populate the existing Hin Délices order form with a category, quantity, date, fulfillment mode, and delivery zone. Never submits the order.",
      inputSchema: {
        type: "object",
        properties: {
          category: { type: "string", enum: Object.keys(CATEGORIES) },
          quantity: { type: "string" },
          date: { type: "string", format: "date" },
          fulfillment: { type: "string", enum: ["Retrait", "Livraison"] },
          neighborhood: { type: "string" }
        },
        required: ["category"]
      },
      annotations: { readOnlyHint: false },
      execute: async function (input) {
        var result = prepareOrder(input);
        var order = document.getElementById("order");
        if (order) order.scrollIntoView({ behavior: "smooth", block: "start" });
        return result;
      }
    },
    {
      name: "validate_order",
      title: "Validate an order",
      description: "Validate the current or supplied order, including lead time, delivery zone, and Moroccan phone format. Does not send anything.",
      inputSchema: {
        type: "object",
        properties: {
          category: { type: "string" },
          quantity: { type: "string" },
          date: { type: "string", format: "date" },
          fulfillment: { type: "string", enum: ["Retrait", "Livraison"] },
          neighborhood: { type: "string" },
          name: { type: "string" },
          phone: { type: "string" }
        }
      },
      annotations: { readOnlyHint: true },
      execute: async function (input) {
        return validateOrder(input || {});
      }
    },
    {
      name: "prepare_whatsapp_order",
      title: "Prepare WhatsApp order",
      description: "Create the final WhatsApp message and encoded URL after validating the current or supplied order. It never opens WhatsApp.",
      inputSchema: {
        type: "object",
        properties: {
          category: { type: "string" },
          quantity: { type: "string" },
          date: { type: "string", format: "date" },
          occasion: { type: "string" },
          details: { type: "string" },
          fulfillment: { type: "string", enum: ["Retrait", "Livraison"] },
          neighborhood: { type: "string" },
          name: { type: "string" },
          phone: { type: "string" }
        }
      },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: async function (input) {
        return prepareWhatsApp(input || {});
      }
    },
    {
      name: "open_order_form",
      title: "Open the order form",
      description: "Navigate the user to the visible Hin Délices order section without submitting an order.",
      inputSchema: {
        type: "object",
        properties: { category: { type: "string", enum: Object.keys(CATEGORIES) } }
      },
      annotations: { readOnlyHint: false },
      execute: async function (input) {
        if (input && input.category) prepareOrder({ category: input.category });
        var order = document.getElementById("order");
        if (order) order.scrollIntoView({ behavior: "smooth", block: "start" });
        return { opened: true, section: "order" };
      }
    },
    {
      name: "open_whatsapp_order",
      title: "Open reviewed order in WhatsApp",
      description: "Open WhatsApp only after the user has explicitly reviewed and confirmed the prepared order.",
      inputSchema: {
        type: "object",
        properties: {
          confirmed: {
            type: "boolean",
            description: "Must be true only after the user explicitly confirms the reviewed order."
          }
        },
        required: ["confirmed"]
      },
      annotations: { readOnlyHint: false, consequentialHint: true, untrustedContentHint: true },
      execute: async function (input) {
        if (!input || input.confirmed !== true) {
          return {
            opened: false,
            requiresConfirmation: true,
            message: "User confirmation is required before opening WhatsApp."
          };
        }

        var prepared = prepareWhatsApp({});
        if (!prepared.ready) return { opened: false, ...prepared };

        window.location.href = prepared.url;
        return { opened: true, destination: "WhatsApp" };
      }
    }
  ];

  Promise.all(tools.map(function (tool) {
    return modelContext.registerTool(tool);
  })).then(function () {
    document.documentElement.setAttribute("data-webmcp", "ready");
  }).catch(function (error) {
    console.warn("[Hin Délices] WebMCP registration unavailable:", error);
  });
})();