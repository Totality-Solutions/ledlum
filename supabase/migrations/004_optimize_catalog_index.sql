-- ============================================================
-- Replaces 003's index now that lib/productsServer.ts filters with
-- `website = 'W'` (plain equality) instead of `ILIKE 'W'` — confirmed
-- against live data that website is always exactly 'W' or null, so the
-- ILIKE pattern-matching was never actually needed.
--
-- This partial index matches the query's exact shape:
--   SELECT * FROM ledlum_products WHERE website = 'W' ORDER BY model
-- so Postgres can satisfy the filter AND the sort in one index scan,
-- instead of filtering via one index and then sorting separately.
-- ============================================================

DROP INDEX IF EXISTS idx_ledlum_products_website;

CREATE INDEX IF NOT EXISTS idx_ledlum_products_website_model
  ON ledlum_products (model)
  WHERE website = 'W';
