import { createFileRoute } from "@tanstack/react-router";
import { QRMock } from "@/components/qr-mock";
import { AlertTriangle, ArrowRight, Check, Clock, Copy, Send, Shield, Timer, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard/tokens")({
  component: TokensPage,
});

const HISTORY = [
  { who: "Priya Rao", token: "B-045", when: "34m ago", status: "Accepted" },
  { who: "Luis Ortiz", token: "A-081", when: "yesterday", status: "Expired" },
  { who: "Ada Nkem", token: "C-119", when: "2 days ago", status: "Cancelled" },
];

// Chronological ownership timeline for the currently displayed token A-087.
const OWNERSHIP = [
  { owner: "You (Jordan D.)", role: "Current holder", at: "Today · 09:42", note: "Received from Marco B. via secure link", active: true },
  { owner: "Marco Bianchi", role: "Previous holder", at: "Today · 09:28", note: "Transferred to Jordan D." },
  { owner: "Sara Lin", role: "Previous holder", at: "Today · 08:55", note: "Transferred to Marco B." },
  { owner: "Mercy Hospital", role: "Issuer", at: "Today · 08:12", note: "Token A-087 issued for Cardiology" },
];

// Token expires 20 minutes after being received.
const EXPIRES_AT = Date.now() + 18 * 60 * 1000 + 42 * 1000;
const TOTAL_MS = 20 * 60 * 1000;

function TokensPage() {
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = Math.max(0, EXPIRES_AT - now);
  const mm = Math.floor(remaining / 60000);
  const ss = Math.floor((remaining % 60000) / 1000);
  const pct = Math.max(0, Math.min(100, (remaining / TOTAL_MS) * 100));
  const urgent = remaining < 5 * 60 * 1000;
  const expired = remaining === 0;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight">Token sharing</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr,1.2fr]">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Current token</div>
              <div className="mt-1 font-display text-3xl font-bold">A-087 · Mercy Hospital</div>
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${
              expired ? "bg-destructive/15 text-destructive" : urgent ? "bg-warning/15 text-warning" : "bg-success/15 text-success"
            }`}>
              <Timer className="h-3 w-3" />
              {expired ? "Expired" : urgent ? "Expiring soon" : "Active"}
            </span>
          </div>

          <div className="mt-6 grid place-items-center">
            <div className={expired ? "opacity-40 grayscale" : ""}>
              <QRMock text="A-087-mercy" size={200} />
            </div>
          </div>

          {/* Expiration countdown */}
          <div className="mt-6 rounded-2xl border border-border bg-background/60 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> Expires in
              </span>
              <span className={`font-display text-lg font-bold tabular-nums ${
                expired ? "text-destructive" : urgent ? "text-warning" : "text-foreground"
              }`}>
                {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full transition-all ${
                  expired ? "bg-destructive" : urgent ? "bg-warning" : "gradient-primary"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Tokens expire 20 minutes after being issued or transferred. Miss the window and the
              token is auto-released back to the queue for the next person.
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => { setCopied(true); setTimeout(()=>setCopied(false), 1500); }}
              disabled={expired}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-50"
            >
              {copied ? <><Check className="h-4 w-4 text-success"/> Copied</> : <><Copy className="h-4 w-4"/> Copy link</>}
            </button>
            <button
              disabled={expired}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-4 w-4"/> Share
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Transfer to someone</h2>
            <form onSubmit={(e)=>e.preventDefault()} className="mt-4 space-y-3">
              <input placeholder="Recipient name" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              <input placeholder="Mobile or email" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              <textarea placeholder="Message (optional)" rows={3} className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              <button className="w-full rounded-full gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Generate transfer</button>
            </form>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="font-display text-sm font-semibold">Expiration rules</h3>
            <ul className="mt-3 space-y-2.5 text-xs text-muted-foreground">
              <li className="flex gap-2"><Timer className="h-4 w-4 shrink-0 text-primary" /><span><strong className="text-foreground">20 min window.</strong> Every issued or transferred token stays valid for 20 minutes.</span></li>
              <li className="flex gap-2"><Shield className="h-4 w-4 shrink-0 text-primary" /><span><strong className="text-foreground">One active holder.</strong> Transferring immediately invalidates the previous holder's copy.</span></li>
              <li className="flex gap-2"><AlertTriangle className="h-4 w-4 shrink-0 text-warning" /><span><strong className="text-foreground">Auto-release.</strong> Expired tokens return to the queue and forfeit their position.</span></li>
              <li className="flex gap-2"><UserCheck className="h-4 w-4 shrink-0 text-success" /><span><strong className="text-foreground">Verified recipients.</strong> Transfers require identity verification via mobile or email.</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ownership history timeline */}
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Ownership history</h2>
          <span className="text-xs text-muted-foreground">Token A-087</span>
        </div>
        <ol className="mt-6 space-y-6">
          {OWNERSHIP.map((o, i) => (
            <li key={i} className="relative flex gap-4 pl-2">
              <div className="flex flex-col items-center">
                <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
                  o.active ? "gradient-primary text-primary-foreground shadow-md" : "border border-border bg-background text-muted-foreground"
                }`}>
                  {o.owner.split(" ").map(w => w[0]).slice(0, 2).join("")}
                </span>
                {i < OWNERSHIP.length - 1 && <span className="mt-1 w-px flex-1 bg-border" style={{ minHeight: 28 }} />}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-medium">{o.owner}</span>
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{o.role}</span>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">{o.at}</div>
                <div className="mt-1 text-sm text-foreground/80">{o.note}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6">
        <h3 className="font-display text-sm font-semibold">Transfer history</h3>
        <div className="mt-3 divide-y divide-border rounded-xl border border-border">
          {HISTORY.map(h => (
            <div key={h.token} className="flex items-center justify-between px-4 py-3 text-sm">
              <div className="flex items-center gap-3">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{h.who}</div>
                  <div className="text-xs text-muted-foreground">{h.token} · {h.when}</div>
                </div>
              </div>
              <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                h.status === "Accepted" ? "bg-success/15 text-success" :
                h.status === "Expired" ? "bg-warning/15 text-warning" :
                "bg-destructive/15 text-destructive"
              }`}>{h.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
