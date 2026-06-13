import { motion } from "framer-motion";

const ITEMS = [
  "Meta Ads Management",
  "Google Ads Experts",
  "Social Media Marketing",
  "SEO Services",
  "Video Editing & Reels",
  "Branding & Graphic Design",
  "Website Development",
  "Lead Generation",
  "Performance Marketing",
  "Content Creation",
];

export function Marquee() {
  return (
    <section className="relative border-y border-[color:var(--border)] py-6 overflow-hidden">
      <div className="flex gap-12 whitespace-nowrap">
        <motion.div
          className="flex shrink-0 gap-12 pr-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-display text-3xl text-muted-foreground"
            >
              {s}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
