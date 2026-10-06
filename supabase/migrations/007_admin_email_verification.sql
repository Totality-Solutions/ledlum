-- ============================================================
-- Email verification for admin users.
--
-- A user can only log in once email_verified_at is set: the first admin
-- verifies via the link emailed from /admin/setup, invited users via the
-- link in their invite email (see lib/adminTokens.ts).
-- ============================================================
ALTER TABLE admin_users
  ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMP WITH TIME ZONE;

-- Anyone created before this migration already had a working login.
UPDATE admin_users
SET email_verified_at = COALESCE(email_verified_at, created_at, NOW())
WHERE email_verified_at IS NULL;
