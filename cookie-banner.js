/* ============================================================
   YAM YAM BERLIN — cookie-banner.js
   DSGVO-konformer Cookie-Banner mit DE/EN-Toggle.
   Injiziert Banner + Modal ins DOM, verwaltet Consent in
   LocalStorage und lädt Google Analytics nur nach Zustimmung.
   ============================================================ */

(function () {
  'use strict';

  const GA_ID = 'G-8R7Y231MWN';

  const STORAGE_KEYS = {
    consent:    'yy_cookie_consent',     // 'all' | 'necessary' | 'custom'
    categories: 'yy_cookie_categories',  // JSON {necessary:true, statistics:bool}
    lang:       'yy_cookie_lang'         // 'de' | 'en'
  };

  const PRIVACY_HREF = 'datenschutz.html';

  const I18N = {
    de: {
      banner: {
        text: 'Wir verwenden Cookies, um unsere Website zu verbessern und anonyme Nutzungsstatistiken zu erfassen. Du kannst selbst entscheiden, welche Kategorien du zulassen möchtest. Mehr Infos in unserer __LINK_START__Datenschutzerklärung__LINK_END__.',
        acceptAll: 'Alle akzeptieren',
        reject:    'Ablehnen',
        settings:  'Einstellungen'
      },
      modal: {
        title: 'Cookie-Einstellungen',
        intro: 'Wähle aus, welche Cookies du zulassen möchtest. Notwendige Cookies sind für die Funktion der Website erforderlich und können nicht deaktiviert werden.',
        necessary: {
          title: 'Notwendig',
          desc:  'Diese Cookies sind technisch erforderlich, damit die Website funktioniert. Es werden keine personenbezogenen Daten erfasst.'
        },
        statistics: {
          title: 'Statistik',
          desc:  'Wir verwenden Google Analytics, um anonymisierte Nutzungsstatistiken zu erfassen. Deine IP-Adresse wird dabei verkürzt.'
        },
        save:      'Auswahl speichern',
        acceptAll: 'Alle akzeptieren'
      },
      changeSettings: 'Cookie-Einstellungen ändern'
    },
    en: {
      banner: {
        text: 'We use cookies to improve our website and collect anonymous usage statistics. You can decide which categories to allow. More info in our __LINK_START__privacy policy__LINK_END__.',
        acceptAll: 'Accept all',
        reject:    'Reject',
        settings:  'Settings'
      },
      modal: {
        title: 'Cookie settings',
        intro: 'Choose which cookies to allow. Necessary cookies are required for the website to function and cannot be disabled.',
        necessary: {
          title: 'Necessary',
          desc:  'These cookies are technically required for the website to work. No personal data is collected.'
        },
        statistics: {
          title: 'Statistics',
          desc:  'We use Google Analytics to collect anonymized usage statistics. Your IP address is shortened.'
        },
        save:      'Save selection',
        acceptAll: 'Accept all'
      },
      changeSettings: 'Change cookie settings'
    }
  };

  /* ---------- Storage helpers ---------- */
  function readJSON(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function readString(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function writeString(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  /* ---------- Language ---------- */
  function detectInitialLang() {
    const saved = readString(STORAGE_KEYS.lang);
    if (saved === 'de' || saved === 'en') return saved;
    const nav = (navigator.language || 'de').toLowerCase();
    return nav.startsWith('de') ? 'de' : 'en';
  }

  let currentLang = detectInitialLang();

  function t(path) {
    const keys = path.split('.');
    let node = I18N[currentLang];
    for (const k of keys) {
      if (node == null) return '';
      node = node[k];
    }
    return node || '';
  }

  function renderBannerText(raw) {
    const link = `<a href="${PRIVACY_HREF}" class="t-body--accent">$1</a>`;
    return raw.replace(/__LINK_START__(.+?)__LINK_END__/g, link);
  }

  /* ---------- Markup injection ---------- */
  const MARKUP = `
<div class="yy-cb" id="yy-cb" role="region" aria-label="Cookie-Hinweis" hidden>
  <button class="yy-cb__lang" id="yy-cb-lang" type="button" aria-label="Sprache wechseln">
    <span data-lang="de">DE</span><span class="yy-cb__lang-sep">|</span><span data-lang="en">EN</span>
  </button>
  <p class="yy-cb__text t-body" data-i18n="banner.text"></p>
  <div class="yy-cb__actions">
    <button type="button" class="btn-outline yy-cb__btn" data-action="accept-all" data-i18n="banner.acceptAll"></button>
    <button type="button" class="btn-outline yy-cb__btn" data-action="reject" data-i18n="banner.reject"></button>
    <button type="button" class="btn-outline yy-cb__btn" data-action="settings" data-i18n="banner.settings"></button>
  </div>
</div>
<div class="yy-cb-modal" id="yy-cb-modal" role="dialog" aria-modal="true" aria-labelledby="yy-cb-modal-title" hidden>
  <div class="yy-cb-modal__overlay" data-action="close-modal"></div>
  <div class="yy-cb-modal__box">
    <button class="yy-cb__lang" id="yy-cb-modal-lang" type="button" aria-label="Sprache wechseln">
      <span data-lang="de">DE</span><span class="yy-cb__lang-sep">|</span><span data-lang="en">EN</span>
    </button>
    <h2 id="yy-cb-modal-title" class="t-display t-display--md" data-i18n="modal.title"></h2>
    <p class="yy-cb-modal__intro t-body" data-i18n="modal.intro"></p>
    <div class="yy-cb-cat">
      <div class="yy-cb-cat__row">
        <h3 class="yy-cb-cat__title t-body t-body--strong" data-i18n="modal.necessary.title"></h3>
        <label class="yy-cb-switch">
          <input type="checkbox" checked disabled data-category="necessary">
          <span class="yy-cb-switch__track"></span>
        </label>
      </div>
      <p class="yy-cb-cat__desc t-body" data-i18n="modal.necessary.desc"></p>
    </div>
    <div class="yy-cb-cat">
      <div class="yy-cb-cat__row">
        <h3 class="yy-cb-cat__title t-body t-body--strong" data-i18n="modal.statistics.title"></h3>
        <label class="yy-cb-switch">
          <input type="checkbox" data-category="statistics" id="yy-cb-cat-statistics">
          <span class="yy-cb-switch__track"></span>
        </label>
      </div>
      <p class="yy-cb-cat__desc t-body" data-i18n="modal.statistics.desc"></p>
    </div>
    <div class="yy-cb-modal__actions">
      <button type="button" class="btn-outline yy-cb__btn" data-action="save" data-i18n="modal.save"></button>
      <button type="button" class="btn-outline yy-cb__btn" data-action="accept-all" data-i18n="modal.acceptAll"></button>
    </div>
  </div>
</div>
`;

  function injectMarkup() {
    if (document.getElementById('yy-cb')) return;
    const host = document.createElement('div');
    host.id = 'yy-cb-root';
    host.innerHTML = MARKUP;
    document.body.appendChild(host);
  }

  /* ---------- i18n application ---------- */
  function applyI18n(root) {
    const nodes = root.querySelectorAll('[data-i18n]');
    nodes.forEach(node => {
      const key = node.getAttribute('data-i18n');
      const raw = t(key);
      if (key === 'banner.text') {
        node.innerHTML = renderBannerText(raw);
      } else {
        node.textContent = raw;
      }
    });
    document.querySelectorAll('.yy-cb__lang').forEach(toggle => {
      toggle.querySelectorAll('[data-lang]').forEach(span => {
        span.classList.toggle('is-active', span.getAttribute('data-lang') === currentLang);
      });
    });
  }

  /* ---------- GA loader ---------- */
  let gaLoaded = false;
  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  /* ---------- Consent state ---------- */
  function getCategories() {
    const stored = readJSON(STORAGE_KEYS.categories);
    return {
      necessary:  true,
      statistics: !!(stored && stored.statistics)
    };
  }

  function applyConsent(categories) {
    if (categories.statistics) loadGA();
  }

  function setConsent(consentType, categories) {
    writeString(STORAGE_KEYS.consent, consentType);
    writeJSON(STORAGE_KEYS.categories, categories);
    applyConsent(categories);
  }

  /* ---------- UI handlers ---------- */
  let bannerEl, modalEl;

  function showBanner() { bannerEl.hidden = false; }
  function hideBanner() { bannerEl.hidden = true; }

  function openModal() {
    syncModalToggles();
    modalEl.hidden = false;
    document.body.style.overflow = 'hidden';
    const firstFocusable = modalEl.querySelector('button, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
  }
  function closeModal() {
    modalEl.hidden = true;
    document.body.style.overflow = '';
  }

  function syncModalToggles() {
    const cats = getCategories();
    const statBox = modalEl.querySelector('#yy-cb-cat-statistics');
    if (statBox) statBox.checked = !!cats.statistics;
  }

  function handleAcceptAll() {
    setConsent('all', { necessary: true, statistics: true });
    hideBanner();
    closeModal();
  }
  function handleReject() {
    setConsent('necessary', { necessary: true, statistics: false });
    hideBanner();
    closeModal();
  }
  function handleSaveSelection() {
    const statBox = modalEl.querySelector('#yy-cb-cat-statistics');
    const statistics = !!(statBox && statBox.checked);
    setConsent('custom', { necessary: true, statistics: statistics });
    hideBanner();
    closeModal();
  }

  function setLang(lang) {
    if (lang !== 'de' && lang !== 'en') return;
    currentLang = lang;
    writeString(STORAGE_KEYS.lang, lang);
    applyI18n(document);
  }

  function bindEvents() {
    document.addEventListener('click', evt => {
      const langSpan = evt.target.closest('.yy-cb__lang [data-lang]');
      if (langSpan) {
        setLang(langSpan.getAttribute('data-lang'));
        return;
      }
      const actionBtn = evt.target.closest('[data-action]');
      if (!actionBtn) return;
      const action = actionBtn.getAttribute('data-action');
      if (action === 'accept-all')  handleAcceptAll();
      if (action === 'reject')      handleReject();
      if (action === 'settings')    openModal();
      if (action === 'save')        handleSaveSelection();
      if (action === 'close-modal') closeModal();
    });

    document.addEventListener('keydown', evt => {
      if (evt.key === 'Escape' && !modalEl.hidden) closeModal();
    });
  }

  /* ---------- Public API ---------- */
  window.yyCookieBanner = {
    open: function () {
      injectIfNeeded();
      openModal();
    },
    reset: function () {
      try {
        localStorage.removeItem(STORAGE_KEYS.consent);
        localStorage.removeItem(STORAGE_KEYS.categories);
      } catch (e) {}
      showBanner();
    }
  };

  /* ---------- Bootstrap ---------- */
  function injectIfNeeded() {
    injectMarkup();
    bannerEl = document.getElementById('yy-cb');
    modalEl  = document.getElementById('yy-cb-modal');
    applyI18n(document);
  }

  function init() {
    injectIfNeeded();
    bindEvents();

    const consent = readString(STORAGE_KEYS.consent);
    if (consent) {
      applyConsent(getCategories());
    } else {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
