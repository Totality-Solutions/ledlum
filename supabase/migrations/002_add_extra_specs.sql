-- ============================================================
-- Add a flexible column for spec fields that don't fit the
-- fixed schema (e.g. Klewe's Charging Time / Solar Panel /
-- Lithium Battery, Vision Series' Protocol / Key Specs, etc.)
-- ============================================================
ALTER TABLE ledlum_products
  ADD COLUMN IF NOT EXISTS extra_specs JSONB DEFAULT '{}'::jsonb;
