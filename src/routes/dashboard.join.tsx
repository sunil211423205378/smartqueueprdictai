import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { ORGS } from "@/lib/mock";
import { QRMock } from "@/components/qr-mock";

export const Route = createFileRoute("/dashboard/join")({
  component: JoinPage,
});

function JoinPage() {
  const [q, setQ] = useState("");
  const [joined, setJoined] = useState<string | null>(null);
  const filtered = ORGS.filter(o => o.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight">Join a queue</h1>
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search hospitals, banks, restaurants…" className="w-full bg-transparent text-sm outline-none" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {["Shortest wait","Nearest","Open now","Hospital","Bank","Restaurant","Government"].map(t => (
            <button key={t} className="rounded-full border border-border px-3 py-1 text-muted-foreground hover:text-foreground hover:border-primary/40">{t}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map(o => (
          <div key={o.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground">
              {o.cat[0]}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-display font-semibold">{o.name}</div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>{o.cat}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{o.distance}</span>
                <span className="flex items-center gap-1 text-success"><Clock className="h-3 w-3"/>~{o.wait} min</span>
              </div>
            </div>
            <button onClick={() => setJoined(o.name)} className="rounded-full gradient-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">Join</button>
          </div>
        ))}
      </div>

      {joined && (
        <div className="rounded-3xl border border-primary/30 bg-card p-6 glow-primary">
          <div className="grid gap-6 md:grid-cols-[auto,1fr] md:items-center">
            <QRMock text={joined + Date.now()} size={160} />
            <div>
              <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3 w-3"/> AI prediction
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold">You're in the queue at {joined}</h2>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <Stat k="Your token" v="A-093" />
                <Stat k="Position" v="12th" />
                <Stat k="Wait" v="16 min" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-secondary p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="font-display text-xl font-bold">{v}</div>
    </div>
  );
}
