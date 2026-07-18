import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell, Field, PrimaryButton } from "@/components/auth-shell";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — SmartQueue AI" }, { name: "description", content: "Create your SmartQueue AI account." }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join queues in seconds. Free forever."
      footer={<>Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link></>}
    >
      <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }} className="space-y-3.5">
        <Field label="Full name" placeholder="Jane Doe" required />
        <Field label="Email" type="email" placeholder="you@company.com" required />
        <Field label="Mobile number" type="tel" placeholder="+1 555 000 1234" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Password" type="password" placeholder="••••••••" required />
          <Field label="Confirm" type="password" placeholder="••••••••" required />
        </div>
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="mt-0.5 rounded border-input" required />
          I agree to the <a href="#" className="text-primary hover:underline">Terms</a> &amp; <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </label>
        <PrimaryButton type="submit">Create account</PrimaryButton>
        <button type="button" className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary">
          Continue with Google
        </button>
      </form>
    </AuthShell>
  );
}
