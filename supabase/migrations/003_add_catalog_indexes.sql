-- ============================================================
-- Speed up the full-catalog query in lib/productsServer.ts
-- (SELECT * FROM ledlum_products WHERE website ILIKE 'W' ORDER BY model),
-- which previously ran as a full table scan + sort on every cache miss.
-- ============================================================

-- ILIKE needs a pattern-ops index to actually use it (a plain btree index
-- only helps '=' and range comparisons, not LIKE/ILIKE).
CREATE INDEX IF NOT EXISTS idx_ledlum_products_website
  ON ledlum_products (website text_pattern_ops);

-- model already has a UNIQUE constraint (and therefore an index) from
-- 001_create_products_table.sql, which also covers ORDER BY model.
