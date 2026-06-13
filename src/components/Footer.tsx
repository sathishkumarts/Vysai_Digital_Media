import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/Vysailogo.png";
import { MagneticButton } from "./MagneticButton";
import { ArrowUpRight, MapPin, Phone, Mail, ExternalLink, Play } from "lucide-react";

const TN_CITIES = [
  "Villupuram?",
  "Salem?",
  "Chennai?",
  "Cuddalore?",
  "Madurai?",
  "Coimbatore?",
  "Trichy?",
  "Puducherry?",
  "Vellore?",
  "Tirunelveli?",
];

/* ── CTA Strip with rotating city ─────────────────── */
function CtaStrip() {
  const [cityIdx, setCityIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCityIdx((i) => (i + 1) % TN_CITIES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10 mb-12 md:mb-16">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold mb-4">
          / Free Consultation — No Commitment
        </div>
        <h2
          className="font-display leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(2rem,5vw,4rem)" }}
        >
          Ready to grow your <br />
          business in{" "}
          <span
            className="relative inline-block overflow-hidden align-bottom"
            style={{ height: "1.25em", minWidth: "12ch", verticalAlign: "bottom" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={cityIdx}
                className="gold-text font-display italic font-light absolute left-0 bottom-0 whitespace-nowrap"
                style={{ backgroundImage: "var(--gradient-gold)", paddingRight: "0.25em" }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-110%", opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {TN_CITIES[cityIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-end gap-4">
        <a
          href="https://wa.me/919894620389?text=Hi%20Vysai%20Digital%20Media!%20I'd%20like%20to%20get%20a%20free%20consultation%20and%20discuss%20growing%20my%20business."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <MagneticButton className="w-full sm:w-auto justify-center">
            Get Free Consultation <ArrowUpRight size={16} />
          </MagneticButton>
        </a>
        <MagneticButton
          variant="ghost"
          className="w-full sm:w-auto justify-center"
          onClick={() =>
            window.open(
              "https://drive.google.com/drive/folders/1bPVUwI1Ta6qO0GzHb7tYdNPhvERz0h0u?usp=sharing",
              "_blank",
              "noopener,noreferrer",
            )
          }
        >
          <Play size={14} className="text-gold" />
          View Our Works
          <ExternalLink size={14} style={{ opacity: 0.8 }} />
        </MagneticButton>
      </div>
    </div>
  );
}

/* ── Social SVG Icons ─────────────────────────────── */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/* ── Main Footer ──────────────────────────────────── */
export function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-20 overflow-hidden border-t border-[color:var(--border)]"
    >
      {/* Gold glow */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in oklab, var(--gold) 20%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* ── CTA Strip ── */}
        <CtaStrip />

        {/* ── 5-Column Footer Grid ── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 border-t pt-10"
          style={{ borderColor: "color-mix(in oklab, var(--border) 100%, transparent)" }}
        >
          {/* Col 1 — Brand */}
          <div
            className="footer-brand-col"
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Logo */}
            <div
              style={{
                width: "140px",
                height: "58px",
                backgroundImage: `url(${logo})`,
                backgroundSize: "auto 100px",
                backgroundPosition: "center 42%",
                backgroundRepeat: "no-repeat",
                flexShrink: 0,
              }}
              role="img"
              aria-label="Vysai Digital Media"
            />
            <p
              style={{
                maxWidth: "260px",
                fontSize: "0.85rem",
                lineHeight: 1.6,
                color: "var(--muted-foreground)",
              }}
            >
              Villupuram's leading digital marketing agency — helping local businesses across Tamil
              Nadu grow online.
            </p>
          </div>

          {/* Col 2 — Services */}
          <FootCol
            title="Services"
            links={[
              { label: "Meta Ads", href: "#services" },
              { label: "Google Ads", href: "#services" },
              { label: "SEO", href: "#services" },
              { label: "Social Media", href: "#services" },
              { label: "Video Reels", href: "#reels" },
              { label: "Website Dev", href: "#services" },
            ]}
          />

          {/* Col 3 — Company */}
          <FootCol
            title="Company"
            links={[
              { label: "Our Work", href: "#work" },
              { label: "Packages", href: "#packages" },
              { label: "Studio", href: "#studio" },
              { label: "Contact", href: "#contact" },
            ]}
          />

          {/* Col 4 — Connect */}
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Connect
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <SocialLink
                href="https://www.instagram.com/vysai_digital_media/"
                icon={<InstagramIcon size={14} />}
                label="@vysai_digital_media"
                hoverColor="#E1306C"
              />
              <SocialLink
                href="https://www.youtube.com/channel/UCENfe4WV8ja7MXXt3VjDYkw"
                icon={<YouTubeIcon size={14} />}
                label="Vysai Digital Media"
                hoverColor="#FF0000"
              />
              <SocialLink
                href="https://www.facebook.com/profile.php?id=61568861188454"
                icon={<FacebookIcon size={14} />}
                label="Vysai Digital Media"
                hoverColor="#1877F2"
              />
            </div>
          </div>

          {/* Col 5 — Contacts */}
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Contacts
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.6rem",
                  fontSize: "0.82rem",
                  color: "var(--muted-foreground)",
                }}
              >
                <MapPin
                  size={14}
                  style={{ marginTop: "2px", flexShrink: 0, color: "var(--gold)" }}
                />
                <span>Villupuram, Tamil Nadu, India</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.6rem",
                  fontSize: "0.82rem",
                  color: "var(--muted-foreground)",
                }}
              >
                <Phone
                  size={14}
                  style={{ marginTop: "2px", flexShrink: 0, color: "var(--gold)" }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                  <a
                    className="tap-sm"
                    href="tel:+919894620389"
                    style={{ display: "block", color: "inherit", textDecoration: "none" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--gold)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)")
                    }
                  >
                    +91 98946 20389
                  </a>
                  <a
                    className="tap-sm"
                    href="tel:+916385421076"
                    style={{ display: "block", color: "inherit", textDecoration: "none" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--gold)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)")
                    }
                  >
                    +91 63854 21076
                  </a>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.6rem",
                  fontSize: "0.82rem",
                  color: "var(--muted-foreground)",
                }}
              >
                <Mail size={14} style={{ marginTop: "2px", flexShrink: 0, color: "var(--gold)" }} />
                <a
                  className="tap-sm"
                  href="mailto:vysaidigitalmedia@gmail.com"
                  style={{ color: "inherit", textDecoration: "none" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--gold)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)")
                  }
                >
                  vysaidigitalmedia@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            borderTop: "1px solid color-mix(in oklab, var(--border) 100%, transparent)",
            paddingTop: "1.5rem",
            fontSize: "0.75rem",
            color: "var(--muted-foreground)",
          }}
        >
          <div>© {new Date().getFullYear()} Vysai Digital Media · All rights reserved.</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--gold)",
                display: "inline-block",
              }}
            />
            Villupuram, Tamil Nadu, India
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Helper: Social Link Row ── */
function SocialLink({
  href,
  icon,
  label,
  hoverColor,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  hoverColor: string;
}) {
  return (
    <a
      className="tap-sm"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.82rem",
        color: "var(--muted-foreground)",
        textDecoration: "none",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = hoverColor)}
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)")
      }
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

/* ── Footer Column ── */
function FootCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div
        style={{
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          color: "var(--gold)",
          marginBottom: "1rem",
        }}
      >
        {title}
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              style={{
                fontSize: "0.85rem",
                color: "var(--muted-foreground)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)")
              }
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
