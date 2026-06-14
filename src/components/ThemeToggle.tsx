import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      localStorage.getItem("vysai-theme")) as Theme | null;
    const initial: Theme = stored ?? "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = typeof document !== "undefined" ? document.documentElement : null;
    if (root) {
      root.classList.remove("dark", "light");
      root.classList.add(t);
    }
  };

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem("vysai-theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative h-10 w-10 rounded-full glass-panel grid place-items-center overflow-hidden group"
    >
      <span className="text-gold transition-all duration-300">
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  );
}
