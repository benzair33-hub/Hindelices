const fs = require('fs');
const vm = require('vm');
const source = fs.readFileSync(__dirname + '/script.js', 'utf8');

function makeEl(attrs = {}) {
  return {
    attrs,
    hidden: false,
    style: {},
    classList: { add(){}, remove(){}, toggle(){} },
    setAttribute(k,v){ this.attrs[k] = String(v); },
    getAttribute(k){ return this.attrs[k] ?? null; },
    addEventListener(){},
    focus(){},
    scrollIntoView(){},
    querySelector(){ return null; },
    querySelectorAll(){ return []; },
    closest(){ return { hidden:false }; },
    textContent:'',
    value:'',
    checked:false,
    required:false,
    src:''
  };
}

const generic = makeEl();
const document = {
  body: makeEl(),
  addEventListener(){},
  documentElement: makeEl(),
  title: '',
  querySelector(){ return null; },
  querySelectorAll(){ return []; },
  getElementById(id){ return generic; }
};

global.window = { location:{ href:"" }, open(url){ this.lastOpenUrl=url; return {}; } };
global.document = document;
global.FormData = function(){
  return {
    get(name){
      const values={categorie:'Biscuits du quotidien',date:'2026-09-12',quantite:'20 biscuits',occasion:'Cadeau',details:'Sans noix',mode:'Livraison',quartier:'Guéliz',nom:'Sara',telephone:'0660530382'};
      return values[name] || '';
    },
    append(){}
  };
};
global.IntersectionObserver = function(){ this.observe=()=>{}; };
global.requestAnimationFrame = (fn)=>fn();
window.requestAnimationFrame = (fn)=>fn();
window.addEventListener = ()=>{};
window.scrollTo = ()=>{};
global.URLSearchParams = URLSearchParams;
global.navigator = {};
global.Element = function(){};

vm.runInThisContext(source, { filename: 'script.js' });

function assert(condition, message){ if(!condition) throw new Error(message); }

assert(typeof window.HinDelices.isValidMoroccanPhone === 'function', 'phone validator missing');
assert(window.HinDelices.isValidMoroccanPhone('0660530382') === true, 'local Moroccan phone should pass');
assert(window.HinDelices.isValidMoroccanPhone('+212660530382') === true, 'international Moroccan phone should pass');
assert(window.HinDelices.isValidMoroccanPhone('123456') === false, 'invalid phone should fail');

assert(typeof window.HinDelices.getMinimumOrderDate === 'function', 'minimum-order-date helper missing');
const standardMin = window.HinDelices.getMinimumOrderDate('Biscuits du quotidien');
const customMin = window.HinDelices.getMinimumOrderDate('Gâteaux sur mesure');
assert(/^\d{4}-\d{2}-\d{2}$/.test(standardMin), 'standard minimum date should be ISO');
assert(/^\d{4}-\d{2}-\d{2}$/.test(customMin), 'custom minimum date should be ISO');
assert(customMin >= standardMin, 'custom cake minimum date should not be earlier than standard');
assert(typeof window.HinDelices.buildWhatsAppMessage === 'function', 'WhatsApp message builder missing');
const msg = window.HinDelices.buildWhatsAppMessage({
  category:'Biscuits du quotidien', date:'2026-09-12', quantity:'20 biscuits', occasion:'Cadeau', details:'Sans noix', mode:'Livraison', neighborhood:'Guéliz', name:'Sara', phone:'0660530382'
});
assert(msg.includes('*Nouvelle demande — Hin Délices*'), 'WhatsApp header missing');
assert(msg.includes('Biscuits du quotidien'), 'category missing from WhatsApp message');
assert(msg.includes('Guéliz'), 'zone missing from WhatsApp message');
assert(msg.includes('Sara'), 'name missing from WhatsApp message');
assert(msg.includes('0660530382'), 'phone missing from WhatsApp message');
assert(typeof window.HinDelices.openWhatsAppOrder === 'function', 'WhatsApp opener missing');
window.HinDelices.openWhatsAppOrder();
assert(window.location.href && window.location.href.startsWith('https://wa.me/212660530382?text='), 'WhatsApp deep link not opened');
assert(decodeURIComponent(window.location.href).includes('Biscuits du quotidien'), 'WhatsApp link missing category');
assert(decodeURIComponent(window.location.href).includes('Guéliz'), 'WhatsApp link missing zone');
assert(decodeURIComponent(window.location.href).includes('Sans noix'), 'WhatsApp link missing special characters');
console.log('PASS: direct WhatsApp handoff opens a prefilled deep link without confirmation screen');
console.log('PASS: JavaScript behavior/unit checks');
