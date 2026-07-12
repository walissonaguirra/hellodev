-- Aplausos por post (estilo Medium).
--
-- Uma linha por (post, visitante). O total de um post é a soma das linhas;
-- o teto por visitante é aplicado na Function (ver functions/api/claps).
CREATE TABLE IF NOT EXISTS claps (
  slug    TEXT    NOT NULL,
  visitor TEXT    NOT NULL,
  count   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (slug, visitor)
);

CREATE INDEX IF NOT EXISTS idx_claps_slug ON claps (slug);
