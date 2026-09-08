/* Hin Délices — GitHub Pages + local-market enhancement layer */
(function () {
  'use strict';

  var WHATSAPP = '212660530382';
  var ROOT_URL = 'https://benzair33-hub.github.io/Hindelices/';

  function isAR() {
    return (document.documentElement.lang || 'fr').toLowerCase().indexOf('ar') === 0;
  }

  function upsertMeta(name, content, attr) {
    attr = attr || 'name';
    var el = document.head && document.head.querySelector('meta[' + attr + '=\"' + name + '\"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function addSeoSchema() {
    if (!document.head || document.getElementById('hind-local-schema')) return;
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'hind-local-schema';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Bakery',
      '@id': ROOT_URL + '#bakery',
      'name': 'Hin Délices',
      'url': ROOT_URL,
      'image': ROOT_URL + 'current/images/hero-cookies.jpg',
      'telephone': '+212660530382',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Quick Targa',
        'addressLocality': 'Marrakech',
        'addressRegion': 'Marrakech-Safi',
        'addressCountry': 'MA'
      },
      'areaServed': ['Targa', 'Guéliz', 'Hivernage', 'Semlalia', 'Palmeraie', 'Victor Hugo', 'Agdal'],
      'knowsLanguage': ['fr', 'ar'],
      'hasMenu': {
        '@type': 'Menu',
        'name': 'Nos Créations',
        'hasMenuItem': [
          { '@type': 'MenuItem', 'name': 'Sablés & Cookies Maison', 'offers': { '@type': 'Offer', 'price': '130', 'priceCurrency': 'MAD' } },
          { '@type': 'MenuItem', 'name': 'Cake Design & Gâteaux', 'offers': { '@type': 'Offer', 'price': '350', 'priceCurrency': 'MAD' } },
          { '@type': 'MenuItem', 'name': 'Plateau Assorti Prestige', 'offers': { '@type': 'Offer', 'price': '240', 'priceCurrency': 'MAD' } },
          { '@type': 'MenuItem', 'name': 'Coffret saisonnier', 'offers': { '@type': 'Offer', 'price': '180', 'priceCurrency': 'MAD' } }
        ]
      },
      'sameAs': ['https://www.instagram.com/hin_delices']
    });
    document.head.appendChild(script);
  }

  function applySeo() {
    upsertMeta('keywords', 'cake design marrakech, patisserie marrakech, gateau anniversaire marrakech, sables prestige marrakech, livraison gateau targa gueliz, حلويات مراكش, كيك ديزاين مراكش');
    upsertMeta('MA-11', 'Marrakech-Safi', 'geo.region');
    upsertMeta('Marrakech (Targa)', 'Marrakech (Targa)', 'geo.placename');
    upsertMeta('31.6508;-8.0322', '31.6508;-8.0322', 'geo.position');
    var canonical = document.head.querySelector('link[rel=\"canonical\"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = ROOT_URL;
    addSeoSchema();
  }

  var labels = {
    fr: {
      cat1: 'Sablés & Cookies Maison',
      cat2: 'Cake Design & Gâteaux',
      cat3: 'Plateau Assorti Prestige',
      cat4: 'Coffrets saisonniers',
      pickup: 'Retrait à Quick Targa',
      submit: 'Continuer sur WhatsApp',
      greeting: 'Salam Hind ! Je souhaiterais passer une commande via Hin Délices.'
    },
    ar: {
      cat1: 'صابلي وكوكيز الدار',
      cat2: 'كيك ديزاين وطورطات المناسبات',
      cat3: 'بلاطو مشكل للهدايا',
      cat4: 'علب موسمية',
      pickup: 'الاستلام من تاركة (Quick Targa)',
      submit: 'دوز الطلب ف الواتساب ↗',
      greeting: 'السلام عليكم هند، بغيت ندوز كوماند من Hin Délices.'
    }
  };

  function text(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  function applyLocalizedLabels() {
    var L = labels[isAR() ? 'ar' : 'fr'];
    text('#cat-biscuits h3', L.cat1);
    text('#cat-gateaux h3', L.cat2);
    text('#cat-plateaux h3', L.cat3);
    text('#cat-coffrets h3', L.cat4);
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n="fulfillmentPickup"], .pickup-label'), function (el) { el.textContent = L.pickup; });
    var submit = document.querySelector('#orderForm button[type="submit"]');
    if (submit) submit.textContent = L.submit;
  }

  function minDate(category) {
    var d = new Date();
    d.setHours(d.getHours() + (category === 'Gâteaux sur mesure' ? 48 : 24));
    return d.toISOString().slice(0, 10);
  }

  function enforceDateSafeguard(form) {
    if (!form) return;
    var date = document.getElementById('dateSouhaitee');
    var hint = document.getElementById('dateHint');
    if (!date) return;
    function refresh() {
      var checked = form.querySelector('input[name="categorie"]:checked');
      var cat = checked ? checked.value : '';
      date.min = minDate(cat);
      date.setAttribute('min', date.min);
      date.style.minHeight = '48px';
      date.style.colorScheme = 'light';
      if (hint) hint.textContent = cat === 'Gâteaux sur mesure'
        ? (isAR() ? 'كيك حسب الطلب: خاص على الأقل 48 ساعة.' : 'Gâteaux sur mesure : préavis de 48h minimum.')
        : (isAR() ? 'التحضير العادي: خاص على الأقل 24 ساعة.' : 'Préparation standard : préavis de 24h minimum.');
    }
    refresh();
    Array.prototype.forEach.call(form.querySelectorAll('input[name="categorie"]'), function (el) { el.addEventListener('change', refresh); });
  }

  function fallbackForm(form) {
    if (!form) return;
    form.setAttribute('action', 'https://api.whatsapp.com/send');
    form.setAttribute('method', 'GET');
    form.setAttribute('target', '_self');
    var phone = form.querySelector('input[name="phone"]');
    if (!phone) {
      phone = document.createElement('input'); phone.type = 'hidden'; phone.name = 'phone'; form.appendChild(phone);
    }
    phone.value = WHATSAPP;
    var greeting = form.querySelector('input[name="text"]');
    if (!greeting) {
      greeting = document.createElement('input'); greeting.type = 'hidden'; greeting.name = 'text'; form.appendChild(greeting);
    }
    greeting.value = labels[isAR() ? 'ar' : 'fr'].greeting;
  }

  function patchWhatsappLinks() {
    Array.prototype.forEach.call(document.querySelectorAll('a[href*="wa.me/' + WHATSAPP + '"]'), function (a) {
      a.href = 'https://api.whatsapp.com/send?phone=' + WHATSAPP;
      a.removeAttribute('target');
      a.removeAttribute('rel');
    });
  }

  function patchQuantityReset(form) {
    if (!form) return;
    var qty = document.getElementById('quantite');
    var chips = document.getElementById('quantityChips');
    if (!qty || !chips) return;
    Array.prototype.forEach.call(form.querySelectorAll('input[name="categorie"]'), function (input) {
      input.addEventListener('change', function () {
        qty.value = '';
        Array.prototype.forEach.call(chips.querySelectorAll('.quantity-chip'), function (chip) {
          chip.classList.remove('is-selected');
          chip.setAttribute('aria-pressed', 'false');
        });
      });
    });
  }

  function ensureZoneChips(form) {
    var select = document.getElementById('quartier');
    if (!form || !select || document.getElementById('zoneChipGrid')) return;
    var zones = Array.prototype.map.call(select.options, function (o) { return { value: o.value, label: o.textContent }; }).filter(function (z) { return z.value; });
    var grid = document.createElement('div');
    grid.id = 'zoneChipGrid'; grid.className = 'zone-chip-grid'; grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', isAR() ? 'الحي / المنطقة' : 'Quartier / zone');
    zones.forEach(function (zone) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'zone-chip'; b.textContent = zone.label; b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () {
        select.value = zone.value;
        Array.prototype.forEach.call(grid.children, function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        select.dispatchEvent(new Event('change', { bubbles: true }));
      });
      grid.appendChild(b);
    });
    select.parentNode.insertBefore(grid, select.nextSibling);
    select.setAttribute('aria-hidden', 'true');
    select.style.position = 'absolute'; select.style.inlineSize = '1px'; select.style.blockSize = '1px'; select.style.opacity = '0'; select.style.pointerEvents = 'none';
    var s = document.createElement('style');
    s.textContent = '.zone-chip-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.55rem;margin-top:.65rem}.zone-chip{min-height:48px;padding:.65rem .75rem;border:1px solid var(--line);border-radius:999px;background:var(--white);color:var(--cocoa);font:inherit;font-size:.82rem;font-weight:700;cursor:pointer}.zone-chip[aria-pressed="true"]{background:var(--caramel);border-color:var(--caramel);color:var(--white)}@media(max-width:760px){.zone-chip-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}';
    document.head.appendChild(s);
  }

  function init() {
    applySeo();
    var form = document.getElementById('orderForm');
    if (form) {
      fallbackForm(form);
      enforceDateSafeguard(form);
      patchQuantityReset(form);
      ensureZoneChips(form);
      var formText = form.querySelector('input[name="text"]');
      form.addEventListener('input', function () {
        if (formText) formText.value = labels[isAR() ? 'ar' : 'fr'].greeting;
      });
    }
    patchWhatsappLinks();
    applyLocalizedLabels();
    var fr = document.getElementById('langFr');
    var ar = document.getElementById('langAr');
    if (fr) fr.addEventListener('click', function () { setTimeout(applyLocalizedLabels, 50); });
    if (ar) ar.addEventListener('click', function () { setTimeout(applyLocalizedLabels, 50); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
