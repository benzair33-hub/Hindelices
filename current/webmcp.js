/* Hin Délices — WebMCP agent tools
 * Optional enhancement: the site remains fully functional when WebMCP is unavailable.
 * No secrets or customer data are exposed through tool schemas.
 */
(function () {
  "use strict";

  if (!document.modelContext || typeof document.modelContext.registerTool !== "function") {
    return;
  }

  var WHATSAPP_NUMBER = "212660530382";
  var PRICE_BY_CATEGORY = {
    "Biscuits du quotidien": "130 MAD",
    "Gâteaux sur mesure": "350 MAD",
    "Plateaux cadeaux": "240 MAD",
    "Coffrets saisonniers": "180 MAD",
    "À discuter": "Sur devis"
  };

  var QUANTITIES = {
    "Biscuits du quotidien": ["36 pièces", "72 pièces", "Sur mesure"],
    "Gâteaux sur mesure": ["6–8 pers.", "10–12 pers.", "Sur mesure"],
    "Plateaux cadeaux": ["1 plateau", "2 plateaux", "Sur mesure"],
    "Coffrets saisonniers": ["1 coffret", "2 coffrets", "Sur mesure"],
    "À discuter": ["Sur mesure"]
  };

  function clean(value) {
    return String(value == null ? "" : value).trim();
  }

  function getCategory() {
    var el = document.querySelector('input[name="categorie"]:checked');
    return el ? el.value : "";
  }

  function getForm() {
    return document.getElementById("orderForm");
  }

  function getZones() {
    var select = document.getElementById("quartier");
    if (!select) return [];
    return Array.prototype.map.call(select.options, function (option) {
      return {
        value: option.value,
        label: option.textContent.trim(),
        group: option.parentElement && option.parentElement.tagName === "OPTGROUP"
          ? option.parentElement.label
          : ""
      };
    }).filter(function (zone) {
      return zone.value;
    });
  }

  function getMinimumDate(category) {
    var base = new Date();
    var hours = category === "Gâteaux sur mesure" ? 48 : 24;
    base.setTime(base.getTime() + hours * 60 * 60 * 1000);
    var y = base.getFullYear();
    var m = String(base.getMonth() + 1).padStart(2, "0");
    var d = String(base.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function browseCreations() {
    return Object.keys(PRICE_BY_CATEGORY).map(function (category) {
      return {
        category: category,
        startingPrice: PRICE_BY_CATEGORY[category],
        quantityOptions: QUANTITIES[category] || []
      };
    });
  }

  function getOrderValues() {
    var form = getForm();
    if (!form) return {};
    var data = new FormData(form);
    return {
      category: clean(data.get("categorie")),
      quantity: clean(data.get("quantite")),
      date: clean(data.get("date")),
      occasion: clean(data.get("occasion")),
      details: clean(data.get("details")),
      fulfillment: clean(data.get("mode")) || "Retrait",
      neighborhood: clean(data.get("quartier")),
      name: clean(data.get("nom")),
      phone: clean(data.get("telephone"))
    };
  }

  function isValidPhone(phone) {
    var normalized = clean(phone).replace(/[\s().-]/g, "").replace(/^00/, "+");
    return /^(?:\+212|0)[5-7]\d{8}$/.test(normalized);
  }

  function validateOrder(input) {
    input = input || {};
    var category = clean(input.category);
    var quantity = clean(input.quantity);
    var date = clean(input.date);
    var fulfillment = clean(input.fulfillment) || "Retrait";
    var neighborhood = clean(input.neighborhood);
    var name = clean(input.name);
    var phone = clean(input.phone);

    var errors = [];
    if (!PRICE_BY_CATEGORY[category]) errors.push("category");
    if (!quantity) errors.push("quantity");
    if (!date || date < getMinimumDate(category)) errors.push("date");
    if (fulfillment === "Livraison" && !neighborhood) errors.push("neighborhood");
    if (!name) errors.push("name");
    if (!isValidPhone(phone)) errors.push("phone");

    return {
      valid: errors.length === 0,
      errors: errors,
      minimumDate: getMinimumDate(category),
      message: errors.length ? "Order needs correction before it can be prepared." : "Order is valid and ready for user review."
    };
  }

  function prepareOrder(input) {
    var form = getForm();
    if (!form) return { ok: false, error: "Order form unavailable." };

    var category = clean(input && input.category);
    var quantity = clean(input && input.quantity);
    var date = clean(input && input.date);
    var fulfillment = clean(input && input.fulfillment) || "Retrait";
    var neighborhood = clean(input && input.neighborhood);

    if (category && !PRICE_BY_CATEGORY[category]) {
      return { ok: false, error: "Unknown category." };
    }

    var radios = form.querySelectorAll('input[name="categorie"]');
    Array.prototype.forEach.call(radios, function (radio) {
      radio.checked = radio.value === category;
    });

    var qty = document.getElementById("quantite");
    if (qty && quantity) qty.value = quantity;

    var dateInput = document.getElementById("dateSouhaitee");
    if (dateInput && date) dateInput.value = date;

    var mode = form.querySelectorAll('input[name="mode"]');
    Array.prototype.forEach.call(mode, function (radio) {
      radio.checked = radio.value === fulfillment;
    });

    var zone = document.getElementById("quartier");
    if (zone) {
      zone.value = neighborhood || "";
      zone.required = fulfillment === "Livraison";
    }

    if (typeof window.HinDelices === "object" && typeof window.HinDelices.readValues === "function") {
      // Refresh the site's existing summary without replacing its form logic.
      window.HinDelices.readValues();
    }

    return {
      ok: true,
      category: category || getCategory(),
      startingPrice: PRICE_BY_CATEGORY[category] || "",
      quantity: quantity,
      date: date,
      fulfillment: fulfillment,
      neighborhood: neighborhood
    };
  }

  function prepareWhatsAppOrder(input) {
    var values = Object.assign({}, getOrderValues(), input || {});
    var validation = validateOrder(values);
    if (!validation.valid) {
      return {
        ready: false,
        requiresCorrection: true,
        validation: validation
      };
    }

    var message = [
      "*Nouvelle demande — Hin Délices*",
      "• Produit : " + values.category,
      "• Date : " + values.date,
      "• Quantité : " + values.quantity,
      "• Occasion : " + (values.occasion || "Non précisée"),
      "• Détails : " + (values.details || "Aucun"),
      "• Mode : " + values.fulfillment + (values.neighborhood ? " (Zone : " + values.neighborhood + ")" : ""),
      "• Client : " + values.name + " — " + values.phone
    ].join("\n");

    return {
      ready: true,
      requiresUserConfirmation: true,
      phone: WHATSAPP_NUMBER,
      encodedText: encodeURIComponent(message),
      reviewMessage: message,
      url: "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message)
    };
  }

  var tools = [
    {
      name: "browse_creations",
      title: "Browse Hin Délices creations",
      description: "Read Hin Délices categories, starting prices in MAD, and suitable quantity options. Does not change the page.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async function () {
        return { currency: "MAD", creations: browseCreations() };
      }
    },
    {
      name: "get_delivery_zones",
      title: "Check Marrakech delivery zones",
      description: "Read the delivery zones currently offered by the Hin Délices order form. Does not place or submit an order.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async function () {
        return { city: "Marrakech", zones: getZones(), pickup: "Quick Targa" };
      }
    },
    {
      name: "validate_order",
      title: "Validate a Hin Délices order",
      description: "Check category, quantity, lead time, delivery zone, customer name, and Moroccan phone format without opening WhatsApp or submitting anything.",
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
        },
        required: ["category", "quantity", "date", "fulfillment", "name", "phone"]
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async function (input) {
        return validateOrder(input);
      }
    },
    {
      name: "prepare_order",
      title: "Prepare an order in the Hin Délices form",
      description: "Prefill the visible Hin Délices order form with user-provided choices. It does not send the order.",
      inputSchema: {
        type: "object",
        properties: {
          category: { type: "string" },
          quantity: { type: "string" },
          date: { type: "string", format: "date" },
          fulfillment: { type: "string", enum: ["Retrait", "Livraison"] },
          neighborhood: { type: "string" }
        },
        required: ["category"]
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: async function (input) {
        return prepareOrder(input || {});
      }
    },
    {
      name: "prepare_whatsapp_order",
      title: "Prepare a WhatsApp order for review",
      description: "Build the exact WhatsApp order message from the current or supplied order. It never opens WhatsApp and requires user review before sending.",
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
        return prepareWhatsAppOrder(input || {});
      }
    },
    {
      name: "open_order_form",
      title: "Open the Hin Délices order form",
      description: "Scroll to the order form so the user can review or edit the request. Does not submit an order.",
      inputSchema: {
        type: "object",
        properties: { category: { type: "string" } }
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: async function (input) {
        var result = input && input.category ? prepareOrder({ category: input.category }) : { ok: true };
        var order = document.getElementById("order");
        if (order) order.scrollIntoView({ behavior: "smooth", block: "start" });
        return Object.assign(result, { opened: true });
      }
    },
    {
      name: "open_whatsapp_order",
      title: "Open WhatsApp with the reviewed Hin Délices order",
      description: "Open WhatsApp with the prepared order message. This is a consequential user-facing handoff and must only be used after the user has reviewed and confirmed the order.",
      inputSchema: {
        type: "object",
        properties: {
          confirmed: { type: "boolean", description: "True only after the user explicitly confirms the prepared order." }
        },
        required: ["confirmed"]
      },
      annotations: { readOnlyHint: false, consequentialHint: true, untrustedContentHint: true },
      execute: async function (input) {
        if (!input || input.confirmed !== true) {
          return { opened: false, requiresConfirmation: true, message: "User confirmation is required before opening WhatsApp." };
        }

        var prepared = prepareWhatsAppOrder({});
        if (!prepared.ready) return { opened: false, ...prepared };

        window.location.href = prepared.url;
        return { opened: true, destination: "WhatsApp", message: "WhatsApp handoff initiated after confirmation." };
      }
    }
  ];

  Promise.all(tools.map(function (tool) {
    return document.modelContext.registerTool(tool);
  })).then(function () {
    document.documentElement.setAttribute("data-webmcp", "ready");
  }).catch(function (error) {
    console.warn("[Hin Délices] WebMCP registration unavailable:", error);
  });
})();
