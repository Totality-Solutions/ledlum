"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthCard from "@/components/admin/AuthCard";

function Verify() {
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    // Strict mode runs effects twice in dev; the link is single-use.
    if (started.current) return;
    started.current = true;
    fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Verification failed");
        router.replace("/admin");
        router.refresh();
      })
      .catch((err) => setError(err.message));
  }, [token, router]);

  return (
    <AuthCard title={error ? "Couldn't verify" : "Verifying your email…"}>
      {error ? (
        <>
          <p className="text-sm text-red-400">{error}</p>
          <Link href="/admin/login" className="text-sm text-neutral-300 underline hover:text-white">
            Go to login (you can request a new link there)
          </Link>
        </>
      ) : (
        <p className="text-sm text-neutral-400">One moment.</p>
      )}
    </AuthCard>
  );
}

export default function AdminVerifyPage() {
  return (
    <Suspense fallback={null}>
      <Verify />
    </Suspense>
  );
}
