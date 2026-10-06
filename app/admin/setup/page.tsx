"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard, { authButtonClass, authInputClass } from "@/components/admin/AuthCard";

// First run only: registers the first admin and emails a verification link.
// The account can't be used until that link is clicked.
export default function AdminSetupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords don't match");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Setup failed");
      setSentTo(data.email);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (sentTo) {
    return (
      <AuthCard title="Check your email">
        <p className="text-sm text-neutral-300">
          We sent a verification link to <span className="text-white">{sentTo}</span>. Click it to activate your admin
          account. The link expires in 24 hours.
        </p>
        <p className="text-xs text-neutral-500">
          Didn&apos;t get it? Check spam, or{" "}
          <button className="underline hover:text-white" onClick={() => setSentTo(null)}>
            submit the form again
          </button>
          .
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Create the first admin" subtitle="You'll get an email to verify your address before you can log in.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input placeholder="Your name" required value={form.name} onChange={set("name")} className={authInputClass} />
        <input type="email" placeholder="Email" required value={form.email} onChange={set("email")} className={authInputClass} />
        <input
          type="password"
          placeholder="Password (min 8 characters)"
          required
          minLength={8}
          autoComplete="new-password"
          value={form.password}
          onChange={set("password")}
          className={authInputClass}
        />
        <input
          type="password"
          placeholder="Confirm password"
          required
          autoComplete="new-password"
          value={form.confirm}
          onChange={set("confirm")}
          className={authInputClass}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" disabled={submitting} className={authButtonClass}>
          {submitting ? "Sending…" : "Create admin & send verification email"}
        </button>
        <Link href="/admin/login" className="text-xs text-neutral-500 hover:text-white">
          Already set up? Log in
        </Link>
      </form>
    </AuthCard>
  );
}
