import { NextRequest, NextResponse } from "next/server";

// Lead-capture API for jennifer-slade.vercel.app — handles every form
// submission across Home (Buying / Selling / Valuation), /contact,
// /sell, /buy. Field shape matches Skywalker's 2026-05-17 backend
// skeleton, extended with `address` + `note` for richer captures.
//
// Routing (graceful degradation in dependency order):
//   1. CRM_WEBHOOK_URL set     -> POST the lead to that endpoint
//   2. RESEND_API_KEY set      -> email JENNIFER_NOTIFICATION_EMAIL
//   3. nothing set             -> succeed + console.log only
//                                 (Vercel function logs capture it
//                                 until CRM/email is wired)
//
// Returns 200 to the client on ANY successful intake path so the
// user never sees a leak when CRM is misconfigured. Detailed reason
// is in the function log.

export const runtime = "edge";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  intent?: "Buying" | "Selling" | "Valuation" | "Off-Market Access" | "Contact" | string;
  address?: string;
  note?: string;
  neighborhood?: string;
  budget?: string;
  source?: string;
};

function escapeText(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] || c));
}

export async function POST(request: NextRequest) {
  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = (data.name || "").trim().slice(0, 200);
  const email = (data.email || "").trim().slice(0, 200);

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email looks invalid." }, { status: 400 });
  }

  const phone = (data.phone || "").trim().slice(0, 60);
  const intent = (data.intent || "Unspecified").trim().slice(0, 80);
  const address = (data.address || "").trim().slice(0, 300);
  const note = (data.note || "").trim().slice(0, 2000);
  const neighborhood = (data.neighborhood || "").trim().slice(0, 200);
  const budget = (data.budget || "").trim().slice(0, 60);
  const source = (data.source || "homepage").trim().slice(0, 60);
  const timestamp = new Date().toISOString();

  const subject = `🚨 NEW LUXURY LEAD: ${name} — ${intent}`;
  const body =
    `New high-value registration on jenniferslade.com (source: ${source})\n\n` +
    `Name:         ${name}\n` +
    `Email:        ${email}\n` +
    `Phone:        ${phone || "—"}\n` +
    `Intent:       ${intent}\n` +
    (address      ? `Address:      ${address}\n`      : "") +
    (neighborhood ? `Neighborhood: ${neighborhood}\n` : "") +
    (budget       ? `Budget:       ${budget}\n`       : "") +
    (note         ? `\nNote:\n${note}\n`               : "") +
    `\nTimestamp: ${timestamp}`;

  // --- Routing path 1: CRM webhook ---
  const crmUrl = process.env.CRM_WEBHOOK_URL;
  if (crmUrl) {
    try {
      const r = await fetch(crmUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, text: body, lead: { name, email, phone, intent, address, neighborhood, budget, note, source, timestamp } }),
      });
      if (!r.ok) console.error(`[lead] CRM webhook returned ${r.status}`);
      else        console.log(`[lead] forwarded to CRM (${r.status})`);
    } catch (e) {
      console.error("[lead] CRM webhook error:", e);
    }
  }

  // --- Routing path 2: Resend email (parallel to CRM) ---
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.JENNIFER_NOTIFICATION_EMAIL;
  if (resendKey && notifyEmail) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Jennifer Slade Site <noreply@jenniferslade.com>",
          to: [notifyEmail],
          subject,
          text: body,
          html: `<pre style="font:14px/1.6 -apple-system,sans-serif">${escapeText(body)}</pre>`,
        }),
      });
      if (!r.ok) console.error(`[lead] Resend returned ${r.status}: ${await r.text()}`);
      else       console.log(`[lead] email dispatched to ${notifyEmail}`);
    } catch (e) {
      console.error("[lead] Resend error:", e);
    }
  }

  // Always log to function output so Vercel preserves the lead even
  // when nothing else is wired yet.
  if (!crmUrl && !(resendKey && notifyEmail)) {
    console.log(`[lead] NO ROUTING WIRED — logging only:\n${body}`);
  }

  return NextResponse.json(
    { success: true, message: "Your request has been received privately. Jennifer will reach out personally within one business day." },
    { status: 200 },
  );
}
