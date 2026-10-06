"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthCard, { authButtonClass, authInputClass } from "@/components/admin/AuthCard";

// Landing page for invite and password-reset emails.
function SetPassword() {
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const [info, setInfo] = useState<{ email: string; name: string; purpose: "invite" | "reset" } | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/set-password?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Invalid link");
        setInfo(data);
        setName(data.name);
      })
      .catch((err) => setLinkError(err.message));
  }, [token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, name }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not set password");
      router.replace("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (linkError) {
    return (
      <AuthCard title="Link not valid">
        <p className="text-sm text-red-400">{linkError}</p>
        <Link href="/admin/forgot" className="text-sm text-neutral-300 underline hover:text-white">
          Request a new reset link
        </Link>
        <p className="text-xs text-neutral-500">Invited? Ask an admin to resend your invite.</p>
      </AuthCard>
    );
  }
  if (!info) return <AuthCard title="Loading…">{null}</AuthCard>;

  const isInvite = info.purpose === "invite";
  return (
    <AuthCard
      title={isInvite ? "Welcome to the LEDLUM CMS" : "Choose a new password"}
      subtitle={<>for <span className="text-white">{info.email}</span></>}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        {isInvite && <input required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={authInputClass} />}
        <input
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={authInputClass}
        />
        <input
          type="password"
          required
          autoComplete="new-password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={authInputClass}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" disabled={submitting} className={authButtonClass}>
          {submitting ? "Saving…" : isInvite ? "Activate account" : "Save password"}
        </button>
      </form>
    </AuthCard>
  );
}

export default function AdminSetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <SetPassword />
    </Suspense>
  );
}
