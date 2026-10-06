"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard, { authButtonClass, authInputClass } from "@/components/admin/AuthCard";

export default function AdminForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/admin/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    setSubmitting(false);
    setSent(true);
  };

  return (
    <AuthCard title="Reset your password">
      {sent ? (
        <p className="text-sm text-neutral-300">
          If an account exists for <span className="text-white">{email}</span>, a reset link is on its way. It expires in 1 hour.
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input type="email" required autoFocus placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={authInputClass} />
          <button type="submit" disabled={submitting} className={authButtonClass}>
            {submitting ? "Sending…" : "Email me a reset link"}
          </button>
        </form>
      )}
      <Link href="/admin/login" className="text-xs text-neutral-500 hover:text-white">
        Back to login
      </Link>
    </AuthCard>
  );
}
