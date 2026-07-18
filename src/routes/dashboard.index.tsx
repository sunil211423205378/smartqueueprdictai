import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Bell, Clock, PlusCircle, QrCode, TrendingUp } from "lucide-react";
import { MOCK_QUEUES } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const stats = [
    { label: "Active queues", value: MOCK_QUEUES.length, icon: Activity, tint: "text-primary" },
    { label: "Current token", value: "A-087", icon: QrCode, tint: "text-accent" },
    { label: "Est. wait", value: "14 min", icon: Clock, tint: "text-success" },
    { label: "Notifications", value: 4, icon: Bell, tint: "text-warning" },
  ];
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Good afternoon, Jane</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's what's happening in your queues.</p>
        </div>
        <Link to="/dashboard/join" className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-primary">
          <PlusCircle className="h-4 w-4" /> Join a queue
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.tint}`} />
            </div>
            <div className="mt-2 font-display text-3xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Recent queues</h2>
          <Link to="/dashboard/queues" className="text-xs text-primary hover:underline">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {MOCK_QUEUES.map(q => (
            <div key={q.id} className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-base font-semibold">{q.org}</div>
                  <div className="text-xs text-muted-foreground">{q.service}</div>
                </div>
                <span className="rounded-full bg-success/15 px-2 py-1 text-[10px] font-semibold text-success">Live</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Metric label="Your token" value={q.yourToken} />
                <Metric label="Now serving" value={q.currentToken} />
                <Metric label="Wait" value={`${q.wait}m`} />
              </div>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Progress</span>
                  <span className="flex items-center gap-1 text-success"><TrendingUp className="h-3 w-3"/>{q.confidence}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full gradient-primary" style={{ width: `${q.progress}%` }} />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <Link to="/dashboard/tokens" className="rounded-full border border-border px-3 py-1.5 hover:bg-secondary">Share token</Link>
                <Link to="/dashboard/queues" className="rounded-full border border-border px-3 py-1.5 hover:bg-secondary">Track</Link>
                <span className="ml-auto text-muted-foreground">{q.updated}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-sm font-semibold">{value}</div>
    </div>
  );
}
