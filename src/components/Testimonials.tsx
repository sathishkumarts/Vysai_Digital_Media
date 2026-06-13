import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const x = useMotionValue(0);
  const activeAnimationRef = useRef<any>(null);

  // Repeat the quotes 3 times for a seamless infinite scroll loop
  const row = [...QUOTES, ...QUOTES, ...QUOTES];

  const startAutoScroll = (currentX: number, totalWidth: number, offsetWidth: number) => {
    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop();
    }

    const oneThird = totalWidth / 3;
    const targetX = -oneThird * 2;

    let startX = currentX;
    // Wrap position back to the active middle loop section if it goes out of bounds
    if (startX > -oneThird) {
      startX = startX - oneThird;
    } else if (startX < -oneThird * 2) {
      startX = startX + oneThird;
    }

    x.set(startX);

    const distance = Math.abs(startX - targetX);
    const speed = 25; // Pixels per second
    const duration = distance / speed;

    activeAnimationRef.current = animate(x, targetX, {
      ease: "linear",
      duration: duration,
      onComplete: () => {
        // Loop back seamlessly
        startAutoScroll(-oneThird, totalWidth, offsetWidth);
      },
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.scrollWidth;
        const offsetWidth = containerRef.current.offsetWidth;
        setConstraints({
          left: -(totalWidth - offsetWidth),
          right: 0,
        });

        startAutoScroll(x.get(), totalWidth, offsetWidth);
      }
    };

    const timeout = setTimeout(handleResize, 150);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      if (activeAnimationRef.current) {
        activeAnimationRef.current.stop();
      }
    };
  }, []);

  const handleDragStart = () => {
    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop();
    }
  };

  const handleDragEnd = () => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.scrollWidth;
      const offsetWidth = containerRef.current.offsetWidth;
      // Wait 1.5s after drag ends, then resume auto scroll
      setTimeout(() => {
        startAutoScroll(x.get(), totalWidth, offsetWidth);
      }, 1500);
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Client Success Stories"
          title="Real results from real businesses across Tamil Nadu."
          sub="Drag, swipe, or let it scroll to browse customer testimonials."
        />
      </div>

      <div className="mt-16 relative cursor-grab active:cursor-grabbing">
        {/* Left & Right fading overlays at screen boundaries */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[color:var(--background)] to-transparent hidden sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[color:var(--background)] to-transparent hidden sm:block" />

        <div className="w-full overflow-hidden" ref={containerRef}>
          <motion.div
            drag="x"
            dragConstraints={constraints}
            style={{
              x,
              paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2))",
              paddingRight: "max(1.5rem, calc((100vw - 1280px) / 2))",
            }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="flex gap-6 w-max will-change-transform"
          >
            {row.map((q, i) => (
              <article
                key={i}
                className="group relative w-[340px] sm:w-[380px] shrink-0 rounded-3xl glass-panel p-8 select-none"
              >
                <Quote className="text-gold" size={22} />
                <p className="mt-5 font-display text-lg sm:text-xl leading-snug">"{q.q}"</p>
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
      </div>
    </section>
  );
}
