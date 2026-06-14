import { CSSProperties, useEffect, useRef, useState } from "react";
import logo from "@/assets/Vysailogo.png";

/* ─── CSS keyframes injected once into <head> ─────────────────────── */
const GLITCH_CSS = `
@keyframes vglitch-r {
  0%,61%,100% { clip-path:inset(0 0 100% 0); transform:translate(0,0); opacity:0; }
  5%  { clip-path:inset(12% 0 72% 0); transform:translate( 8px,-2px); opacity:0.85; }
  15% { clip-path:inset(55% 0 25% 0); transform:translate(-6px, 1px); opacity:0.75; }
  30% { clip-path:inset(30% 0 50% 0); transform:translate( 5px,-1px); opacity:0.9; }
  45% { clip-path:inset(70% 0 12% 0); transform:translate(-4px, 2px); opacity:0.8; }
  60% { clip-path:inset(0   0 0   0); transform:translate( 0,   0  ); opacity:0; }
}
@keyframes vglitch-b {
  0%,61%,100% { clip-path:inset(0 0 100% 0); transform:translate(0,0); opacity:0; }
  5%  { clip-path:inset(12% 0 72% 0); transform:translate(-9px, 2px); opacity:0.8; }
  15% { clip-path:inset(55% 0 25% 0); transform:translate( 7px,-1px); opacity:0.7; }
  30% { clip-path:inset(30% 0 50% 0); transform:translate(-5px, 1px); opacity:0.85; }
  45% { clip-path:inset(70% 0 12% 0); transform:translate( 4px,-2px); opacity:0.75; }
  60% { clip-path:inset(0   0 0   0); transform:translate( 0,   0  ); opacity:0; }
}
@keyframes vglitch-h {
  0%,100% { clip-path:inset(0 0 100% 0); transform:translate(0,0); }
  10%     { clip-path:inset(18% 0 65% 0); transform:translate(-5px,0); }
  22%     { clip-path:inset(60% 0 20% 0); transform:translate( 5px,0); }
  35%     { clip-path:inset(5%  0 88% 0); transform:translate(-3px,0); }
  50%     { clip-path:inset(80% 0 5%  0); transform:translate( 3px,0); }
  62%     { clip-path:inset(0   0 0   0); transform:translate( 0,  0); }
}
@keyframes vnoise {
  0%   { background-position:  0%   0%; }
  20%  { background-position: 50%  10%; }
  40%  { background-position: 25%  80%; }
  60%  { background-position: 80%  30%; }
  80%  { background-position: 10%  60%; }
  100% { background-position:  0%   0%; }
}
@keyframes vscan {
  0%   { background-position: 0 -100vh; }
  100% { background-position: 0  100vh; }
}
@keyframes vpulse-gold {
  0%,100% { box-shadow: 0 0 40px -5px var(--gold), 0 0 80px -20px var(--gold); }
  50%      { box-shadow: 0 0 70px  5px var(--gold), 0 0 120px -10px var(--gold); }
}
@keyframes vcaret {
  0%,49% { opacity:1; } 50%,100% { opacity:0; }
}
@keyframes vflicker {
  0%   { opacity: 0; }
  10%  { opacity: 0.3; }
  15%  { opacity: 0; }
  25%  { opacity: 0.2; }
  30%  { opacity: 0; }
  45%  { opacity: 0.35; }
  50%  { opacity: 0; }
  65%  { opacity: 0.1; }
  70%  { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes vspin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes vspin-reverse {
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
}
@keyframes vprogress {
  from { width: 0%; }
  to   { width: 100%; }
}
@keyframes vprogress-shimmer {
  from { left: -15%; }
  to   { left: 120%; }
}
@keyframes vdot-pulse {
  0%,100% { opacity: 0.2; transform: scale(0.7); }
  50%     { opacity: 1; transform: scale(1.3); }
}
@keyframes vfadein {
  from { opacity: 0; transform: scale(0.82) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes vbracket-in {
  from { opacity: 0; transform: scale(1.5); }
  to   { opacity: 0.45; transform: scale(1); }
}
@keyframes vloader-exit {
  from { clip-path: inset(0 0 0 0); }
  to   { clip-path: inset(0 0 100% 0); }
}
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("vysai-glitch-styles")) return;
  const el = document.createElement("style");
  el.id = "vysai-glitch-styles";
  el.textContent = GLITCH_CSS;
  document.head.appendChild(el);
}

/* ─── Scanline overlay ────────────────────────────────────────────── */
function Scanlines() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.15) 2px, oklch(0 0 0 / 0.15) 4px)",
        backgroundSize: "100% 4px",
        animation: "vscan 10s linear infinite",
      }}
    />
  );
}

/* ─── Digital noise ───────────────────────────────────────────────── */
function DigitalNoise({ opacity }: { opacity: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.75 0 0 0 0 0.3 0 0 0 0.4 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        backgroundSize: "200px 200px",
        animation: "vnoise 0.5s steps(1) infinite",
        opacity,
        transition: "opacity 1s ease",
      }}
    />
  );
}

/* ─── SVG color-split filter defs ─────────────────────────────────── */
function ColorFilters() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <filter id="vf-red">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
        </filter>
        <filter id="vf-blue">
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
      </defs>
    </svg>
  );
}

/* ─── Glitch logo ─────────────────────────────────────────────────── */
function GlitchLogo({ glitching }: { glitching: boolean }) {
  const base: CSSProperties = {
    width: 156,
    height: 156,
    borderRadius: "50%",
    objectFit: "cover" as const,
    display: "block",
  };

  return (
    <div style={{ position: "relative", width: 156, height: 156 }}>
      <ColorFilters />
      {/* Base */}
      <img src={logo} alt="Vysai" style={{ ...base, animation: "vpulse-gold 2.5s ease-in-out infinite" }} />
      {/* Red ghost */}
      {glitching && (
        <img
          src={logo}
          alt=""
          aria-hidden
          style={{
            ...base,
            position: "absolute",
            inset: 0,
            mixBlendMode: "screen",
            filter: "url(#vf-red)",
            animation: "vglitch-r 0.35s steps(1) infinite",
          }}
        />
      )}
      {/* Blue ghost */}
      {glitching && (
        <img
          src={logo}
          alt=""
          aria-hidden
          style={{
            ...base,
            position: "absolute",
            inset: 0,
            mixBlendMode: "screen",
            filter: "url(#vf-blue)",
            animation: "vglitch-b 0.35s steps(1) infinite",
          }}
        />
      )}
      {/* Horizontal tear */}
      {glitching && (
        <img
          src={logo}
          alt=""
          aria-hidden
          style={{
            ...base,
            position: "absolute",
            inset: 0,
            animation: "vglitch-h 0.35s steps(1) infinite",
          }}
        />
      )}
    </div>
  );
}

/* ─── Corner bracket decoration ──────────────────────────────────── */
function CornerBracket({
  top, right, bottom, left,
}: {
  top?: number; right?: number; bottom?: number; left?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top, right, bottom, left,
        width: 28,
        height: 28,
        borderTop:    top    !== undefined ? "1.5px solid var(--gold)" : "none",
        borderBottom: bottom !== undefined ? "1.5px solid var(--gold)" : "none",
        borderLeft:   left   !== undefined ? "1.5px solid var(--gold)" : "none",
        borderRight:  right  !== undefined ? "1.5px solid var(--gold)" : "none",
        animation: "vbracket-in 0.7s 0.3s ease both",
      }}
    />
  );
}

const FULL_TEXT = "VYSAI · LOADING THE EXPERIENCE";

/* ─── Main export ─────────────────────────────────────────────────── */
export function LoadingScreen() {
  const [glitching, setGlitching] = useState(true);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [noiseOpacity, setNoiseOpacity] = useState(0.05);

  const [chars, setChars] = useState(0);
  const typewriterIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    injectStyles();

    const t1 = setTimeout(() => { setGlitching(false); setNoiseOpacity(0.02); }, 1600);
    // Start exit animation at 2.8s, then fully unmount at 3.4s
    const t2 = setTimeout(() => setExiting(true), 2800);
    const t3 = setTimeout(() => setVisible(false), 3400);

    typewriterIntervalRef.current = setInterval(() => {
      setChars((prev) => {
        if (prev >= FULL_TEXT.length) {
          if (typewriterIntervalRef.current) clearInterval(typewriterIntervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, 45);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (typewriterIntervalRef.current) clearInterval(typewriterIntervalRef.current);
    };
  }, []);

  const displayed = FULL_TEXT.slice(0, chars);
  const done = chars >= FULL_TEXT.length;

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "grid",
        placeItems: "center",
        background: "oklch(0.10 0.012 60)",
        overflow: "hidden",
        animation: exiting ? "vloader-exit 0.6s cubic-bezier(0.7, 0, 0.84, 0) forwards" : undefined,
      }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 68%)",
          opacity: glitching ? 0.65 : 1,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Scanlines */}
      <Scanlines />

      {/* Noise */}
      <DigitalNoise opacity={noiseOpacity} />

      {/* Corner brackets */}
      <CornerBracket top={20} left={20} />
      <CornerBracket top={20} right={20} />
      <CornerBracket bottom={20} left={20} />
      <CornerBracket bottom={20} right={20} />

      {/* Central content */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          animation: "vfadein 0.65s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        {/* Logo + rings */}
        <div style={{ position: "relative" }}>
          {/* Outer spinning ring */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: -14,
              borderRadius: "50%",
              border: "1px solid var(--gold)",
              opacity: 0.3,
              animation: "vspin 9s linear infinite",
            }}
          />
          {/* Outer dashed ring */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: -28,
              borderRadius: "50%",
              border: "1px dashed var(--gold)",
              opacity: 0.15,
              animation: "vspin-reverse 16s linear infinite",
            }}
          />

          {/* Glitch logo */}
          <GlitchLogo glitching={glitching} />

          {/* Flicker flash on glitch */}
          {glitching && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "var(--gold)",
                mixBlendMode: "overlay",
                animation: "vflicker 0.4s steps(1) 4",
              }}
            />
          )}
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: "relative",
            height: 2,
            width: 220,
            overflow: "hidden",
            borderRadius: 9999,
            background: "oklch(0.3 0.03 70 / 40%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "0 auto 0 0",
              borderRadius: 9999,
              background: "var(--gradient-gold, linear-gradient(135deg,oklch(0.9 0.16 88),oklch(0.78 0.15 75),oklch(0.58 0.12 55)))",
              animation: "vprogress 2.4s cubic-bezier(0.22, 1, 0.36, 1) both",
            }}
          />
          {/* Shimmer sweep */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 60,
              background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.7), transparent)",
              borderRadius: 9999,
              animation: "vprogress-shimmer 2.4s cubic-bezier(0.22, 1, 0.36, 1) both",
            }}
          />
        </div>

        {/* Typewriter label */}
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--muted-foreground, oklch(0.7 0.025 80))",
            minWidth: "28ch",
            textAlign: "center",
            fontFamily: "var(--font-sans, Inter, sans-serif)",
          }}
        >
          {displayed}
          {!done && (
            <span style={{ animation: "vcaret 0.8s step-end infinite" }}>▌</span>
          )}
        </div>

        {/* Loading dots */}
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--gold)",
                animation: `vdot-pulse 1.1s ${i * 0.18}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Horizontal glitch bar flashes */}
      {glitching && (
        <>
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "var(--gradient-gold, linear-gradient(135deg,oklch(0.9 0.16 88),oklch(0.58 0.12 55)))",
              animation: "vflicker 0.35s steps(1) infinite",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "var(--gradient-gold, linear-gradient(135deg,oklch(0.9 0.16 88),oklch(0.58 0.12 55)))",
              animation: "vflicker 0.28s steps(1) 0.1s infinite",
            }}
          />
        </>
      )}
    </div>
  );
}
