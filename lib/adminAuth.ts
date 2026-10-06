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

// Placeholder for invited users who haven't chosen a password yet — a random
// hash nobody knows, so the account can't be logged into until the invite
// link is used.
export function unusablePasswordHash(): string {
  return hashPassword(crypto.randomBytes(32).toString("hex"));
}

// Who may claim the very first admin account at /admin/setup.
// ADMIN_SETUP_EMAILS is a comma-separated list of emails and/or domains,
// e.g. "owner@ledlum.com, @totality.solutions". The address must also be
// verified by email before the account works.
export function isAllowedSetupEmail(email: string): boolean | null {
  const raw = process.env.ADMIN_SETUP_EMAILS;
  if (!raw || !raw.trim()) return null;
  const target = email.trim().toLowerCase();
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .some((rule) => (rule.startsWith("@") ? target.endsWith(rule) : target === rule));
}

export const MIN_PASSWORD_LENGTH = 8;

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
