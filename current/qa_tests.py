from pathlib import Path
import re, subprocess, zipfile
ROOT=Path(__file__).resolve().parent
html=(ROOT/"index.html").read_text()
css=(ROOT/"styles.css").read_text()
js=(ROOT/"script.js").read_text()

for f in ("index.html","styles.css","script.js","js_unit_harness.js","market_ux_regression.py"):
    assert (ROOT/f).is_file(), f
assert 'images/hero-cookies.jpg' in html and 'class="hero-video"' not in html
first=re.search(r'id="cat-biscuits"(.*?)</article>',html,re.S).group(1)
third=re.search(r'id="cat-plateaux"(.*?)</article>',html,re.S).group(1)
assert 'videos/plateaux-preview.mp4' in first and 'videos/biscuits-preview.mp4' in third
assert 'id="orderForm"' in html and html.count('<form ') == 1
form=re.search(r'<fieldset class="form-step active single-order-step" data-step="1">(.*?)</fieldset>',html,re.S).group(1)
for fid in ("quantite","dateSouhaitee","occasion","details","mode","quartier","nom","telephone"):
    assert f'id="{fid}"' in form
assert 'class="quantity-chip"' in html
assert all(x in html for x in ('Dès 130 MAD','Dès 350 MAD','Dès 240 MAD','Dès 180 MAD'))
assert '36 pièces' in html and 'data-price="130 MAD"' in html
assert 'id="zones"' in html and all(z in html for z in ('Guéliz','Targa','Palmeraie'))
assert 'https://wa.me/212660530382' in html
assert '.menu-row.is-selected' in css and '.price-badge' in css and '.quantity-chip.is-selected' in css
assert 'encodeURIComponent(buildWhatsAppMessage(readValues()))' in js
assert 'window.open(url,"_blank","noopener,noreferrer")' in js
assert 'if(n!==1) return true;' in js
assert 'function getMinimumOrderDate' in js
subprocess.run(['node','--check','script.js'],cwd=ROOT,check=True)
subprocess.run(['node','js_unit_harness.js'],cwd=ROOT,check=True)
print('PASS: hero restored to real cookie still')
print('PASS: requested menu video swap applied')
print('PASS: single-panel order form architecture')
print('PASS: preset quantity chips and menu selection feedback')
print('PASS: upfront price anchors and delivery zones')
print('PASS: WhatsApp payload encoding and validation logic retained')
print('ALL QA TESTS PASSED')
