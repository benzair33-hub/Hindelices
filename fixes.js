(function () {
  'use strict';

  var WHATSAPP_NUMBER = '212660530382';
  var form = document.getElementById('orderForm');
  if (!form) return;

  var quantityMap = {
    'Biscuits du quotidien': [
      ['36 pièces', '36 biscuits sablés', 'qty36'],
      ['72 pièces', '72 biscuits sablés', 'qty72'],
      ['Sur mesure', 'Sur mesure', 'qtyCustom']
    ],
    'Gâteaux sur mesure': [
      ['6–8 pers.', '6–8 personnes', 'qtyCake6'],
      ['10–12 pers.', '10–12 personnes', 'qtyCake10'],
      ['Sur mesure', 'Sur mesure', 'qtyCustom']
    ],
    'Plateaux cadeaux': [
      ['1 plateau', '1 plateau', 'qtyTray1'],
      ['2 plateaux', '2 plateaux', 'qtyTray2'],
      ['Sur mesure', 'Sur mesure', 'qtyCustom']
    ],
    'Coffrets saisonniers': [
      ['1 coffret', '1 coffret', 'qtyBox1'],
      ['2 coffrets', '2 coffrets', 'qtyBox2'],
      ['Sur mesure', 'Sur mesure', 'qtyCustom']
    ],
    'À discuter': [
      ['À définir ensemble', 'À définir ensemble', 'qtyDiscuss']
    ]
  };

  var i18n = {
    fr: { qty36: '36 pièces', qty72: '72 pièces', qtyCustom: 'Sur mesure', qtyCake6: '6–8 pers.', qtyCake10: '10–12 pers.', qtyTray1: '1 plateau', qtyTray2: '2 plateaux', qtyBox1: '1 coffret', qtyBox2: '2 coffrets', qtyDiscuss: 'À définir ensemble' },
    ar: { qty36: '36 قطعة', qty72: '72 قطعة', qtyCustom: 'مخصص', qtyCake6: '6–8 أشخاص', qtyCake10: '10–12 شخصًا', qtyTray1: 'صينية واحدة', qtyTray2: 'صينيتان', qtyBox1: 'علبة واحدة', qtyBox2: 'علبتان', qtyDiscuss: 'نحددها معًا' }
  };

  function lang() {
    return (document.documentElement.lang || 'fr').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'fr';
  }

  function setError(message, focusEl) {
    var err = document.getElementById('err1');
    if (err) {
      err.textContent = message;
      err.hidden = false;
      err.setAttribute('tabindex', '-1');
      err.focus({ preventScroll: true });
    }
    if (focusEl) focusEl.focus({ preventScroll: false });
  }

  function clearError() {
    var err = document.getElementById('err1');
    if (err) { err.hidden = true; err.textContent = ''; }
  }

  function normalizePhone(phone) {
    return String(phone || '').replace(/[\s().-]/g, '').replace(/^00/, '+');
  }

  function validPhone(phone) {
    return /^(?:\+212|0)[5-7]\d{8}$/.test(normalizePhone(phone));
  }

  function minDateFor(category) {
    var d = new Date();
    d.setHours(d.getHours() + (category === 'Gâteaux sur mesure' ? 48 : 24));
    return d.toISOString().slice(0, 10);
  }

  function refreshQuantityChips(category, reset) {
    var wrap = document.getElementById('quantityChips');
    var qty = document.getElementById('quantite');
    if (!wrap || !qty) return;
    var items = quantityMap[category] || [];
    wrap.innerHTML = '';
    items.forEach(function (item) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'quantity-chip';
      b.setAttribute('data-category', category);
      b.setAttribute('data-quantity', item[1]);
      b.setAttribute('data-i18n', item[2]);
      b.textContent = (i18n[lang()][item[2]] || item[0]);
      b.addEventListener('click', function () {
        qty.value = item[1];
        Array.prototype.forEach.call(wrap.querySelectorAll('.quantity-chip'), function (x) { x.classList.remove('is-selected'); x.setAttribute('aria-pressed', 'false'); });
        b.classList.add('is-selected');
        b.setAttribute('aria-pressed', 'true');
        qty.dispatchEvent(new Event('input', { bubbles: true }));
        updateSummarySafe();
      });
      b.setAttribute('aria-pressed', 'false');
      wrap.appendChild(b);
    });
    if (reset) {
      qty.value = '';
      Array.prototype.forEach.call(wrap.querySelectorAll('.quantity-chip'), function (x) { x.classList.remove('is-selected'); });
    }
  }

  function enhanceZones() {
    var select = document.getElementById('quartier');
    if (!select || select.tagName.toLowerCase() !== 'select') return;
    var existing = document.getElementById('zoneChipGrid');
    if (existing) return;

    var style = document.createElement('style');
    style.textContent = '.delivery-zone-field{display:none;margin-top:1rem}.delivery-zone-field.is-active{display:block}.zone-chip-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.55rem;margin-top:.65rem}.zone-chip{min-height:48px;padding:.65rem .75rem;border:1px solid var(--line);border-radius:999px;background:var(--white);color:var(--cocoa);font:inherit;font-size:.82rem;font-weight:700;cursor:pointer;transition:background .2s ease,border-color .2s ease,transform .2s ease,box-shadow .2s ease}.zone-chip:hover{border-color:var(--cocoa);transform:translateY(-1px)}.zone-chip[aria-pressed="true"]{background:var(--caramel);border-color:var(--caramel);color:var(--white);box-shadow:0 0 0 2px var(--honey)}.zone-chip:focus-visible{outline:3px solid var(--honey);outline-offset:2px}@media(max-width:760px){.zone-chip-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}';
    document.head.appendChild(style);

    select.setAttribute('aria-hidden', 'true');
    select.style.position = 'absolute';
    select.style.inlineSize = '1px';
    select.style.blockSize = '1px';
    select.style.opacity = '0';
    select.style.pointerEvents = 'none';

    var grid = document.createElement('div');
    grid.id = 'zoneChipGrid';
    grid.className = 'zone-chip-grid';
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', lang() === 'ar' ? 'الحي / المنطقة' : 'Quartier / zone');
    Array.prototype.forEach.call(select.options, function (opt) {
      if (!opt.value) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'zone-chip';
      b.textContent = opt.textContent;
      b.setAttribute('aria-pressed', 'false');
      b.dataset.value = opt.value;
      b.addEventListener('click', function () {
        select.value = opt.value;
        Array.prototype.forEach.call(grid.querySelectorAll('.zone-chip'), function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        select.dispatchEvent(new Event('change', { bubbles: true }));
        updateSummarySafe();
      });
      grid.appendChild(b);
    });
    select.parentNode.insertBefore(grid, select.nextSibling);
  }

  function selectedZone() {
    var select = document.getElementById('quartier');
    return select ? select.value : '';
  }

  function setZoneState(delivery) {
    var select = document.getElementById('quartier');
    var extra = document.getElementById('deliveryExtra');
    var grid = document.getElementById('zoneChipGrid');
    if (extra) {
      extra.classList.toggle('is-active', delivery);
      extra.setAttribute('aria-hidden', String(!delivery));
    }
    if (select) {
      select.disabled = false;
      select.required = delivery;
      if (!delivery) select.value = '';
    }
    if (grid) {
      Array.prototype.forEach.call(grid.querySelectorAll('.zone-chip'), function (b) {
        b.setAttribute('aria-pressed', delivery && b.dataset.value === selectedZone() ? 'true' : 'false');
      });
    }
  }

  function updateSummarySafe() {
    var cat = form.querySelector('input[name="categorie"]:checked');
    var date = document.getElementById('dateSouhaitee');
    var qty = document.getElementById('quantite');
    var mode = form.querySelector('input[name="mode"]:checked');
    var c = document.getElementById('summaryCategory');
    var d = document.getElementById('summaryDate');
    var q = document.getElementById('summaryQty');
    var m = document.getElementById('summaryMode');
    if (c) c.textContent = cat ? cat.value : '—';
    if (d) d.textContent = date && date.value ? date.value.split('-').reverse().join('/') : '—';
    if (q) q.textContent = qty && qty.value ? qty.value : '—';
    if (m) m.textContent = mode ? mode.value : '—';
  }

  function setDateConstraint() {
    var cat = form.querySelector('input[name="categorie"]:checked');
    var date = document.getElementById('dateSouhaitee');
    var hint = document.getElementById('dateHint');
    if (!date) return;
    var min = minDateFor(cat ? cat.value : '');
    date.min = min;
    if (hint) hint.textContent = cat && cat.value === 'Gâteaux sur mesure'
      ? (lang() === 'ar' ? 'الكعك حسب الطلب: مهلة 48 ساعة على الأقل.' : 'Gâteaux sur mesure : préavis de 48h minimum.')
      : (lang() === 'ar' ? 'التحضير العادي: مهلة 24 ساعة على الأقل.' : 'Préparation standard : préavis de 24h minimum.');
  }

  function onCategoryChange() {
    var cat = form.querySelector('input[name="categorie"]:checked');
    refreshQuantityChips(cat ? cat.value : '', true);
    setDateConstraint();
    updateSummarySafe();
  }

  function buildMessage() {
    var fd = new FormData(form);
    var category = String(fd.get('categorie') || '');
    var date = String(fd.get('date') || '');
    var quantity = String(fd.get('quantite') || '');
    var occasion = String(fd.get('occasion') || '');
    var details = String(fd.get('details') || '');
    var mode = String(fd.get('mode') || 'Retrait');
    var neighborhood = String(fd.get('quartier') || '');
    var name = String(fd.get('nom') || '');
    var phone = String(fd.get('telephone') || '');
    if (lang() === 'ar') return ['مرحبًا هند، أود تقديم طلب إلى Hin Délices.','الفئة: ' + category,'التاريخ: ' + date,'الكمية: ' + quantity,'المناسبة: ' + (occasion || 'غير محددة'),'التفاصيل: ' + (details || 'لا توجد'),'طريقة الاستلام: ' + mode,'الحي / المنطقة: ' + (neighborhood || 'غير محدد'),'الاسم: ' + name,'الهاتف: ' + phone].join('\n');
    return ['*Nouvelle demande — Hin Délices*','• Produit : ' + category,'• Date : ' + date,'• Quantité : ' + quantity,'• Occasion : ' + (occasion || 'Non précisée'),'• Détails : ' + (details || 'Aucun'),'• Mode : ' + mode + (neighborhood ? ' (Zone : ' + neighborhood + ')' : ''),'• Client : ' + name + ' — ' + phone].join('\n');
  }

  function validateAndSend(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    clearError();
    var cat = form.querySelector('input[name="categorie"]:checked');
    var qty = document.getElementById('quantite');
    var date = document.getElementById('dateSouhaitee');
    var mode = form.querySelector('input[name="mode"]:checked');
    var name = document.getElementById('nom');
    var phone = document.getElementById('telephone');
    var zone = document.getElementById('quartier');
    var min = minDateFor(cat ? cat.value : '');
    if (!cat || !qty || !qty.value.trim()) return setError(lang() === 'ar' ? 'يرجى اختيار الفئة والكمية.' : 'Merci de choisir une catégorie et une quantité.', qty || null);
    if (!date || !date.value || date.value < min) return setError(lang() === 'ar' ? 'يرجى اختيار تاريخ يحترم المهلة المحددة.' : 'Merci de choisir une date respectant le délai indiqué.', date || null);
    if (!mode) return setError(lang() === 'ar' ? 'يرجى اختيار طريقة الاستلام.' : 'Merci de choisir un mode de réception.', null);
    if (mode.value === 'Livraison' && (!zone || !zone.value)) return setError(lang() === 'ar' ? 'يرجى اختيار منطقتكم للتوصيل.' : 'Merci de choisir votre zone de livraison.', document.getElementById('zoneChipGrid') || null);
    if (!name || !name.value.trim()) return setError(lang() === 'ar' ? 'يرجى إدخال اسمكم.' : 'Merci d’indiquer votre nom.', name);
    if (!phone || !validPhone(phone.value)) return setError(lang() === 'ar' ? 'يرجى إدخال رقم هاتف مغربي صالح.' : 'Merci d’indiquer un numéro de téléphone marocain valide.', phone);
    var url = 'https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(buildMessage());
    window.location.href = url;
  }

  enhanceZones();
  var categoryInputs = form.querySelectorAll('input[name="categorie"]');
  Array.prototype.forEach.call(categoryInputs, function (input) { input.addEventListener('change', onCategoryChange); });
  Array.prototype.forEach.call(document.querySelectorAll('.order-trigger'), function (trigger) {
    trigger.addEventListener('click', function () {
      window.setTimeout(function () {
        var cat = trigger.getAttribute('data-category') || '';
        refreshQuantityChips(cat, true);
        setDateConstraint();
        updateSummarySafe();
      }, 0);
    });
  });
  var modeInputs = form.querySelectorAll('input[name="mode"]');
  Array.prototype.forEach.call(modeInputs, function (input) {
    input.addEventListener('change', function () { setZoneState(input.checked && input.value === 'Livraison'); updateSummarySafe(); });
  });
  var zoneSelect = document.getElementById('quartier');
  if (zoneSelect) zoneSelect.addEventListener('change', function () { updateSummarySafe(); });
  Array.prototype.forEach.call(form.querySelectorAll('input,select,textarea'), function (el) {
    el.addEventListener('input', updateSummarySafe);
    el.addEventListener('change', updateSummarySafe);
  });
  Array.prototype.forEach.call([document.getElementById('langFr'), document.getElementById('langAr')], function (button) {
    if (!button) return;
    button.addEventListener('click', function () {
      window.setTimeout(function () {
        var cat = form.querySelector('input[name="categorie"]:checked');
        refreshQuantityChips(cat ? cat.value : '', false);
        enhanceZones();
        setDateConstraint();
      }, 0);
    });
  });
  form.addEventListener('submit', validateAndSend, true);
  setDateConstraint();
  var initialCategory = form.querySelector('input[name="categorie"]:checked');
  refreshQuantityChips(initialCategory ? initialCategory.value : '', false);
  var initialMode = form.querySelector('input[name="mode"]:checked');
  setZoneState(!!initialMode && initialMode.value === 'Livraison');
  updateSummarySafe();
})();
