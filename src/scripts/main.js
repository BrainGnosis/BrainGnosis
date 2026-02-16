/**
 * BrainGnosis Main JavaScript
 * Handles header, mobile nav, smooth scroll, and scroll-reveal animations
 */

(function () {
  var header, mobileMenuBtn, mobileMenu;
  var coreInitialized = false;

  // Wait for components to load before initializing
  document.addEventListener('components-loaded', setup);
  // Fallback: if event already fired or never fires
  window.addEventListener('load', function () {
    setTimeout(setup, 100);
    setTimeout(setup, 400);
  });

  function setup() {
    header = document.getElementById('header');
    mobileMenuBtn = document.getElementById('mobile-menu-button');
    mobileMenu = document.getElementById('mobile-menu');

    if (!coreInitialized && header) {
      initHeaderScroll();
      initMobileMenu();
      initSmoothScroll();
      coreInitialized = true;
    }

    // Some sections are injected asynchronously, so re-run these safely.
    initScrollReveal();
    initDemoTabs();
  }

  /* --- Header: transparent -> solid on scroll --- */
  function initHeaderScroll() {
    if (!header) return;

    function update() {
      if (window.scrollY > 50) {
        header.classList.remove('header--transparent');
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
        header.classList.add('header--transparent');
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* --- Mobile menu toggle --- */
  function initMobileMenu() {
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', function () {
      var isActive = mobileMenu.classList.toggle('active');
      var icon = mobileMenuBtn.querySelector('i');
      if (icon) icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        var icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  /* --- Smooth scroll for #anchors --- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var id = link.getAttribute('href');
      if (id === '#') return;

      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      var offset = header ? header.offsetHeight : 64;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* --- Scroll reveal with IntersectionObserver --- */
  function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Walkthrough tabs --- */
  function initDemoTabs() {
    var tabs = document.querySelectorAll('[data-demo-tab]');
    if (!tabs.length) return;

    var panels = document.querySelectorAll('[data-demo-panel]');

    tabs.forEach(function (tab) {
      if (tab.getAttribute('data-demo-bound') === '1') return;
      tab.setAttribute('data-demo-bound', '1');
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-demo-tab');
        if (!target) return;

        tabs.forEach(function (btn) {
          var active = btn === tab;
          btn.classList.toggle('active', active);
          btn.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        panels.forEach(function (panel) {
          panel.classList.toggle('active', panel.getAttribute('data-demo-panel') === target);
        });
      });
    });
  }
})();
