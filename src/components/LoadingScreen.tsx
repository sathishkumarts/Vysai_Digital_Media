import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/Vysailogo.png";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] grid place-items-center bg-[color:var(--background)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] } }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklab, var(--gold) 12%, transparent), transparent 70%)",
            }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            <motion.img
              src={logo}
              alt=""
              className="h-24 w-24 rounded-full object-cover"
              style={{ boxShadow: "0 0 60px -5px var(--gold)" }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative h-px w-44 overflow-hidden bg-[color:var(--border)]">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[image:var(--gradient-gold)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Vysai · Loading the experience
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
