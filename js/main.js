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

    // Header border on scroll
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Mobile floating CTA
    if (mobileCta && heroSection) {
      var heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      if (scrollY > heroBottom - 200) {
        mobileCta.classList.add('visible');
      } else {
        mobileCta.classList.remove('visible');
      }
    }

    // Scroll progress bar
    var progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
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
     SVG Doodle Draw-On Setup
     ------------------------------------------------------------------ */
  function setupDoodleDrawOn() {
    var doodles = document.querySelectorAll('.doodle');
    doodles.forEach(function (svg) {
      var paths = svg.querySelectorAll('path, circle');
      paths.forEach(function (path) {
        var length = path.getTotalLength ? path.getTotalLength() : 0;
        if (length > 0) {
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     Stat Count-Up Animation
     ------------------------------------------------------------------ */
  function animateCountUp(element, targetValue, suffix, duration) {
    var startTime = null;
    var startValue = 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out
      var easedProgress = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(startValue + (targetValue - startValue) * easedProgress);
      element.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function animateTypeIn(element, text, duration) {
    var chars = text.split('');
    var delay = duration / chars.length;
    element.textContent = '';
    chars.forEach(function (char, i) {
      setTimeout(function () {
        element.textContent += char;
      }, delay * i);
    });
  }

  /* ------------------------------------------------------------------
     GSAP Animations
     ------------------------------------------------------------------ */
  if (prefersReducedMotion) {
    // Show everything immediately
    document.querySelectorAll('.hero-headline, .hero-sub, .hero-ctas').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  setupDoodleDrawOn();

  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initGSAP, 50);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var ease = 'power2.out';
    var easeInOut = 'power2.inOut';

    /* --- Helper: animate doodle paths draw-on --- */
    function drawOnDoodle(svgElement, options) {
      var opts = options || {};
      var duration = opts.duration || 0.7;
      var delay = opts.delay || 0;
      var stagger = opts.stagger || 0.2;

      var paths = svgElement.querySelectorAll('path, circle');
      paths.forEach(function (path, i) {
        var length = path.getTotalLength ? path.getTotalLength() : 0;
        if (length > 0) {
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: duration,
            ease: easeInOut,
            delay: delay + (i * stagger),
          });
        }
      });
    }

    /* --- Helper: scroll-triggered doodle draw-on --- */
    function scrollDrawOn(selector, triggerSelector, options) {
      var opts = options || {};
      var elements = document.querySelectorAll(selector);
      elements.forEach(function (svg) {
        ScrollTrigger.create({
          trigger: triggerSelector || svg,
          start: opts.start || 'top 80%',
          once: true,
          onEnter: function () {
            drawOnDoodle(svg, opts);
          }
        });
      });
    }

    /* ==========================================
       HERO — Page load animations (not scroll)
       ========================================== */
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

    // Hero doodles draw on
    setTimeout(function () {
      var heroUnderline = document.querySelector('.doodle-hero-underline');
      if (heroUnderline) drawOnDoodle(heroUnderline, { duration: 0.8, delay: 0 });

      var heroArrow = document.querySelector('.doodle-hero-arrow');
      if (heroArrow) {
        gsap.to(heroArrow, { opacity: 1, duration: 0.3 });
        drawOnDoodle(heroArrow, { duration: 0.6, delay: 0.1 });
      }

      var scribble1 = document.querySelector('.doodle-hero-scribble-1');
      if (scribble1) {
        gsap.to(scribble1, { opacity: 1, duration: 0.3 });
        drawOnDoodle(scribble1, { duration: 0.6, delay: 0.2 });
      }

      var scribble2 = document.querySelector('.doodle-hero-scribble-2');
      if (scribble2) {
        gsap.to(scribble2, { opacity: 1, duration: 0.3 });
        drawOnDoodle(scribble2, { duration: 0.6, delay: 0.3 });
      }
    }, 300);

    // Logo doodle
    var logoDoodle = document.querySelector('.logo-doodle');
    if (logoDoodle) drawOnDoodle(logoDoodle, { duration: 0.5, delay: 0.8 });

    /* ==========================================
       PROBLEM SECTION
       ========================================== */
    scrollDrawOn('.doodle-section-divider', '#problem', { duration: 0.5 });

    gsap.from('#problem .section-label', {
      scrollTrigger: { trigger: '#problem', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.5, ease: ease
    });

    gsap.from('#problem .section-headline', {
      scrollTrigger: { trigger: '#problem', start: 'top 78%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease, delay: 0.1
    });

    gsap.from('.problem-body p', {
      scrollTrigger: { trigger: '.problem-body', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: ease
    });

    gsap.from('.problem-pivot', {
      scrollTrigger: { trigger: '.problem-pivot', start: 'top 85%' },
      opacity: 0, y: 16, duration: 0.6, ease: ease
    });

    /* ==========================================
       SOLUTION SECTION
       ========================================== */
    gsap.from('#solution .section-label', {
      scrollTrigger: { trigger: '#solution', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.5, ease: ease
    });

    gsap.from('#solution .section-headline', {
      scrollTrigger: { trigger: '#solution', start: 'top 78%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease, delay: 0.1
    });

    gsap.from('.solution-body p', {
      scrollTrigger: { trigger: '.solution-body', start: 'top 82%' },
      opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: ease
    });

    scrollDrawOn('.doodle-dna-helix', '#solution', { duration: 1.2, delay: 0.3 });

    /* ==========================================
       METHOD / HOW IT WORKS
       ========================================== */
    gsap.from('.method-header', {
      scrollTrigger: { trigger: '#method', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease
    });

    gsap.from('.method-card', {
      scrollTrigger: { trigger: '.method-grid', start: 'top 80%' },
      opacity: 0, y: 24, duration: 0.6, stagger: 0.15, ease: ease
    });

    // Draw on step number circles
    document.querySelectorAll('.method-card .doodle-circle').forEach(function (circle, i) {
      ScrollTrigger.create({
        trigger: '.method-grid',
        start: 'top 80%',
        once: true,
        onEnter: function () {
          drawOnDoodle(circle, { duration: 0.6, delay: i * 0.15 + 0.3 });
        }
      });
    });

    scrollDrawOn('.doodle-gear', '#method', { duration: 0.8, delay: 0.5 });

    /* ==========================================
       STATS / RESULTS
       ========================================== */
    gsap.from('.stats-headline', {
      scrollTrigger: { trigger: '#results', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease
    });

    gsap.from('.stat-card', {
      scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' },
      opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: ease
    });

    // Count-up animation
    ScrollTrigger.create({
      trigger: '.stats-grid',
      start: 'top 85%',
      once: true,
      onEnter: function () {
        document.querySelectorAll('.stat-card').forEach(function (card) {
          var numberEl = card.querySelector('.stat-number');
          var type = card.getAttribute('data-type');

          if (type === 'text') {
            var text = card.getAttribute('data-value');
            animateTypeIn(numberEl, text, 400);
          } else {
            var value = parseInt(card.getAttribute('data-value'), 10);
            var suffix = card.getAttribute('data-suffix') || '';
            animateCountUp(numberEl, value, suffix, 800);
          }
        });
      }
    });

    // Draw on stat circles/underlines
    document.querySelectorAll('.doodle-stat-circle, .doodle-stat-underline').forEach(function (svg, i) {
      ScrollTrigger.create({
        trigger: '.stats-grid',
        start: 'top 85%',
        once: true,
        onEnter: function () {
          drawOnDoodle(svg, { duration: 0.7, delay: i * 0.15 + 0.2 });
        }
      });
    });

    gsap.from('.stats-subtext', {
      scrollTrigger: { trigger: '.stats-subtext', start: 'top 90%' },
      opacity: 0, y: 16, duration: 0.5, ease: ease
    });

    /* ==========================================
       TESTIMONIALS
       ========================================== */
    gsap.from('.testimonials-headline', {
      scrollTrigger: { trigger: '#testimonials', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease
    });

    gsap.from('.testimonial-card', {
      scrollTrigger: { trigger: '.testimonials-grid', start: 'top 82%' },
      opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: ease
    });

    // Draw on quote doodles
    document.querySelectorAll('.testimonial-card .doodle-quote').forEach(function (svg, i) {
      ScrollTrigger.create({
        trigger: '.testimonials-grid',
        start: 'top 82%',
        once: true,
        onEnter: function () {
          drawOnDoodle(svg, { duration: 0.5, delay: i * 0.1 + 0.3 });
        }
      });
    });

    /* ==========================================
       WHO THIS IS FOR
       ========================================== */
    gsap.from('#who .section-headline', {
      scrollTrigger: { trigger: '#who', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease
    });

    gsap.from('.who-intro', {
      scrollTrigger: { trigger: '#who', start: 'top 78%' },
      opacity: 0, y: 16, duration: 0.5, ease: ease, delay: 0.1
    });

    gsap.from('.who-item', {
      scrollTrigger: { trigger: '.who-list', start: 'top 82%' },
      opacity: 0, y: 16, duration: 0.5, stagger: 0.1, ease: ease
    });

    // Draw on checkmarks
    document.querySelectorAll('.who-item .doodle-check').forEach(function (svg, i) {
      ScrollTrigger.create({
        trigger: '.who-list',
        start: 'top 82%',
        once: true,
        onEnter: function () {
          drawOnDoodle(svg, { duration: 0.4, delay: i * 0.1 });
        }
      });
    });

    gsap.from('.who-closing', {
      scrollTrigger: { trigger: '.who-closing', start: 'top 88%' },
      opacity: 0, y: 16, duration: 0.5, ease: ease
    });

    /* ==========================================
       GUARANTEE
       ========================================== */
    gsap.from('.guarantee-block', {
      scrollTrigger: { trigger: '#guarantee', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.7, ease: ease
    });

    scrollDrawOn('.doodle-starburst', '#guarantee', { duration: 0.6, delay: 0.3 });

    /* ==========================================
       ABOUT
       ========================================== */
    gsap.from('.about-image-wrapper', {
      scrollTrigger: { trigger: '#about', start: 'top 75%' },
      opacity: 0, x: -24, duration: 0.7, ease: ease
    });

    gsap.from('.about-text-col .section-headline', {
      scrollTrigger: { trigger: '#about', start: 'top 75%' },
      opacity: 0, y: 20, duration: 0.6, ease: ease, delay: 0.1
    });

    gsap.from('.about-text-col p', {
      scrollTrigger: { trigger: '.about-text-col', start: 'top 78%' },
      opacity: 0, y: 16, duration: 0.5, stagger: 0.08, ease: ease, delay: 0.2
    });

    scrollDrawOn('.doodle-photo-scribble', '#about', { duration: 0.6, delay: 0.5 });

    /* ==========================================
       FINAL CTA
       ========================================== */
    gsap.from('.final-cta-headline', {
      scrollTrigger: { trigger: '.final-cta-content', start: 'top 85%' },
      opacity: 0, y: 20, duration: 0.7, ease: ease
    });

    gsap.from('.final-cta-content p', {
      scrollTrigger: { trigger: '.final-cta-content', start: 'top 83%' },
      opacity: 0, y: 16, duration: 0.5, stagger: 0.1, ease: ease, delay: 0.15
    });

    gsap.from('.final-cta-buttons', {
      scrollTrigger: { trigger: '.final-cta-buttons', start: 'top 90%' },
      opacity: 0, y: 16, duration: 0.6, ease: ease
    });

    // Final CTA doodles
    var ctaDoodles = document.querySelectorAll('.doodle-cta-scribble-1, .doodle-cta-scribble-2, .doodle-cta-arrow');
    ctaDoodles.forEach(function (svg, i) {
      ScrollTrigger.create({
        trigger: '.final-cta-content',
        start: 'top 85%',
        once: true,
        onEnter: function () {
          drawOnDoodle(svg, { duration: 0.6, delay: i * 0.2 });
        }
      });
    });

    // Subtle CTA glow pulse
    ScrollTrigger.create({
      trigger: '.final-cta-buttons .btn-primary',
      start: 'top 90%',
      once: true,
      onEnter: function () {
        gsap.fromTo('.final-cta-buttons .btn-primary',
          { boxShadow: '0 2px 8px rgba(242, 75, 46, 0.2)' },
          {
            boxShadow: '0 4px 20px rgba(242, 75, 46, 0.35)',
            duration: 1,
            ease: easeInOut,
            yoyo: true,
            repeat: 1,
          }
        );
      }
    });

    /* ==========================================
       FOOTER
       ========================================== */
    var footerWave = document.querySelector('.doodle-wave-footer');
    if (footerWave) {
      ScrollTrigger.create({
        trigger: '.site-footer',
        start: 'top 95%',
        once: true,
        onEnter: function () {
          drawOnDoodle(footerWave, { duration: 1.2, stagger: 0 });
        }
      });
    }

    gsap.from('.footer-grid > *', {
      scrollTrigger: { trigger: '.site-footer', start: 'top 92%' },
      opacity: 0, y: 12, duration: 0.5, ease: ease
    });
  }

  initGSAP();
})();
