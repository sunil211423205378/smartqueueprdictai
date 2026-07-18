mport { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { Activity, Database, Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard/prediction")({
  component: PredictionPage,
});

const TREND = Array.from({ length: 12 }, (_, i) => ({ h: `${i * 2}:00`, wait: 6 + Math.round(Math.sin(i / 2) * 6 + Math.random() * 4 + 10) }));
const PEAK = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => ({ d, load: [40,55,48,62,80,95,70][i] }));
const SPEED = Array.from({ length: 10 }, (_, i) => ({ x: `T${i + 1}`, s: 2 + Math.random() * 3 }));

function PredictionPage() {
  const [range, setRange] = useState<"Today" | "Weekly" | "Monthly">("Today");
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Queue prediction</h1>
          <p className="mt-1 text-sm text-muted-foreground">AI-powered insights across your queues.</p>
        </div>
        <div className="inline-flex rounded-full border border-border bg-card p-1 text-xs">
          {(["Today","Weekly","Monthly"] as const).map(r => (
            <button key={r} onClick={() => setRange(r)} className={`rounded-full px-3 py-1.5 ${range===r ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}`}>{r}</button>
          ))}
        </div>
      </div>

      <ConfidenceCard confidence={94} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {[
          { k: "Avg wait", v: "14 min", d: "-8% vs yesterday" },
          { k: "Queue speed", v: "3.2/min", d: "+12%" },
          { k: "Avg service", v: "4.1 min", d: "-3%" },
          { k: "Confidence", v: "94%", d: "AI accuracy" },
        ].map(s => (
          <div key={s.k} className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs text-muted-foreground">{s.k}</div>
            <div className="mt-1 font-display text-2xl font-bold">{s.v}</div>
            <div className="text-[11px] text-success">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Waiting time trend">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={TREND}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="h" stroke="var(--muted-foreground)" fontSize={11}/>
              <YAxis stroke="var(--muted-foreground)" fontSize={11}/>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="wait" stroke="var(--primary)" fill="url(#g1)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Peak hours">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={PEAK}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3"/>
              <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11}/>
              <YAxis stroke="var(--muted-foreground)" fontSize={11}/>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="load" fill="var(--accent)" radius={[8,8,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Queue speed">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={SPEED}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3"/>
              <XAxis dataKey="x" stroke="var(--muted-foreground)" fontSize={11}/>
              <YAxis stroke="var(--muted-foreground)" fontSize={11}/>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="s" stroke="var(--primary)" strokeWidth={2} dot={{ r: 3 }}/>
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Average service time">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={TREND.map(t => ({ h: t.h, s: t.wait / 3 }))}>
              <defs>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3"/>
              <XAxis dataKey="h" stroke="var(--muted-foreground)" fontSize={11}/>
              <YAxis stroke="var(--muted-foreground)" fontSize={11}/>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="s" stroke="var(--accent)" fill="url(#g2)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 font-display text-sm font-semibold">{title}</div>
      {children}
    </div>
  );
}

function ConfidenceCard({ confidence }: { confidence: number }) {
  const level = confidence >= 90 ? "High" : confidence >= 75 ? "Moderate" : "Low";
  const tone =
    confidence >= 90 ? "text-success" : confidence >= 75 ? "text-warning" : "text-destructive";
  const barTone =
    confidence >= 90 ? "bg-success" : confidence >= 75 ? "bg-warning" : "bg-destructive";

  const size = 120;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (confidence / 100) * c;

  const signals = [
    { icon: Database, label: "Data freshness", value: "Live · 4s ago", pct: 98 },
    { icon: Activity, label: "Sample size", value: "1,284 tokens today", pct: 92 },
    { icon: TrendingUp, label: "Pattern stability", value: "Low variance", pct: 88 },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl gradient-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <div className="font-display text-sm font-semibold">AI prediction confidence</div>
            <div className="text-xs text-muted-foreground">
              How reliable the current forecast is, based on live signals.
            </div>
          </div>
        </div>
        <span className={`rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold ${tone}`}>
          {level} reliability
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[auto,1fr] md:items-center">
        <div className="relative mx-auto" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--border)" strokeWidth={stroke} fill="none" />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="var(--primary)"
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={c}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="font-display text-2xl font-bold tabular-nums">{confidence}%</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">confidence</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {signals.map((s) => (
            <div key={s.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <s.icon className="h-3.5 w-3.5" /> {s.label}
                </span>
                <span className="text-foreground">{s.value}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className={`h-full ${barTone}`} style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
