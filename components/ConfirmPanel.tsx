"use client";

import { motion } from "framer-motion";

type ConfirmPanelProps = {
  title: string;
  subtitle: string;
  buttonSoft: string;
  buttonOpen: string;
  onOpen: () => void;
};

export default function ConfirmPanel({
  title,
  subtitle,
  buttonSoft,
  buttonOpen,
  onOpen,
}: ConfirmPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-md flex-col items-center gap-5 text-center"
    >
      <h2 className="font-serif text-2xl leading-snug text-cream sm:text-3xl">
        {title}
      </h2>
      <p className="text-sm italic text-cream/70">{subtitle}</p>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onOpen}
          className="rounded-full border border-champagne/40 px-8 py-3 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:bg-champagne/10"
        >
          {buttonSoft}
        </button>
        <button
          onClick={onOpen}
          className="rounded-full bg-gradient-to-r from-champagne to-rose px-8 py-3 text-sm font-medium tracking-wide text-ink transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          {buttonOpen}
        </button>
      </div>
    </motion.div>
  );
}
