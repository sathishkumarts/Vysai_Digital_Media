import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, Play } from "lucide-react";

import blinkitCover from "../assets/reel/blinkit.png";
import innuVenumCover from "../assets/reel/inu venum.jpeg";
import marbleCover from "../assets/reel/marble.png";
import marble2Cover from "../assets/reel/marble2.png";
import omkBoyCover from "../assets/reel/omk boy.jpeg";

type Reel = {
  cover: string;
  views: string;
  brand: string;
  likes: string;
  comments: string;
  shares: string;
  caption: string;
};

const REELS: Reel[] = [
  {
    cover: omkBoyCover,
    brand: "Oh My Kulfi",
    caption: "குரும்பா 🍧 — That one kid who knows what's real 👑",
    views: "18.4k",
    likes: "2.1k",
    comments: "312",
    shares: "486",
  },
  {
    cover: blinkitCover,
    brand: "Oh My Kulfi",
    caption: "Namma Oh My Kulfi — Grand Opening Night 🎉🍦",
    views: "12.7k",
    likes: "1.4k",
    comments: "198",
    shares: "320",
  },
  {
    cover: innuVenumCover,
    brand: "Oh My Kulfi",
    caption: "Innu Venuuu... 😋❤️ — Full flavour lineup drop!",
    views: "9.8k",
    likes: "1.1k",
    comments: "143",
    shares: "218",
  },
  {
    cover: marbleCover,
    brand: "Golden Marbles",
    caption: "Make Your Home Look Rich & Elegant 🏠✨ — Since 1992",
    views: "7.2k",
    likes: "684",
    comments: "91",
    shares: "137",
  },
  {
    cover: marble2Cover,
    brand: "Golden Marbles",
    caption: "Our Signature Projects — Mahalakshmi Plaza, Villupuram 📍",
    views: "5.6k",
    likes: "512",
    comments: "74",
    shares: "98",
  },
];

export function Reels() {
  return (
    <section id="reels" className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
              / Reels Showcase
            </div>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              Content engineered <br />
              <span
                className="italic font-light gold-text"
                style={{ backgroundImage: "var(--gradient-gold)" }}
              >
                to be unscrollable.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            A glimpse from our last six months of reel production for local F&amp;B and premium home
            brands.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <div
          className="flex gap-6 overflow-x-auto px-6 pb-8 scroll-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {REELS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0"
              style={{ scrollSnapAlign: "center" }}
            >
              <Phone reel={r} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Phone({ reel }: { reel: Reel }) {
  return (
    <div className="group relative">
      <div
        className="relative w-[260px] aspect-[9/19] rounded-[2.6rem] p-2 transition-transform duration-700 group-hover:-translate-y-2"
        style={{
          background: "linear-gradient(160deg, oklch(0.35 0.03 60), oklch(0.12 0.02 60))",
          boxShadow:
            "0 40px 80px -25px oklch(0 0 0 / 0.8), inset 0 0 0 1px color-mix(in oklab, var(--gold) 25%, transparent)",
        }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-black/80" />

        <div className="relative h-full w-full overflow-hidden rounded-[2.1rem]">
          {/* Actual reel screenshot — object-cover to fill the phone frame */}
          <img
            src={reel.cover}
            alt={reel.brand}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

          {/* Top — brand profile row */}
          <div className="absolute inset-x-3 top-8 flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-[image:var(--gradient-gold)] shrink-0" />
            <div className="text-xs text-white">
              <div className="font-semibold leading-tight">{reel.brand}</div>
              <div className="text-[10px] opacity-60">by Vysai</div>
            </div>
          </div>

          {/* Right — engagement pills */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 text-white">
            <Pill icon={<Heart size={14} />} label={reel.likes} />
            <Pill icon={<MessageCircle size={14} />} label={reel.comments} />
            <Pill icon={<Send size={14} />} label={reel.shares} />
          </div>

          {/* Bottom — caption + views + scrubber */}
          <div className="absolute inset-x-3 bottom-3 text-white">
            <p className="text-[10px] leading-tight text-white/70 line-clamp-2 mb-1.5 pr-8">
              {reel.caption}
            </p>
            <div className="text-[11px] font-medium opacity-80">{reel.views} views</div>
            <div className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-white/20">
              <motion.span
                className="block h-full w-1/3 bg-[image:var(--gradient-gold)]"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Centre play button (on hover) */}
          <button
            className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-[color:var(--primary-foreground)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-label="Play"
          >
            <Play size={18} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
        {icon}
      </div>
      <span className="text-[10px]">{label}</span>
    </div>
  );
}
