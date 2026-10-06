"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthCard, { authButtonClass, authInputClass } from "@/components/admin/AuthCard";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [unverified, setUnverified] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // First run: nobody has a verified account yet → go create the first admin.
  useEffect(() => {
    fetch("/api/admin/setup")
      .then((res) => res.json())
      .then((data) => {
        if (data.needsSetup) router.replace("/admin/setup");
        else if (data.error) setError(data.error);
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setNotice(null);
    setUnverified(false);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.unverified) setUnverified(true);
        throw new Error(data.error || "Login failed");
      }

      const next = searchParams.get("next");
      router.push(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const resendVerification = async () => {
    setSubmitting(true);
    setError(null);
    const res = await fetch("/api/admin/verify/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    setSubmitting(false);
    if (res.ok) {
      setUnverified(false);
      setNotice(`Verification email sent to ${email}.`);
    } else {
      setError(data.error || "Could not resend");
    }
  };

  return (
    <AuthCard title="LEDLUM CMS">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="username"
          autoFocus
          required
          className={authInputClass}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          required
          className={authInputClass}
        />

        {error && <p className="text-sm text-red-400">{error}</p>}
        {notice && <p className="text-sm text-emerald-400">{notice}</p>}
        {unverified && (
          <button type="button" onClick={resendVerification} disabled={submitting} className="text-sm text-left text-neutral-300 underline hover:text-white">
            Resend verification email
          </button>
        )}

        <button type="submit" disabled={submitting} className={authButtonClass}>
          {submitting ? "Signing in..." : "Sign in"}
        </button>
        <Link href="/admin/forgot" className="text-xs text-neutral-500 hover:text-white">
          Forgot your password?
        </Link>
      </form>
    </AuthCard>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
