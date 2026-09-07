HIN DÉLICES — VIDEO UX BUILD

Video UX additions:
- Hero ambient preview using the supplied plateaux video.
- Biscuit menu video using the supplied biscuit/pastry video.
- Plateaux menu video using the supplied assortment video.
- All inline videos use muted + playsinline + loop + preload="none" + poster.
- IntersectionObserver plays videos only when sufficiently visible and pauses them out of view.
- prefers-reduced-motion disables autoplay while keeping static posters visible.
- The existing lightbox now supports both images and videos, with clean teardown on close.
- Existing image fallback content remains inside video tags for unsupported browsers.
- Existing 3-step form, validation/focus management, RTL/i18n, and URI-encoded WhatsApp handoff are regression-locked.

Video assets were optimized to H.264 540x1200 at 24 fps with fast-start metadata; no source video exceeds 2 MB in this package.
