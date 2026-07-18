import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCircle2, Clock, Send } from "lucide-react";
import { NOTIFICATIONS } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/notifications")({
  component: NotificationsPage,
});

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  upcoming: Bell, delay: Clock, accepted: Send, done: CheckCircle2,
};

function NotificationsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight">Notifications</h1>

      <div className="space-y-3">
        {NOTIFICATIONS.map(n => {
          const Icon = ICONS[n.type] ?? Bell;
          return (
            <div key={n.id} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-semibold">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.time}</div>
                </div>
                <div className="text-sm text-muted-foreground">{n.body}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">Preferences</h2>
        <div className="mt-4 space-y-3 text-sm">
          {["Push notifications","Email updates","SMS alerts for imminent turn","Weekly analytics digest"].map(p => (
            <label key={p} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
              <span>{p}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
