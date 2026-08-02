"use client";

import { useActionState } from "react";
import { Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { login, type LoginState } from "@/lib/actions/auth";

const inputClass =
  "w-full rounded-xl border border-cream/15 bg-cream/[0.04] px-4 py-3 font-body text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-gold focus:ring-2 focus:ring-gold/20";

interface LoginFormProps {
  scope: "portal" | "admin";
  next?: string;
}

export function LoginForm({ scope, next = "" }: LoginFormProps) {
  const [state, formAction, pending] = useActionState<
    LoginState | undefined,
    FormData
  >(login, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="scope" value={scope} />
      <input type="hidden" name="next" value={next} />

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-cream/50"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-cream/50"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
          placeholder="••••••••"
        />
      </div>

      {state?.error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-body text-sm font-semibold text-ink transition-all duration-300 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            Sign in
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
