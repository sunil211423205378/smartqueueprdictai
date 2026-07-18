import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, LayoutDashboard, LineChart, ListChecks, LogOut, PlusCircle, QrCode, Settings, Sparkles, User, Waves } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SmartQueue AI" }] }),
  component: DashboardLayout,
});

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/queues", label: "My Queues", icon: ListChecks, exact: false },
  { to: "/dashboard/join", label: "Join Queue", icon: PlusCircle, exact: false },
  { to: "/dashboard/prediction", label: "Queue Prediction", icon: LineChart, exact: false },
  { to: "/dashboard/tokens", label: "Token Sharing", icon: QrCode, exact: false },
  { to: "/dashboard/notifications", label: "Notifications", icon: Bell, exact: false },
  { to: "/dashboard/profile", label: "Profile", icon: User, exact: false },
  { to: "/dashboard/settings", label: "Settings", icon: Settings, exact: false },
] as const;

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card/50 backdrop-blur md:flex md:flex-col">
          <Link to="/" className="flex items-center gap-2 px-6 py-5">
            <span className="grid h-8 w-8 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <Waves className="h-4 w-4" />
            </span>
            <span className="font-display font-semibold">SmartQueue AI</span>
          </Link>
          <nav className="flex-1 space-y-1 px-3">
            {NAV.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                    active ? "gradient-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-border p-3">
            <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
              <LogOut className="h-4 w-4" /> Sign out
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/70 px-6 py-3 backdrop-blur">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" /> AI predictions live
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <span className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-xs font-semibold text-primary-foreground">JD</span>
            </div>
          </header>
          <main className="min-w-0 flex-1 px-6 py-8"><Outlet /></main>
        </div>
      </div>
    </div>
  );
}
