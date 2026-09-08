/* ==========================================================================
   HIN DÉLICES — premium mobile-first UX layer
   No framework, no dependencies, no user-data persistence.
   ========================================================================== */
(function () {
  "use strict";

  var i18n = {
    fr: {
      skipLink:"Aller au contenu", topbarText:"Commandes personnalisées · Marrakech", topbarCta:"Écrire à Hind sur WhatsApp ↗",
      navMenu:"Nos créations", navHind:"Hind", navHow:"Comment ça marche", navFaq:"Questions", navOrder:"Commander",
      heroAvailability:"Prend les commandes cette semaine", heroEyebrow:"Pâtisserie maison à Marrakech", heroTitle:"Des douceurs faites maison, pour vos envies du quotidien",
      heroBody:"Biscuits, gâteaux et créations sucrées préparés à la main, à Marrakech. Chaque commande est pensée avec soin — pour une journée simple comme pour une grande occasion.",
      heroCta:"Commander", heroWhatsApp:"Parler à Hind", heroMeta:"Retrait à Quick Targa · Réponse sous 2h", heroTag:"Fait main à Marrakech", videoPlayLabel:"Lire l'aperçu vidéo", videoOpenLabel:"Voir la vidéo en grand", videoPausedLabel:"Aperçu vidéo en pause",
      trust1Title:"Fait maison", trust1Body:"Préparé en petites quantités", trust2Title:"Sans paiement en ligne", trust2Body:"Hind confirme avant tout", trust3Title:"WhatsApp direct", trust3Body:"Votre demande prête à envoyer", trust4Title:"Marrakech", trust4Body:"Retrait à Quick Targa",
      menuKicker:"Choisissez votre envie", menuTitle:"Nos créations", menuSubtitle:"Des créations visuelles, généreuses et préparées dans notre cuisine à Marrakech.",
      jumpBiscuits:"Biscuits", jumpGateaux:"Gâteaux", jumpPlateaux:"Plateaux cadeaux", jumpCoffrets:"Coffrets",
      cat1Title:"Biscuits du quotidien", cat1Body:"Des biscuits gourmands pour accompagner un café, une pause, ou simplement se faire plaisir. Préparés chaque semaine, en petites quantités.", cat1Cta:"Commander des biscuits", cat1Mini:"Cookies, biscuits et douceurs à partager",
      cat2Title:"Gâteaux sur mesure", cat2Body:"Des créations pensées pour vos anniversaires, célébrations et moments précieux. Parlez-nous de votre idée, nous nous occupons du reste.", cat2Cta:"Commander un gâteau sur mesure", cat2Mini:"Pour anniversaire et célébration",
      cat3Title:"Plateaux cadeaux", cat3Body:"Des plateaux composés à partager, pour un cadeau ou une occasion spéciale — une sélection de nos plus belles créations, joliment présentées.", cat3Cta:"Commander un plateau cadeau", cat3Mini:"À offrir ou à partager",
      cat4Title:"Coffrets saisonniers", cat4Body:"Des coffrets préparés pour les moments particuliers de l'année, avec une sélection qui change selon la saison.", cat4Cta:"Commander un coffret", cat4Mini:"Sélections qui changent selon la saison",
      catUnsure:"Je ne sais pas encore, on en discute", catUnsureMini:"Expliquez votre envie à Hind", categoryNote:"Une envie particulière ? Choisissez « on en discute » dans le formulaire et expliquez-nous votre idée.",
      valuesKicker:"Une expérience pensée autour de vous", valuesTitle:"Simple à découvrir. Humain à commander.", value1Title:"Voir avant de décider", value1Body:"Les vraies créations occupent la place centrale. Touchez une image pour la voir en grand.", value2Title:"Aucun prix caché", value2Body:"Pas de paiement en ligne imposé. Hind confirme le détail de votre demande et les modalités.", value3Title:"Parler à une vraie personne", value3Body:"Votre demande est structurée automatiquement puis prête à être envoyée à Hind sur WhatsApp.",
      hindEyebrow:"Derrière chaque création", hindBody:"« Je m'appelle Hind. Je prépare chaque biscuit, chaque gâteau et chaque plateau moi-même, dans ma cuisine à Marrakech. Je choisis mes ingrédients avec soin, et je mets la même attention dans une petite boîte de biscuits que dans un gâteau d'anniversaire. Si vous avez une envie particulière, dites-le-moi — j'aime beaucoup les défis sucrés. »", hindSign:"— Hind, Hin Délices", hindCta:"Parler directement avec Hind",
      howKicker:"Une commande sans friction", howTitle:"Comment ça marche", how1Title:"Choisissez", how1Body:"Découvrez nos créations et repérez ce qui vous ferait plaisir.", how2Title:"Envoyez votre demande", how2Body:"Indiquez la date, la quantité et votre mode de réception. Seulement les informations utiles.", how3Title:"Recevez votre confirmation", how3Body:"Votre message WhatsApp est prêt. Hind confirme ensuite la disponibilité et les détails.",
      reassureShort:"Aucun paiement en ligne requis.", reassureLong:"Hind confirme votre commande et vos modalités de retrait/livraison sous 2 heures.",
      orderKicker:"Votre demande", orderTitle:"Commandez en quelques étapes", orderSubtitle:"Nous recueillons seulement ce dont Hind a besoin pour vous répondre rapidement.",
      progressStep1:"Étape 1 sur 3", progressStep2:"Étape 2 sur 3", progressStep3:"Étape 3 sur 3", progressHint1:"Choisissez votre création et indiquez la quantité", progressHint2:"Date, occasion et préférences", progressHint3:"Réception, coordonnées et vérification",
      step1Title:"Choisissez votre création et votre quantité", step2Title:"Date et détails de votre demande", step3Title:"Réception et coordonnées",
      fieldDate:"Date souhaitée", dateHelp:"Choisissez une date à venir.", dateHelpStandard:"Préparation standard : préavis de 24h minimum.", dateHelpCustom:"Gâteaux sur mesure : préavis de 48h minimum.", fieldQty:"Quantité / nombre de personnes", fieldQtyPh:"Ex. 20 biscuits, ou pour 10 personnes", fieldOccasion:"Occasion", optional:"(facultatif)", fieldOccasionPh:"Anniversaire, cadeau, simple envie…", fieldDetails:"Détails et préférences", fieldDetailsPh:"Saveurs, allergies, style souhaité…", fieldFulfillment:"Mode de réception", fulfillmentPickup:"Retrait à Quick Targa", pickupMini:"Simple et direct", fulfillmentDelivery:"Livraison", deliveryMini:"Selon votre zone",
      fieldNeighborhood:"Quartier / zone", zonePlaceholder:"Choisir une zone", zoneOther:"Autre zone", zoneCentral:"Centre / ville", zoneResidential:"Résidentiel", zoneOutskirts:"Extérieurs / premium", deliveryHint:"Livraison possible selon la zone — cette précision nous permet de vérifier si c'est possible.",
      btnNext:"Suivant", btnBack:"Retour", btnSubmit:"Continuer sur WhatsApp", err1:"Merci de choisir une catégorie et une quantité.", err2:"Merci de compléter les informations demandées.", err3:"Merci d'indiquer votre nom et votre téléphone.", invalidDate:"Merci de choisir une date respectant le délai indiqué.", invalidPhone:"Merci d'indiquer un numéro de téléphone marocain valide.", missingNeighborhood:"Merci d'indiquer votre quartier ou votre zone pour la livraison.", fieldName:"Nom", fieldPhone:"Téléphone", fieldPhonePh:"06 12 34 56 78", phoneHelp:"Utilisé uniquement pour vous recontacter au sujet de cette demande.", summaryKicker:"Votre récapitulatif", summaryDate:"Date", summaryQty:"Quantité", summaryMode:"Réception", editOrder:"Modifier", formFootnote:"Votre message sera préparé automatiquement. Vous pourrez le vérifier avant de l’envoyer.",
      igKicker:"Un aperçu de notre univers", igTitle:"Ce que nous créons", igSubtitle:"Les nouveautés arrivent sur Instagram.", igCta:"Voir @hin_delices ↗",
      faqKicker:"Avant de commander", faqTitle:"Questions fréquentes", faqSubtitle:"Les informations essentielles, au même endroit.", faq1Q:"Comment est-ce que je commande ?", faq1A:"Choisissez une création, renseignez la date et la quantité, puis indiquez vos coordonnées. Votre demande est préparée dans WhatsApp pour que vous puissiez la vérifier avant de l’envoyer.", faq2Q:"Est-ce que je dois payer en ligne ?", faq2A:"Non. Aucun paiement en ligne n’est demandé avant la confirmation de votre commande.", faq3Q:"Où puis-je récupérer ma commande ?", faq3A:"Le retrait se fait à Quick Targa, Marrakech. La livraison est possible selon la zone indiquée dans le formulaire.", faq4Q:"Puis-je demander quelque chose de personnalisé ?", faq4A:"Oui. Choisissez « Je ne sais pas encore, on en discute » et décrivez votre idée dans les détails.",
      footerTag:"Biscuits, gâteaux et créations sucrées faits main à Marrakech.", footerVisitTitle:"Retrait", footerDelivery:"Livraison possible selon la zone", footerContactTitle:"Contact", footerMade:"Fait à la main à Marrakech", stickyTitle:"Une envie ?", stickyBody:"Votre commande se fait en quelques étapes.", fabLabel:"WhatsApp"
    },
    ar: {
      skipLink:"الانتقال إلى المحتوى", topbarText:"طلبات مخصّصة · مراكش", topbarCta:"تواصل مع هند على واتساب ↗",
      navMenu:"حلوياتنا", navHind:"هند", navHow:"كيف يتم الطلب", navFaq:"الأسئلة", navOrder:"اطلب الآن",
      heroAvailability:"نستقبل الطلبات هذا الأسبوع", heroEyebrow:"حلويات منزلية في مراكش", heroTitle:"حلويات منزلية، لرغباتكم في كل يوم", heroBody:"بسكويت وحلويات وكعك محضّر يدويًا في مراكش. كل طلب يُحضّر بعناية، سواء لرغبة بسيطة أو لمناسبة خاصة.", heroCta:"اطلب الآن", heroWhatsApp:"تحدث مع هند", heroMeta:"الاستلام من Quick Targa · الرد خلال ساعتين", heroTag:"صُنع يدويًا في مراكش", videoPlayLabel:"تشغيل المعاينة", videoOpenLabel:"عرض الفيديو بحجم كبير", videoPausedLabel:"المعاينة متوقفة مؤقتًا",
      trust1Title:"صنع منزلي", trust1Body:"بكميات صغيرة", trust2Title:"بدون دفع إلكتروني", trust2Body:"هند تؤكد أولاً", trust3Title:"واتساب مباشر", trust3Body:"طلبك جاهز للإرسال", trust4Title:"مراكش", trust4Body:"الاستلام من Quick Targa",
      menuKicker:"اختاروا رغبتكم", menuTitle:"حلوياتنا", menuSubtitle:"إبداعات جميلة وغنية، محضّرة في مطبخنا بمراكش.", jumpBiscuits:"بسكويت", jumpGateaux:"كعك", jumpPlateaux:"صواني هدايا", jumpCoffrets:"علب موسمية",
      cat1Title:"بسكويت يومي", cat1Body:"بسكويت لذيذ لمرافقة القهوة، أو لحظة استراحة، أو ببساطة لتدليل أنفسكم. يُحضّر أسبوعيًا بكميات محدودة.", cat1Cta:"اطلب بسكويت", cat1Mini:"كوكيز وبسكويت وحلويات للمشاركة", cat2Title:"كعك حسب الطلب", cat2Body:"كعك مصمم خصيصًا لأعياد الميلاد والمناسبات واللحظات المميزة. أخبرونا بفكرتكم، ونحن نهتم بالباقي.", cat2Cta:"اطلب كعكة خاصة", cat2Mini:"لأعياد الميلاد والمناسبات", cat3Title:"صواني الهدايا", cat3Body:"صواني منسّقة للمشاركة، كهدية أو لمناسبة خاصة — تشكيلة من أجمل حلوياتنا، مقدَّمة بعناية.", cat3Cta:"اطلب صينية هدايا", cat3Mini:"للهدية أو للمشاركة", cat4Title:"علب موسمية", cat4Body:"علب محضّرة للمناسبات الخاصة في كل موسم، بتشكيلة تتغيّر حسب الفترة.", cat4Cta:"اطلب علبة موسمية", cat4Mini:"تشكيلة تتغيّر حسب الموسم", catUnsure:"لم أقرر بعد، نتناقش معًا", catUnsureMini:"اشرحوا رغبتكم لهند", categoryNote:"لديكم رغبة خاصة؟ اختاروا «نتناقش معًا» في النموذج واشرحوا فكرتكم.",
      valuesKicker:"تجربة مصممة حولكم", valuesTitle:"سهلة الاكتشاف. إنسانية في الطلب.", value1Title:"شاهدوا قبل الاختيار", value1Body:"إبداعاتنا الحقيقية في الواجهة. اضغطوا على الصورة لرؤيتها بحجم أكبر.", value2Title:"بدون تكاليف مخفية", value2Body:"لا يوجد دفع إلكتروني مفروض. هند تؤكد تفاصيل الطلب وطريقة الاستلام.", value3Title:"تواصل مع شخص حقيقي", value3Body:"يتم تجهيز طلبكم تلقائيًا ثم يصبح جاهزًا للإرسال إلى هند عبر واتساب.",
      hindEyebrow:"خلف كل تحضير", hindBody:"« اسمي هند. أحضّر كل بسكويتة وكل كعكة وكل صينية بنفسي، في مطبخي بمراكش. أختار المكونات بعناية، وأمنح نفس الاهتمام لعلبة بسكويت صغيرة كما لكعكة عيد ميلاد كبيرة. إذا كانت لديكم فكرة خاصة، أخبروني بها — أحب التحديات الحلوة. »", hindSign:"— هند، Hin Délices", hindCta:"تحدثوا مباشرة مع هند",
      howKicker:"طلب بدون تعقيد", howTitle:"كيف يتم الطلب", how1Title:"اختاروا", how1Body:"تصفّحوا حلوياتنا واختاروا ما يعجبكم.", how2Title:"أرسلوا طلبكم", how2Body:"حددوا التاريخ والكمية وطريقة الاستلام. فقط المعلومات الضرورية.", how3Title:"استلموا التأكيد", how3Body:"طلبكم يصبح جاهزًا في واتساب، ثم تؤكد هند التوفر والتفاصيل.", reassureShort:"لا حاجة إلى الدفع إلكترونيًا.", reassureLong:"تؤكد هند طلبكم وطريقة الاستلام أو التوصيل خلال ساعتين.",
      orderKicker:"طلبكم", orderTitle:"اطلبوا في خطوات بسيطة", orderSubtitle:"نجمع فقط المعلومات التي تحتاجها هند للرد بسرعة.", progressStep1:"الخطوة 1 من 3", progressStep2:"الخطوة 2 من 3", progressStep3:"الخطوة 3 من 3", progressHint1:"اختاروا الحلويات وحددوا الكمية", progressHint2:"التاريخ والمناسبة والتفضيلات", progressHint3:"الاستلام ومعلومات التواصل والمراجعة",
      step1Title:"اختاروا الحلويات وحددوا الكمية", step2Title:"التاريخ وتفاصيل الطلب", step3Title:"الاستلام ومعلومات التواصل", fieldDate:"التاريخ المرغوب", dateHelp:"اختاروا تاريخًا قادمًا.", dateHelpStandard:"التحضير العادي: مهلة 24 ساعة على الأقل.", dateHelpCustom:"الكعك حسب الطلب: مهلة 48 ساعة على الأقل.", fieldQty:"الكمية / عدد الأشخاص", fieldQtyPh:"مثال: 20 بسكويتة، أو لـ 10 أشخاص", fieldOccasion:"المناسبة", optional:"(اختياري)", fieldOccasionPh:"عيد ميلاد، هدية، رغبة بسيطة…", fieldDetails:"تفاصيل وتفضيلات", fieldDetailsPh:"النكهات، الحساسية الغذائية، الشكل المرغوب…", fieldFulfillment:"طريقة الاستلام", fulfillmentPickup:"الاستلام من Quick Targa", pickupMini:"بسيط ومباشر", fulfillmentDelivery:"التوصيل", deliveryMini:"حسب المنطقة", fieldNeighborhood:"الحي / المنطقة", zonePlaceholder:"اختيار المنطقة", zoneOther:"منطقة أخرى", zoneCentral:"وسط المدينة", zoneResidential:"مناطق سكنية", zoneOutskirts:"مناطق خارجية / راقية", deliveryHint:"التوصيل ممكن حسب المنطقة — هذه المعلومة تساعدنا على التأكد من إمكانية ذلك.", btnNext:"التالي", btnBack:"السابق", btnSubmit:"المتابعة إلى واتساب", err1:"يرجى اختيار الحلوى وتحديد الكمية.", err2:"يرجى إكمال المعلومات المطلوبة.", err3:"يرجى إدخال الاسم ورقم الهاتف.", invalidDate:"يرجى اختيار تاريخ يحترم المهلة المحددة.", invalidPhone:"يرجى إدخال رقم هاتف مغربي صالح.", missingNeighborhood:"يرجى إدخال الحي أو المنطقة من أجل التوصيل.", fieldName:"الاسم", fieldPhone:"رقم الهاتف", fieldPhonePh:"06 12 34 56 78", phoneHelp:"يُستخدم فقط للتواصل معكم بخصوص هذا الطلب.", summaryKicker:"ملخص طلبكم", summaryDate:"التاريخ", summaryQty:"الكمية", summaryMode:"الاستلام", editOrder:"تعديل", formFootnote:"سيتم تجهيز الرسالة تلقائيًا. يمكنكم مراجعتها قبل الإرسال.", successKicker:"اقتربتم من النهاية", successTitle:"طلبكم جاهز في واتساب", successBody:"تحققوا من المعلومات في محادثة واتساب مع Hin Délices ثم اضغطوا إرسال. بعد ذلك يمكن لهند تأكيد التفاصيل.", successWhatsApp:"فتح واتساب", successBrowse:"مواصلة التصفح",
      igKicker:"لمحة عن عالمنا", igTitle:"ما نحضّره", igSubtitle:"الجديد يصل أولاً إلى Instagram.", igCta:"رؤية @hin_delices ↗", faqKicker:"قبل الطلب", faqTitle:"الأسئلة الشائعة", faqSubtitle:"المعلومات الأساسية في مكان واحد.", faq1Q:"كيف أطلب؟", faq1A:"اختاروا الحلوى وحددوا التاريخ والكمية ومعلومات التواصل. يتم تجهيز طلبكم في واتساب حتى تتمكنوا من مراجعته قبل الإرسال.", faq2Q:"هل يجب الدفع إلكترونيًا؟", faq2A:"لا. لا يُطلب أي دفع إلكتروني قبل تأكيد الطلب.", faq3Q:"أين يمكنني استلام الطلب؟", faq3A:"الاستلام من Quick Targa في مراكش. والتوصيل ممكن حسب المنطقة المذكورة في النموذج.", faq4Q:"هل يمكن طلب شيء مخصص؟", faq4A:"نعم. اختاروا «لم أقرر بعد، نتناقش معًا» واشرحوا فكرتكم في التفاصيل.", footerTag:"بسكويت وكعك وحلويات محضّرة يدويًا في مراكش.", footerVisitTitle:"الاستلام", footerDelivery:"التوصيل ممكن حسب المنطقة", footerContactTitle:"تواصل معنا", footerMade:"صُنع يدويًا في مراكش", stickyTitle:"لديكم رغبة؟", stickyBody:"الطلب يتم في خطوات بسيطة.", fabLabel:"واتساب"
    }
  };

  Object.assign(i18n.fr, {
    orderTitleSingle:"Une seule demande. Un message prêt à envoyer.", orderSubtitleSingle:"Choisissez, indiquez vos préférences, puis laissez WhatsApp faire le dernier pas.",
    fieldCategoryLabel:"1 · Choisissez votre création", fieldCategoryNote:"Les prix affichés sont des tarifs de départ.", fieldQtyNote:"Choisissez une option ou indiquez une quantité libre.",
    cat1Price:"Dès 130 MAD · 36 pièces", cat2Price:"Dès 350 MAD · gâteau sur mesure", cat3Price:"Dès 240 MAD · plateau cadeau", cat4Price:"Dès 180 MAD · coffret saisonnier", priceQuote:"Sur devis", qty36:"36 pièces", qtyCustom:"Sur mesure", quickWhatsApp:"WhatsApp direct ↗", deliveryHintShort:"Choisissez retrait ou livraison.", zonesKicker:"Avant de commander", zonesTitle:"La livraison, quartier par quartier", zonesSubtitle:"Vérifiez votre zone avant de remplir le formulaire. La livraison est confirmée par Hind selon l’adresse et la disponibilité."
  });
  Object.assign(i18n.ar, {
    orderTitleSingle:"طلب واحد. رسالة جاهزة للإرسال.", orderSubtitleSingle:"اختاروا الحلوى والتفاصيل، ثم دعوا واتساب يكمل الخطوة الأخيرة.",
    fieldCategoryLabel:"1 · اختاروا الحلويات", fieldCategoryNote:"الأسعار المعروضة هي أسعار بداية.", fieldQtyNote:"اختاروا كمية سريعة أو اكتبوا كمية مخصصة.",
    cat1Price:"ابتداءً من 130 درهم · 36 قطعة", cat2Price:"ابتداءً من 350 درهم · كعكة حسب الطلب", cat3Price:"ابتداءً من 240 درهم · صينية هدايا", cat4Price:"ابتداءً من 180 درهم · علبة موسمية", priceQuote:"حسب الطلب", qty36:"36 قطعة", qtyCustom:"مخصص", quickWhatsApp:"واتساب مباشر ↗", deliveryHintShort:"اختاروا الاستلام أو التوصيل.", zonesKicker:"قبل الطلب", zonesTitle:"التوصيل، حيًا بعد حي", zonesSubtitle:"تحققوا من منطقتكم قبل ملء الطلب. تؤكد هند إمكانية التوصيل حسب العنوان والتوفر."
  });

  var currentLang = "fr";
  var currentStep = 1;
  var endpointMeta = document.querySelector('meta[name="order-form-endpoint"]');
  var FORM_ENDPOINT = endpointMeta ? endpointMeta.getAttribute("content").trim() : "";
  var WHATSAPP_NUMBER = "212660530382";

  function dict() { return i18n[currentLang] || i18n.fr; }
  function text(key) { return dict()[key] || i18n.fr[key] || key; }
  function applyLang(lang) {
    if (!i18n[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function(el){ var key=el.getAttribute("data-i18n"); if (Object.prototype.hasOwnProperty.call(dict(), key)) el.textContent=dict()[key]; });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el){ var key=el.getAttribute("data-i18n-placeholder"); if (Object.prototype.hasOwnProperty.call(dict(), key)) el.setAttribute("placeholder",dict()[key]); });
    document.querySelectorAll("[data-i18n-label]").forEach(function(el){ var key=el.getAttribute("data-i18n-label"); if (Object.prototype.hasOwnProperty.call(dict(), key)) el.setAttribute("label",dict()[key]); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function(el){ var key=el.getAttribute("data-i18n-aria"); if (Object.prototype.hasOwnProperty.call(dict(), key)) el.setAttribute("aria-label",dict()[key]); });
    var fr=document.getElementById("langFr"), ar=document.getElementById("langAr");
    if(fr&&ar){ fr.setAttribute("aria-pressed",lang==="fr"?"true":"false"); ar.setAttribute("aria-pressed",lang==="ar"?"true":"false"); }
    document.title=lang==="ar"?"Hin Délices — حلويات منزلية في مراكش":"Hin Délices — Pâtisserie maison à Marrakech";
    updateProgress(currentStep);
    updateSummary();
  }

  function toLocalISODate(date){
    return date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0");
  }
  function getTodayISO(){ return toLocalISODate(new Date()); }
  function getMinimumOrderDate(categoryValue){
    var d=new Date();
    if(categoryValue===undefined){
      var category=form && form.querySelector('input[name="categorie"]:checked');
      categoryValue=category ? category.value : "";
    }
    var leadHours=categoryValue==="Gâteaux sur mesure" ? 48 : 24;
    d.setTime(d.getTime()+leadHours*60*60*1000);
    return toLocalISODate(d);
  }
  function updateDateConstraint(){
    var input=document.getElementById("dateSouhaitee");
    var help=document.getElementById("dateHint");
    if(!input) return;
    var min=getMinimumOrderDate();
    input.min=min;
    var category=form && form.querySelector('input[name="categorie"]:checked');
    if(help) help.textContent=category && category.value==="Gâteaux sur mesure" ? text("dateHelpCustom") : text("dateHelpStandard");
    if(input.value && input.value<min){ input.value=""; markField(input,false); }
  }
  function normalizePhone(v){ return String(v||"").replace(/[\s().-]/g,"").replace(/^00/,"+"); }
  function isValidMoroccanPhone(v){ return /^(?:\+212|0)(?:[5-7]\d{8})$/.test(normalizePhone(v)); }
  function focusField(el){ if(!el) return; el.focus({preventScroll:true}); el.scrollIntoView({behavior:"smooth",block:"center"}); }
  function markField(el, valid){ if(!el) return; el.setAttribute("aria-invalid", valid ? "false":"true"); }
  function showError(n, show, message){
    var el=document.getElementById("err"+n);
    if(!el)return;
    el.hidden=!show;
    if(show&&message)el.textContent=message;
    if(show){
      el.setAttribute("tabindex","-1");
      window.requestAnimationFrame(function(){
        try { el.focus({preventScroll:true}); } catch(e) { el.focus(); }
        el.scrollIntoView({behavior:"smooth",block:"center"});
      });
    }
  }

  var form=document.getElementById("orderForm");
  var progress=document.getElementById("progress");
  var progressLabel=document.getElementById("progressLabel");
  var progressHint=document.getElementById("progressHint");
  var steps=Array.prototype.slice.call(document.querySelectorAll(".form-step"));
  var progressSegs=Array.prototype.slice.call(document.querySelectorAll("#progress > span"));

  function updateProgress(n){
    var labels=[text("progressStep1"),text("progressStep2"),text("progressStep3")];
    var hints=[text("progressHint1"),text("progressHint2"),text("progressHint3")];
    if(progress){ progress.setAttribute("aria-valuenow",String(n)); progress.setAttribute("aria-valuetext",labels[n-1]); }
    if(progressLabel) progressLabel.textContent=labels[n-1];
    if(progressHint) progressHint.textContent=hints[n-1];
    progressSegs.forEach(function(seg){ var x=parseInt(seg.getAttribute("data-step"),10); seg.classList.toggle("done",x<n); seg.classList.toggle("active",x===n); });
  }

  function showStep(n){
    currentStep=Math.max(1,Math.min(3,n));
    steps.forEach(function(step){ step.classList.toggle("active",parseInt(step.getAttribute("data-step"),10)===currentStep); });
    updateProgress(currentStep);
    if(currentStep===3) updateSummary();
    window.requestAnimationFrame(function(){ var active=form&&form.querySelector('.form-step[data-step="'+currentStep+'"]'); if(!active)return; active.scrollIntoView({block:"nearest",behavior:"smooth"}); var h=active.querySelector("h3"); if(h)h.focus({preventScroll:true}); });
  }

  function validateStep(n){
    if(n!==1) return true;
    var category=form && form.querySelector('input[name="categorie"]:checked'), qty=document.getElementById("quantite"), date=document.getElementById("dateSouhaitee"), mode=form && form.querySelector('input[name="mode"]:checked'), zone=document.getElementById("quartier"), name=document.getElementById("nom"), phone=document.getElementById("telephone");
    if(!category){showError(1,true,text("err1"));focusField(form&&form.querySelector('input[name="categorie"]'));return false;}
    if(!qty||!qty.value.trim()){showError(1,true,text("err1"));focusField(qty);return false;}
    if(!date||!date.value||date.value<getMinimumOrderDate()){showError(1,true,date&&date.value?text("invalidDate"):text("err2"));focusField(date);return false;}
    if(!mode){showError(1,true,text("err3"));return false;}
    if(mode.value==="Livraison" && (!zone||!zone.value)){showError(1,true,text("missingNeighborhood"));focusField(zone);return false;}
    if(!name||!name.value.trim()){showError(1,true,text("err3"));focusField(name);return false;}
    if(!phone||!phone.value.trim()){showError(1,true,text("err3"));focusField(phone);return false;}
    if(!isValidMoroccanPhone(phone.value)){showError(1,true,text("invalidPhone"));focusField(phone);return false;}
    showError(1,false); return true;
  }

  function readValues(){ var fd=new FormData(form); return {category:String(fd.get("categorie")||""),date:String(fd.get("date")||""),quantity:String(fd.get("quantite")||""),occasion:String(fd.get("occasion")||""),details:String(fd.get("details")||""),mode:String(fd.get("mode")||"Retrait"),neighborhood:String(fd.get("quartier")||""),name:String(fd.get("nom")||""),phone:String(fd.get("telephone")||"")}; }
  function humanDate(iso){ if(!iso)return "—"; var p=iso.split("-"); return p.length===3?(currentLang==="ar"?p[2]+"/"+p[1]+"/"+p[0]:p[2]+"/"+p[1]+"/"+p[0]):iso; }
  function updateSummary(){ var v=readValues(); var ids={category:"summaryCategory",date:"summaryDate",quantity:"summaryQty",mode:"summaryMode"}; var c=document.getElementById(ids.category),d=document.getElementById(ids.date),q=document.getElementById(ids.quantity),m=document.getElementById(ids.mode); if(c)c.textContent=v.category||"—"; if(d)d.textContent=humanDate(v.date); if(q)q.textContent=v.quantity||"—"; if(m)m.textContent=v.mode==="Livraison"?text("fulfillmentDelivery"):text("fulfillmentPickup"); }
  function buildWhatsAppMessage(v){
    if(currentLang==="ar") return ["مرحبًا هند، أود تقديم طلب إلى Hin Délices.","الفئة: "+v.category,"التاريخ: "+v.date,"الكمية: "+v.quantity,"المناسبة: "+(v.occasion||"غير محددة"),"التفاصيل: "+(v.details||"لا توجد"),"طريقة الاستلام: "+v.mode,"الحي / المنطقة: "+(v.neighborhood||"غير محدد"),"الاسم: "+v.name,"الهاتف: "+v.phone].join("\n");
    return ["*Nouvelle demande — Hin Délices*","• Produit : "+v.category,"• Date : "+v.date,"• Quantité : "+v.quantity,"• Occasion : "+(v.occasion||"Non précisée"),"• Détails : "+(v.details||"Aucun"),"• Mode : "+v.mode+(v.neighborhood?" (Zone : "+v.neighborhood+")":""),"• Client : "+v.name+" — "+v.phone].join("\n");
  }
  function showToast(message){
    var toast=document.getElementById("toast");
    if(!toast) return;
    toast.textContent=message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer=setTimeout(function(){ toast.classList.remove("show"); },2800);
  }

  function openWhatsAppOrder(){
    var message = buildWhatsAppMessage(readValues());
    var encodedMessage = encodeURIComponent(message);
    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodedMessage;

    /*
     * Use direct same-tab navigation first. This is more reliable on iOS/Safari
     * and mobile in-app browsers than window.open(), which may be treated as a
     * popup even when triggered by a genuine form submission.
     */
    showToast(currentLang==="ar" ? "تم تجهيز طلبكم في واتساب." : "Votre demande est prête dans WhatsApp.");
    window.location.href = url;
  }

  /* Language buttons */
  var langFr=document.getElementById("langFr"), langAr=document.getElementById("langAr");
  if(langFr)langFr.addEventListener("click",function(){applyLang("fr");});
  if(langAr)langAr.addEventListener("click",function(){applyLang("ar");});

  /* Mobile navigation */
  var menuToggle=document.getElementById("menuToggle"), primaryNav=document.getElementById("primaryNav");
  function closeMenu(){if(!menuToggle||!primaryNav)return;menuToggle.setAttribute("aria-expanded","false");primaryNav.classList.remove("is-open");document.body.classList.remove("menu-open");}
  if(menuToggle&&primaryNav){
    menuToggle.addEventListener("click",function(){var open=menuToggle.getAttribute("aria-expanded")==="true";menuToggle.setAttribute("aria-expanded",String(!open));primaryNav.classList.toggle("is-open",!open);document.body.classList.toggle("menu-open",!open);});
    primaryNav.querySelectorAll("a").forEach(function(a){a.addEventListener("click",closeMenu);});
  }
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeMenu();});

  if(form){
    function updateQuantityPresetLabels(category){
      document.querySelectorAll(".quantity-chip").forEach(function(chip){
        var q=chip.getAttribute("data-quantity");
        chip.hidden = category!=="Biscuits du quotidien" && (q==="6 biscuits" || q==="12 biscuits");
      });
    }

    form.querySelectorAll('input[name="categorie"]').forEach(function(r){
      r.addEventListener("change",function(){updateDateConstraint();updateQuantityPresetLabels(r.value);updateSummary();});
    });

    document.querySelectorAll(".quantity-chip").forEach(function(chip){
      chip.addEventListener("click",function(){
        var qty=document.getElementById("quantite"); if(!qty)return;
        qty.value=chip.getAttribute("data-quantity")||"";
        document.querySelectorAll(".quantity-chip").forEach(function(c){c.classList.remove("is-selected");});
        chip.classList.add("is-selected"); markField(qty,true); updateSummary();
      });
    });

    document.querySelectorAll(".order-trigger").forEach(function(b){
      b.addEventListener("click",function(){
        var cat=b.getAttribute("data-category");
        form.querySelectorAll('input[name="categorie"]').forEach(function(r){r.checked=r.value===cat;});
        document.querySelectorAll(".menu-row.is-selected").forEach(function(el){el.classList.remove("is-selected");});
        var card=b.closest(".menu-row"); if(card)card.classList.add("is-selected");
        updateQuantityPresetLabels(cat); updateDateConstraint(); updateSummary();
        var order=document.getElementById("order"); if(order)order.scrollIntoView({behavior:"smooth",block:"start"});
        setTimeout(function(){focusField(document.getElementById("quantite"));},280);
      });
    });

    var deliveryExtra=document.getElementById("deliveryExtra"), zone=document.getElementById("quartier");
    function updateDelivery(){
      var mode=form.querySelector('input[name="mode"]:checked'), delivery=mode&&mode.value==="Livraison";
      if(deliveryExtra){deliveryExtra.classList.toggle("is-active",!!delivery);deliveryExtra.setAttribute("aria-hidden","false");}
      if(zone){zone.required=!!delivery;zone.disabled=false;}
      updateSummary();
    }
    form.querySelectorAll('input[name="mode"]').forEach(function(r){r.addEventListener("change",updateDelivery);}); updateDelivery();

    document.querySelectorAll("#orderForm input, #orderForm select, #orderForm textarea").forEach(function(el){el.addEventListener("blur",function(){
      if(el.id==="telephone"&&el.value.trim())markField(el,isValidMoroccanPhone(el.value));
      if(el.id==="dateSouhaitee"&&el.value)markField(el,el.value>=getMinimumOrderDate());
      if(el.id==="nom"&&el.value.trim())markField(el,true);
    });});

    var details=document.getElementById("details"),counter=document.getElementById("detailsCounter"); if(details&&counter)details.addEventListener("input",function(){counter.textContent=details.value.length+"/500";updateSummary();});
    ["quantite","occasion","dateSouhaitee","quartier","nom","telephone"].forEach(function(id){var el=document.getElementById(id);if(el){el.addEventListener("input",updateSummary);el.addEventListener("change",updateSummary);}});

    form.addEventListener("submit",function(e){
      e.preventDefault();
      if(!validateStep(1))return;
      var btn=document.getElementById("submitBtn");if(btn)btn.disabled=true;
      openWhatsAppOrder();
      if(FORM_ENDPOINT){var data=new FormData(form);data.append("langue_visiteur",currentLang);fetch(FORM_ENDPOINT,{method:"POST",body:data,headers:{Accept:"application/json"}}).catch(function(error){console.warn("Optional form logging failed:",error);});}
      window.setTimeout(function(){if(btn)btn.disabled=false;},500);
    });
  }

  /* Accessible image/video lightbox. Inline autoplay videos are never cloned. */
  var lightbox=document.getElementById("lightbox"),
      lightboxImage=document.getElementById("lightboxImage"),
      lightboxVideo=document.getElementById("lightboxVideo"),
      lightboxClose=document.getElementById("lightboxClose"),
      lastFocus=null;

  function prefersReducedMotion(){
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  var inlineVideos=Array.prototype.slice.call(document.querySelectorAll("video.ux-video[data-autoplay-on-view]"));
  function syncInlineVideo(video, visible){
    if(!video)return;
    if(prefersReducedMotion() || document.hidden || !visible){
      video.pause();
      if(prefersReducedMotion()) video.removeAttribute("autoplay");
      return;
    }
    video.play().catch(function(){});
  }
  function pauseInlineVideos(){ inlineVideos.forEach(function(video){ video.pause(); }); }
  function resumeVisibleInlineVideos(){
    if(prefersReducedMotion() || document.hidden)return;
    inlineVideos.forEach(function(video){
      var r=video.getBoundingClientRect();
      var visible=r.bottom>0 && r.top<window.innerHeight && Math.min(r.bottom,window.innerHeight)-Math.max(r.top,0)>r.height*0.35;
      syncInlineVideo(video,visible);
    });
  }

  if(inlineVideos.length && "IntersectionObserver" in window){
    var videoObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){ syncInlineVideo(entry.target, entry.isIntersecting && entry.intersectionRatio>=0.35); });
    },{threshold:[0,0.35,0.75]});
    inlineVideos.forEach(function(video){ videoObserver.observe(video); });
  }
  if(inlineVideos.length){
    var reducedQuery=window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)"):null;
    if(reducedQuery && reducedQuery.addEventListener){ reducedQuery.addEventListener("change",function(){inlineVideos.forEach(function(video){syncInlineVideo(video,false);});}); }
    document.addEventListener("visibilitychange",function(){inlineVideos.forEach(function(video){syncInlineVideo(video,!document.hidden);});});
  }

  function resetLightboxMedia(){
    if(lightboxImage){ lightboxImage.hidden=true; lightboxImage.removeAttribute("src"); lightboxImage.alt=""; }
    if(lightboxVideo){
      lightboxVideo.pause();
      lightboxVideo.removeAttribute("src");
      lightboxVideo.removeAttribute("poster");
      lightboxVideo.load();
      lightboxVideo.hidden=true;
      lightboxVideo.autoplay=false;
      lightboxVideo.controls=true;
    }
  }

  function closeLightbox(){
    if(!lightbox)return;
    resetLightboxMedia();
    lightbox.hidden=true;
    document.body.classList.remove("modal-open");
    resumeVisibleInlineVideos();
    if(lastFocus)lastFocus.focus();
  }

  function openLightbox(trigger){
    if(!lightbox)return;
    lastFocus=trigger;
    pauseInlineVideos();
    resetLightboxMedia();

    var type=trigger.getAttribute("data-lightbox-type");
    if(type==="video" && lightboxVideo){
      var src=trigger.getAttribute("data-lightbox-video");
      var poster=trigger.getAttribute("data-lightbox-poster")||"";
      if(!src){ resumeVisibleInlineVideos(); return; }
      lightboxVideo.src=src;
      if(poster) lightboxVideo.poster=poster;
      lightboxVideo.hidden=false;
      lightboxVideo.autoplay=!prefersReducedMotion();
      lightboxVideo.setAttribute("aria-label", text("videoOpenLabel"));
      lightboxVideo.load();
    } else if(lightboxImage){
      var imgSrc=trigger.getAttribute("data-lightbox");
      if(!imgSrc){ resumeVisibleInlineVideos(); return; }
      lightboxImage.src=imgSrc;
      var img=trigger.querySelector("img");
      lightboxImage.alt=img?img.alt:"";
      lightboxImage.hidden=false;
    }

    lightbox.hidden=false;
    document.body.classList.add("modal-open");
    if(lightboxClose)lightboxClose.focus();
    if(type==="video" && lightboxVideo && !prefersReducedMotion()){ lightboxVideo.play().catch(function(){}); }
  }

  document.querySelectorAll("[data-lightbox], [data-lightbox-type]").forEach(function(trigger){
    trigger.addEventListener("click",function(){openLightbox(trigger);});
  });
  if(lightboxClose)lightboxClose.addEventListener("click",closeLightbox);
  if(lightbox)lightbox.addEventListener("click",function(e){if(e.target===lightbox)closeLightbox();});
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape" && lightbox && !lightbox.hidden) closeLightbox();
  });

  /* Sticky CTA + back to top */
  var sticky=document.getElementById("stickyCta"), hero=document.querySelector(".hero"), orderSection=document.getElementById("order"), backTop=document.getElementById("backTop");
  if("IntersectionObserver" in window){
    var heroSeen=true, orderSeen=false;
    function syncSticky(){
      if(!sticky) return;
      var shouldShow=!heroSeen && !orderSeen;
      sticky.classList.toggle("show",shouldShow);
      sticky.classList.toggle("is-suppressed",orderSeen);
      sticky.setAttribute("aria-hidden",String(orderSeen));
    }
    if(hero){new IntersectionObserver(function(es){heroSeen=es[0].isIntersecting;syncSticky();},{threshold:0.08}).observe(hero);}
    if(orderSection){new IntersectionObserver(function(es){orderSeen=es[0].isIntersecting;syncSticky();},{threshold:0.1}).observe(orderSection);}
    syncSticky();
  }
  window.addEventListener("scroll",function(){if(backTop)backTop.classList.toggle("show",window.scrollY>900);},{passive:true});
  if(backTop)backTop.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"});});

  /* Accessible active-section hint in navigation */
  if("IntersectionObserver" in window){document.querySelectorAll("main > section[id]").forEach(function(section){var link=document.querySelector('.nav-primary a[href="#'+section.id+'"]'); if(!link)return;new IntersectionObserver(function(es){if(es[0].isIntersecting){document.querySelectorAll('.nav-primary a').forEach(function(a){a.classList.remove("is-current");});link.classList.add("is-current");}},{rootMargin:"-35% 0px -55% 0px",threshold:0}).observe(section);});}

  /* Public QA surface, no secrets/user data. */
  window.HinDelices={normalizePhone:normalizePhone,isValidMoroccanPhone:isValidMoroccanPhone,getTodayISO:getTodayISO,getMinimumOrderDate:getMinimumOrderDate,buildWhatsAppMessage:buildWhatsAppMessage,openWhatsAppOrder:openWhatsAppOrder,showStep:showStep,readValues:readValues,openLightbox:openLightbox,prefersReducedMotion:prefersReducedMotion};
  updateDateConstraint();
  applyLang("fr");
  showStep(1);
})();
