"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GrowBarProps {
  value: number;
  className?: string;
  barClassName?: string;
}

/** A progress bar that grows from 0 to `value`% when scrolled into view. */
export function GrowBar({ value, className, barClassName }: GrowBarProps) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-ink/10", className)}>
      <motion.div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-olive to-navy",
          barClassName,
        )}
        initial={{ width: reduce ? `${value}%` : 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
