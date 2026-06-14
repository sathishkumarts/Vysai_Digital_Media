import { motion } from "framer-motion";
import { Check, Zap, Star, Crown } from "lucide-react";
import { SectionHeader } from "./Portfolio";

const PACKAGES = [
  {
    id: "basic",
    badge: "Entry Hook",
    title: "Basic",
    price: "₹6,999",
    period: "/ month",
    tagline: "Perfect to get started and build your presence.",
    icon: Zap,
    featured: false,
    accentClass: "text-muted-foreground",
    features: [
      "10–12 Posters",
      "2 Videos",
      "Instagram + Facebook Posting",
      "Basic Captions",
      "Basic Design Support",
    ],
    missing: ["AD Campaigns", "Reports"],
    cta: "Choose Basic",
  },
  {
    id: "premium",
    badge: "Most Popular",
    title: "Premium",
    price: "₹19,999",
    period: "/ month",
    tagline: "Full-service creative & growth for serious brands.",
    icon: Crown,
    featured: true,
    accentClass: "text-gold",
    features: [
      "6–8 Reels / Videos",
      "12–16 Posters",
      "Full Ad Campaign Management",
      "Weekly Content Strategy",
      "Competitor Analysis",
      "Detailed Report",
      "Festival Complimentary Posters",
      "Priority Support",
    ],
    missing: [],
    cta: "Go Premium",
  },
  {
    id: "standard",
    badge: "Optimal Choice",
    title: "Standard",
    price: "₹11,999",
    period: "/ month",
    tagline: "The complete package for growing brands.",
    icon: Star,
    featured: false,
    accentClass: "text-muted-foreground",
    features: [
      "10–12 Posters",
      "4–6 Reels / Videos",
      "Caption + Hashtag Strategy",
      "Full Page Management",
      "Basic Ad Setup (Client pays ad budget)",
      "Basic Report",
      "Festival Complimentary Poster",
    ],
    missing: [],
    cta: "Choose Standard",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

function goToContact(planId: string) {
  // Always scroll the contact section into view — works even if hash is already set
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });

  // Update the hash so LeadForm can pre-select the plan
  // Use replaceState first to reset any existing same hash, then set it
  history.replaceState(null, "", "#");
  window.location.hash = `contact-${planId}`;
}

export function Packages() {
  return (
    <section id="packages" className="relative py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, color-mix(in oklab, var(--gold) 10%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Packages"
          title="Pick your growth plan."
          sub="Transparent pricing. No hidden costs. Every rupee working for your brand."
        />

        {/* Cards grid — Premium in center, larger */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {PACKAGES.map((pkg, i) => {
            const Icon = pkg.icon;
            const isFeatured = pkg.featured;
            return (
              <motion.div
                key={pkg.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className={`relative flex flex-col rounded-3xl overflow-hidden transition-transform duration-500 hover:-translate-y-1 ${
                  isFeatured
                    ? "glass-panel gold-border shine-sweep lg:scale-[1.04] z-10"
                    : "glass-panel"
                }`}
              >
                {/* Featured glow ring */}
                {isFeatured && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in oklab, var(--gold) 40%, transparent), transparent 70%)",
                    }}
                  />
                )}

                {/* Card Header */}
                <div
                  className={`relative px-8 pt-8 pb-6 ${
                    isFeatured
                      ? "border-b border-[color:var(--gold)]/20"
                      : "border-b border-[color:var(--border)]"
                  }`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] ring-1 ${
                        isFeatured
                          ? "bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-gold ring-[color:var(--gold)]/40"
                          : "bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] text-muted-foreground ring-[color:var(--border)]"
                      }`}
                    >
                      <Icon size={10} />
                      {pkg.badge}
                    </span>

                    {isFeatured && (
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-[color:var(--primary-foreground)]">
                        <Crown size={14} />
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div
                    className={`font-display text-3xl tracking-tight ${
                      isFeatured ? "gold-text" : ""
                    }`}
                    style={isFeatured ? { backgroundImage: "var(--gradient-gold)" } : {}}
                  >
                    {pkg.title}
                  </div>

                  {/* Price */}
                  <div className="mt-4 flex items-end gap-1">
                    <span
                      className={`font-display text-5xl font-semibold leading-none ${
                        isFeatured ? "gold-text" : "text-foreground"
                      }`}
                      style={isFeatured ? { backgroundImage: "var(--gradient-gold)" } : {}}
                    >
                      {pkg.price}
                    </span>
                    <span className="mb-1 text-sm text-muted-foreground">{pkg.period}</span>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-col flex-1 px-8 py-7">
                  <ul className="space-y-3 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            isFeatured
                              ? "bg-[color-mix(in_oklab,var(--gold)_20%,transparent)] text-gold ring-1 ring-[color:var(--gold)]/30"
                              : "bg-[color-mix(in_oklab,var(--foreground)_10%,transparent)] text-foreground/70 ring-1 ring-[color:var(--border)]"
                          }`}
                        >
                          <Check size={11} />
                        </span>
                        <span className="text-foreground/85">{f}</span>
                      </li>
                    ))}
                    {pkg.missing.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm opacity-35">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ring-1 ring-[color:var(--border)] text-muted-foreground line-through">
                          ✕
                        </span>
                        <span className="line-through text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => goToContact(pkg.id)}
                      className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-500 ${
                        isFeatured
                          ? "bg-[image:var(--gradient-gold)] text-[color:var(--primary-foreground)] shadow-[0_0_30px_-6px_var(--gold)] hover:shadow-[0_0_50px_-4px_var(--gold)]"
                          : "border border-[color:var(--border)] bg-[color-mix(in_oklab,var(--card)_60%,transparent)] text-foreground hover:border-[color:var(--gold)]/40 hover:bg-[color-mix(in_oklab,var(--gold)_8%,var(--card))]"
                      }`}
                    >
                      <span className="relative z-10">{pkg.cta}</span>
                      {isFeatured && (
                        <span className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-gold)] opacity-0 transition-opacity duration-500 group-hover:opacity-30" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
