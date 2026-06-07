// Acessibilidade: ajuste do tamanho da fonte com persistência em localStorage.
(function () {
  var KEY = 'font-scale';
  var MIN = 0.85, MAX = 1.6, STEP = 0.1, DEFAULT = 1;

  function clamp(v) {
    return Math.min(MAX, Math.max(MIN, v));
  }

  function current() {
    var v = parseFloat(localStorage.getItem(KEY));
    return isNaN(v) ? DEFAULT : clamp(v);
  }

  function apply(v) {
    document.documentElement.style.setProperty('--font-scale', v);
  }

  function save(v) {
    v = clamp(Math.round(v * 100) / 100);
    try { localStorage.setItem(KEY, v); } catch (e) {}
    apply(v);
  }

  apply(current());

  document.addEventListener('click', function (evt) {
    var btn = evt.target.closest && evt.target.closest('[data-font-size]');
    if (!btn) return;
    var action = btn.getAttribute('data-font-size');
    if (action === 'increase') save(current() + STEP);
    else if (action === 'decrease') save(current() - STEP);
    else save(DEFAULT);
  });
})();

document.addEventListener('htmx:beforeRequest', function (evt) {
  var elt = evt.detail && evt.detail.elt;
  if (elt && elt.tagName === 'A' && elt.href === location.href) {
    evt.preventDefault();
  }
});

// Atalhos no estilo Vim: "gg" vai para o início da página e "G" para o final.
(function () {
  var lastG = 0;

  function isTyping(target) {
    if (!target) return false;
    var tag = target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
  }

  document.addEventListener('keydown', function (evt) {
    if (evt.ctrlKey || evt.altKey || evt.metaKey) return;
    if (isTyping(evt.target)) return;

    if (evt.key === 'g' && !evt.shiftKey) {
      var now = evt.timeStamp;
      if (now - lastG < 500) {
        evt.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        lastG = 0;
      } else {
        lastG = now;
      }
    } else if (evt.key === 'G' || (evt.key === 'g' && evt.shiftKey)) {
      evt.preventDefault();
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      lastG = 0;
    } else {
      lastG = 0;
    }
  });
})();
