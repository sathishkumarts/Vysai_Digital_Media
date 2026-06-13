import { forwardRef, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, variant = "primary", ...rest }, ref) => {
    const localRef = useRef<HTMLButtonElement | null>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 200, damping: 18, mass: 0.4 });
    const sy = useSpring(my, { stiffness: 200, damping: 18, mass: 0.4 });
    const tx = useTransform(sx, (v) => `${v}px`);
    const ty = useTransform(sy, (v) => `${v}px`);

    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = localRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      mx.set(x * 0.25);
      my.set(y * 0.35);
    };
    const handleLeave = () => {
      mx.set(0);
      my.set(0);
    };

    const base =
      "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide shine-sweep transition-shadow will-change-transform";
    const styles =
      variant === "primary"
        ? "text-[color:var(--primary-foreground)] bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:shadow-[0_0_80px_-5px_var(--gold)]"
        : "text-foreground glass-panel hover:bg-[color-mix(in_oklab,var(--gold)_8%,transparent)]";

    return (
      <motion.button
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: tx, y: ty }}
        whileTap={{ scale: 0.96 }}
        className={cn(base, styles, className)}
        {...(rest as React.ComponentProps<typeof motion.button>)}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  },
);
MagneticButton.displayName = "MagneticButton";
