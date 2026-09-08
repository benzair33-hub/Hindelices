/* Hin Délices — robust GitHub Pages / mobile conversion hardening */
(function () {
  'use strict';

  var WHATSAPP = '212660530382';
  var ROOT_URL = 'https://benzair33-hub.github.io/Hindelices/';

  function isAR() {
    return (document.documentElement.lang || 'fr').toLowerCase().indexOf('ar') === 0;
  }

  function currentCategory(form) {
    var input = form && form.querySelector('input[name="categorie"]:checked');
    return input ? input.value : '';
  }

  function minimumDate(category) {
    var d = new Date();
    d.setHours(d.getHours() + (category === 'Gâteaux sur mesure' ? 48 : 24));
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function applyDateGuard(form) {
    var date = document.getElementById('dateSouhaitee');
    if (!date) return;
    function refresh() {
      var min = minimumDate(currentCategory(form));
      date.min = min;
      date.setAttribute('min', min);
      date.style.minHeight = '48px';
      date.style.colorScheme = 'light';
      if (date.value && date.value < min) date.value = '';
      var hint = document.getElementById('dateHint');
      if (hint) hint.textContent = currentCategory(form) === 'Gâteaux sur mesure'
        ? (isAR() ? 'كيك حسب الطلب: خاص على الأقل 48 ساعة.' : 'Gâteaux sur mesure : préavis de 48h minimum.')
        : (isAR() ? 'التحضير العادي: خاص على الأقل 24 ساعة.' : 'Préparation standard : préavis de 24h minimum.');
    }
    refresh();
    form.querySelectorAll('input[name="categorie"]').forEach(function (r) { r.addEventListener('change', refresh); });
  }

  var quantityMap = {
    'Biscuits du quotidien': [
      ['36 pièces', '36 biscuits sablés'], ['72 pièces', '72 biscuits sablés'], ['Sur mesure', 'Sur mesure']
    ],
    'Gâteaux sur mesure': [
      ['6–8 pers.', '6–8 personnes'], ['10–12 pers.', '10–12 personnes'], ['Sur mesure', 'Sur mesure']
    ],
    'Plateaux cadeaux': [
      ['1 plateau', '1 plateau'], ['2 plateaux', '2 plateaux'], ['Sur mesure', 'Sur mesure']
    ],
    'Coffrets saisonniers': [
      ['1 coffret', '1 coffret'], ['2 coffrets', '2 coffrets'], ['Sur mesure', 'Sur mesure']
    ],
    'À discuter': [
      ['À définir ensemble', 'À définir ensemble']
    ]
  };

  function renderQuantity(form) {
    var wrap = document.getElementById('quantityChips');
    var qty = document.getElementById('quantite');
    if (!wrap || !qty) return;

    var category = currentCategory(form);
    var items = quantityMap[category] || [];
    wrap.innerHTML = '';
    qty.value = '';
    qty.removeAttribute('aria-invalid');
    qty.removeAttribute('inputmode');

    items.forEach(function (item) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'quantity-chip';
      chip.textContent = isAR() ? ({'36 pièces':'36 قطعة','72 pièces':'72 قطعة','Sur mesure':'مخصص','6–8 pers.':'6–8 أشخاص','10–12 pers.':'10–12 شخصًا','1 plateau':'صينية واحدة','2 plateaux':'صينيتان','1 coffret':'علبة واحدة','2 coffrets':'علبتان','À définir ensemble':'نحددها معًا'}[item[0]] || item[0]) : item[0];
      chip.setAttribute('data-quantity', item[1]);
      chip.setAttribute('aria-pressed', 'false');
      chip.addEventListener('click', function () {
        qty.value = item[1];
        wrap.querySelectorAll('.quantity-chip').forEach(function (c) {
          c.classList.remove('active', 'is-selected');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('active', 'is-selected');
        chip.setAttribute('aria-pressed', 'true');
        qty.dispatchEvent(new Event('input', { bubbles: true }));
      });
      wrap.appendChild(chip);
    });
  }

  function applyQuantityGuard(form) {
    form.querySelectorAll('input[name="categorie"]').forEach(function (radio) {
      radio.addEventListener('change', function () { renderQuantity(form); });
    });
    renderQuantity(form);
  }

  function applyDeliveryGuard(form) {
    var zone = document.getElementById('quartier');
    var extra = document.getElementById('deliveryExtra');
    if (!zone) return;

    function refresh() {
      var mode = form.querySelector('input[name="mode"]:checked');
      var delivery = !!mode && mode.value === 'Livraison';
      if (delivery) {
        zone.setAttribute('required', 'required');
      } else {
        zone.removeAttribute('required');
        zone.value = '';
      }
      if (extra) {
        extra.classList.toggle('is-active', delivery);
        extra.setAttribute('aria-hidden', String(!delivery));
      }
      var grid = document.getElementById('zoneChipGrid');
      if (grid) grid.querySelectorAll('.zone-chip').forEach(function (chip) {
        chip.setAttribute('aria-pressed', String(delivery && zone.value === chip.getAttribute('data-value')));
      });
    }

    form.querySelectorAll('input[name="mode"]').forEach(function (r) { r.addEventListener('change', refresh); });
    zone.addEventListener('change', refresh);
    refresh();
  }

  function addZoneChips(form) {
    var select = document.getElementById('quartier');
    if (!select || document.getElementById('zoneChipGrid')) return;

    var grid = document.createElement('div');
    grid.id = 'zoneChipGrid';
    grid.className = 'zone-chip-grid';
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', isAR() ? 'الحي / المنطقة' : 'Quartier / zone');

    Array.from(select.options).forEach(function (option) {
      if (!option.value) return;
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'zone-chip';
      chip.textContent = option.textContent;
      chip.setAttribute('data-value', option.value);
      chip.setAttribute('aria-pressed', 'false');
      chip.addEventListener('click', function () {
        select.value = option.value;
        grid.querySelectorAll('.zone-chip').forEach(function (x) { x.setAttribute('aria-pressed', String(x === chip)); });
        select.dispatchEvent(new Event('change', { bubbles: true }));
      });
      grid.appendChild(chip);
    });

    select.parentNode.insertBefore(grid, select.nextSibling);
    select.setAttribute('aria-hidden', 'true');
    select.style.position = 'absolute';
    select.style.inlineSize = '1px';
    select.style.blockSize = '1px';
    select.style.opacity = '0';
    select.style.pointerEvents = 'none';

    var style = document.createElement('style');
    style.textContent = '.zone-chip-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.55rem;margin-top:.65rem}.zone-chip{min-height:48px;padding:.65rem .75rem;border:1px solid var(--line);border-radius:999px;background:var(--white);color:var(--cocoa);font:inherit;font-size:.82rem;font-weight:700;cursor:pointer}.zone-chip[aria-pressed="true"]{background:var(--caramel);border-color:var(--caramel);color:var(--white);box-shadow:0 0 0 2px var(--honey)}.zone-chip:focus-visible{outline:3px solid var(--honey);outline-offset:2px}@media(max-width:760px){.zone-chip-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}';
    document.head.appendChild(style);
  }

  function whatsappMessage(form) {
    var fd = new FormData(form);
    var data = {
      category: String(fd.get('categorie') || ''),
      date: String(fd.get('date') || ''),
      quantity: String(fd.get('quantite') || ''),
      occasion: String(fd.get('occasion') || ''),
      details: String(fd.get('details') || ''),
      mode: String(fd.get('mode') || 'Retrait'),
      zone: String(fd.get('quartier') || ''),
      name: String(fd.get('nom') || ''),
      phone: String(fd.get('telephone') || '')
    };

    if (isAR()) return [
      'السلام عليكم هند، بغيت ندوز كوماند من Hin Délices.',
      'الفئة: ' + data.category,
      'التاريخ: ' + data.date,
      'الكمية: ' + data.quantity,
      'المناسبة: ' + (data.occasion || 'غير محددة'),
      'التفاصيل: ' + (data.details || 'لا توجد'),
      'طريقة الاستلام: ' + data.mode,
      'الحي / المنطقة: ' + (data.zone || 'غير محدد'),
      'الاسم: ' + data.name,
      'الهاتف: ' + data.phone
    ].join('\n');

    return [
      'Salam Hind ! Je souhaiterais passer une commande via Hin Délices.',
      '• Produit : ' + data.category,
      '• Date : ' + data.date,
      '• Quantité : ' + data.quantity,
      '• Occasion : ' + (data.occasion || 'Non précisée'),
      '• Détails : ' + (data.details || 'Aucun'),
      '• Mode : ' + data.mode + (data.zone ? ' (Zone : ' + data.zone + ')' : ''),
      '• Client : ' + data.name + ' — ' + data.phone
    ].join('\n');
  }

  function validPhone(value) {
    var normalized = String(value || '').replace(/[\s().-]/g, '').replace(/^00/, '+');
    return /^(?:\+212|0)[5-7]\d{8}$/.test(normalized);
  }

  function showError(form, message, field) {
    var error = document.getElementById('err1');
    if (error) {
      error.textContent = message;
      error.hidden = false;
      error.setAttribute('tabindex', '-1');
      try { error.focus({ preventScroll: true }); } catch (e) { error.focus(); }
    }
    if (field && typeof field.focus === 'function') {
      try { field.focus({ preventScroll: true }); } catch (e) { field.focus(); }
    }
  }

  function validate(form) {
    var category = currentCategory(form);
    var qty = document.getElementById('quantite');
    var date = document.getElementById('dateSouhaitee');
    var mode = form.querySelector('input[name="mode"]:checked');
    var zone = document.getElementById('quartier');
    var name = document.getElementById('nom');
    var phone = document.getElementById('telephone');
    var min = date ? date.min : minimumDate(category);

    if (!category || !qty || !qty.value.trim()) { showError(form, isAR() ? 'يرجى اختيار الفئة والكمية.' : 'Merci de choisir une catégorie et une quantité.', qty); return false; }
    if (!date || !date.value || date.value < min) { showError(form, isAR() ? 'يرجى اختيار تاريخ يحترم المهلة المحددة.' : 'Merci de choisir une date respectant le délai indiqué.', date); return false; }
    if (!mode) { showError(form, isAR() ? 'يرجى اختيار طريقة الاستلام.' : 'Merci de choisir un mode de réception.', null); return false; }
    if (mode.value === 'Livraison' && (!zone || !zone.value)) { showError(form, isAR() ? 'يرجى اختيار منطقتكم للتوصيل.' : 'Merci de choisir votre zone de livraison.', document.getElementById('zoneChipGrid') || zone); return false; }
    if (!name || !name.value.trim()) { showError(form, isAR() ? 'يرجى إدخال اسمكم.' : 'Merci d’indiquer votre nom.', name); return false; }
    if (!phone || !validPhone(phone.value)) { showError(form, isAR() ? 'يرجى إدخال رقم هاتف مغربي صالح.' : 'Merci d’indiquer un numéro de téléphone marocain valide.', phone); return false; }
    return true;
  }

  function applyWhatsappLinks() {
    document.querySelectorAll('a[href*="wa.me/"], a[href*="api.whatsapp.com/send"]').forEach(function (a) {
      var message = isAR() ? 'السلام عليكم هند، بغيت نتواصل معاكم من Hin Délices.' : 'Salam Hind ! Je souhaite passer une commande via Hin Délices.';
      a.href = 'https://api.whatsapp.com/send?phone=' + WHATSAPP + '&text=' + encodeURIComponent(message);
      a.removeAttribute('target');
      a.removeAttribute('rel');
    });
  }

  function setup() {
    var form = document.getElementById('orderForm');
    if (!form) { applyWhatsappLinks(); return; }

    var qty = document.getElementById('quantite');
    if (qty) qty.removeAttribute('inputmode');

    applyDateGuard(form);
    applyQuantityGuard(form);
    addZoneChips(form);
    applyDeliveryGuard(form);
    applyWhatsappLinks();

    /* Capture phase: this is the definitive submission path even if an older listener is attached. */
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!validate(form)) return;
      window.location.href = 'https://api.whatsapp.com/send?phone=' + WHATSAPP + '&text=' + encodeURIComponent(whatsappMessage(form));
    }, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup); else setup();
})();
