import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Film, Code2, BarChart3, PenTool, Search, Plus } from "lucide-react";
import { SectionHeader } from "./Portfolio";

const SERVICES = [
  {
    icon: Megaphone,
    title: "Meta & Google Ads",
    blurb:
      "High-ROI paid advertising campaigns on Facebook, Instagram, and Google. We manage your entire ad funnel — from audience targeting to A/B testing — to maximize leads and sales for businesses across Villupuram and Tamil Nadu.",
    deliverables: ["Meta Ads", "Google Ads", "Lead Generation", "Retargeting", "Ad Creatives"],
  },
  {
    icon: Search,
    title: "SEO & Local Search",
    blurb:
      "Rank on Google for searches like 'Best [your business] in Villupuram' with our proven SEO strategies. We handle on-page optimization, local SEO, keyword targeting, and link building to drive organic traffic that converts.",
    deliverables: [
      "On-Page SEO",
      "Local SEO",
      "Google Business",
      "Keyword Strategy",
      "Link Building",
    ],
  },
  {
    icon: PenTool,
    title: "Social Media Management",
    blurb:
      "Full-service social media marketing for Instagram, Facebook, LinkedIn, and YouTube. We craft compelling content calendars, manage posting schedules, engage your audience, and grow your brand's following consistently.",
    deliverables: [
      "Content Calendar",
      "Post Design",
      "Caption Writing",
      "Community Management",
      "Analytics",
    ],
  },
  {
    icon: Film,
    title: "Video Editing & Reels",
    blurb:
      "Professional video editing and short-form reel production that stops the scroll. From product showcases to brand films, we produce cinematic content tailored for Instagram Reels, YouTube Shorts, and social media campaigns.",
    deliverables: [
      "Reels Production",
      "Brand Films",
      "Product Videos",
      "Color Grading",
      "Motion Graphics",
    ],
  },
  {
    icon: Code2,
    title: "Website Development",
    blurb:
      "Fast, SEO-optimized, mobile-first websites built to convert visitors into customers. From landing pages to full e-commerce stores, we build digital experiences that reflect your brand and rank on search engines.",
    deliverables: [
      "Business Websites",
      "E-commerce",
      "Landing Pages",
      "SEO Setup",
      "Speed Optimization",
    ],
  },
  {
    icon: BarChart3,
    title: "Branding & Graphic Design",
    blurb:
      "A strong brand is your most valuable business asset. We create complete visual identities — logos, brand guidelines, packaging, and marketing collateral — that make your business instantly recognizable and trusted.",
    deliverables: [
      "Logo Design",
      "Brand Identity",
      "Social Media Design",
      "Packaging",
      "Print Materials",
    ],
  },
];

export function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Our Services"
          title="Everything your business needs to grow online."
          sub="From Meta Ads and SEO to video reels and website development — Vysai Digital Media delivers complete digital marketing solutions for businesses in Villupuram and across Tamil Nadu."
        />

        <div className="mt-16 grid gap-3 md:grid-cols-2">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const isOpen = open === i;
            return (
              <div
                key={s.title}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group relative overflow-hidden rounded-2xl glass-panel p-7 text-left transition-colors hover:bg-[color-mix(in_oklab,var(--gold)_6%,var(--card))] cursor-pointer"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-gold ring-1 ring-[color:var(--gold)]/30">
                      <Icon size={18} />
                    </span>
                    <div>
                      <div className="font-display text-2xl">{s.title}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        0{i + 1}
                      </div>
                    </div>
                  </div>
                  <Plus
                    size={18}
                    className={`mt-2 text-gold transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-5 max-w-xl text-sm text-muted-foreground md:text-base">
                        {s.blurb}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {s.deliverables.map((d) => (
                          <span
                            key={d}
                            className="rounded-full border border-[color:var(--gold)]/25 px-3 py-1 text-xs text-foreground/80"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px 200px at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--gold) 22%, transparent), transparent 60%)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
