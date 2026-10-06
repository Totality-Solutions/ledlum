"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Label, Notice, inputClass } from "@/components/admin/ui";

export default function AccountForm({ userId, initialName }: { userId: string; initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage({ tone: "error", text: "Passwords don't match" });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ...(password ? { password } : {}) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setPassword("");
      setConfirmPassword("");
      setMessage({ tone: "success", text: "Saved." });
      router.refresh();
    } catch (err: any) {
      setMessage({ tone: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="p-5">
      <form onSubmit={submit} className="flex flex-col gap-4">
        {message && <Notice tone={message.tone}>{message.text}</Notice>}
        <div>
          <Label>Name</Label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label help="Leave empty to keep your current password.">New password</Label>
          <input type="password" minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label>Confirm new password</Label>
          <input type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} />
        </div>
        <Button type="submit" disabled={busy} className="self-start">{busy ? "Saving…" : "Save"}</Button>
      </form>
    </Card>
  );
}
