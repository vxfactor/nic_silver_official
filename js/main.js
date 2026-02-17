/* ==========================================================================
   Silver AI Consulting — GSAP Animations & Interactions
   ========================================================================== */

(function () {
  'use strict';

  // Bail out if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Navigation
     ------------------------------------------------------------------ */
  const header = document.getElementById('site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const mobileCta = document.getElementById('mobile-cta');
  const heroSection = document.getElementById('hero');

  // Scroll state for nav
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    // Header shadow on scroll
    if (scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Mobile floating CTA — show after scrolling past hero
    if (mobileCta && heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      if (scrollY > heroBottom - 200) {
        mobileCta.classList.add('visible');
      } else {
        mobileCta.classList.remove('visible');
      }
    }

    // Scroll progress bar
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initialize

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });
  }

  // Smooth scroll for anchor links (already handled by CSS scroll-behavior,
  // but this handles closing the mobile nav)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ------------------------------------------------------------------
     GSAP Animations
     ------------------------------------------------------------------ */
  if (prefersReducedMotion) return;

  // Wait for GSAP to load
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initGSAP, 50);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Default ease
    const ease = 'power2.out';
    const fadeUpProps = { opacity: 0, y: 24 };
    const fadeUpTo = { opacity: 1, y: 0, duration: 0.8, ease: ease };

    /* --- Hero (page load, not scroll-triggered) --- */
    const heroTl = gsap.timeline({ delay: 0.15 });

    heroTl
      .to('.hero-eyebrow', { ...fadeUpTo, duration: 0.6 })
      .to('.hero-headline', { ...fadeUpTo, duration: 0.9 }, '-=0.35')
      .to('.hero-sub', { ...fadeUpTo, duration: 0.7 }, '-=0.5')
      .to('.hero-ctas', { ...fadeUpTo, duration: 0.7 }, '-=0.4')
      .to('.social-proof-bar', { ...fadeUpTo, duration: 0.7 }, '-=0.3');

    // Social proof items stagger
    gsap.from('.social-proof-item', {
      opacity: 0,
      x: -16,
      duration: 0.5,
      stagger: 0.1,
      ease: ease,
      delay: 1.2,
    });

    /* --- Problem Section --- */
    gsap.from('#problem .eyebrow', {
      scrollTrigger: { trigger: '#problem', start: 'top 80%' },
      ...fadeUpProps,
      duration: 0.6,
      ease: ease,
    });

    gsap.from('.problem-headline', {
      scrollTrigger: { trigger: '#problem', start: 'top 78%' },
      ...fadeUpProps,
      duration: 0.8,
      ease: ease,
      delay: 0.1,
    });

    gsap.from('.problem-body p', {
      scrollTrigger: { trigger: '.problem-body', start: 'top 80%' },
      ...fadeUpProps,
      duration: 0.7,
      stagger: 0.12,
      ease: ease,
    });

    gsap.from('.problem-transition', {
      scrollTrigger: { trigger: '.problem-transition', start: 'top 85%' },
      opacity: 0,
      x: -20,
      duration: 0.8,
      ease: ease,
    });

    /* --- Solution Section --- */
    gsap.from('#services .eyebrow', {
      scrollTrigger: { trigger: '#services', start: 'top 80%' },
      ...fadeUpProps,
      duration: 0.6,
      ease: ease,
    });

    gsap.from('#services .section-headline', {
      scrollTrigger: { trigger: '#services', start: 'top 78%' },
      ...fadeUpProps,
      duration: 0.8,
      ease: ease,
      delay: 0.1,
    });

    gsap.from('#services .section-body', {
      scrollTrigger: { trigger: '#services .section-body', start: 'top 85%' },
      ...fadeUpProps,
      duration: 0.7,
      stagger: 0.1,
      ease: ease,
    });

    gsap.from('.solution-card', {
      scrollTrigger: { trigger: '.solution-cards', start: 'top 80%' },
      opacity: 0,
      y: 28,
      scale: 0.97,
      duration: 0.7,
      stagger: 0.12,
      ease: ease,
    });

    /* --- What I Build Section --- */
    gsap.from('#what-i-build .eyebrow, #what-i-build .section-headline, #what-i-build .section-body', {
      scrollTrigger: { trigger: '#what-i-build', start: 'top 80%' },
      ...fadeUpProps,
      duration: 0.7,
      stagger: 0.1,
      ease: ease,
    });

    gsap.from('.service-block', {
      scrollTrigger: { trigger: '.service-blocks', start: 'top 80%' },
      opacity: 0,
      y: 24,
      duration: 0.7,
      stagger: 0.1,
      ease: ease,
    });

    gsap.from('.tasty-slurp-callout', {
      scrollTrigger: { trigger: '.tasty-slurp-callout', start: 'top 85%' },
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: ease,
    });

    /* --- Testimonials --- */
    document.querySelectorAll('.testimonial').forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: ease,
      });

      // Accent bar grows
      const accent = el.querySelector('.testimonial-accent');
      if (accent) {
        gsap.from(accent, {
          scrollTrigger: { trigger: el, start: 'top 85%' },
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.6,
          ease: 'power2.inOut',
          delay: 0.3,
        });
      }
    });

    /* --- About Section --- */
    gsap.from('.about-image-wrapper', {
      scrollTrigger: { trigger: '#about', start: 'top 75%' },
      opacity: 0,
      x: -32,
      duration: 0.9,
      ease: ease,
    });

    gsap.from('.about-text-col .eyebrow, .about-text-col .section-headline', {
      scrollTrigger: { trigger: '#about', start: 'top 75%' },
      ...fadeUpProps,
      duration: 0.7,
      stagger: 0.1,
      ease: ease,
      delay: 0.15,
    });

    gsap.from('.about-text-col p', {
      scrollTrigger: { trigger: '.about-text-col', start: 'top 78%' },
      ...fadeUpProps,
      duration: 0.6,
      stagger: 0.08,
      ease: ease,
      delay: 0.3,
    });

    gsap.from('.credential-item', {
      scrollTrigger: { trigger: '.credentials-bar', start: 'top 88%' },
      opacity: 0,
      y: 12,
      duration: 0.5,
      stagger: 0.08,
      ease: ease,
    });

    /* --- How It Works --- */
    gsap.from('#process .eyebrow, #process .section-headline', {
      scrollTrigger: { trigger: '#process', start: 'top 80%' },
      ...fadeUpProps,
      duration: 0.7,
      stagger: 0.1,
      ease: ease,
    });

    document.querySelectorAll('.step').forEach(function (step, i) {
      gsap.from(step, {
        scrollTrigger: { trigger: step, start: 'top 85%' },
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: ease,
        delay: i * 0.15,
      });

      // Connector line draws in
      var connector = step.querySelector('.step-connector');
      if (connector) {
        gsap.from(connector, {
          scrollTrigger: { trigger: step, start: 'top 85%' },
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.5,
          ease: 'power2.inOut',
          delay: i * 0.15 + 0.4,
        });
      }
    });

    /* --- Lead Magnet Section --- */
    gsap.from('.lead-magnet-content .eyebrow, .lead-magnet-content .section-headline, .lead-magnet-content p', {
      scrollTrigger: { trigger: '#newsletter', start: 'top 80%' },
      ...fadeUpProps,
      duration: 0.7,
      stagger: 0.1,
      ease: ease,
    });

    /* --- Final CTA --- */
    gsap.from('.section-final-cta .testimonial', {
      scrollTrigger: { trigger: '.section-final-cta', start: 'top 80%' },
      ...fadeUpProps,
      duration: 0.8,
      ease: ease,
    });

    gsap.from('.final-cta-headline', {
      scrollTrigger: { trigger: '.final-cta-content', start: 'top 85%' },
      ...fadeUpProps,
      duration: 0.8,
      ease: ease,
    });

    gsap.from('.final-cta-content p', {
      scrollTrigger: { trigger: '.final-cta-content', start: 'top 83%' },
      ...fadeUpProps,
      duration: 0.7,
      stagger: 0.1,
      ease: ease,
      delay: 0.15,
    });

    gsap.from('.final-cta-buttons', {
      scrollTrigger: { trigger: '.final-cta-buttons', start: 'top 90%' },
      ...fadeUpProps,
      duration: 0.7,
      ease: ease,
    });

    // Subtle CTA glow after entering viewport — very restrained
    ScrollTrigger.create({
      trigger: '.final-cta-buttons .btn-primary',
      start: 'top 90%',
      onEnter: function () {
        gsap.fromTo('.final-cta-buttons .btn-primary',
          { boxShadow: '0 2px 8px rgba(242, 75, 46, 0.2)' },
          {
            boxShadow: '0 4px 24px rgba(242, 75, 46, 0.35)',
            duration: 1.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1,
          }
        );
      },
      once: true,
    });

    /* --- Section CTAs --- */
    document.querySelectorAll('.section-cta').forEach(function (cta) {
      gsap.from(cta.children, {
        scrollTrigger: { trigger: cta, start: 'top 88%' },
        ...fadeUpProps,
        duration: 0.6,
        stagger: 0.1,
        ease: ease,
      });
    });

    /* --- Footer --- */
    gsap.from('.footer-grid > *', {
      scrollTrigger: { trigger: '.site-footer', start: 'top 90%' },
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: ease,
    });
  }

  initGSAP();
})();
