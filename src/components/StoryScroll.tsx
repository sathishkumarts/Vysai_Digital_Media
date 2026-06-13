import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CHAPTERS = [
  {
    n: "01",
    title: "We understand your business.",
    body: "Before running a single ad or designing a single post, we dive deep into your business goals, target audience in Villupuram and Tamil Nadu, competitors, and growth challenges — then build a custom digital marketing strategy.",
  },
  {
    n: "02",
    title: "We execute with precision.",
    body: "From SEO-optimized content and high-converting Meta Ads to cinematic reels and performance-driven Google campaigns — every piece we create is built to generate real, measurable business outcomes.",
  },
  {
    n: "03",
    title: "We scale what works.",
    body: "We monitor, optimize, and scale your campaigns weekly. Transparent reports, clear ROI tracking, and zero guesswork. Your growth is our responsibility.",
  },
];

export function StoryScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="relative h-[300vh]" id="studio">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklab, var(--gold) 15%, transparent), transparent 70%)",
          }}
        />

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div className="relative h-[60vh] md:h-[70vh]">
            {CHAPTERS.map((c, i) => (
              <Layer key={c.n} index={i} progress={scrollYProgress} total={CHAPTERS.length} />
            ))}
          </div>

          <div className="relative h-[60vh] md:h-[70vh]">
            {CHAPTERS.map((c, i) => (
              <Chapter
                key={c.n}
                chapter={c}
                index={i}
                progress={scrollYProgress}
                total={CHAPTERS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  index,
  progress,
  total,
}: {
  chapter: { n: string; title: string; body: string };
  index: number;
  progress: any;
  total: number;
}) {
  const step = 1 / total;
  const start = index * step;
  const opacity = useTransform(
    progress,
    [start - 0.1, start + 0.05, start + step - 0.05, start + step + 0.1],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start - 0.1, start + 0.05, start + step - 0.05, start + step + 0.1],
    [40, 0, 0, -40],
  );
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <div className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
        Chapter {chapter.n}
      </div>
      <h3 className="mt-4 font-display text-5xl leading-tight tracking-tight md:text-7xl">
        {chapter.title}
      </h3>
      <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">{chapter.body}</p>
    </motion.div>
  );
}

function Layer({ index, progress, total }: { index: number; progress: any; total: number }) {
  const step = 1 / total;
  const start = index * step;
  const opacity = useTransform(
    progress,
    [start - 0.1, start + 0.05, start + step - 0.05, start + step + 0.1],
    [0, 1, 1, 0],
  );
  const scale = useTransform(progress, [start, start + step], [1.05, 1.2]);

  const palettes = [
    "linear-gradient(135deg, oklch(0.32 0.06 60), oklch(0.18 0.03 60))",
    "linear-gradient(135deg, oklch(0.28 0.08 50), oklch(0.16 0.04 50))",
    "linear-gradient(135deg, oklch(0.36 0.05 80), oklch(0.18 0.03 80))",
  ];

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 overflow-hidden rounded-3xl glass-panel gold-border"
    >
      <div className="absolute inset-0" style={{ background: palettes[index] }} />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-radial-gold)", opacity: 0.4 }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="font-display text-[28vh] leading-none gold-text opacity-30"
          style={{ backgroundImage: "var(--gradient-gold)" }}
        >
          0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}
