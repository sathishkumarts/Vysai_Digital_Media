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

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 md:gap-12 px-6 md:grid-cols-2">
          {/* Visual card container */}
          <div className="relative h-[25vh] sm:h-[35vh] md:h-[70vh] w-full">
            {CHAPTERS.map((c, i) => (
              <Layer key={c.n} index={i} progress={scrollYProgress} total={CHAPTERS.length} />
            ))}
          </div>

          {/* Text container */}
          <div className="relative h-[35vh] sm:h-[40vh] md:h-[70vh] w-full">
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
  let rangeProgress, rangeOpacity, rangeY;
  if (index === 0) {
    rangeProgress = [0, 0.25, 0.33, 1];
    rangeOpacity = [1, 1, 0, 0];
    rangeY = [0, 0, -30, -30];
  } else if (index === 1) {
    rangeProgress = [0, 0.25, 0.33, 0.58, 0.66, 1];
    rangeOpacity = [0, 0, 1, 1, 0, 0];
    rangeY = [30, 30, 0, 0, -30, -30];
  } else {
    rangeProgress = [0, 0.58, 0.66, 1];
    rangeOpacity = [0, 0, 1, 1];
    rangeY = [30, 30, 0, 0];
  }

  const opacity = useTransform(progress, rangeProgress, rangeOpacity);
  const y = useTransform(progress, rangeProgress, rangeY);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-gold">
        Chapter {chapter.n}
      </div>
      <h3 className="mt-2 md:mt-4 font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
        {chapter.title}
      </h3>
      <p className="mt-3 md:mt-6 max-w-md text-sm md:text-lg text-muted-foreground">{chapter.body}</p>
    </motion.div>
  );
}

function Layer({ index, progress, total }: { index: number; progress: any; total: number }) {
  const step = 1 / total;
  const start = index * step;

  let rangeProgress, rangeOpacity;
  if (index === 0) {
    rangeProgress = [0, 0.25, 0.33, 1];
    rangeOpacity = [1, 1, 0, 0];
  } else if (index === 1) {
    rangeProgress = [0, 0.25, 0.33, 0.58, 0.66, 1];
    rangeOpacity = [0, 0, 1, 1, 0, 0];
  } else {
    rangeProgress = [0, 0.58, 0.66, 1];
    rangeOpacity = [0, 0, 1, 1];
  }

  const opacity = useTransform(progress, rangeProgress, rangeOpacity);
  const scale = useTransform(progress, [start, start + step], [1.02, 1.12]);

  const palettes = [
    "linear-gradient(135deg, oklch(0.32 0.06 60), oklch(0.18 0.03 60))",
    "linear-gradient(135deg, oklch(0.28 0.08 50), oklch(0.16 0.04 50))",
    "linear-gradient(135deg, oklch(0.36 0.05 80), oklch(0.18 0.03 80))",
  ];

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl glass-panel gold-border"
    >
      <div className="absolute inset-0" style={{ background: palettes[index] }} />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-radial-gold)", opacity: 0.4 }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="font-display text-[10vh] md:text-[28vh] leading-none gold-text opacity-30"
          style={{ backgroundImage: "var(--gradient-gold)" }}
        >
          0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}
