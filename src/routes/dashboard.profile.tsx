import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut, Star } from "lucide-react";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight">Profile</h1>

      <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6">
        <span className="grid h-16 w-16 place-items-center rounded-2xl gradient-primary text-lg font-bold text-primary-foreground">JD</span>
        <div className="min-w-0 flex-1">
          <div className="font-display text-xl font-semibold">Jane Doe</div>
          <div className="text-sm text-muted-foreground">jane@company.com · +1 555 000 1234</div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Star className="h-3 w-3"/> Pro plan
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Saved organizations">
          <ul className="space-y-2 text-sm">
            {["Mercy Hospital","Metro Bank — Branch 4","Cafe Nord"].map(o => (
              <li key={o} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
                <span>{o}</span><button className="text-xs text-primary hover:underline">Remove</button>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Notification preferences">
          <div className="space-y-2 text-sm">
            {["Push","Email","SMS"].map(t => (
              <label key={t} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
                <span>{t}</span><input type="checkbox" defaultChecked/>
              </label>
            ))}
          </div>
        </Card>
      </div>

      <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
        <LogOut className="h-4 w-4"/> Sign out
      </Link>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 font-display text-sm font-semibold">{title}</div>
      {children}
    </div>
  );
}
