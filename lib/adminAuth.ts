import "server-only";
import crypto from "crypto";

// Signed-cookie sessions for the /admin panel, one per named admin user
// (admin_users table). The cookie is `${userId}.${expiry}.${hmac}`, signed with
// ADMIN_SESSION_SECRET so it can't be forged without the secret.
//
// proxy.ts only checks the signature (no DB call on every request); route
// handlers and the admin layout call getAdminUser()/requireAdmin() in
// lib/adminSession.ts, which also confirms the user still exists and is active.

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;

export type AdminRole = "admin" | "editor";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET env var.");
  return secret;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export function createSessionToken(userId: string): string {
  const expiry = Date.now() + SESSION_TTL_MS;
  const payload = `${userId}.${expiry}`;
  return `${payload}.${sign(payload)}`;
}

// Returns the user id the token was issued for, or null if it's missing,
// forged, or expired.
export function verifySessionToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, expiryStr, signature] = parts;
  if (!userId || !expiryStr || !signature) return null;

  if (!safeEqual(signature, sign(`${userId}.${expiryStr}`))) return null;

  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || Date.now() > expiry) return null;

  return userId;
}

// ---------------- Passwords ----------------
// Stored as "scrypt$<salt hex>$<hash hex>".

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
  return safeEqual(candidate, hash);
}

// The old shared ADMIN_PASSWORD now only acts as the one-time setup key for
// creating the first admin user (see app/api/admin/setup/route.ts).
export function checkSetupKey(candidate: string): boolean {
  const actual = process.env.ADMIN_PASSWORD;
  if (!actual) throw new Error("Missing ADMIN_PASSWORD env var.");
  return safeEqual(candidate, actual);
}

export const MIN_PASSWORD_LENGTH = 8;
