"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const DISTANCE = 42;

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
}

/** Fades + slides its children into view on scroll. */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
  amount = 0.3,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const dx = reduce ? 0 : direction === "left" ? DISTANCE : direction === "right" ? -DISTANCE : 0;
  const dy = reduce ? 0 : direction === "up" ? DISTANCE : direction === "down" ? -DISTANCE : 0;

  const variants: Variants = {
    hidden: { opacity: 0, x: dx, y: dy },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
  amount?: number;
  once?: boolean;
}

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.12,
  amount = 0.2,
  once = true,
}: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: gap, delayChildren: delay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  duration = 0.7,
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  const dx = reduce ? 0 : direction === "left" ? DISTANCE : direction === "right" ? -DISTANCE : 0;
  const dy = reduce ? 0 : direction === "up" ? DISTANCE : direction === "down" ? -DISTANCE : 0;

  const variants: Variants = {
    hidden: { opacity: 0, x: dx, y: dy },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
