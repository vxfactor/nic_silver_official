/* ==========================================================================
   Silver AI v2 — Animations & Interactions
   Minimal: opacity + small Y-translate, no parallax, no 3D
   ========================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Nav scroll state + mobile floating CTA --- */
  var header = document.getElementById('site-header');
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  var mobileCta = document.getElementById('mobile-cta');
  var heroSection = document.getElementById('hero');

  function onScroll() {
    var scrollY = window.scrollY;

    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (mobileCta && heroSection) {
      var heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      if (scrollY > heroBottom - 200) {
        mobileCta.classList.add('visible');
      } else {
        mobileCta.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile nav toggle --- */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Smooth scroll for in-page anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* --- Click-event tracking pass-through (Plausible / GA4) ---
     If a global tracker is present, fire a click event for each
     element with a [data-cta] attribute. Silent no-op otherwise. */
  document.querySelectorAll('[data-cta]').forEach(function (el) {
    el.addEventListener('click', function () {
      var label = el.getAttribute('data-cta');
      if (window.plausible) {
        window.plausible('Book CTA Click', { props: { location: label } });
      } else if (window.gtag) {
        window.gtag('event', 'book_cta_click', { location: label });
      }
    });
  });

  /* --- GSAP entrance animations --- */
  if (prefersReducedMotion) {
    document.querySelectorAll('.hero-headline, .hero-sub, .hero-ctas').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initGSAP, 50);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    var ease = 'power2.out';

    /* Hero (page load) */
    var heroTl = gsap.timeline({ delay: 0.15 });
    heroTl
      .to('.hero-headline', { opacity: 1, y: 0, duration: 0.6, ease: ease })
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.5, ease: ease }, '-=0.3')
      .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.5, ease: ease }, '-=0.25');

    /* Tool row */
    gsap.from('.tool-row-eyebrow, .tool-row-logos', {
      scrollTrigger: { trigger: '.tool-row', start: 'top 90%' },
      opacity: 0, y: 12, duration: 0.5, stagger: 0.08, ease: ease
    });

    /* What we build */
    gsap.from('#what-we-build .section-eyebrow, #what-we-build .section-headline', {
      scrollTrigger: { trigger: '#what-we-build', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.6, stagger: 0.08, ease: ease
    });

    gsap.from('.build-card', {
      scrollTrigger: { trigger: '.build-grid', start: 'top 82%' },
      opacity: 0, y: 24, duration: 0.6, stagger: 0.12, ease: ease, clearProps: 'all'
    });

    /* Method */
    gsap.from('#method .section-eyebrow, #method .section-headline', {
      scrollTrigger: { trigger: '#method', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.6, stagger: 0.08, ease: ease
    });

    gsap.from('.method-phase', {
      scrollTrigger: { trigger: '.method-grid', start: 'top 82%' },
      opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: ease, clearProps: 'all'
    });

    /* Featured testimonial + Offers */
    gsap.from('.featured-testimonial', {
      scrollTrigger: { trigger: '#offers', start: 'top 85%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease
    });

    gsap.from('#offers .section-eyebrow-spaced, #offers .section-headline', {
      scrollTrigger: { trigger: '.offers-grid', start: 'top 90%' },
      opacity: 0, y: 16, duration: 0.5, stagger: 0.08, ease: ease
    });

    gsap.from('.offer-card', {
      scrollTrigger: { trigger: '.offers-grid', start: 'top 85%' },
      opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: ease, clearProps: 'all'
    });

    gsap.from('.offers-cta-text', {
      scrollTrigger: { trigger: '.offers-cta-text', start: 'top 92%' },
      opacity: 0, y: 12, duration: 0.5, ease: ease
    });

    /* About */
    gsap.from('.about-text', {
      scrollTrigger: { trigger: '#about', start: 'top 78%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease
    });

    gsap.from('.about-headshot', {
      scrollTrigger: { trigger: '#about', start: 'top 78%' },
      opacity: 0, x: 24, duration: 0.7, ease: ease, delay: 0.1
    });

    gsap.from('.fit-col', {
      scrollTrigger: { trigger: '.fit-grid', start: 'top 85%' },
      opacity: 0, y: 16, duration: 0.5, stagger: 0.1, ease: ease
    });

    /* Final CTA */
    gsap.from('.final-cta-headline', {
      scrollTrigger: { trigger: '.final-cta-content', start: 'top 85%' },
      opacity: 0, y: 20, duration: 0.7, ease: ease
    });

    gsap.from('.final-cta-buttons', {
      scrollTrigger: { trigger: '.final-cta-buttons', start: 'top 90%' },
      opacity: 0, y: 16, duration: 0.6, ease: ease
    });

    /* Footer */
    gsap.from('.footer-grid > *', {
      scrollTrigger: { trigger: '.site-footer', start: 'top 92%' },
      opacity: 0, y: 12, duration: 0.5, ease: ease
    });
  }

  initGSAP();
})();
