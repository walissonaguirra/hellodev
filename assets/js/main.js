document.addEventListener('htmx:beforeRequest', function (evt) {
  var elt = evt.detail && evt.detail.elt;
  if (elt && elt.tagName === 'A' && elt.href === location.href) {
    evt.preventDefault();
  }
});
