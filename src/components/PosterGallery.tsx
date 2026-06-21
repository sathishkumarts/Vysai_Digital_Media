import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

// Real poster images
import busyKulfi from "../assets/posters/busy Kulfi.png";
import franchaiseTwo from "../assets/posters/franchaise two.png";
import goldenMarbles5 from "../assets/posters/golden marbles (5).jpg";
import goldenMarbles from "../assets/posters/golden marbles.jpg";
import johnDewey1 from "../assets/posters/john dewey (1).jpg";
import johnDewey3 from "../assets/posters/john dewey (3).jpg";
import omKTiruppur from "../assets/posters/omk tiruppur.png";
import vysaiLaunch from "../assets/posters/vysai launch.jpg";

type Poster = {
  title: string;
  client: string;
  category: string;
  image: string;
  size: "tall" | "wide" | "square" | "lg";
};

const POSTERS: Poster[] = [
  {
    title: "Official Launch",
    client: "Vysai Digital Media",
    category: "Brand Launch",
    image: vysaiLaunch,
    size: "tall",
  },
  {
    title: "Franchise Now",
    client: "Oh My Kulfi",
    category: "Product Launch",
    image: franchaiseTwo,
    size: "square",
  },
  {
    title: "Aura 10·10",
    client: "Golden Marbles",
    category: "Product Launch",
    image: goldenMarbles5,
    size: "wide",
  },
  {
    title: "Grand Opening",
    client: "Oh My Kulfi — Tiruppur",
    category: "Restaurant",
    image: omKTiruppur,
    size: "tall",
  },
  {
    title: "Premium Marbles",
    client: "Golden Marbles",
    category: "Product Launch",
    image: goldenMarbles,
    size: "square",
  },
  {
    title: "School Admission",
    client: "John Dewey School",
    category: "Announcement",
    image: johnDewey1,
    size: "wide",
  },
  {
    title: "Admission Open",
    client: "John Dewey School",
    category: "Announcement",
    image: johnDewey3,
    size: "square",
  },
  {
    title: "Busy Bites",
    client: "Oh My Kulfi",
    category: "Meme based Campaign",
    image: busyKulfi,
    size: "lg",
  },
];

const CATEGORIES = [
  "All",
  "Brand Launch",
  "Product Launch",
  "Meme based Campaign",
  "Restaurant",
  "Announcement",
];

const sizeClass: Record<Poster["size"], string> = {
  tall: "md:row-span-2 aspect-[3/4]",
  wide: "md:col-span-2 aspect-[16/10]",
  square: "aspect-square",
  lg: "md:col-span-2 md:row-span-2 aspect-square",
};

export function PosterGallery() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<Poster | null>(null);

  const filtered = filter === "All" ? POSTERS : POSTERS.filter((p) => p.category === filter);

  return (
    <section id="posters" className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
            / Poster gallery · 2024–26
          </div>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
            Posters that <br />
            <span
              className="italic font-light gold-text"
              style={{ backgroundImage: "var(--gradient-gold)" }}
            >
              stop the scroll.
            </span>
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          A curated cut from launch campaigns, festive drops and editorial covers we have
          art-directed in the last 24 months.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-12 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const isActive = filter === c;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`relative rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-all ${
                isActive
                  ? "border-[color:var(--gold)] text-foreground"
                  : "border-[color:var(--border)] text-muted-foreground hover:text-foreground"
              }`}
              style={
                isActive
                  ? {
                      background: "color-mix(in oklab, var(--gold) 12%, transparent)",
                    }
                  : undefined
              }
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[200px] md:gap-5"
      >
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.button
              layout
              key={p.title + p.client}
              onClick={() => setActive(p)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5 }}
              className={`group relative overflow-hidden rounded-2xl text-left ${sizeClass[p.size]}`}
              style={{
                boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5)",
              }}
            >
              {/* Real poster image */}
              <img
                src={p.image}
                alt={`${p.title} — ${p.client} | Vysai Digital Media`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                loading="lazy"
                decoding="async"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

              {/* Top badge */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
                <span className="rounded-full bg-black/40 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm">
                  Vysai · Studio
                </span>
                <span className="rounded-full bg-black/40 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-gold/90 backdrop-blur-sm">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Bottom info */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <div className="min-w-0">
                  <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/60">
                    {p.category}
                  </div>
                  <div className="mt-1 truncate font-display text-base text-white md:text-lg">
                    {p.title}
                  </div>
                  <div className="truncate text-[11px] text-white/50">{p.client}</div>
                </div>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] overflow-y-auto bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            {/* Scroll container — centers content but lets it grow */}
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-4xl rounded-2xl overflow-hidden glass-panel"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button — always visible top-right */}
                <button
                  onClick={() => setActive(null)}
                  className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full bg-black/60 text-white/80 hover:text-white border border-white/20 backdrop-blur transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                {/* Mobile layout: stacked. Desktop: side-by-side */}
                <div className="flex flex-col md:flex-row md:items-stretch">
                  {/* LEFT — full poster image (shows entirely, no cropping) */}
                  <div className="relative w-full md:w-[55%] bg-black flex items-center justify-center min-h-[260px] sm:min-h-[340px]">
                    <img
                      src={active.image}
                      alt={active.title}
                      className="w-full h-full object-contain max-h-[60vh] md:max-h-[80vh]"
                      style={{ display: "block" }}
                    />
                  </div>

                  {/* RIGHT — metadata */}
                  <div className="flex flex-col justify-between gap-6 p-5 sm:p-7 md:w-[45%]">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                        {active.category}
                      </div>
                      <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
                        {active.title}
                      </h3>
                      <div className="mt-2 text-sm text-muted-foreground">
                        Client · {active.client}
                      </div>
                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        Original art direction, creative strategy and finishing by the Vysai studio.
                        Print-ready files and full digital roll-out available on request.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <a
                        href="#contact"
                        onClick={() => setActive(null)}
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/60 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-foreground hover:bg-[color:var(--gold)]/10 transition-colors"
                      >
                        Commission similar <ArrowUpRight size={14} />
                      </a>
                      <button
                        onClick={() => setActive(null)}
                        className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
