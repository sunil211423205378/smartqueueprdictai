import { Link } from "@tanstack/react-router";
import { Waves } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-4 py-2.5 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl gradient-primary glow-primary">
            <Waves className="h-4 w-4 text-white" />
          </span>
          <span className="font-display text-base font-semibold tracking-tight">SmartQueue<span className="gradient-text"> AI</span></span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#solutions" className="hover:text-foreground transition">Solutions</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login" className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline">Login</Link>
          <Link to="/signup" className="rounded-full gradient-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

