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
