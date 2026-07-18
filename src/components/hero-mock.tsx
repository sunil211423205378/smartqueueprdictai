import { Bell, QrCode, Sparkles, TrendingUp, Users } from "lucide-react";

// Decorative product mock â€” pure CSS/SVG, no external images.
export function HeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute left-0 top-8 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
      </div>

      {/* Phone card */}
      <div className="relative mx-auto w-64 rounded-[2.2rem] border border-border bg-card p-3 shadow-2xl animate-float">
        <div className="rounded-[1.7rem] bg-gradient-to-br from-background to-secondary/60 p-4">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Central Bank · Branch 4</span>
            <span className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-accent"/>AI</span>
          </div>
          <div className="mt-3 rounded-2xl gradient-primary animate-gradient p-4 text-primary-foreground">
            <div className="text-[10px] opacity-80">Your token</div>
            <div className="font-display text-4xl font-bold tracking-tight">A-087</div>
            <div className="mt-2 flex items-center justify-between text-[10px] opacity-90">
              <span>Now serving A-072</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5">Live</span>
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Predicted wait</span>
              <span className="text-success">98% confidence</span>
            </div>
            <div className="mt-1 font-display text-2xl font-semibold">~ 14 min</div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-2/3 gradient-primary" />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <MiniStat icon={<QrCode className="h-3.5 w-3.5"/>} label="Share" />
            <MiniStat icon={<Bell className="h-3.5 w-3.5"/>} label="Notify" />
            <MiniStat icon={<Users className="h-3.5 w-3.5"/>} label="Queue" />
          </div>
        </div>
      </div>

      {/* Floating analytics card */}
      <div className="absolute -right-4 top-6 hidden w-56 rounded-2xl glass p-4 shadow-xl md:block">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5 text-primary"/>Queue speed</span>
          <span className="text-success">+12%</span>
        </div>
        <div className="mt-2 flex items-end gap-1">
          {[30, 45, 28, 60, 42, 70, 55, 82, 48, 90].map((h, i) => (
            <div key={i} className="w-2 rounded-t gradient-primary" style={{ height: `${h * 0.5}px` }} />
          ))}
        </div>
        <div className="mt-2 text-[10px] text-muted-foreground">Avg service · 3.2 min</div>
      </div>

      {/* Floating notification */}
      <div className="absolute -left-6 bottom-8 hidden w-60 rounded-2xl glass p-3 shadow-xl md:flex md:items-start md:gap-3">
        <span className="relative mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full gradient-primary text-primary-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute inset-0 rounded-full bg-primary/60 animate-pulse-ring" />
        </span>
        <div className="min-w-0">
          <div className="text-xs font-semibold">Your turn is near</div>
          <div className="truncate text-[11px] text-muted-foreground">A-085 now serving ” arrive in 6 min</div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-border bg-background/60 py-2 text-[10px] text-muted-foreground">
      <span className="mb-1 text-foreground">{icon}</span>
      {label}
    </div>
  );
}

