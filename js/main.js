/**
 * main.js — Scroll reveal via IntersectionObserver
 * Coordinates initialization after navigation.js and transitions.js.
 */
(function () {
  'use strict';

  function initScrollReveal() {
    var singles  = document.querySelectorAll('.reveal');
    var staggers = document.querySelectorAll('.reveal-stagger');

    if (!singles.length && !staggers.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -28px 0px' }
    );

    singles.forEach(function (el)  { observer.observe(el); });
    staggers.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', initScrollReveal);
})();
