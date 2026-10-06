import "server-only";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { createActionToken, type TokenPurpose } from "@/lib/adminTokens";

const FROM = "LEDLUM Website <noreply@ledlumlighting.com>";

// Links in emails must point at the real site, not whatever Host header a
// request came in with — set NEXT_PUBLIC_SITE_URL in production.
export function siteOrigin(request: NextRequest): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin).replace(/\/$/, "");
}

const COPY: Record<TokenPurpose, { subject: string; heading: string; body: string; button: string; path: string; expires: string }> = {
  verify: {
    subject: "Verify your email for the LEDLUM admin",
    heading: "Confirm your email",
    body: "Click the button below to verify your email address and activate your LEDLUM admin account.",
    button: "Verify email",
    path: "/admin/verify",
    expires: "24 hours",
  },
  invite: {
    subject: "You've been invited to the LEDLUM admin",
    heading: "You're invited",
    body: "You've been given access to manage the LEDLUM website. Click below to choose your password and activate your account.",
    button: "Accept invite",
    path: "/admin/set-password",
    expires: "7 days",
  },
  reset: {
    subject: "Reset your LEDLUM admin password",
    heading: "Reset your password",
    body: "Someone (hopefully you) asked to reset the password for this account. Click below to choose a new one. If it wasn't you, ignore this email.",
    button: "Reset password",
    path: "/admin/set-password",
    expires: "1 hour",
  },
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function sendAdminActionEmail(
  request: NextRequest,
  user: { id: string; email: string; name: string; password_hash: string; email_verified_at: string | null },
  purpose: TokenPurpose
): Promise<void> {
  const copy = COPY[purpose];
  const link = `${siteOrigin(request)}${copy.path}?token=${encodeURIComponent(createActionToken(user, purpose))}`;

  const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: FROM,
    to: user.email,
    subject: copy.subject,
    html: `
      <div style="font-family:sans-serif;max-width:520px;color:#1a1a1a;">
        <h2>${copy.heading}</h2>
        <p>Hi ${escapeHtml(user.name)},</p>
        <p>${copy.body}</p>
        <p style="margin:28px 0;">
          <a href="${link}" style="background:#8D794E;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;">${copy.button}</a>
        </p>
        <p style="font-size:13px;color:#666;">This link expires in ${copy.expires} and can only be used once.<br/>If the button doesn't work, paste this into your browser:<br/>${link}</p>
      </div>`,
  });
  if (error) throw new Error(`Could not send email: ${error.message}`);
}
