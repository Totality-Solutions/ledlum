"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// First-run only: creates the first admin user. The API refuses once any
// user exists, and requires the ADMIN_PASSWORD env var as a setup key.
export default function AdminSetupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ setupKey: "", name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Setup failed");
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl p-8 flex flex-col gap-4"
      >
        <div>
          <h1 className="text-xl font-semibold text-white">Create the first admin</h1>
          <p className="text-sm text-neutral-400 mt-1">
            The setup key is the old shared admin password (ADMIN_PASSWORD).
          </p>
        </div>
        <input type="password" placeholder="Setup key" required value={form.setupKey} onChange={set("setupKey")} className={inputClass} />
        <input placeholder="Your name" required value={form.name} onChange={set("name")} className={inputClass} />
        <input type="email" placeholder="Email" required value={form.email} onChange={set("email")} className={inputClass} />
        <input
          type="password"
          placeholder="New password (min 8 characters)"
          required
          minLength={8}
          autoComplete="new-password"
          value={form.password}
          onChange={set("password")}
          className={inputClass}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" disabled={submitting} className="w-full py-2 rounded-md bg-white text-black font-medium disabled:opacity-50">
          {submitting ? "Creating…" : "Create admin & sign in"}
        </button>
      </form>
    </div>
  );
}
