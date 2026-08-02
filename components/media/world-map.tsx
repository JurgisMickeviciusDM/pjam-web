"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Hub {
  name: string;
  x: number; // 0–100, % across the panel
  y: number; // 0–100, % down the panel
  hq?: boolean;
}

const HUBS: Hub[] = [
  { name: "New York", x: 27, y: 43 },
  { name: "London", x: 46, y: 34 },
  { name: "Vilnius", x: 52, y: 31, hq: true },
  { name: "Dubai", x: 62, y: 53 },
  { name: "Singapore", x: 77, y: 66 },
  { name: "São Paulo", x: 34, y: 76 },
];

const HQ = HUBS.find((h) => h.hq)!;
const ARCS = HUBS.filter((h) => !h.hq);

function arcPath(a: Hub, b: Hub) {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - 14;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}

/** Animated "global presence" map — pulsing hubs joined by drawn gold arcs. */
export function WorldMap() {
  const reduce = useReducedMotion();

  return (
    <div className="grain relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-cream/10 bg-noir">
      {/* Dotted map field */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(215,217,202,0.18) 1px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,194,0,0.09),transparent_60%)] blur-2xl"
      />

      {/* Connecting arcs */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f2c200" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#f2c200" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#f2c200" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {ARCS.map((hub, i) => (
          <motion.path
            key={hub.name}
            d={arcPath(HQ, hub)}
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth={1.4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 1.4,
              delay: 0.3 + i * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </svg>

      {/* Hubs */}
      {HUBS.map((h) => (
        <div
          key={h.name}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
        >
          <span
            className={cn(
              "relative block rounded-full",
              h.hq ? "h-3 w-3 bg-gold" : "h-2 w-2 bg-cream/80",
            )}
          >
            {!reduce && (
              <span
                className={cn(
                  "absolute inset-0 animate-ping rounded-full",
                  h.hq ? "bg-gold" : "bg-cream/50",
                )}
              />
            )}
          </span>
          <span className="mt-2 whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.14em] text-cream/45">
            {h.name}
          </span>
        </div>
      ))}
    </div>
  );
}
