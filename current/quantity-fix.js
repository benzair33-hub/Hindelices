/* Hin Délices — quantity selector hardening
   Rebuilds quantity presets from the selected category so Safari/iOS never
   keeps the previous category's default (e.g. 36 pièces).
*/
(function () {
  "use strict";

  var presets = {
    "Biscuits du quotidien": {
      fr: [["36 pièces", "36 biscuits sablés"], ["72 pièces", "72 biscuits sablés"], ["Sur mesure", "Sur mesure"]],
      ar: [["36 قطعة", "36 biscuits sablés"], ["72 قطعة", "72 biscuits sablés"], ["مخصص", "Sur mesure"]]
    },
    "Gâteaux sur mesure": {
      fr: [["6–8 pers.", "6–8 personnes"], ["10–12 pers.", "10–12 personnes"], ["Sur mesure", "Sur mesure"]],
      ar: [["6–8 أشخاص", "6–8 أشخاص"], ["10–12 شخصًا", "10–12 أشخاص"], ["مخصص", "Sur mesure"]]
    },
    "Plateaux cadeaux": {
      fr: [["1 plateau", "1 plateau"], ["2 plateaux", "2 plateaux"], ["Sur mesure", "Sur mesure"]],
      ar: [["صينية واحدة", "1 plateau"], ["صينيتان", "2 plateaux"], ["مخصص", "Sur mesure"]]
    },
    "Coffrets saisonniers": {
      fr: [["1 coffret", "1 coffret"], ["2 coffrets", "2 coffrets"], ["Sur mesure", "Sur mesure"]],
      ar: [["علبة واحدة", "1 coffret"], ["علبتان", "2 coffrets"], ["مخصص", "Sur mesure"]]
    },
    "À discuter": {
      fr: [["Sur mesure", "Sur mesure"]],
      ar: [["مخصص", "Sur mesure"]]
    }
  };

  function getCategory() {
    var checked = document.querySelector('#orderForm input[name="categorie"]:checked');
    return checked ? checked.value : "";
  }

  function setQuantity(value) {
    var input = document.getElementById("quantite");
    if (!input) return;
    input.value = value || "";
    try { input.dispatchEvent(new Event("input", { bubbles: true })); } catch (e) {}
    try { input.dispatchEvent(new Event("change", { bubbles: true })); } catch (e) {}
  }

  function render() {
    var wrap = document.getElementById("quantityChips");
    if (!wrap) return;

    var category = getCategory();
    var lang = document.documentElement.lang === "ar" ? "ar" : "fr";
    var list = presets[category] && presets[category][lang];
    if (!list) list = presets["À discuter"].fr;

    var current = document.getElementById("quantite");
    var currentValue = current ? current.value : "";
    var matched = list.some(function (item) { return item[1] === currentValue; });

    wrap.innerHTML = "";
    list.forEach(function (item) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "quantity-chip";
      button.setAttribute("data-quantity", item[1]);
      button.textContent = item[0];
      button.setAttribute("aria-pressed", item[1] === currentValue ? "true" : "false");
      if (item[1] === currentValue) button.classList.add("is-selected");

      button.addEventListener("click", function () {
        wrap.querySelectorAll(".quantity-chip").forEach(function (chip) {
          chip.classList.remove("is-selected");
          chip.setAttribute("aria-pressed", "false");
        });
        button.classList.add("is-selected");
        button.setAttribute("aria-pressed", "true");
        setQuantity(item[1]);
      });
      wrap.appendChild(button);
    });

    if (!matched) {
      setQuantity("");
      wrap.querySelectorAll(".quantity-chip").forEach(function (chip) {
        chip.classList.remove("is-selected");
        chip.setAttribute("aria-pressed", "false");
      });
    }
  }

  function boot() {
    var form = document.getElementById("orderForm");
    if (!form) return;
    form.querySelectorAll('input[name="categorie"]').forEach(function (radio) {
      radio.addEventListener("change", function () {
        setQuantity("");
        render();
      });
    });
    var fr = document.getElementById("langFr");
    var ar = document.getElementById("langAr");
    if (fr) fr.addEventListener("click", function () { window.setTimeout(render, 0); });
    if (ar) ar.addEventListener("click", function () { window.setTimeout(render, 0); });
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
