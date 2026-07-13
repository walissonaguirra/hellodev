// Pages Function — aplausos por post, persistidos no D1.
//   GET    /api/claps/<slug>  -> { total, mine }
//   POST   /api/claps/<slug>  -> aplaude
//   DELETE /api/claps/<slug>  -> remove o aplauso
// O visitante é identificado pelo cookie opaco `vid`.

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,127}$/;

// Lista de slugs válidos (gerada pelo Hugo em /claps-slugs.json), em cache por
// isolate — cada deploy recria os isolates, então não fica desatualizada.
let allowedSlugs;

async function loadAllowedSlugs(env, request) {
  if (allowedSlugs) return allowedSlugs;
  try {
    const res = await env.ASSETS.fetch(new URL('/claps-slugs.json', request.url));
    if (res.ok) allowedSlugs = new Set(await res.json());
  } catch (_) { /* fail-open: se não carregar, não bloqueia */ }
  return allowedSlugs;
}

function getVisitorId(request) {
  const cookie = request.headers.get('Cookie') || '';
  const m = cookie.match(/(?:^|;\s*)vid=([0-9a-f-]{36})/);
  return m ? m[1] : null;
}

function json(body, { status = 200, setVid = null } = {}) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  };
  if (setVid) {
    headers['Set-Cookie'] =
      `vid=${setVid}; Path=/; Max-Age=31536000; SameSite=Lax; Secure; HttpOnly`;
  }
  return new Response(JSON.stringify(body), { status, headers });
}

async function totals(env, slug, vid) {
  const totalRow = await env.DB
    .prepare('SELECT COALESCE(SUM(count), 0) AS total FROM claps WHERE slug = ?')
    .bind(slug)
    .first();

  let mine = 0;
  if (vid) {
    const mineRow = await env.DB
      .prepare('SELECT count FROM claps WHERE slug = ? AND visitor = ?')
      .bind(slug, vid)
      .first();
    mine = mineRow ? mineRow.count : 0;
  }
  return { total: totalRow.total, mine };
}

export async function onRequestGet({ params, env, request }) {
  const slug = params.slug;
  if (!SLUG_RE.test(slug)) return json({ error: 'invalid slug' }, { status: 400 });
  return json(await totals(env, slug, getVisitorId(request)));
}

export async function onRequestPost({ params, env, request }) {
  const slug = params.slug;
  if (!SLUG_RE.test(slug)) return json({ error: 'invalid slug' }, { status: 400 });

  const allowed = await loadAllowedSlugs(env, request);
  if (allowed && !allowed.has(slug)) {
    return json({ error: 'unknown slug' }, { status: 404 });
  }

  let vid = getVisitorId(request);
  let setVid = null;
  if (!vid) {
    vid = crypto.randomUUID();
    setVid = vid;
  }

  await env.DB
    .prepare(
      `INSERT INTO claps (slug, visitor, count) VALUES (?1, ?2, 1)
       ON CONFLICT(slug, visitor) DO NOTHING`
    )
    .bind(slug, vid)
    .run();

  return json(await totals(env, slug, vid), { setVid });
}

export async function onRequestDelete({ params, env, request }) {
  const slug = params.slug;
  if (!SLUG_RE.test(slug)) return json({ error: 'invalid slug' }, { status: 400 });

  const vid = getVisitorId(request);
  if (vid) {
    await env.DB
      .prepare('DELETE FROM claps WHERE slug = ? AND visitor = ?')
      .bind(slug, vid)
      .run();
  }
  return json(await totals(env, slug, vid));
}
