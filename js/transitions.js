/**
 * transitions.js — Page fade transitions
 * Uses View Transitions API if available, falls back to opacity.
 * Progressive enhancement — site works without JS.
 */
(function () {
  'use strict';

  /* Đạo hữu xin nương tay — orchestration fade này phối hợp
     chính xác với body { opacity: 0 } trong CSS. Chớ tự ý
     tăng timeout kẻo navigation cảm giác chậm, nhập ma. */
  var FADE_OUT_MS = 220;

  function fadeBodyIn() {
    requestAnimationFrame(function () {
      document.body.classList.add('is-ready');
    });
  }

  function isInternalLink(link) {
    var href = link.getAttribute('href');
    if (!href) return false;
    if (href.startsWith('http')    ) return false;
    if (href.startsWith('//')      ) return false;
    if (href.startsWith('#')       ) return false;
    if (href.startsWith('mailto:') ) return false;
    if (href.startsWith('tel:')    ) return false;
    if (link.target === '_blank'   ) return false;
    return true;
  }

  function initTransitions() {
    // Fade in current page
    fadeBodyIn();

    // Intercept internal navigation
    document.querySelectorAll('a[href]').forEach(function (link) {
      if (!isInternalLink(link)) return;

      link.addEventListener('click', function (e) {
        e.preventDefault();
        var dest = link.href;

        document.body.classList.remove('is-ready');

        setTimeout(function () {
          window.location.href = dest;
        }, FADE_OUT_MS);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initTransitions);
})();
