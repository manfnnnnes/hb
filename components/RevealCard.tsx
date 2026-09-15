"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RevealCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.button
      layout
      onClick={() => setOpen((o) => !o)}
      className="w-full rounded-2xl border border-champagne/15 bg-mauve/40 p-6 text-left backdrop-blur-sm transition-colors duration-300 hover:border-champagne/30"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-serif text-lg text-cream sm:text-xl">{title}</h3>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-champagne/40 text-champagne"
        >
          +
        </motion.span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm leading-relaxed text-cream/78 sm:text-base">
              {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
