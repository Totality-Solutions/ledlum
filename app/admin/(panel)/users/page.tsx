"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Card, Label, Notice, PageHeader, formatDateTime, inputClass } from "@/components/admin/ui";

type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
  active: boolean;
  email_verified_at: string | null;
  last_login_at: string | null;
  created_at: string;
};

const EMPTY_FORM = { name: "", email: "", role: "editor" as User["role"] };

export default function AdminUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    if (!res.ok) {
      setMessage({ tone: "error", text: data.error || "Failed to load users" });
      return;
    }
    setUsers(data.users);
    setCurrentUserId(data.currentUserId);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const request = async (url: string, init: RequestInit, success: string) => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(url, { ...init, headers: { "Content-Type": "application/json" } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessage({ tone: "success", text: success });
      await load();
      return true;
    } catch (err: any) {
      setMessage({ tone: "error", text: err.message });
      return false;
    } finally {
      setBusy(false);
    }
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await request("/api/admin/users", { method: "POST", body: JSON.stringify(form) }, `Invite sent to ${form.email}.`);
    if (ok) setForm(EMPTY_FORM);
  };

  const update = (u: User, patch: Record<string, unknown>, success: string) =>
    request(`/api/admin/users/${u.id}`, { method: "PATCH", body: JSON.stringify(patch) }, success);

  const sendEmail = (u: User) =>
    request(
      `/api/admin/users/${u.id}/email`,
      { method: "POST" },
      u.email_verified_at ? `Password reset link sent to ${u.email}.` : `Invite re-sent to ${u.email}.`
    );

  const remove = (u: User) => {
    if (confirm(`Delete ${u.email}? They will lose access immediately.`)) {
      request(`/api/admin/users/${u.id}`, { method: "DELETE" }, `Deleted ${u.email}.`);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <PageHeader
        title="Users"
        description="Admins can do everything, including managing users. Editors can edit all content but can't manage users or delete products and submissions."
      />

      {message && <div className="mb-4"><Notice tone={message.tone}>{message.text}</Notice></div>}

      <Card className="divide-y divide-neutral-800 mb-8">
        {(users || []).map((u) => (
          <div key={u.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {u.name} {u.id === currentUserId && <span className="text-neutral-500 font-normal">(you)</span>}
                {!u.active && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-red-950 text-red-300">Disabled</span>}
                {u.active && !u.email_verified_at && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300">Invite pending</span>}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {u.email} · {u.last_login_at ? `last login ${formatDateTime(u.last_login_at)}` : "never logged in"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={u.role}
                disabled={busy || u.id === currentUserId}
                onChange={(e) => update(u, { role: e.target.value }, `${u.email} is now ${e.target.value === "admin" ? "an admin" : "an editor"}.`)}
                className="px-2 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-sm"
              >
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
              {u.id !== currentUserId && (
                <Button variant="secondary" disabled={busy || !u.active} onClick={() => sendEmail(u)}>
                  {u.email_verified_at ? "Send password reset" : "Resend invite"}
                </Button>
              )}
              {u.id !== currentUserId && (
                <>
                  <Button
                    variant="secondary"
                    disabled={busy}
                    onClick={() => update(u, { active: !u.active }, `${u.email} ${u.active ? "disabled" : "enabled"}.`)}
                  >
                    {u.active ? "Disable" : "Enable"}
                  </Button>
                  <Button variant="danger" disabled={busy} onClick={() => remove(u)}>Delete</Button>
                </>
              )}
            </div>
          </div>
        ))}
        {!users && <p className="p-4 text-sm text-neutral-500">Loading…</p>}
      </Card>

      <Card className="p-5">
        <h2 className="font-semibold mb-1">Invite a user</h2>
        <p className="text-sm text-neutral-400 mb-4">They'll get an email with a link to choose their password. The link works for 7 days.</p>
        <form onSubmit={create} className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <Label>Email</Label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </div>
          <div>
            <Label>Role</Label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as User["role"] })} className={inputClass}>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={busy}>Send invite</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
