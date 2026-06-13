import { useMemo } from "react";
import { motion } from "framer-motion";

export function GoldenDust({ count = 28 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 3 + 1,
        d: Math.random() * 18 + 12,
        delay: Math.random() * 20,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: "var(--gold-bright)",
            filter: "blur(0.5px)",
            boxShadow: "0 0 8px var(--gold)",
            opacity: 0.5,
          }}
          animate={{
            y: ["0%", "-120vh"],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
