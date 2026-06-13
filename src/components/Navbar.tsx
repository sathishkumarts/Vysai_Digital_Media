import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/Vysailogo.png";
import { ThemeToggle } from "./ThemeToggle";
import { MagneticButton } from "./MagneticButton";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Reels", href: "#reels" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
        ref={menuRef}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 sm:px-6 transition-all duration-500 ${
            scrolled ? "glass-panel py-1 mx-3 sm:mx-4 md:mx-auto" : "bg-transparent py-1"
          }`}
          style={
            scrolled
              ? {
                  boxShadow:
                    "0 10px 40px -10px oklch(0 0 0 / .4), inset 0 -1px 0 color-mix(in oklab, var(--gold) 25%, transparent)",
                }
              : undefined
          }
        >
          {/* Logo */}
          <a href="#" className="flex items-center pl-1">
            <div
              style={{
                width: "140px",
                height: "60px",
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/40 bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] px-4 py-1.5 text-xs font-medium text-gold transition-all duration-300 hover:bg-[color-mix(in_oklab,var(--gold)_18%,transparent)] hover:border-[color:var(--gold)]/70 hover:shadow-[0_0_16px_-4px_var(--gold)]"
            >
              <span className="size-1.5 rounded-full bg-[color:var(--gold)] animate-pulse-gold" />
              Packages
            </a>
            <a
              href="https://wa.me/919894620389?text=Hi%20Vysai%20Digital%20Media!%20I'd%20like%20to%20get%20a%20free%20consultation%20and%20discuss%20growing%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <MagneticButton className="px-5 py-2 text-xs">Let's talk</MagneticButton>
            </a>
          </div>

          {/* Mobile Right: Theme + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              id="mobile-menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative h-10 w-10 rounded-full glass-panel grid place-items-center text-gold transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--gold)_12%,transparent)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 grid place-items-center"
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scaleY: 0.92 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -12, scaleY: 0.92 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
              className="mx-3 mt-2 rounded-2xl glass-panel overflow-hidden"
            >
              {/* Nav Links */}
              <nav className="flex flex-col px-2 pt-4 pb-2">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-muted-foreground transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] hover:text-foreground active:scale-[0.98]"
                  >
                    <span>{l.label}</span>
                    <span className="text-[color:var(--gold)] opacity-0 transition-opacity group-hover:opacity-100 text-xs">
                      →
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Divider */}
              <div className="mx-4 h-px bg-[color:var(--border)]" />

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 px-4 py-4">
                <a
                  href="#packages"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] px-4 py-3 text-sm font-medium text-gold transition-all duration-300 hover:bg-[color-mix(in_oklab,var(--gold)_18%,transparent)]"
                >
                  <span className="size-1.5 rounded-full bg-[color:var(--gold)] animate-pulse-gold" />
                  View Packages
                </a>
                <a
                  href="https://wa.me/919894620389?text=Hi%20Vysai%20Digital%20Media!%20I'd%20like%20to%20get%20a%20free%20consultation%20and%20discuss%20growing%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-[color:var(--primary-foreground)] transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
                >
                  Let's talk →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
