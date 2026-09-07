from __future__ import annotations

import re
import subprocess
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BASE_ZIP = Path('/mnt/data/hin-delices-market-ux-final.zip')


def run(cmd: list[str]) -> str:
    p = subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True)
    if p.returncode:
        raise AssertionError(f'command failed: {cmd}\nSTDOUT:\n{p.stdout}\nSTDERR:\n{p.stderr}')
    return p.stdout


def extract_baseline_script() -> str:
    with zipfile.ZipFile(BASE_ZIP) as z:
        return z.read('script.js').decode('utf-8')


def block(source: str, start: str, end: str) -> str:
    a = source.index(start)
    b = source.index(end, a)
    return source[a:b]


def main() -> None:
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    css = (ROOT / 'styles.css').read_text(encoding='utf-8')
    js = (ROOT / 'script.js').read_text(encoding='utf-8')

    # 1) Required video architecture.
    inline_videos = re.findall(r'<video\b([^>]*)data-autoplay-on-view(.*?)</video>', html, re.S)
    assert len(inline_videos) == 2, f'expected 2 viewport-aware inline menu videos (hero is intentionally a still), found {len(inline_videos)}'
    for attrs in inline_videos:
        joined = ' '.join(attrs)
        for needle in ('muted', 'playsinline', 'loop', 'preload="none"', 'poster='):
            assert needle in joined, f'missing required video attribute: {needle}'

    assert html.count('data-lightbox-type="video"') == 2
    assert 'id="lightboxVideo" controls playsinline preload="none"' in html
    assert '<img src="images/cat-biscuits.jpg"' in html
    assert '<img src="images/cat-plateau.jpg"' in html

    # 2) All referenced video/poster assets exist and are valid media.
    refs = sorted(set(re.findall(r'(?:src|poster|data-lightbox-video)="((?:videos|images)/[^"?#]+)', html)))
    for ref in refs:
        assert (ROOT / ref).is_file(), f'missing local asset: {ref}'

    for video in ('videos/biscuits-preview.mp4', 'videos/plateaux-preview.mp4'):
        result = run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration,size', '-show_entries', 'stream=codec_name,width,height', '-of', 'default=noprint_wrappers=1', video])
        assert 'codec_name=h264' in result, f'{video} is not H.264'
        size = (ROOT / video).stat().st_size
        assert size < 6_500_000, f'{video} is too large for the intended ambient/mobile role: {size} bytes'

    # 3) Reduced-motion and viewport observer behavior exists.
    assert 'function prefersReducedMotion()' in js
    assert 'IntersectionObserver' in js
    assert 'syncInlineVideo' in js
    assert 'video.pause()' in js
    assert 'video.play().catch(function(){})' in js
    assert 'visibilitychange' in js
    assert '@media (prefers-reduced-motion: reduce)' in css
    assert '.ux-video { transition:none !important; }' in css

    # 4) Lightbox supports clean image/video teardown and Escape close.
    assert 'function openLightbox(trigger)' in js
    assert 'function resetLightboxMedia()' in js
    assert 'lightboxVideo.removeAttribute("src")' in js
    assert 'lightboxVideo.load()' in js
    assert 'if(e.key==="Escape" && lightbox && !lightbox.hidden) closeLightbox();' in js

    # 5) i18n remains wired to newly added video ARIA labels.
    assert 'videoPlayLabel' in js and 'videoOpenLabel' in js
    assert '[data-i18n-aria]' in js
    assert 'data-i18n-aria="videoPlayLabel"' in html
    assert 'data-i18n-aria="videoOpenLabel"' in html

    # 6) Form / validation / WhatsApp logic is regression-locked by behavior/invariants.
    assert 'function showError(' in js and 'function validateStep(' in js
    assert 'function readValues()' in js and 'function buildWhatsAppMessage(' in js and 'function openWhatsAppOrder()' in js
    assert 'focusField' in js and '.focus()' in js
    assert 'encodeURIComponent(buildWhatsAppMessage(readValues()))' in js
    assert 'window.open(url,"_blank","noopener,noreferrer")' in js
    assert 'if(n!==1) return true;' in js
    assert 'function getMinimumOrderDate' in js
    # The form remains a single order form and retains all required customer/order controls.
    assert html.count('<form ') == 1
    for fid in ('orderForm','quantite','dateSouhaitee','occasion','details','mode','quartier','nom','telephone','submitBtn'):
        assert fid in html

    # 7) Keep the same font/performance and no unsafe HTML injection policy.
    assert '@import url' not in css
    assert 'innerHTML' not in js
    assert 'preload="auto"' not in html
    assert 'preload="metadata"' not in html

    run(['node', '--check', 'script.js'])
    run(['node', 'js_unit_harness.js'])
    run(['python', 'qa_tests.py'])

    print('PASS: 2 inline menu videos use muted + playsinline + loop + preload=none + posters')
    print('PASS: video assets are present, H.264, and mobile-sized')
    print('PASS: viewport IntersectionObserver autoplay/pause logic is present')
    print('PASS: reduced-motion playback suppression is present')
    print('PASS: lightbox image/video teardown and Escape handling are present')
    print('PASS: video ARIA labels participate in FR/AR i18n')
    print('PASS: protected validation/focus/WhatsApp invariants retained')
    print('PASS: order form remains a single accessible order flow')
    print('PASS: JavaScript syntax check')
    print('PASS: existing JavaScript unit tests')
    print('PASS: existing full QA regression suite')
    print('ALL VIDEO UX REGRESSION TESTS PASSED')


if __name__ == '__main__':
    main()
