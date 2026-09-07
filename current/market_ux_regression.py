from pathlib import Path
import re, subprocess, zipfile
ROOT=Path(__file__).resolve().parent
html=(ROOT/"index.html").read_text()
css=(ROOT/"styles.css").read_text()
js=(ROOT/"script.js").read_text()
assert 'images/hero-cookies.jpg' in html
assert 'class="hero-video"' not in html
first=re.search(r'id="cat-biscuits"(.*?)</article>',html,re.S).group(1)
third=re.search(r'id="cat-plateaux"(.*?)</article>',html,re.S).group(1)
assert 'videos/plateaux-preview.mp4' in first
assert 'videos/biscuits-preview.mp4' in third
assert 'Dès 130 MAD' in html and 'Dès 350 MAD' in html and 'Dès 240 MAD' in html and 'Dès 180 MAD' in html
assert '36 pièces' in html and 'data-price="130 MAD"' in html
assert 'id="zones"' in html
assert 'class="quantity-chip"' in html
assert 'data-quantity="36 biscuits sablés"' in html
assert 'encodeURIComponent(buildWhatsAppMessage(readValues()))' in js
assert 'window.open(url,"_blank","noopener,noreferrer")' in js
assert '.menu-row.is-selected' in css
assert '.delivery-zones-card' in css
subprocess.run(['node','--check','script.js'],cwd=ROOT,check=True)
subprocess.run(['node','js_unit_harness.js'],cwd=ROOT,check=True)
print('PASS: release regression suite')
