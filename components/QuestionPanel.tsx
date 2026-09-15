"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { isCorrectAnswer } from "@/lib/utils";

type QuestionPanelProps = {
  title: string;
  placeholder: string;
  button: string;
  hint: string;
  accepted: string[];
  onCorrect: () => void;
};

export default function QuestionPanel({
  title,
  placeholder,
  button,
  hint,
  accepted,
  onCorrect,
}: QuestionPanelProps) {
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isCorrectAnswer(value, accepted)) {
      onCorrect();
      return;
    }
    setAttempts((a) => a + 1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center"
    >
      <h2 className="font-serif text-2xl leading-snug text-cream sm:text-3xl">
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-4">
        <motion.div
          key={attempts}
          initial={attempts > 0 ? { x: 0 } : false}
          animate={attempts > 0 ? { x: [0, -10, 10, -7, 7, 0] } : {}}
          transition={{ duration: 0.45 }}
          className="w-full"
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            autoCapitalize="off"
            className="w-full rounded-full border border-champagne/30 bg-white/5 px-6 py-3.5 text-center text-base text-cream placeholder:text-cream/40 backdrop-blur-sm transition-colors focus:border-champagne/70 focus:outline-none"
          />
        </motion.div>

        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-champagne to-rose px-8 py-3 text-sm font-medium tracking-wide text-ink transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          {button}
        </button>
      </form>

      {attempts >= 2 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          className="text-sm italic text-cream/70"
        >
          {hint}
        </motion.p>
      )}
    </motion.div>
  );
}
