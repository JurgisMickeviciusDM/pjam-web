"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface TextRevealProps {
  /** Each string becomes its own masked line. */
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Reveals heading text line-by-line from behind a mask — the signature
 * "wipe up" motion used throughout the original site's headings.
 */
export function TextReveal({
  lines,
  className,
  delay = 0,
  stagger = 0.12,
  once = true,
}: TextRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={className}>{lines.join(" ")}</span>;
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const line: Variants = {
    hidden: { y: "115%" },
    visible: {
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.span
      className={className}
      style={{ display: "block" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.6 }}
    >
      {lines.map((text, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden" }}>
          <motion.span variants={line} style={{ display: "block", willChange: "transform" }}>
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
