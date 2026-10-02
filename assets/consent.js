/* Consentimento de cookies (LGPD).
   GA4 e Meta Pixel só carregam depois do "Aceitar". Preencha os IDs abaixo quando existirem. */
(function () {
  var GA4_ID = '';        // ex.: 'G-XXXXXXXXXX'
  var META_PIXEL_ID = ''; // ex.: '123456789012345'
  var KEY = 'tf_consent_v1';

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* segue sem lembrar */ }
  }

  function loadGA() {
    if (!GA4_ID) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { anonymize_ip: true });
  }

  function loadPixel() {
    if (!META_PIXEL_ID) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function enable() { loadGA(); loadPixel(); }

  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.getElementById('cookies');
    var choice = read();
    if (choice === 'accepted') { enable(); return; }
    if (choice === 'rejected' || !banner) return;
    // Sem IDs configurados, não há o que consentir: banner fica escondido.
    if (!GA4_ID && !META_PIXEL_ID) return;
    banner.classList.add('show');
    banner.querySelector('.accept').addEventListener('click', function () {
      save('accepted'); banner.classList.remove('show'); enable();
    });
    banner.querySelector('.reject').addEventListener('click', function () {
      save('rejected'); banner.classList.remove('show');
    });
  });
})();
