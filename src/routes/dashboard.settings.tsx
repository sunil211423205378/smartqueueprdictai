import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight">Settings</h1>
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Account, security, integrations and API keys will live here.
      </div>
    </div>
  );
}
