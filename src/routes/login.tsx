import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell, Field, PrimaryButton } from "@/components/auth-shell";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — SmartQueue AI" }, { name: "description", content: "Sign in to SmartQueue AI." }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue tracking your queues."
      footer={<>Don't have an account? <Link to="/signup" className="font-semibold text-primary hover:underline">Create one</Link></>}
    >
      <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }} className="space-y-4">
        <Field label="Email" type="email" placeholder="you@company.com" required />
        <Field label="Password" type="password" placeholder="••••••••" required />
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="rounded border-input" /> Remember me
          </label>
          <a href="#" className="text-primary hover:underline">Forgot password?</a>
        </div>
        <PrimaryButton type="submit">Sign in</PrimaryButton>
        <button type="button" className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary">
          Continue with Google
        </button>
      </form>
    </AuthShell>
  );
}
