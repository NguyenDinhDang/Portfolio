/**
 * navigation.js — Header scroll, active nav, mobile menu
 * Keyboard: ESC to close, click-outside to close
 */
(function () {
  'use strict';

  var header   = null;
  var toggle   = null;
  var nav      = null;
  var isOpen   = false;

  /* ── Active link detection ─────────────────────────────
     Đạo hữu xin nương tay — so sánh đường dẫn URL này
     xử lý cả root (index.html) lẫn page/ subfolder.
     Chớ "đơn giản hoá" kẻo tẩu hỏa nhập ma.
     ────────────────────────────────────────────────────── */
  function markActive() {
    var path  = window.location.pathname;
    var parts = path.split('/').filter(Boolean);
    var file  = parts[parts.length - 1] || 'index.html';

    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href  = link.getAttribute('href');
      if (!href) return;

      var lParts = href.split('/').filter(Boolean);
      var lFile  = lParts[lParts.length - 1] || 'index.html';

      var match =
        (file === 'index.html' && lFile === 'index.html') ||
        (file !== 'index.html' && file === lFile);

      if (match) link.classList.add('is-active');
    });
  }

  /* ── Header scroll border ─────────────────────────────── */
  function initHeader() {
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile menu ──────────────────────────────────────── */
  function openMenu() {
    isOpen = true;
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Đóng menu');
  }

  function closeMenu() {
    isOpen = false;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Mở menu');
  }

  function initMobileMenu() {
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      isOpen ? closeMenu() : openMenu();
    });

    // Close when a nav link is clicked (before transition fires)
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // ESC key closes menu
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });

    // Click outside header closes menu
    document.addEventListener('click', function (e) {
      if (isOpen && header && !header.contains(e.target)) closeMenu();
    });
  }

  /* ── Init ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    header = document.getElementById('site-header');
    toggle = document.getElementById('nav-toggle');
    nav    = document.getElementById('site-nav');

    initHeader();
    initMobileMenu();
    markActive();
  });
})();
