import { createFileRoute, Link } from "@tanstack/react-router";
import { MOCK_QUEUES } from "@/lib/mock";
import { QRMock } from "@/components/qr-mock";
import { Bell, Share2, X } from "lucide-react";

export const Route = createFileRoute("/dashboard/queues")({
  component: QueuesPage,
});

function QueuesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight">My Queues</h1>
      <div className="grid gap-5 lg:grid-cols-2">
        {MOCK_QUEUES.map(q => (
          <div key={q.id} className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-muted-foreground">{q.service}</div>
                <div className="font-display text-lg font-semibold">{q.org}</div>
              </div>
              <span className="rounded-full bg-success/15 px-2 py-1 text-[10px] font-semibold text-success">Live</span>
            </div>
            <div className="mt-5 grid grid-cols-[auto,1fr] gap-5">
              <QRMock text={q.yourToken + q.org} size={128} />
              <div className="space-y-3">
                <Row k="Your token" v={q.yourToken} />
                <Row k="Now serving" v={q.currentToken} />
                <Row k="Estimated wait" v={`${q.wait} min`} />
                <Row k="Predicted call" v={new Date(Date.now() + q.wait * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} />
              </div>
            </div>
            <div className="mt-5">
              <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Queue progress</span><span>{q.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full gradient-primary" style={{ width: `${q.progress}%` }} />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/dashboard/tokens" className="inline-flex items-center gap-1.5 rounded-full gradient-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                <Share2 className="h-3.5 w-3.5"/> Share token
              </Link>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-xs font-medium hover:bg-secondary">
                <Bell className="h-3.5 w-3.5"/> Notify me
              </button>
              <button className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10">
                <X className="h-3.5 w-3.5"/> Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-1.5 text-sm last:border-none">
      <span className="text-muted-foreground">{k}</span><span className="font-semibold">{v}</span>
    </div>
  );
}
