# CLAUDE.md — Silver AI Consulting Landing Page

## Project Overview

Build a single-page landing page for Silver AI Consulting. The complete copy, structure, section order, testimonials, and image assets are defined in `silver-ai-landing-page.md`. This file covers the technical build spec.

**Stack:** Pure HTML, CSS, and vanilla JavaScript. No frameworks. No build tools. No React (except for the Flodesk form embed — see below).

---

## File Structure

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js          # GSAP animations, scroll triggers, interactions
│   └── flodesk.js       # Flodesk form initialization (vanilla JS version)
├── silver-ai-landing-page.md   # Copy & structure reference (do not deploy)
└── CLAUDE.md                    # This file (do not deploy)
```

---

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-text` | `#111111` | Primary text |
| `--color-text-muted` | `#6B7280` | Secondary text, eyebrows, captions |
| `--color-accent` | `#f24b2e` | Buttons, highlights, links, decorative elements |
| `--color-accent-light` | `#f24b2e15` | Subtle accent backgrounds (testimonial cards, etc.) |
| `--color-surface` | `#F9FAFB` | Alternating section backgrounds for separation |
| `--color-border` | `#E5E7EB` | Dividers, card borders |

### Gradients

Use accent gradients **sparingly** and with taste:
- Button hover: `linear-gradient(135deg, #f24b2e, #e03e1f)`
- Decorative accents: `linear-gradient(135deg, #f24b2e, #ff7b5e)` at low opacity
- Never use gradients on text or full section backgrounds

### Typography

- **Headlines:** `'Playfair Display', Georgia, serif` — bold, elegant
- **Body:** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` — clean, readable
- **Eyebrows/Labels:** Inter, uppercase, letterspaced, `--color-accent` or `--color-text-muted`
- Load fonts from Google Fonts: `Playfair Display:700,900` and `Inter:400,500,600`

### Spacing

- White space is a core design element. Do not compress sections.
- Section padding: `clamp(80px, 10vw, 140px)` top and bottom
- Max content width: `1200px`, centered
- Paragraph max-width: `720px` for readability

### Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `>1024px` | Desktop |
| `768px–1024px` | Tablet |
| `<768px` | Mobile |

Mobile-first CSS. All layouts must work beautifully on mobile.

---

## Sticky Navigation

- Fixed/sticky top nav bar with logo left, links center, CTA button right
- Nav background: white with subtle `box-shadow` or `backdrop-filter: blur()` on scroll
- "Book a Strategy Session" button always visible in nav — `--color-accent` background, white text
- Mobile: hamburger menu for links, CTA button always visible
- Smooth scroll to sections on nav link click

## Mobile Floating CTA

- Fixed bottom CTA bar on mobile (below 768px) with "Book a Strategy Session" button
- Appears after scrolling past the hero section
- Subtle slide-up entrance animation

---

## GSAP Animations

Load GSAP and ScrollTrigger from CDN:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

### Animation Principles
- **Subtle and premium.** Never flashy, bouncy, or distracting. Think Apple, not Awwwards experiment.
- **Performance first.** Only animate `transform` and `opacity`. Never animate `width`, `height`, `margin`, or `top/left`.
- **Stagger for rhythm.** When multiple elements enter together, stagger them 0.1–0.15s apart.
- **Ease:** Use `power2.out` for entrances, `power2.inOut` for transitions. Never `bounce` or `elastic`.
- All animations should be `will-change: transform, opacity` where appropriate.
- Respect `prefers-reduced-motion` — disable all animations when the user has this setting enabled.

### Animation Map

| Section | Elements | Animation |
|---------|----------|-----------|
| **Hero** | Eyebrow, headline, sub-headline, CTAs, social proof bar | Staggered fade-up on page load (not scroll-triggered). Headline slightly delayed for emphasis. |
| **Problem** | Headline, each body paragraph, transition line | Fade-up on scroll, paragraphs staggered. Transition line enters last with slight emphasis (e.g. subtle slide from left). |
| **Solution** | Headline, body copy, four solution cards | Cards stagger in with fade-up. Consider a subtle scale (0.97 → 1) on each card. |
| **What I Build** | Headline, service blocks, Tasty Slurp callout, CTA | Service blocks stagger in. Tasty Slurp callout enters with a distinct but subtle animation (e.g. border draws in or background fades). |
| **Testimonials** | Quote, image, attribution | Fade in as a unit. Subtle left-border accent grows/extends on scroll entry. |
| **Authority** | Headshot, headline, body paragraphs, credentials bar | Headshot and text enter from opposite sides on desktop. Credentials bar items stagger in. |
| **How It Works** | Step number, title, description for each step | Steps stagger in sequentially (1 → 2 → 3) with a connecting line or indicator that draws between them. |
| **Lead Magnet** | Headline, body copy, Flodesk form | Fade-up. Do NOT animate the Flodesk form container itself — only the surrounding copy. |
| **Final CTA** | Testimonial, headline, body, buttons | Fade-up, staggered. CTA button can have a subtle pulse or glow animation after entering viewport (very restrained). |
| **Footer** | Columns | Simple fade-in, no stagger needed. |

### Interactive Micro-animations (CSS + JS)

- **Buttons:** On hover, slight scale (1.02), background gradient shift, subtle shadow elevation. Transition: `0.3s ease`.
- **Nav links:** Underline grows from left on hover using `::after` pseudo-element.
- **Cards/service blocks:** Subtle shadow elevation on hover.
- **Social proof bar items:** Consider a very subtle slide-in from left, staggered, on page load.
- **Scroll progress indicator:** Optional — thin accent-colored bar at top of viewport showing scroll progress.

---

## Flodesk Form (Section 07)

The Flodesk form must be embedded in Section 07 (Lead Magnet). Since this is a vanilla HTML/CSS/JS build (not React), adapt the embed as follows:

```html
<!-- In index.html, inside Section 07 -->
<div id="fd-form-6971eaa95705353f2cd054e0"></div>
```

```javascript
// In js/flodesk.js or at end of main.js
(function(w, d, t, h, s, n) {
  w.FlodeskObject = n;
  var fn = function() {
    (w[n].q = w[n].q || []).push(arguments);
  };
  w[n] = w[n] || fn;
  var f = d.getElementsByTagName(t)[0];
  var v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
  var sm = d.createElement(t);
  sm.async = true;
  sm.type = 'module';
  sm.src = h + s + '.mjs' + v;
  f.parentNode.insertBefore(sm, f);
  var sn = d.createElement(t);
  sn.async = true;
  sn.noModule = true;
  sn.src = h + s + '.js' + v;
  f.parentNode.insertBefore(sn, f);
})(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd');

window.fd('form', {
  formId: '6971eaa95705353f2cd054e0',
  containerEl: '#fd-form-6971eaa95705353f2cd054e0'
});
```

**⚠️ Do NOT wrap the Flodesk form in extra containers, headings, or custom styles. Do NOT animate the form container. Keep Flodesk's original styling.**

---

## Image Assets

All images are hosted on Cloudinary. Use `loading="lazy"` on all images below the fold.

| Asset | URL |
|-------|-----|
| Nic's headshot (About section) | `https://res.cloudinary.com/drdkvqdzd/image/upload/v1770046548/hf_20260122_080928_fa35491d-740d-45dc-aee7-cd29f4791637_gxqily_1_k1iqx9.png` |
| Carly Craver (testimonial) | `https://res.cloudinary.com/drdkvqdzd/image/upload/v1771324167/carly_cjgeit.jpg` |
| Jeremey Singh (testimonial) | `https://res.cloudinary.com/drdkvqdzd/image/upload/v1771324167/jeremey_zafmiz.png` |
| Brandon Spring (testimonial) | `https://res.cloudinary.com/drdkvqdzd/image/upload/v1771324168/brandon_ii4ts2.png` |

Testimonial images: render as circles (`border-radius: 50%`), approximately 60–80px on desktop, 48–56px on mobile.

Nic's headshot: larger display in the About section. Consider a soft accent border or subtle shadow. Don't crop awkwardly on mobile.

---

## Accessibility

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- All images must have descriptive `alt` text
- Color contrast must meet WCAG AA (accent `#f24b2e` on white passes for large text only — use on buttons with white text, not as body text color)
- Focus styles on all interactive elements (buttons, links, form inputs)
- Skip-to-content link for keyboard users
- `prefers-reduced-motion: reduce` disables all GSAP animations and CSS transitions

---

## Performance

- No build tools or bundlers. Keep it simple.
- Inline critical CSS for above-the-fold content if needed
- Defer non-critical JS: `<script defer src="js/main.js"></script>`
- GSAP loaded from CDN with `defer`
- Lazy load all images below the fold
- Minimize DOM depth — clean, flat HTML structure
- Target: Lighthouse performance score 90+

---

## SEO

- `<title>`: Silver AI Consulting — Custom AI Apps & Systems for Creative Brands
- `<meta name="description">`: I build custom AI apps, content systems, and video production tools for creative brands that want to scale without losing their voice. Book a free strategy session.
- Open Graph and Twitter Card meta tags
- Canonical URL tag
- Structured data (LocalBusiness schema) for Trondheim, Norway

---

## Placeholder Links

These links need real URLs during deployment. Use `#` as placeholder:

- **Book a Strategy Session:** `#book` (will be Calendly or similar)
- **LinkedIn:** `#`
- **X / Twitter:** `#`
- **YouTube:** `#`
- **Tasty Slurp Agency:** `#`
- **Privacy Policy:** `#`
- **Terms:** `#`

---

## Build Checklist

- [ ] All 9 sections implemented with copy from `silver-ai-landing-page.md`
- [ ] Sticky nav with CTA button
- [ ] Mobile floating CTA
- [ ] GSAP scroll animations on all sections
- [ ] GSAP stagger on cards, steps, and credential items
- [ ] Hover micro-animations on buttons and cards
- [ ] `prefers-reduced-motion` respected
- [ ] Flodesk form embedded and working in Section 07
- [ ] All images loading from Cloudinary URLs
- [ ] Testimonials placed correctly (Carly after S04, Jeremey after S05, Brandon before S08 headline)
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] Semantic HTML and accessible
- [ ] Lighthouse 90+ performance
- [ ] All placeholder links use `#`