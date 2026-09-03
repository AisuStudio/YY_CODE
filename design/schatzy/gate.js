/* Schatzy preview — lightweight client-side password gate.
   Not real security (viewable in source as a hash) — just keeps
   casual visitors and search engines out of an internal test page. */
(function () {
  var HASH = '8844f44b46164b6e5f452debe554352ab8d88fcf55a0327b95abf02cc98247e2';
  var SESSION_KEY = 'schatzy_preview_ok';

  if (sessionStorage.getItem(SESSION_KEY) === '1') return;

  document.documentElement.style.visibility = 'hidden';

  function sha256Hex(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest('SHA-256', data).then(function (buf) {
      return Array.from(new Uint8Array(buf))
        .map(function (b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    });
  }

  function ask() {
    var pw = prompt('Passwort für die Schatzy-Vorschau:');
    if (pw === null) {
      document.documentElement.innerHTML = '';
      return;
    }
    sha256Hex(pw).then(function (hex) {
      if (hex === HASH) {
        sessionStorage.setItem(SESSION_KEY, '1');
        document.documentElement.style.visibility = 'visible';
      } else {
        ask();
      }
    });
  }

  if (window.crypto && window.crypto.subtle) {
    ask();
  } else {
    document.documentElement.style.visibility = 'visible';
  }
})();
