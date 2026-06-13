import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "./Portfolio";

const QUOTES = [
  {
    q: "Vysai Digital Media completely transformed our online presence. Within 2 months of their Meta Ads campaign, we saw a 5× increase in enquiries. Best digital marketing agency in Villupuram, no doubt.",
    name: "Ramesh Kumar",
    role: "Owner, RK Auto Parts · Villupuram",
  },
  {
    q: "Their social media management brought real engagement — not just likes. We went from 800 followers to over 12,000 in four months. Our brand now looks as good as any national chain.",
    name: "Priya Suresh",
    role: "Director, Priya's Beauty Studio · Tamil Nadu",
  },
  {
    q: "The Google Ads team at Vysai generated 80+ qualified leads in our first month. Our sales pipeline has never looked this healthy. Highly recommended for any business serious about growth.",
    name: "Senthil Nathan",
    role: "Founder, SN Constructions · Cuddalore",
  },
  {
    q: "We'd spent months trying different agencies with zero results. Vysai understood our local market immediately and delivered a website + SEO strategy that actually ranks on Google.",
    name: "Dr. Kavitha Rajan",
    role: "CEO, KR Healthcare · Villupuram",
  },
  {
    q: "Their video reels for our product launch went viral locally — 3 lakh views in the first week. The ROI on content marketing alone justified our entire annual marketing budget.",
    name: "Arun Krishnan",
    role: "Founder, AK Textiles · Tamil Nadu",
  },
];

export function Testimonials() {
  const row = [...QUOTES, ...QUOTES];
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Client Success Stories"
          title="Real results from real businesses across Tamil Nadu."
          sub=""
        />
      </div>

      <div className="mt-16 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[color:var(--background)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[color:var(--background)] to-transparent" />

        <motion.div
          className="flex gap-6 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {row.map((q, i) => (
            <article
              key={i}
              className="group relative w-[380px] shrink-0 rounded-3xl glass-panel p-8"
            >
              <Quote className="text-gold" size={22} />
              <p className="mt-5 font-display text-xl leading-snug">"{q.q}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-[color:var(--border)] pt-5">
                <div className="h-9 w-9 rounded-full bg-[image:var(--gradient-gold)]" />
                <div>
                  <div className="text-sm font-medium">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
