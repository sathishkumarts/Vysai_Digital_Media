import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What digital marketing services does Vysai offer in Villupuram?",
    a: "Vysai Digital Media offers a complete range of digital marketing services including Meta Ads (Facebook & Instagram), Google Ads, SEO, social media management, content creation, video editing & reels, branding & graphic design, website development, and lead generation — all managed in-house from our Villupuram studio.",
  },
  {
    q: "How much does digital marketing cost for my business?",
    a: "Our packages start from ₹6,999/month for social media management and go up to ₹19,999/month for full-service digital marketing including ads, content, and reporting. We also offer custom plans based on your goals. Every engagement begins with a free consultation call.",
  },
  {
    q: "How soon will I see results from digital marketing?",
    a: "Paid ads (Meta & Google) typically show measurable results within 15–30 days. SEO takes 60–90 days to build momentum but delivers long-term sustainable traffic. Social media growth is visible within 30–45 days. We set realistic expectations upfront and share weekly performance reports.",
  },
  {
    q: "Do you work with small businesses and startups in Villupuram?",
    a: "Absolutely. We work with businesses of all sizes — from local shops and startups in Villupuram, Cuddalore, and Pondicherry to established enterprises. Our flexible packages are designed to deliver strong ROI at every budget level.",
  },
  {
    q: "Which industries do you specialize in?",
    a: "We work with retail, healthcare, education, real estate, hospitality, food & beverage, textiles, automobile, e-commerce, and professional services. If you have customers, we can help you reach them. Our strategies are tailored to your specific industry and local market.",
  },
  {
    q: "Is all the work done in-house or outsourced?",
    a: "100% in-house. Our team in Villupuram handles everything — strategy, copywriting, graphic design, video editing, ad management, SEO, and website development. This means faster turnarounds, consistent quality, and direct communication throughout.",
  },
  {
    q: "How do I get started with Vysai Digital Media?",
    a: "Simple — click the 'Get Free Consultation' button, share a few details about your business, and we'll schedule a free 30-minute strategy call. No commitment required. We'll audit your current digital presence and recommend the best plan to grow your business.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
            / Frequently asked
          </div>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-6xl">
            Got questions? <br />
            <span
              className="italic font-light gold-text"
              style={{ backgroundImage: "var(--gradient-gold)" }}
            >
              We've got answers.
            </span>
          </h2>
          <p className="mt-6 max-w-sm text-muted-foreground">
            Everything business owners in Villupuram ask before working with us. Still have
            questions? Reach out — we respond within 24 hours.
          </p>
        </div>

        <div className="md:col-span-7">
          <ul className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-gold"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-gold">
                        0{i + 1}
                      </span>
                      <span className="font-display text-xl md:text-2xl leading-snug">
                        {item.q}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0 grid size-9 place-items-center rounded-full border border-[color:var(--border)] text-gold"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pl-10 pr-12 text-muted-foreground max-w-2xl">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
