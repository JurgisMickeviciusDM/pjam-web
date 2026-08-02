"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Tailwind aspect ratio utility for the frame. */
  aspect?: string;
  /** Parallax travel as a fraction of the frame height. */
  speed?: number;
  priority?: boolean;
  /** Apply the cinematic edge vignette. */
  vignette?: boolean;
}

/**
 * Displays an image inside a clipped frame and drifts it vertically as the
 * frame scrolls through the viewport — the sculptural parallax used across
 * the original site.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  aspect = "aspect-[4/5]",
  speed = 0.12,
  priority = false,
  vignette = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pct = speed * 100;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${pct}%`, `${pct}%`],
  );

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-char",
        vignette && "vignette",
        aspect,
        className,
      )}
    >
      <motion.div
        style={{ y: reduce ? 0 : y }}
        className="absolute inset-[-14%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}
