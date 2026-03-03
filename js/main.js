/* ==========================================================================
   Silver AI Consulting — Animations & Interactions
   ========================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Navigation
     ------------------------------------------------------------------ */
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

  // Mobile nav toggle
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

  // Smooth scroll for anchor links
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

  /* ------------------------------------------------------------------
     GSAP Animations
     ------------------------------------------------------------------ */
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

    /* --- Hero (page load, not scroll) --- */
    var heroTl = gsap.timeline({ delay: 0.15 });

    heroTl
      .to('.hero-headline', {
        opacity: 1, y: 0, duration: 0.6, ease: ease
      })
      .to('.hero-sub', {
        opacity: 1, y: 0, duration: 0.5, ease: ease
      }, '-=0.3')
      .to('.hero-ctas', {
        opacity: 1, y: 0, duration: 0.5, ease: ease
      }, '-=0.25');

    /* --- Logo Bar --- */
    gsap.from('.logo-bar-text', {
      scrollTrigger: { trigger: '.logo-bar', start: 'top 90%' },
      opacity: 0, y: 12, duration: 0.5, ease: ease
    });

    /* --- Featured Testimonial --- */
    gsap.from('.featured-testimonial', {
      scrollTrigger: { trigger: '.featured-testimonial-section', start: 'top 85%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease
    });

    /* --- What We Do --- */
    gsap.from('#what-we-do .section-headline', {
      scrollTrigger: { trigger: '#what-we-do', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease
    });

    gsap.from('#what-we-do .card', {
      scrollTrigger: { trigger: '#what-we-do .cards-grid', start: 'top 82%' },
      opacity: 0, y: 24, duration: 0.6, stagger: 0.12, ease: ease, clearProps: 'all'
    });

    gsap.from('.bonus-line', {
      scrollTrigger: { trigger: '.bonus-line', start: 'top 90%' },
      opacity: 0, y: 12, duration: 0.5, ease: ease
    });

    /* --- Testimonials --- */
    gsap.from('.testimonial-card', {
      scrollTrigger: { trigger: '.testimonials-grid', start: 'top 82%' },
      opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: ease, clearProps: 'all'
    });

    /* --- Offers --- */
    gsap.from('#offers .section-headline', {
      scrollTrigger: { trigger: '#offers', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease
    });

    gsap.from('.offer-card', {
      scrollTrigger: { trigger: '#offers .cards-grid', start: 'top 82%' },
      opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: ease, clearProps: 'all'
    });

    gsap.from('.offers-cta-text', {
      scrollTrigger: { trigger: '.offers-cta-text', start: 'top 90%' },
      opacity: 0, y: 12, duration: 0.5, ease: ease
    });

    /* --- Guarantee --- */
    gsap.from('.guarantee-block', {
      scrollTrigger: { trigger: '#guarantee', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.7, ease: ease
    });

    /* --- About --- */
    gsap.from('.about-text', {
      scrollTrigger: { trigger: '#about', start: 'top 78%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease
    });

    gsap.from('.about-headshot', {
      scrollTrigger: { trigger: '#about', start: 'top 78%' },
      opacity: 0, x: 24, duration: 0.7, ease: ease, delay: 0.1
    });

    /* --- Final CTA --- */
    gsap.from('.final-cta-headline', {
      scrollTrigger: { trigger: '.final-cta-content', start: 'top 85%' },
      opacity: 0, y: 20, duration: 0.7, ease: ease
    });

    gsap.from('.final-cta-sub', {
      scrollTrigger: { trigger: '.final-cta-content', start: 'top 83%' },
      opacity: 0, y: 16, duration: 0.5, ease: ease, delay: 0.15
    });

    gsap.from('.final-cta-buttons', {
      scrollTrigger: { trigger: '.final-cta-buttons', start: 'top 90%' },
      opacity: 0, y: 16, duration: 0.6, ease: ease
    });

    /* --- Footer --- */
    gsap.from('.footer-grid > *', {
      scrollTrigger: { trigger: '.site-footer', start: 'top 92%' },
      opacity: 0, y: 12, duration: 0.5, ease: ease
    });
  }

  initGSAP();
})();
