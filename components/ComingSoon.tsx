"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteContent } from "@/content/site-content";
import PetalCatcher from "./PetalCatcher";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Дата начала отсчёта нужна только для полоски прогресса,
// чтобы было видно сколько пути уже пройдено. Поменяй если нужно.
const START_DATE = new Date("2026-09-15T00:00:00");

export default function ComingSoon({ target }: { target: Date }) {
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft(target));
  const [hintIndex, setHintIndex] = useState(0);
  const [lockMessage, setLockMessage] = useState<string | null>(null);
  const [lockKey, setLockKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  useEffect(() => {
    const id = setInterval(() => {
      setHintIndex((i) => (i + 1) % siteContent.comingSoon.rotatingHints.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  function handleLockClick() {
    const messages = siteContent.comingSoon.lockMessages;
    const next = messages[Math.floor(Math.random() * messages.length)];
    setLockMessage(next);
    setLockKey((k) => k + 1);
  }

  useEffect(() => {
    if (!lockMessage) return;
    const t = setTimeout(() => setLockMessage(null), 2200);
    return () => clearTimeout(t);
  }, [lockMessage, lockKey]);

  const totalSpan = Math.max(1, target.getTime() - START_DATE.getTime());
  const elapsed = Date.now() - START_DATE.getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / totalSpan) * 100));

  const units: [number, string][] = [
    [time.days, siteContent.comingSoon.labels.days],
    [time.hours, siteContent.comingSoon.labels.hours],
    [time.minutes, siteContent.comingSoon.labels.minutes],
    [time.seconds, siteContent.comingSoon.labels.seconds],
  ];

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 0.75, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 text-sm uppercase tracking-[0.25em] text-champagne/80"
      >
        {siteContent.comingSoon.eyebrow}
      </motion.p>

      <div className="relative mb-4">
        <motion.button
          type="button"
          onClick={handleLockClick}
          aria-label="Секретный замочек"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          whileTap={{ scale: 0.94 }}
          className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-champagne/30 bg-mauve/40 shadow-soft transition-colors hover:border-champagne/60"
        >
          <motion.div
            key={lockKey}
            animate={
              lockMessage
                ? { rotate: [0, -8, 8, -6, 6, 0] }
                : { scale: [1, 1.06, 1] }
            }
            transition={
              lockMessage
                ? { duration: 0.5 }
                : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <rect
                x="7"
                y="15"
                width="20"
                height="14"
                rx="3"
                stroke="#d7ae82"
                strokeWidth="1.6"
              />
              <path
                d="M11 15V10C11 6.68629 13.6863 4 17 4C20.3137 4 23 6.68629 23 10V15"
                stroke="#d7ae82"
                strokeWidth="1.6"
              />
              <circle cx="17" cy="21" r="2" fill="#e6b3ae" />
            </svg>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {lockMessage && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-champagne/30 bg-ink/90 px-4 py-1.5 text-xs italic text-cream/90"
            >
              {lockMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-4 mt-6 max-w-md font-serif text-3xl leading-snug text-cream sm:text-4xl"
      >
        {siteContent.comingSoon.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="mb-10 max-w-sm text-sm leading-relaxed text-cream/65 sm:text-base"
      >
        {siteContent.comingSoon.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-8 flex gap-5 sm:gap-8"
      >
        {units.map(([value, label]) => (
          <div key={label} className="flex flex-col items-center">
            <span className="font-serif text-3xl text-champagne sm:text-4xl">
              {pad(value)}
            </span>
            <span className="mt-1 text-[11px] uppercase tracking-widest text-cream/45">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.75 }}
        className="mb-10 w-full max-w-xs"
      >
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-champagne to-rose"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="mt-2 text-[11px] uppercase tracking-widest text-cream/40">
          {Math.round(progress)}% {siteContent.comingSoon.progressLabel}
        </p>
      </motion.div>

      <div className="h-6 mb-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={hintIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="text-sm italic text-cream/60"
          >
            {siteContent.comingSoon.rotatingHints[hintIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <PetalCatcher />
    </div>
  );
}
