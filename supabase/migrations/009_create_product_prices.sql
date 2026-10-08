-- ============================================================
-- Dealer prices ("D.P." columns in the product Excel sheets).
--
-- Kept in a separate table, NOT as a column on ledlum_products:
-- ledlum_products has a public anon read policy and the public site loads
-- it with select("*"), so any column there ends up visible to visitors.
-- This table has RLS enabled and no anon policy, so only the service role
-- (server-side admin code and scripts) can read or write it.
--
-- prices holds every D.P. column of the row, keyed by its Excel header,
-- e.g. {"D.P.": "Rs.960.00"} or {"D.P. (2 Mtr)": "Rs.705.00", "D.P. (3 Mtr)": "Rs.1055.00"}.
-- Filled by scripts/sync-products-from-excel.ts.
-- ============================================================
CREATE TABLE IF NOT EXISTS ledlum_product_prices (
    model TEXT PRIMARY KEY REFERENCES ledlum_products (model) ON UPDATE CASCADE ON DELETE CASCADE,
    prices JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ledlum_product_prices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow service role write access" ON ledlum_product_prices;
CREATE POLICY "Allow service role write access"
ON ledlum_product_prices FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
