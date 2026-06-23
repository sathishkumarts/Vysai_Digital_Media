import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import logo from "@/assets/Vysailogo.png";
import { ThemeToggle } from "./ThemeToggle";
import { MagneticButton } from "./MagneticButton";

// Only Services has a dropdown — all others are plain anchor links
const PLAIN_LINKS = [
  { label: "Work",    href: "#work" },
  { label: "Reels",  href: "#reels" },
  { label: "Studio", href: "#studio" },
  { label: "FAQ's",  href: "#faq" },
  { label: "Contact",href: "#footer-contact" },
];

const SERVICES_DROPDOWN = [
  { label: "Meta & Google Ads",      desc: "Paid acquisition & lead gen",              href: "#services" },
  { label: "SEO & Local Search",     desc: "Google Business & organic rank",            href: "#services" },
  { label: "Social Media Mgt",       desc: "Full-scale brand posting & management",     href: "#services" },
  { label: "Video Reels & Editing",  desc: "Cinematic short-form content",              href: "#services" },
  { label: "Website Development",    desc: "Fast responsive sites & e-commerce",        href: "#services" },
  { label: "Branding & Graphics",    desc: "Complete visual identities",                href: "#services" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      closeAll();
      const target = document.querySelector(href);
      if (target) {
        const lenis = (window as any).lenis;
        if (lenis) {
          lenis.scrollTo(target);
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ marginTop: -30, opacity: 0 }}
        animate={{ marginTop: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
        ref={menuRef}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 sm:px-6 transition-all duration-500 ${
            scrolled ? "glass-panel py-1 mx-3 sm:mx-4 md:mx-auto" : "bg-transparent py-1"
          }`}
          style={scrolled ? {
            boxShadow: "0 10px 40px -10px oklch(0 0 0 / .4), inset 0 -1px 0 color-mix(in oklab, var(--gold) 25%, transparent)",
          } : undefined}
        >
          {/* Logo */}
          <a href="#" onClick={(e) => scrollToSection(e, "#")} className="flex items-center pl-1">
            <div
              style={{
                width: "140px", height: "60px",
                backgroundImage: `url(${logo})`,
                backgroundSize: "auto 110px",
                backgroundPosition: "center 42%",
                backgroundRepeat: "no-repeat",
                flexShrink: 0,
              }}
              role="img"
              aria-label="Vysai Digital Media"
            />
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Work — plain link */}
            <a
              href="#work"
              onClick={(e) => scrollToSection(e, "#work")}
              className="group relative inline-flex items-center px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Work
              <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 origin-left bg-[image:var(--gradient-gold)] transition-transform duration-500 group-hover:scale-x-100" />
            </a>

            {/* Services — only dropdown */}
            <div
              className="relative flex items-center self-stretch"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <a
                href="#services"
                onClick={(e) => scrollToSection(e, "#services")}
                className="group relative inline-flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Services
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${
                    servicesOpen ? "rotate-180 text-gold" : "text-muted-foreground/60"
                  }`}
                />
                <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 origin-left bg-[image:var(--gradient-gold)] transition-transform duration-500 group-hover:scale-x-100" />
              </a>

                {servicesOpen && (
                  <div className="absolute left-1/2 top-full z-50 pt-2 w-[290px] -translate-x-1/2">
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-2xl p-3"
                      style={{
                        background: "color-mix(in oklab, var(--popover) 97%, transparent)",
                        backdropFilter: "blur(24px) saturate(160%)",
                        WebkitBackdropFilter: "blur(24px) saturate(160%)",
                        border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)",
                        boxShadow: "0 24px 64px -12px oklch(0 0 0 / .7), 0 0 0 1px oklch(0 0 0 / .3), inset 0 1px 0 color-mix(in oklab, var(--gold) 15%, transparent)",
                      }}
                    >
                      {SERVICES_DROPDOWN.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => scrollToSection(e, item.href)}
                          className="group/item flex flex-col rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--gold)_8%,transparent)]"
                        >
                          <span className="flex items-center justify-between text-[13px] font-semibold text-foreground group-hover/item:text-gold transition-colors">
                            {item.label}
                            <ArrowUpRight
                              size={12}
                              className="opacity-0 translate-x-1 -translate-y-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:translate-y-0 text-gold"
                            />
                          </span>
                          <span className="mt-0.5 text-[11px] text-muted-foreground">
                            {item.desc}
                          </span>
                        </a>
                      ))}
                    </motion.div>
                  </div>
                )}
            </div>

            {/* Remaining plain links */}
            {PLAIN_LINKS.slice(1).map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => scrollToSection(e, l.href)}
                className="group relative inline-flex items-center px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 origin-left bg-[image:var(--gradient-gold)] transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#packages"
              onClick={(e) => scrollToSection(e, "#packages")}
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/40 bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] px-4 py-1.5 text-xs font-medium text-gold transition-all duration-300 hover:bg-[color-mix(in_oklab,var(--gold)_18%,transparent)] hover:border-[color:var(--gold)]/70 hover:shadow-[0_0_16px_-4px_var(--gold)]"
            >
              <span className="size-1.5 rounded-full bg-[color:var(--gold)] animate-pulse-gold" />
              Packages
            </a>
            <a href="#footer-contact" onClick={(e) => scrollToSection(e, "#footer-contact")} className="inline-block">
              <MagneticButton className="px-5 py-2 text-xs">Let's talk</MagneticButton>
            </a>
          </div>

          {/* Mobile: Theme + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              id="mobile-menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative h-10 w-10 rounded-full glass-panel grid place-items-center text-gold transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--gold)_12%,transparent)]"
            >
                <span className="absolute inset-0 grid place-items-center">
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </span>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scaleY: 0.92 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top", isolation: "isolate" }}
              className="mx-3 mt-2 rounded-2xl glass-panel-mobile"
            >
              {/* Inner wrapper handles overflow — never put overflow-hidden on the backdrop-filter element */}
              <div className="overflow-hidden rounded-2xl">
                <nav className="flex flex-col px-2 pt-4 pb-2">
                  {/* Work */}
                  <a
                    href="#work"
                    onClick={(e) => scrollToSection(e, "#work")}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-muted-foreground transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] hover:text-foreground"
                  >
                    Work <span className="text-gold text-xs opacity-60">→</span>
                  </a>

                  {/* Services — with accordion */}
                  <div className="flex flex-col">
                    <button
                      onClick={() => setServicesOpen((v) => !v)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-muted-foreground transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] hover:text-foreground"
                    >
                      Services
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${servicesOpen ? "rotate-180 text-gold" : "text-muted-foreground/60"}`}
                      />
                    </button>
                    {servicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mx-2 mb-2 rounded-xl bg-[color-mix(in_oklab,var(--gold)_4%,transparent)] p-2 flex flex-col gap-1">
                          {SERVICES_DROPDOWN.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              onClick={(e) => scrollToSection(e, sub.href)}
                              className="rounded-lg px-3 py-2.5 hover:bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] transition-all duration-200"
                            >
                              <div className="text-sm font-semibold text-foreground">{sub.label}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{sub.desc}</div>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Remaining plain links */}
                  {PLAIN_LINKS.slice(1).map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      onClick={(e) => scrollToSection(e, l.href)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-muted-foreground transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] hover:text-foreground"
                    >
                      {l.label} <span className="text-gold text-xs opacity-60">→</span>
                    </a>
                  ))}
                </nav>

                <div className="mx-4 h-px bg-[color:var(--border)]" />

                <div className="flex flex-col gap-3 px-4 py-4">
                  <a
                    href="#packages"
                    onClick={(e) => scrollToSection(e, "#packages")}
                    className="flex items-center justify-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] px-4 py-3 text-sm font-medium text-gold transition-all duration-300 hover:bg-[color-mix(in_oklab,var(--gold)_18%,transparent)]"
                  >
                    <span className="size-1.5 rounded-full bg-[color:var(--gold)] animate-pulse-gold" />
                    View Packages
                  </a>
                  <a
                    href="#footer-contact"
                    onClick={(e) => scrollToSection(e, "#footer-contact")}
                    className="flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-[color:var(--primary-foreground)] transition-all duration-300 hover:opacity-90"
                    style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
                  >
                    Let's talk →
                  </a>
                </div>
              </div>{/* end inner overflow wrapper */}
            </motion.div>
          )}
      </motion.header>
    </>
  );
}
