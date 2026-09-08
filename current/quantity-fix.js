/* Hin Délices — category-aware order state + mobile hardening */
(function () {
  "use strict";
  var CONFIG = {
    "Biscuits du quotidien": {
      quantities: [
        { fr:"36 pièces", ar:"36 قطعة", value:"36 pièces" },
        { fr:"72 pièces", ar:"72 قطعة", value:"72 pièces" },
        { fr:"Sur mesure", ar:"حسب الطلب", value:"", custom:true }
      ]
    },
    "Gâteaux sur mesure": {
      quantities: [
        { fr:"6–8 pers.", ar:"6–8 أشخاص", value:"6–8 pers." },
        { fr:"10–12 pers.", ar:"10–12 شخصًا", value:"10–12 pers." },
        { fr:"Sur mesure", ar:"حسب الطلب", value:"", custom:true }
      ]
    },
    "Plateaux cadeaux": {
      quantities: [
        { fr:"1 plateau", ar:"صينية واحدة", value:"1 plateau" },
        { fr:"2 plateaux", ar:"صينيتان", value:"2 plateaux" },
        { fr:"Sur mesure", ar:"حسب الطلب", value:"", custom:true }
      ]
    },
    "Coffrets saisonniers": {
      quantities: [
        { fr:"1 coffret", ar:"علبة واحدة", value:"1 coffret" },
        { fr:"2 coffrets", ar:"علبتان", value:"2 coffrets" },
        { fr:"Sur mesure", ar:"حسب الطلب", value:"", custom:true }
      ]
    },
    "À discuter": { quantities:[{ fr:"Sur mesure", ar:"حسب الطلب", value:"", custom:true }] }
  };
  var state = { category:"", quantity:"", mode:"Retrait", neighborhood:"" };
  function $(id){ return document.getElementById(id); }
  function getForm(){ return $("orderForm"); }
  function getLang(){ return document.documentElement.lang === "ar" ? "ar" : "fr"; }
  function checked(name){ var f=getForm(); return f ? f.querySelector('input[name="'+name+'"]:checked') : null; }
  function getCategory(){ var r=checked("categorie"); return r ? r.value : ""; }
  function emit(el,type){ if(!el)return; try{el.dispatchEvent(new Event(type,{bubbles:true}));}catch(e){var x=document.createEvent("Event");x.initEvent(type,true,true);el.dispatchEvent(x);} }
  function syncState(){
    state.category=getCategory();
    var q=$("quantite"), m=checked("mode"), z=$("quartier");
    state.quantity=q ? String(q.value||"").trim() : "";
    state.mode=m ? m.value : "Retrait";
    state.neighborhood=z ? String(z.value||"").trim() : "";
    return state;
  }
  function placeholder(cat){
    if(getLang()==="ar"){
      if(cat==="Gâteaux sur mesure")return "مثال: لـ 10 أشخاص أو كعكة من طابقين";
      if(cat==="Biscuits du quotidien")return "مثال: 36 أو 72 قطعة، أو كمية مخصصة";
      if(cat==="Plateaux cadeaux")return "مثال: صينية واحدة أو صينية مخصصة";
      if(cat==="Coffrets saisonniers")return "مثال: علبة واحدة أو علبتان";
      return "صفوا الكمية أو الحجم المرغوب";
    }
    if(cat==="Gâteaux sur mesure")return "Ex. pour 10 personnes, ou gâteau à 2 étages";
    if(cat==="Biscuits du quotidien")return "Ex. 36 ou 72 biscuits, ou quantité personnalisée";
    if(cat==="Plateaux cadeaux")return "Ex. 1 plateau, 2 plateaux, ou format personnalisé";
    if(cat==="Coffrets saisonniers")return "Ex. 1 coffret, 2 coffrets, ou format personnalisé";
    return "Décrivez la quantité ou le format souhaité";
  }
  function clearInvalidFields(){
    var q=$("quantite"), z=$("quartier");
    if(q) q.value="";
    if(z && state.mode!=="Livraison") z.value="";
  }
  function renderQuantity(){
    var wrap=$("quantityChips"), q=$("quantite");
    if(!wrap||!q)return;
    syncState();
    var list=(CONFIG[state.category]||CONFIG["À discuter"]).quantities;
    var current=state.quantity;
    var isPreset=list.some(function(x){return !x.custom&&x.value===current;});
    var isCustom=!!current&&!isPreset;
    wrap.innerHTML="";
    list.forEach(function(item){
      var b=document.createElement("button");
      b.type="button"; b.className="quantity-chip"; b.textContent=item[getLang()];
      b.setAttribute("data-quantity",item.value);
      var selected=item.custom?isCustom:(item.value===current);
      b.classList.toggle("is-selected",selected); b.setAttribute("aria-pressed",selected?"true":"false");
      b.setAttribute("aria-label",item[getLang()]);
      b.addEventListener("click",function(){
        Array.prototype.forEach.call(wrap.querySelectorAll(".quantity-chip"),function(x){x.classList.remove("is-selected");x.setAttribute("aria-pressed","false");});
        b.classList.add("is-selected"); b.setAttribute("aria-pressed","true");
        if(item.custom){q.value="";q.placeholder=placeholder(state.category);try{q.focus({preventScroll:true});}catch(e){q.focus();}}
        else{q.value=item.value;q.placeholder=placeholder(state.category);}
        syncState(); emit(q,"input"); emit(q,"change");
      });
      wrap.appendChild(b);
    });
    q.placeholder=placeholder(state.category);
  }
  function syncCategory(){
    state.category=getCategory();
    var q=$("quantite"); if(q)q.value="";
    renderQuantity();
    var date=$("dateSouhaitee"); if(date)emit(date,"change");
  }
  function syncDelivery(){
    var f=getForm(); if(!f)return;
    var mode=checked("mode"), delivery=!!mode&&mode.value==="Livraison", zone=$("quartier"), extra=$("deliveryExtra");
    if(extra){extra.classList.toggle("show",delivery);extra.classList.toggle("is-active",delivery);extra.setAttribute("aria-hidden",delivery?"false":"true");}
    if(zone){zone.required=delivery;zone.disabled=false;if(!delivery)zone.value="";}
    syncState(); emit(zone,"change");
  }
  function fixPortrait(){
    var picture=document.querySelector(".hind-image picture"), img=picture&&picture.querySelector("img");
    if(!img)return;
    var src=img.getAttribute("src")||"";
    if(src.indexOf("hind-portrait")!==-1){
      Array.prototype.forEach.call(picture.querySelectorAll("source"),function(s){s.removeAttribute("srcset");});
      img.src="images/hind-delices-logo.webp";
      img.alt="Hin Délices — identité visuelle de la créatrice Hind";
      img.classList.add("asset-fallback");
    }
  }
  function injectMobileAndCompatibilityCSS(){
    if($("hind-production-fixes-style"))return;
    var s=document.createElement("style");s.id="hind-production-fixes-style";s.textContent=[
      "html{-webkit-text-size-adjust:100%;text-size-adjust:100%;overflow-x:hidden}",
      "body{overflow-x:hidden;-webkit-overflow-scrolling:touch}",
      "button,a,input,select,textarea{touch-action:manipulation}",
      "input,select,textarea{font-size:16px}",
      ".quantity-chip,.cat-option,.radio-pill,.btn{min-height:48px}",
      ".order-layout{display:grid;grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr);gap:32px;align-items:start}",
      ".order-intro{position:sticky;top:96px}",
      ".category-options,.fulfillment-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}",
      ".delivery-extra{margin-top:12px}",
      ".delivery-extra.show,.delivery-extra.is-active{display:block}",
      ".hind-image{display:flex;align-items:center;justify-content:center;min-height:320px;overflow:hidden;border-radius:24px}",
      ".hind-image img{display:block;width:100%;height:auto;max-height:620px;object-fit:contain}",
      ".hind-image img.asset-fallback{width:min(78%,420px);padding:28px;background:rgba(255,253,249,.7);border-radius:24px}",
      ".value-grid,.values-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}",
      ".how-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}",
      ".footer-logo{font-size:1.3rem;font-weight:700}",
      ".btn-light{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 18px;border-radius:999px;background:var(--cream);color:var(--cocoa);font-weight:700}",
      ".text-link{display:inline-flex;align-items:center;min-height:44px}",
      ".lightbox{padding:max(12px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left))}",
      ".lightbox-close{min-width:48px;min-height:48px}",
      ".sticky-cta{padding-bottom:max(10px,env(safe-area-inset-bottom))}",
      "@media(max-width:760px){.order-layout{display:block}.order-intro{position:static;margin-bottom:22px}.category-options,.fulfillment-options,.value-grid,.values-grid,.how-grid{grid-template-columns:1fr}.hind-image{min-height:240px}.hind-image img.asset-fallback{width:min(74%,300px)}.order-card{padding-bottom:calc(24px + env(safe-area-inset-bottom))}}",
      "@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}"
    ].join("");document.head.appendChild(s);
  }
  function hardenA11y(){
    var map={menuToggle:["Ouvrir le menu","فتح القائمة"],lightboxClose:["Fermer","إغلاق"],backTop:["Retour en haut","العودة إلى الأعلى"]};
    Object.keys(map).forEach(function(id){var el=$(id);if(el)el.setAttribute("aria-label",map[id][getLang()==="ar"?1:0]);});
    ["quantite","dateSouhaitee","quartier","nom","telephone"].forEach(function(id){var el=$(id);if(el)el.setAttribute("autocomplete",el.getAttribute("autocomplete")||"off");});
  }
  function boot(){
    var f=getForm(); if(!f)return;
    injectMobileAndCompatibilityCSS(); fixPortrait(); hardenA11y();
    f.addEventListener("change",function(e){
      if(!e||!e.target)return;
      if(e.target.name==="categorie")syncCategory();
      else if(e.target.name==="mode")syncDelivery();
      else if(e.target.name==="quartier")syncState();
    },true);
    var fr=$("langFr"),ar=$("langAr");if(fr)fr.addEventListener("click",function(){setTimeout(function(){renderQuantity();hardenA11y();},0);});if(ar)ar.addEventListener("click",function(){setTimeout(function(){renderQuantity();hardenA11y();},0);});
    var q=$("quantite");if(q)q.addEventListener("input",function(){syncState();});
    document.querySelectorAll(".order-trigger").forEach(function(btn){btn.addEventListener("click",function(){var cat=btn.getAttribute("data-category");var radios=f.querySelectorAll('input[name="categorie"]');Array.prototype.forEach.call(radios,function(r){r.checked=r.value===cat;});syncCategory();setTimeout(function(){var o=$("order");if(o)o.scrollIntoView({behavior:"smooth",block:"start"});var q=$("quantite");if(q)try{q.focus({preventScroll:true});}catch(e){q.focus();}},240);});});
    window.addEventListener("pageshow",function(){renderQuantity();syncDelivery();fixPortrait();hardenA11y();});
    renderQuantity(); syncDelivery(); syncState();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();