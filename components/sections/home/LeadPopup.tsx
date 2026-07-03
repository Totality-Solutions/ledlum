"use client";

import React, { useState, useEffect } from "react";
import { X } from "@/lib/icons";

interface LeadPopupProps {
  product: string;
  pdfPath: string;
  onClose: () => void;
}

export default function LeadPopup({ product, pdfPath, onClose }: LeadPopupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = "Enter a valid email address";
    if (phone.trim() && !/^[+\d][\d\s\-()]{6,20}$/.test(phone.trim())) errs.phone = "Enter a valid phone number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), product }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      const link = document.createElement("a");
      link.href = pdfPath;
      link.download = `${product.toLowerCase().replace(/\s+/g, "-")}-catalog-ledlum.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onClose();
    } catch (err: any) {
      setErrors({ form: err.message || "Something went wrong" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-[24px] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <X size={18} className="text-white" />
        </button>

        <h3 className="text-xl font-pop font-semibold text-white mb-1">Download Catalog</h3>
        <p className="text-sm font-pop font-regular text-white/50 mb-6">
          Enter your details to receive the <span className="text-white/80">{product}</span> catalog.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name *"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
              className={`w-full bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"} rounded-full px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#8D794E]/50 transition-all`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1 px-3">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
              className={`w-full bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} rounded-full px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#8D794E]/50 transition-all`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1 px-3">{errors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
              className={`w-full bg-white/5 border ${errors.phone ? "border-red-500" : "border-white/10"} rounded-full px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#8D794E]/50 transition-all`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1 px-3">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-full bg-[#8D794E] hover:bg-[#9a8c66] text-white text-sm font-pop font-medium transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Download Catalog"}
          </button>

          {errors.form && <p className="text-red-400 text-xs text-center">{errors.form}</p>}
        </form>
      </div>
    </div>
  );
}
