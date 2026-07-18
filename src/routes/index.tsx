import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell, Brain, Check, ChevronDown, LineChart, MapPin, QrCode,
  Shield, Sparkles, Twitter, Github, Linkedin, ArrowRight
} from "lucide-react";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { HeroMock } from "@/components/hero-mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartQueue AI â€” Never Wait in Line Again" },
      { name: "description", content: "AI-powered queue prediction, live tracking, and secure token sharing for hospitals, banks, restaurants, government and more." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,140,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,140,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <SiteNav />
      <Hero />
      <Logos />
      <Features />
      <HowItWorks />
      <Solutions />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-24 md:pt-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            AI queue prediction Â· v2 release
          </div>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Never wait in line again with <span className="gradient-text">AI queue prediction</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Predict waiting times, monitor queues in real time, securely share tokens, and get notified the moment it's your turn.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full gradient-primary glow-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]">
              Join Queue <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-card">
              Watch Demo
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-success"/>No credit card</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-success"/>Setup in 2 min</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-success"/>SOC2-ready</span>
          </div>
        </div>
        <HeroMock />
      </div>
    </section>
  );
}

function Logos() {
  const names = ["Mercy Hospital", "Metro Bank", "Cafe Nord", "City Hall", "UniServe", "Bright Clinic"];
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <p className="mb-6 text-center text-xs uppercase tracking-widest text-muted-foreground">Trusted by teams managing millions of visits</p>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
        {names.map(n => (
          <div key={n} className="text-center font-display text-sm font-semibold text-muted-foreground/70">{n}</div>
        ))}
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Brain, title: "AI Queue Prediction", desc: "Real-time waiting estimates powered by ML models trained on service speed, peak hours and history." },
  { icon: QrCode, title: "Token Sharing", desc: "Securely transfer or share your token via QR code with family and colleagues." },
  { icon: LineChart, title: "Live Queue Tracking", desc: "Monitor your position from anywhere with live updates and animated progress." },
  { icon: Bell, title: "Smart Notifications", desc: "Get pinged before your turn â€” never miss your slot again." },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader eyebrow="Features" title="Everything you need to skip the wait" subtitle="A premium platform for organizations and their visitors."/>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
            <span className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Join queue", desc: "Search a place, pick a service, and tap Join." },
  { n: "02", title: "Receive digital token", desc: "Get a QR-backed token instantly on your device." },
  { n: "03", title: "AI predicts your wait", desc: "Live estimates update as the queue moves." },
  { n: "04", title: "Arrive just in time", desc: "Notifications tell you exactly when to walk in." },
];

function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader eyebrow="How it works" title="Four steps to your time back"/>
      <div className="mt-12 grid gap-4 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6">
            <div className="font-display text-xs font-semibold gradient-text">{s.n}</div>
            <h4 className="mt-3 font-display text-base font-semibold">{s.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            {i < STEPS.length - 1 && (
              <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const SOLUTIONS = ["Hospitals","Banks","Government","Restaurants","Clinics","Universities","Service centers","Retail"];
function Solutions() {
  return (
    <section id="solutions" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader eyebrow="Solutions" title="Built for every place people wait"/>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {SOLUTIONS.map(s => (
          <span key={s} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition">
            <MapPin className="mr-1 inline h-3.5 w-3.5" /> {s}
          </span>
        ))}
      </div>
    </section>
  );
}

const PLANS = [
  { name: "Free", price: "$0", per: "forever", features: ["1 active queue", "Basic predictions", "Digital token"], cta: "Start free" },
  { name: "Pro", price: "$12", per: "per user / month", featured: true, features: ["Unlimited queues", "Advanced AI prediction", "Token sharing", "Live notifications"], cta: "Start Pro" },
  { name: "Enterprise", price: "Custom", per: "contact sales", features: ["Multi-branch management", "Analytics dashboard", "Staff & roles", "API integration", "Priority AI processing"], cta: "Talk to sales" },
];

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader eyebrow="Pricing" title="Simple pricing that scales with you"/>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PLANS.map(p => (
          <div key={p.name} className={`relative rounded-3xl border p-7 ${p.featured ? "border-primary/40 bg-card glow-primary" : "border-border bg-card"}`}>
            {p.featured && <span className="absolute -top-3 left-7 rounded-full gradient-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">Most popular</span>}
            <h3 className="font-display text-lg font-semibold">{p.name}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold">{p.price}</span>
              <span className="text-xs text-muted-foreground">{p.per}</span>
            </div>
            <ul className="mt-6 space-y-2.5 text-sm">
              {p.features.map(f => (
                <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-success shrink-0"/>{f}</li>
              ))}
            </ul>
            <Link to="/signup" className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${p.featured ? "gradient-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}>
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { name: "Dr. Amara Okafor", role: "Hospital Administrator", quote: "Our OPD wait complaints dropped 62% in a month. Patients love the arrival notifications." },
  { name: "Liam Chen", role: "Restaurant Owner", quote: "Weekend rush is finally sane. Guests wander the neighborhood and come back exactly on cue." },
  { name: "Priya Rao", role: "Bank Branch Manager", quote: "The AI predictions are eerily accurate. Our lobby is quieter and staff productivity is up." },
];

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader eyebrow="Loved by operators" title="What teams say about SmartQueue"/>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map(t => (
          <figure key={t.name} className="rounded-3xl border border-border bg-card p-7">
            <div className="mb-4 flex gap-1 text-accent">{"â˜…â˜…â˜…â˜…â˜…"}</div>
            <blockquote className="text-sm leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground">
                {t.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
              </span>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  { q: "How accurate are AI predictions?", a: "Our models learn per-branch service patterns and typically reach 90%+ accuracy within a week of live data." },
  { q: "Can I transfer my token?", a: "Yes â€” generate a QR or share a secure link. The recipient confirms and the token transfers instantly." },
  { q: "Does SmartQueue support multiple locations?", a: "Enterprise plans include multi-branch management with per-location analytics and staff controls." },
  { q: "Is my data secure?", a: "We use end-to-end encryption in transit, role-based access, and are built on infrastructure ready for SOC2." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
      <SectionHeader eyebrow="FAQ" title="Frequently asked questions"/>
      <div className="mt-10 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
        {FAQS.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-medium">{f.q}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <div className="px-6 pb-6 text-sm text-muted-foreground">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-border gradient-primary animate-gradient p-10 text-primary-foreground md:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <Shield className="h-8 w-8 opacity-90" />
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Stop wasting your visitors' time.
          </h2>
          <p className="mt-4 max-w-lg text-white/90">Launch SmartQueue AI at your branch in minutes. First queue is free, forever.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary hover:scale-[1.03] transition-transform">Get started free</Link>
            <a href="#pricing" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10">View pricing</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <div className="grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display font-semibold">SmartQueue AI</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Predict wait times. Share tokens. Skip the uncertainty.</p>
          <div className="mt-4 flex gap-2">
            <a className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-card" href="#"><Twitter className="h-4 w-4"/></a>
            <a className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-card" href="#"><Github className="h-4 w-4"/></a>
            <a className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-card" href="#"><Linkedin className="h-4 w-4"/></a>
          </div>
        </div>
        {[
          { title: "Product", links: ["Features","Pricing","Solutions","Changelog"] },
          { title: "Company", links: ["About","Careers","Contact","Blog"] },
          { title: "Legal", links: ["Privacy Policy","Terms","Security","Cookies"] },
        ].map(col => (
          <div key={col.title}>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{col.title}</div>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map(l => <li key={l}><a href="#" className="text-muted-foreground hover:text-foreground">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
        <span>Â© {new Date().getFullYear()} SmartQueue AI. All rights reserved.</span>
        <span>Made for humans who value their time.</span>
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] gradient-text">{eyebrow}</div>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

