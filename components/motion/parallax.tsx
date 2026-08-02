"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the scroll distance to travel (0.1–0.4 feels natural). */
  speed?: number;
}

/**
 * Translates its child vertically as the element passes through the
 * viewport. Wrap an over-sized image in an `overflow-hidden` container.
 */
export function Parallax({ children, className, speed = 0.15 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = 100 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: reduce ? 0 : y, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
