"use client";

import { useState } from "react";

// Reusable lead form for every Jennifer Slade entry point.
// Variants tune the visible fields + submit-button label without
// changing the underlying /api/private-access POST shape.

type Variant = "compact" | "valuation" | "buyer-access" | "contact" | "newsletter";

type Props = {
  intent: "Buying" | "Selling" | "Valuation" | "Off-Market Access" | "Contact";
  source: string;
  variant?: Variant;
  submitLabel?: string;
  /** Dark band styling — light text on dark background. */
  dark?: boolean;
  buttonClass?: string;
};

export default function LeadForm({
  intent,
  source,
  variant = "compact",
  submitLabel,
  dark = true,
  buttonClass,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [budget, setBudget] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<{ loading: boolean; success?: string; error?: string }>({ loading: false });

  const showAddress      = variant === "valuation";
  const showNeighborhood = variant === "buyer-access";
  const showBudget       = variant === "buyer-access";
  const showPhone        = variant === "valuation" || variant === "buyer-access" || variant === "contact";
  const showNote         = variant === "contact" || variant === "buyer-access" || variant === "valuation";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.loading) return;
    setStatus({ loading: true });

    try {
      const r = await fetch("/api/private-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, intent, address, neighborhood, budget, note, source }),
      });
      const data = (await r.json().catch(() => ({}))) as { success?: boolean; message?: string; error?: string };
      if (!r.ok || !data.success) {
        setStatus({ loading: false, error: data.error || "Submission failed. Please try again." });
        return;
      }
      setStatus({ loading: false, success: data.message || "Received privately. Jennifer will follow up." });
      setName(""); setEmail(""); setPhone(""); setAddress(""); setNeighborhood(""); setBudget(""); setNote("");
    } catch {
      setStatus({ loading: false, error: "Network error. Please try again." });
    }
  };

  // Style atoms keyed to dark / light band variants.
  const inputBase = "w-full bg-transparent focus:outline-none py-3 font-serif placeholder:transition-colors";
  const inputClass = dark
    ? `${inputBase} border-b border-[#faf6f0]/30 focus:border-[#c9a877] text-base text-[#faf6f0] placeholder:text-[#faf6f0]/35`
    : `${inputBase} border-b border-[#1a1716]/30 focus:border-[#1a1716] text-lg text-[#1a1716] placeholder:text-[#1a1716]/35`;

  const defaultBtn = dark
    ? "inline-flex items-center gap-2 mt-3 px-6 py-3 rounded-full border border-[#c9a877] text-[#c9a877] text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#c9a877] hover:text-[#1a1716] disabled:opacity-60 disabled:cursor-not-allowed transition"
    : "inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1a1716] text-[#faf6f0] text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#3a2f23] disabled:opacity-60 disabled:cursor-not-allowed transition-colors";

  const btnClass = buttonClass || defaultBtn;
  const successClass = dark ? "text-[#c9a877] text-[12.5px] tracking-[0.04em] mt-3" : "text-[#1a1716] text-[12.5px] tracking-[0.04em] mt-3 font-medium";
  const errorClass   = dark ? "text-[#e29b8a] text-[12.5px] tracking-[0.04em] mt-3" : "text-[#9a2f2f] text-[12.5px] tracking-[0.04em] mt-3";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text" required placeholder="Full name" autoComplete="name"
        value={name} onChange={(e) => setName(e.target.value)} className={inputClass}
      />
      <input
        type="email" required placeholder="Email" autoComplete="email"
        value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass}
      />
      {showPhone && (
        <input
          type="tel" placeholder="Phone (optional)" autoComplete="tel"
          value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass}
        />
      )}
      {showAddress && (
        <input
          type="text" placeholder="Property address (kept private)"
          value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass}
        />
      )}
      {showNeighborhood && (
        <input
          type="text" placeholder="Target neighborhood(s)"
          value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className={inputClass}
        />
      )}
      {showBudget && (
        <input
          type="text" placeholder="Budget range"
          value={budget} onChange={(e) => setBudget(e.target.value)} className={inputClass}
        />
      )}
      {showNote && (
        <textarea
          rows={4} placeholder="Anything that matters — timeline, architecture, occasion."
          value={note} onChange={(e) => setNote(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      )}
      <button type="submit" disabled={status.loading} className={btnClass}>
        {status.loading ? "Sending…" : (submitLabel || "Submit")}
        <span aria-hidden>→</span>
      </button>
      {status.success && <p className={successClass}>{status.success}</p>}
      {status.error && <p className={errorClass}>{status.error}</p>}
    </form>
  );
}
