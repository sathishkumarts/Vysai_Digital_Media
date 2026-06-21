import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import howerImg from "../assets/hower.png";

const ROTATING_WORDS = ["results.", "visibility.", "leads.", "growth."];

const STATS = [
  { k: "3+", v: "Active Clients" },
  { k: "2 Months", v: "Of Consistent Growth" },
  { k: "100+", v: "Creative Assets Delivered" },
  { k: "100%", v: "Founder-Led Support" },
];

export function AntiGravityHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const orbX = useTransform(smx, (v) => v * 40);
  const orbY = useTransform(smy, (v) => v * 40);

  // Rotating headline word
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative isolate min-h-[100svh] w-full overflow-hidden noise-overlay pt-28 md:pt-32"
    >
      {/* Background washes */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 70% 30%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 70%), radial-gradient(ellipse 60% 50% at 10% 80%, color-mix(in oklab, var(--gold) 10%, transparent), transparent 70%)",
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--gold) 60%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--gold) 60%, transparent) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)",
          }}
        />
      </div>

      {/* Hero content — asymmetric editorial grid */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-20 md:grid-cols-12 md:gap-8"
      >
        {/* LEFT: type lockup */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold"
          >
            <span className="size-1.5 rounded-full bg-[color:var(--gold)] animate-pulse-gold" />
            Digital Marketing Agency · Villupuram, Tamil Nadu
          </motion.div>

          <h1 className="font-display text-balance text-[2.75rem] leading-[0.95] tracking-tight sm:text-6xl md:text-[5.75rem]">
            <Reveal delay={0.25}>
              <span className="block">Your business</span>
            </Reveal>
            <Reveal delay={0.4}>
              <span className="block">deserves real</span>
            </Reveal>
            <Reveal delay={0.55}>
              <span className="relative block h-[1.05em] overflow-hidden">
                {ROTATING_WORDS.map((w, i) => (
                  <motion.em
                    key={w}
                    className="absolute inset-x-0 font-display italic font-light gold-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, var(--gold-bright), var(--gold), var(--gold-deep))",
                    }}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{
                      y:
                        wordIdx === i
                          ? "0%"
                          : wordIdx > i || (wordIdx === 0 && i === ROTATING_WORDS.length - 1)
                            ? "-110%"
                            : "100%",
                      opacity: wordIdx === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.em>
                ))}
              </span>
            </Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-8 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            Vysai Digital Media is Villupuram's leading digital marketing agency — delivering Meta
            Ads, Google Ads, SEO, social media management, branding, and video content that turns
            local businesses into regional market leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
            >
              <MagneticButton>
                Get Free Consultation <ArrowUpRight size={16} />
              </MagneticButton>
            </a>
            <a href="#reels">
              <MagneticButton variant="ghost">
                <Play size={14} className="text-gold" /> View Our Work
              </MagneticButton>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7 }}
            className="mt-14 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 border-t border-[color:var(--border)] pt-8 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.v}>
                <div className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                  {s.k}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: layered visual composition */}
        <div className="relative md:col-span-5 min-h-[500px] md:min-h-0">
          {/* hower.png hero image */}
          <motion.div
            style={{
              x: orbX,
              y: orbY,
              filter: "drop-shadow(0 40px 80px color-mix(in oklab, var(--gold) 50%, transparent))",
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-[-10%] top-[-8%] md:right-[-25%] md:top-[-20%] h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] md:h-[780px] md:w-[780px]"
          >
            <img
              src={howerImg}
              alt="Vysai Digital Media hero visual"
              className="h-full w-full object-contain"
              draggable={false}
            />
          </motion.div>

          {/* Floating result card */}
          <motion.div
            style={{
              x: useTransform(smx, (v) => v * -22),
              y: useTransform(smy, (v) => v * -22),
              borderColor: "color-mix(in oklab, var(--gold) 30%, transparent)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[6%] right-[2%] w-[230px] rounded-2xl glass-panel p-5"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Recent · Local Retail Brand
            </div>
            <div
              className="mt-2 font-display text-3xl gold-text"
              style={{ backgroundImage: "var(--gradient-gold)" }}
            >
              5×
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              ROI in 60 days via Meta Ads + SEO
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground"
      >
        Scroll
        <span className="block h-10 w-px overflow-hidden bg-[color:var(--border)]">
          <motion.span
            className="block h-1/2 w-full bg-[color:var(--gold)]"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
