import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  client: string;
  tag: string;
  metrics: { label: string; value: string }[];
  image: string;
  accent: string;
  visible?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "Turning Local Attention Into Brand Growth",
    client: "Oh My Kulfi · Premium Kulfi Brand",
    tag: "Content Strategy · Reels · Social Media Management",
    metrics: [
      { label: "Engaging Reels Created", value: "20+" },
      { label: "Custom Social Media Creatives", value: "20+" },
      { label: "Active Brand Partnership", value: "2 Months" },
      { label: "Customer & Franchise Response", value: "Positive" },
    ],
    image: "/src/assets/oh_my_kulfi.png",
    accent: "38 0.15 45",
  },
  {
    title: "From street to screen",
    client: "Volt Athletics",
    tag: "Performance · Video · Paid Social",
    metrics: [
      { label: "ROAS", value: "8.7×" },
      { label: "CAC", value: "-42%" },
      { label: "Followers", value: "+ 184k" },
    ],
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
    accent: "62 0.18 30",
  },
  {
    title: "Hospitality, reimagined",
    client: "Solène Resorts",
    tag: "Identity · Web · Storytelling",
    metrics: [
      { label: "Bookings", value: "+ 67%" },
      { label: "Avg. stay", value: "4.1 nights" },
      { label: "PR mentions", value: "120+" },
    ],
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80",
    accent: "78 0.14 200",
    visible: false,
  },
  {
    title: "A new flavor of cinematic",
    client: "Noir & Bean Coffee",
    tag: "Reels · Brand Films · Editorial",
    metrics: [
      { label: "Views", value: "27M" },
      { label: "Saves", value: "412k" },
      { label: "Stores opened", value: "9" },
    ],
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1600&q=80",
    accent: "55 0.11 50",
    visible: false,
  },
];

export function Portfolio() {
  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Our Portfolio"
          title="Campaigns that moved the needle."
          sub="Real campaigns. Real results. Here's how we've helped businesses across Tamil Nadu generate more leads, more sales, and more visibility online."
        />
      </div>

      <div className="mt-20 space-y-32">
        {PROJECTS.filter((p) => p.visible !== false).map((p, i) => (
          <ProjectScene key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectScene({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const reversed = index % 2 === 1;

  return (
    <div ref={ref} className="relative">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-12">
        <motion.div
          style={{ y: textY }}
          className={`md:col-span-5 ${reversed ? "md:order-2" : ""}`}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
            0{index + 1} / Vysai
          </div>
          <h3 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{project.title}</h3>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {project.client}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{project.tag}</p>

          <div
            className={`mt-8 grid gap-4 border-t border-[color:var(--border)] pt-6 grid-cols-2 ${
              project.metrics.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"
            }`}
          >
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div
                  className="font-display text-2xl gold-text"
                  style={{ backgroundImage: "var(--gradient-gold)" }}
                >
                  {m.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <button className="group mt-8 inline-flex items-center gap-2 text-sm text-foreground">
            <span className="relative">
              View case study
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[image:var(--gradient-gold)] transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <ArrowUpRight
              size={16}
              className="text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </motion.div>

        <div className={`md:col-span-7 ${reversed ? "md:order-1" : ""}`}>
          <ProjectVisual project={project} imageY={imageY} imageScale={imageScale} />
        </div>
      </div>
    </div>
  );
}

function ProjectVisual({
  project,
  imageY,
  imageScale,
}: {
  project: Project;
  imageY: any;
  imageScale: any;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-ny * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(nx * 8).toFixed(2)}deg`);
    el.style.setProperty("--spot-x", `${((nx + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${((ny + 0.5) * 100).toFixed(1)}%`);
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      className="[perspective:1400px]"
      style={{ ["--rx" as any]: "0deg", ["--ry" as any]: "0deg" }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl glass-panel gold-border transition-transform duration-500 will-change-transform"
        style={{
          transform: "rotateX(var(--rx)) rotateY(var(--ry))",
          boxShadow: "0 40px 100px -30px oklch(0 0 0 / .7)",
        }}
      >
        <motion.img
          src={project.image}
          alt={project.client}
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          loading="lazy"
        />
        {/* spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(360px 360px at var(--spot-x,50%) var(--spot-y,50%), color-mix(in oklab, var(--gold) 35%, transparent), transparent 70%)",
            mixBlendMode: "soft-light",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[oklch(0.08_0.01_60/0.85)] to-transparent" />
        <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-xs uppercase tracking-[0.25em] text-white/80">
          <span>{project.client.split("·")[0]}</span>
          <span className="text-gold">Vysai · 0{(Math.random() * 9) | (0 + 1)}</span>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="max-w-3xl">
      <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">/ {eyebrow}</div>
      <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-6xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-muted-foreground md:text-lg">{sub}</p>
    </div>
  );
}

export { SectionHeader };
