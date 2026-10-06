-- ============================================================
-- Marks products that belong in the collection page's "Tracks" tab.
-- Set by scripts/import-artizan.ts from the Excel "Track"/"TRACKS"
-- column, and editable per product in Admin → Products.
-- ============================================================
ALTER TABLE ledlum_products
  ADD COLUMN IF NOT EXISTS is_track BOOLEAN NOT NULL DEFAULT false;
