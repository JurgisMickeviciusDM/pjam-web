"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { ArrowRight } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 font-body text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-olive focus:ring-2 focus:ring-olive/15";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="rounded-3xl border border-ink/10 bg-sand p-8 md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-olive text-cream">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink">
              Thank you
            </h3>
            <p className="mt-3 max-w-sm text-olive/75">
              Your message has been received. A member of our investment team
              will be in touch shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm font-semibold text-ink underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={labelClass}>
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  className={inputClass}
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  className={inputClass}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="How can we help you?"
              />
            </div>

            {status === "error" && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-body text-sm font-semibold text-cream transition-all duration-300 hover:bg-olive disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Submit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
