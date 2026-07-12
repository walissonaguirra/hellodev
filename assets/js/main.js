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

// Terminal interativo da homepage: shell simples para navegar o blog.
(function () {
  var root = document.querySelector('[data-terminal]');
  var dataEl = document.getElementById('terminal-data');
  if (!root || !dataEl) return;

  var data;
  try {
    data = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }

  var posts = data.posts || [];
  var bioUrl = data.bioUrl || '/bio';

  var output = root.querySelector('.terminal__output');
  var input = root.querySelector('.terminal__input');
  if (!output || !input) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var HISTORY_KEY = 'terminal-history';
  var history = [];
  try {
    history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch (e) { history = []; }
  var histPos = history.length;

  // --- Saída ---------------------------------------------------------------
  function print(text, cls) {
    var line = document.createElement('div');
    line.className = 'terminal__row' + (cls ? ' ' + cls : '');
    line.textContent = text == null ? '' : String(text);
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
    return line;
  }

  function typeLine(text, done) {
    if (reduceMotion) { print(text); if (done) done(); return; }
    var line = print('');
    var i = 0;
    (function step() {
      line.textContent = text.slice(0, i);
      output.scrollTop = output.scrollHeight;
      if (i++ < text.length) {
        setTimeout(step, 18);
      } else if (done) {
        done();
      }
    })();
  }

  function typeLines(lines, done) {
    var i = 0;
    (function next() {
      if (i >= lines.length) { if (done) done(); return; }
      typeLine(lines[i++], function () { setTimeout(next, 90); });
    })();
  }

  // --- Comandos ------------------------------------------------------------
  function uniqueTags() {
    var seen = {}, out = [];
    posts.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        var key = String(t).toLowerCase();
        if (!seen[key]) { seen[key] = true; out.push(t); }
      });
    });
    return out.sort();
  }

  function findPost(query) {
    if (!query) return null;
    var n = parseInt(query, 10);
    if (!isNaN(n) && String(n) === query.trim()) {
      return posts[n - 1] || null;
    }
    var q = query.trim().toLowerCase();
    return posts.filter(function (p) {
      return p.url.toLowerCase().indexOf(q) !== -1 ||
        p.title.toLowerCase().indexOf(q) !== -1;
    });
  }

  var commands = {
    help: function () {
      print('Comandos disponíveis:');
      print('  help          esta ajuda');
      print('  ls            lista os posts por ano');
      print('  open <n|nome> abre um post (índice do ls ou parte do nome)');
      print('  cat <n|nome>  idem open');
      print('  tags [nome]   lista as tags (ou filtra posts por uma tag)');
      print('  about         abre a bio');
      print('  whoami        um resumo rápido');
      print('  theme         sobre o tema claro/escuro');
      print('  clear         limpa a tela');
    },
    ls: function () {
      if (!posts.length) { print('nenhum post.'); return; }
      var lastYear = null;
      posts.forEach(function (p, idx) {
        if (p.year !== lastYear) {
          if (lastYear !== null) print('');
          print(String(p.year));
          lastYear = p.year;
        }
        print('  ' + String(idx + 1).padStart(2, ' ') + '  ' + p.title);
      });
      print('');
      print("dica: 'open <número>' para abrir.");
    },
    open: function (args) {
      var match = findPost(args);
      if (!match) { print("uso: open <número ou nome>. veja 'ls'."); return; }
      if (!Array.isArray(match)) {
        print('abrindo: ' + match.title + ' …');
        setTimeout(function () { location.href = match.url; }, reduceMotion ? 0 : 350);
        return;
      }
      if (match.length === 0) { print('nenhum post corresponde a: ' + args); return; }
      if (match.length === 1) {
        print('abrindo: ' + match[0].title + ' …');
        setTimeout(function () { location.href = match[0].url; }, reduceMotion ? 0 : 350);
        return;
      }
      print(match.length + ' posts correspondem — seja mais específico:');
      match.forEach(function (p) { print('  · ' + p.title); });
    },
    tags: function (args) {
      if (args) {
        var q = args.trim().toLowerCase();
        var found = posts.filter(function (p) {
          return (p.tags || []).some(function (t) {
            return String(t).toLowerCase() === q;
          });
        });
        if (!found.length) { print('nenhum post com a tag: ' + args); return; }
        print('posts com a tag "' + args + '":');
        found.forEach(function (p) { print('  · ' + p.title); });
        return;
      }
      var tags = uniqueTags();
      if (!tags.length) { print('nenhuma tag.'); return; }
      print(tags.join('  '));
      print("dica: 'tags <nome>' para filtrar.");
    },
    about: function () {
      print('abrindo a bio …');
      setTimeout(function () { location.href = bioUrl; }, reduceMotion ? 0 : 350);
    },
    whoami: function () {
      print('Walisson Aguirra — engenheiro de software (backend, Go e PHP), Curitiba/PR.');
      print("digite 'about' para abrir a bio completa.");
    },
    theme: function () {
      print('O tema acompanha a preferência do seu sistema (claro/escuro).');
      print('Não há alternador — mude nas configurações do SO/navegador.');
    },
    clear: function () {
      output.innerHTML = '';
    }
  };
  commands.cat = commands.open;
  commands.bio = commands.about;

  function run(raw) {
    var trimmed = raw.trim();
    print('$ ' + raw, 'terminal__row--echo');
    if (!trimmed) return;

    if (history[history.length - 1] !== trimmed) history.push(trimmed);
    if (history.length > 50) history = history.slice(-50);
    histPos = history.length;
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch (e) {}

    var parts = trimmed.split(/\s+/);
    var name = parts[0].toLowerCase();
    var args = trimmed.slice(parts[0].length).trim();

    if (commands[name]) {
      commands[name](args);
    } else {
      print(name + ": comando não encontrado. digite 'help'.");
    }
  }

  // --- Eventos -------------------------------------------------------------
  input.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      var value = input.value;
      input.value = '';
      run(value);
    } else if (evt.key === 'ArrowUp') {
      if (!history.length) return;
      evt.preventDefault();
      histPos = Math.max(0, histPos - 1);
      input.value = history[histPos] || '';
      moveCaretToEnd(input);
    } else if (evt.key === 'ArrowDown') {
      if (!history.length) return;
      evt.preventDefault();
      histPos = Math.min(history.length, histPos + 1);
      input.value = history[histPos] || '';
      moveCaretToEnd(input);
    } else if (evt.key === 'Tab') {
      evt.preventDefault();
      var frag = input.value.trim().toLowerCase();
      if (!frag) return;
      var names = Object.keys(commands).filter(function (n) {
        return n.indexOf(frag) === 0;
      });
      if (names.length === 1) input.value = names[0] + ' ';
      else if (names.length > 1) print(names.join('  '));
    } else if (evt.key === 'l' && evt.ctrlKey) {
      evt.preventDefault();
      output.innerHTML = '';
    }
  });

  function moveCaretToEnd(el) {
    var len = el.value.length;
    setTimeout(function () { el.setSelectionRange(len, len); }, 0);
  }

  // Clicar em qualquer lugar do terminal foca o input.
  root.addEventListener('click', function () { input.focus(); });

  // --- Boot ----------------------------------------------------------------
  root.classList.add('is-ready');
  typeLines([
    'walissonaguirra.dev — sessão iniciada.',
    "digite 'help' e Enter para começar. 'ls' lista os posts."
  ]);
})();

// Aplausos (estilo Medium): clicar aplaude, clicar de novo remove; total no D1.
(function () {
  var root = document.querySelector('[data-claps]');
  if (!root) return;

  var btn = root.querySelector('[data-claps-btn]');
  var countEl = root.querySelector('[data-claps-count]');
  var slug = root.getAttribute('data-claps-slug');
  if (!btn || !countEl || !slug) return;

  var API = '/api/claps/' + encodeURIComponent(slug);
  var total = 0, clapped = false;

  function render() {
    countEl.textContent = total;
    btn.classList.toggle('is-clapped', clapped);
  }

  function floatDelta(text, remove) {
    var el = document.createElement('span');
    el.className = 'claps__plus' + (remove ? ' claps__plus--remove' : '');
    el.textContent = text;
    btn.appendChild(el);
    setTimeout(function () { el.remove(); }, 700);
  }

  function sync(method, prevTotal, prevClapped) {
    fetch(API, { method: method, credentials: 'same-origin' })
      .then(function (r) { return r.json(); })
      .then(function (d) { total = d.total; clapped = d.mine > 0; render(); })
      .catch(function () { total = prevTotal; clapped = prevClapped; render(); });
  }

  btn.addEventListener('click', function () {
    var prevTotal = total, prevClapped = clapped;
    if (!clapped) {
      clapped = true; total++; render();
      floatDelta('+1', false);
      btn.classList.add('claps__btn--flash');
      setTimeout(function () { btn.classList.remove('claps__btn--flash'); }, 700);
      sync('POST', prevTotal, prevClapped);
    } else {
      clapped = false; total = Math.max(0, total - 1); render();
      floatDelta('−1', true);
      sync('DELETE', prevTotal, prevClapped);
    }
  });

  fetch(API, { credentials: 'same-origin' })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      total = d.total || 0;
      clapped = d.mine > 0;
      render();
      root.classList.add('is-ready');
    })
    .catch(function () {});
})();
