import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "light" | "outline" | "outline-light";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-cream hover:bg-olive hover:-translate-y-0.5 shadow-sm",
  light: "bg-cream text-ink hover:bg-white hover:-translate-y-0.5 shadow-sm",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  "outline-light":
    "border border-cream/40 text-cream hover:border-cream hover:bg-cream hover:text-ink",
};

interface CommonProps {
  variant?: Variant;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "solid",
  withArrow = false,
  children,
  className,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      )}
    </button>
  );
}

export function ButtonLink({
  variant = "solid",
  withArrow = false,
  children,
  className,
  href,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      )}
    </Link>
  );
}
