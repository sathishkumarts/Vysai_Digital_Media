import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Film,
  Code2,
  BarChart3,
  PenTool,
  Search,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Star,
  Zap,
} from "lucide-react";

import adsImg from "../assets/service_ads.png";
import seoImg from "../assets/service_seo.png";
import socialImg from "../assets/service_social.png";
import videoImg from "../assets/service_video.png";
import webImg from "../assets/service_web.png";
import brandingImg from "../assets/service_branding.png";

/* ─── Data ───────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "01",
    icon: Megaphone,
    title: "Meta & Google Ads",
    tagline: "ROI-Driven Paid Advertising",
    image: adsImg,
    color: "from-amber-500/20 to-orange-700/10",
    accent: "oklch(0.82 0.14 82)",
    blurb:
      "High-performance paid advertising campaigns engineered to generate leads and sales. We handle everything — audience targeting, ad creatives, A/B testing, and bid optimization — across Facebook, Instagram, and Google to deliver maximum ROI for your business.",
    deliverables: [
      "Meta Ads",
      "Google Ads",
      "Lead Generation",
      "Retargeting",
      "Ad Creatives",
      "A/B Testing",
    ],
    stats: [
      { value: "5×", label: "Average ROI" },
      { value: "60", label: "Days to Results" },
      { value: "↑340%", label: "Lead Growth" },
    ],
  },
  {
    id: "02",
    icon: Search,
    title: "SEO & Local Search",
    tagline: "Rank. Dominate. Convert.",
    image: seoImg,
    color: "from-emerald-500/20 to-teal-700/10",
    accent: "oklch(0.75 0.14 160)",
    blurb:
      "Rank on Google for searches like 'Best [your business] in Villupuram' with our proven SEO strategies. On-page optimization, local SEO, keyword targeting, and link building combine to drive organic traffic that actually converts into paying customers.",
    deliverables: [
      "On-Page SEO",
      "Local SEO",
      "Google Business",
      "Keyword Strategy",
      "Link Building",
      "Monthly Reports",
    ],
    stats: [
      { value: "#1", label: "Local Rankings" },
      { value: "3×", label: "Organic Traffic" },
      { value: "6mo", label: "Avg. Rank Time" },
    ],
  },
  {
    id: "03",
    icon: PenTool,
    title: "Social Media Management",
    tagline: "Build. Engage. Grow.",
    image: socialImg,
    color: "from-purple-500/20 to-pink-700/10",
    accent: "oklch(0.72 0.18 300)",
    blurb:
      "Full-service social media marketing for Instagram, Facebook, LinkedIn, and YouTube. We craft compelling content calendars, design scroll-stopping posts, write captions, engage your audience, and grow your brand's following consistently month after month.",
    deliverables: [
      "Content Calendar",
      "Post Design",
      "Caption Writing",
      "Community Management",
      "Story Creation",
      "Analytics Reports",
    ],
    stats: [
      { value: "30+", label: "Posts / Month" },
      { value: "↑200%", label: "Engagement Lift" },
      { value: "4", label: "Platforms Managed" },
    ],
  },
  {
    id: "04",
    icon: Film,
    title: "Video Editing & Reels",
    tagline: "Stop the Scroll. Start the Story.",
    image: videoImg,
    color: "from-red-500/20 to-orange-700/10",
    accent: "oklch(0.65 0.22 25)",
    blurb:
      "Professional video editing and short-form reel production that captures attention in the first 2 seconds. From product showcases to brand films, we produce cinematic content tailored for Instagram Reels, YouTube Shorts, and social media campaigns that go viral.",
    deliverables: [
      "Reels Production",
      "Brand Films",
      "Product Videos",
      "Color Grading",
      "Motion Graphics",
      "Subtitles & Captions",
    ],
    stats: [
      { value: "8–12", label: "Reels / Month" },
      { value: "↑5×", label: "View Count" },
      { value: "48hr", label: "Turnaround" },
    ],
  },
  {
    id: "05",
    icon: Code2,
    title: "Website Development",
    tagline: "Fast. SEO-Ready. Built to Convert.",
    image: webImg,
    color: "from-blue-500/20 to-cyan-700/10",
    accent: "oklch(0.72 0.18 230)",
    blurb:
      "Mobile-first, SEO-optimized websites that turn visitors into customers. From sleek landing pages to full e-commerce stores, we build digital experiences that reflect your brand, rank on search engines, and load in under 2 seconds on any device.",
    deliverables: [
      "Business Websites",
      "E-commerce Stores",
      "Landing Pages",
      "SEO Setup",
      "Speed Optimization",
      "Mobile Responsive",
    ],
    stats: [
      { value: "<2s", label: "Load Speed" },
      { value: "100", label: "PageSpeed Score" },
      { value: "∞", label: "Mobile Optimized" },
    ],
  },
  {
    id: "06",
    icon: BarChart3,
    title: "Branding & Graphic Design",
    tagline: "Identity That Commands Respect.",
    image: brandingImg,
    color: "from-yellow-500/20 to-amber-700/10",
    accent: "oklch(0.88 0.18 88)",
    blurb:
      "A strong brand is your most powerful business asset. We create complete visual identities — logos, brand guidelines, packaging, and marketing collateral — that make your business instantly recognizable, trusted, and premium in the eyes of your customers.",
    deliverables: [
      "Logo Design",
      "Brand Identity",
      "Social Media Design",
      "Packaging Design",
      "Business Cards",
      "Print Materials",
    ],
    stats: [
      { value: "100%", label: "Custom Design" },
      { value: "∞", label: "Revisions Included" },
      { value: "7d", label: "First Draft" },
    ],
  },
];

/* ─── Small helpers ──────────────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Section Header ─────────────────────────────────────── */
function ServicesHeader() {
  const { ref, inView } = useScrollReveal();
  return (
    <div ref={ref} className="mx-auto max-w-4xl text-center">
      <motion.div
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="mb-6 inline-flex items-center gap-2 rounded-full glass-panel px-5 py-2 text-[10px] uppercase tracking-[0.32em] text-gold"
      >
        <span className="size-1.5 rounded-full bg-[color:var(--gold)] animate-pulse-gold" />
        Our Services
      </motion.div>

      <motion.h2
        variants={fadeUp}
        custom={0.1}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="font-display text-balance text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl"
      >
        Everything Your Business
        <br />
        <span
          className="gold-text"
          style={{ backgroundImage: "var(--gradient-gold)" }}
        >
          Needs to Grow Online.
        </span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        custom={0.2}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="mt-6 text-balance text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto"
      >
        From Meta Ads and SEO to cinematic reels and conversion-optimised websites —
        Vysai Digital Media delivers complete digital marketing solutions for
        businesses across Villupuram and Tamil Nadu.
      </motion.p>

      {/* Trust badges */}
      <motion.div
        variants={fadeUp}
        custom={0.3}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        {[
          { icon: Star, label: "100% Client Satisfaction" },
          { icon: TrendingUp, label: "ROI-Focused Strategies" },
          { icon: Users, label: "Founder-Led Support" },
          { icon: Zap, label: "Fast Turnaround" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-full border border-[color:var(--gold)]/20 bg-[color-mix(in_oklab,var(--gold)_4%,transparent)] px-4 py-2 text-xs text-foreground/70"
          >
            <Icon size={13} className="text-gold" />
            {label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Service Card (full-bleed alternating layout) ────────── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const { ref, inView } = useScrollReveal();
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-3xl glass-panel grid grid-cols-1 lg:grid-cols-2 min-h-[520px] transition-all duration-700 ${
          hovered ? "shadow-[0_30px_80px_-20px_color-mix(in_oklab,var(--gold)_25%,transparent)]" : ""
        }`}
      >
        {/* Image side */}
        <div
          className={`relative overflow-hidden ${
            isEven ? "lg:order-1" : "lg:order-2"
          } min-h-[280px] lg:min-h-0`}
        >
          <motion.img
            src={service.image}
            alt={`${service.title} — Vysai Digital Media service`}
            className="absolute inset-0 h-full w-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            loading="lazy"
            decoding="async"
          />
          {/* Image overlay gradient */}
          <div
            className={`absolute inset-0 ${
              isEven
                ? "bg-gradient-to-r from-transparent to-[var(--card)]/80"
                : "bg-gradient-to-l from-transparent to-[var(--card)]/80"
            } lg:opacity-100`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/60 to-transparent lg:hidden" />

          {/* Service number badge */}
          <div className="absolute top-6 left-6 font-display text-[4rem] font-bold leading-none text-white/10 select-none">
            {service.id}
          </div>

          {/* Stats overlay */}
          <motion.div
            className="absolute bottom-6 left-6 right-6 flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex-1 rounded-2xl glass-panel p-3 text-center"
              >
                <div
                  className="font-display text-xl font-bold gold-text"
                  style={{ backgroundImage: "var(--gradient-gold)" }}
                >
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Content side */}
        <div
          className={`relative flex flex-col justify-center p-8 sm:p-10 lg:p-12 ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {/* Subtle bg glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(600px 400px at ${isEven ? "0%" : "100%"} 50%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 70%)`,
            }}
          />

          {/* Icon + tagline */}
          <div className="relative z-10 flex items-center gap-3 mb-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-gold ring-1 ring-[color:var(--gold)]/30">
              <Icon size={20} />
            </span>
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-medium">
              {service.tagline}
            </span>
          </div>

          {/* Title */}
          <h3 className="relative z-10 font-display text-3xl sm:text-4xl leading-tight tracking-tight">
            {service.title}
          </h3>

          {/* Description */}
          <p className="relative z-10 mt-4 text-base text-muted-foreground leading-relaxed">
            {service.blurb}
          </p>

          {/* Deliverables */}
          <div className="relative z-10 mt-6 flex flex-wrap gap-2">
            {service.deliverables.map((d) => (
              <span
                key={d}
                className="flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/20 bg-[color-mix(in_oklab,var(--gold)_5%,transparent)] px-3 py-1.5 text-[11px] text-foreground/80"
              >
                <CheckCircle2 size={11} className="text-gold shrink-0" />
                {d}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="relative z-10 mt-8">
            <a
              href="#contact"
              className="group/btn inline-flex items-center gap-2 rounded-full shine-sweep border border-[color:var(--gold)]/30 bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] px-5 py-3 text-sm font-medium text-gold hover:bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] hover:border-[color:var(--gold)]/50 transition-all duration-300"
            >
              Start with {service.title.split(" ")[0]}
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Gold border glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--gold) 35%, transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── CTA Banner ─────────────────────────────────────────── */
function ServicesCTA() {
  const { ref, inView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl glass-panel p-10 sm:p-14 text-center noise-overlay"
    >
      {/* Background radial */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
          <span className="size-1.5 rounded-full bg-[color:var(--gold)] animate-pulse-gold" />
          Ready to Grow?
        </div>
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-balance leading-tight">
          Let's Build Something{" "}
          <span
            className="gold-text"
            style={{ backgroundImage: "var(--gradient-gold)" }}
          >
            Remarkable.
          </span>
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground text-base">
          Book a free strategy consultation with our founder. We'll audit your
          current digital presence and show you exactly what's holding your
          business back.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full shine-sweep px-8 py-4 font-semibold text-sm text-[color:var(--primary-foreground)] transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_oklab,var(--gold)_50%,transparent)]"
            style={{
              background: "var(--gradient-gold)",
            }}
          >
            Get Free Consultation
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#packages"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 px-8 py-4 text-sm text-foreground/80 hover:border-[color:var(--gold)]/60 hover:text-gold transition-all duration-300"
          >
            View Packages
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Export ────────────────────────────────────────── */
export function Services() {
  return (
    <section id="services" className="relative py-32">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 0%, color-mix(in oklab, var(--gold) 6%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 space-y-20">
        {/* Header */}
        <ServicesHeader />

        {/* Service cards - alternating full layout */}
        <div className="space-y-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA Banner */}
        <ServicesCTA />
      </div>
    </section>
  );
}
