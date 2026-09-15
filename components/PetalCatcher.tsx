"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteContent } from "@/content/site-content";

type CatchPetal = {
  id: number;
  left: number;
  duration: number;
  size: number;
};

export default function PetalCatcher() {
  const [petals, setPetals] = useState<CatchPetal[]>([]);
  const [caught, setCaught] = useState(0);
  const [reward, setReward] = useState<string | null>(null);
  const idRef = useRef(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    function spawn() {
      idRef.current += 1;
      const petal: CatchPetal = {
        id: idRef.current,
        left: 8 + Math.random() * 84,
        duration: 6.5 + Math.random() * 4,
        size: 24 + Math.random() * 10,
      };
      setPetals((prev) => [...prev, petal]);
      const t = setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== petal.id));
      }, (petal.duration + 0.4) * 1000);
      timeoutsRef.current.push(t);
    }

    spawn();
    const interval = setInterval(spawn, 1500);
    const timeouts = timeoutsRef.current;

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  function handleCatch(id: number) {
    setPetals((prev) => prev.filter((p) => p.id !== id));
    setCaught((c) => {
      const next = c + 1;
      if (next % 5 === 0) {
        const rewards = siteContent.comingSoon.catchRewards;
        setReward(rewards[Math.floor(Math.random() * rewards.length)]);
      }
      return next;
    });
  }

  useEffect(() => {
    if (!reward) return;
    const t = setTimeout(() => setReward(null), 2600);
    return () => clearTimeout(t);
  }, [reward]);

  return (
    <>
      <div aria-hidden="false" className="pointer-events-none fixed inset-0 z-20">
        <AnimatePresence>
          {petals.map((p) => (
            <motion.button
              key={p.id}
              type="button"
              aria-label="Поймать лепесток"
              onClick={() => handleCatch(p.id)}
              className="pointer-events-auto absolute cursor-pointer touch-manipulation"
              style={{ left: `${p.left}%`, width: p.size, height: p.size }}
              initial={{ top: "-8%", rotate: 0, opacity: 1 }}
              animate={{ top: "108%", rotate: 300 }}
              exit={{ opacity: 0, scale: 1.6, transition: { duration: 0.2 } }}
              transition={{ duration: p.duration, ease: "linear" }}
            >
              <svg viewBox="0 0 24 24" width="100%" height="100%">
                <path
                  d="M12 1C7 6 4 10 4 14.5C4 19 7.5 22 12 22C16.5 22 20 19 20 14.5C20 10 17 6 12 1Z"
                  fill="#e6b3ae"
                />
              </svg>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-1">
        <p className="text-xs italic text-cream/50">
          {siteContent.comingSoon.gameHint}
        </p>
        <p className="text-[11px] uppercase tracking-widest text-cream/40">
          {siteContent.comingSoon.gameLabel}: {caught}
        </p>
      </div>

      <AnimatePresence>
        {reward && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-10 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-champagne/40 bg-ink/90 px-5 py-2 text-sm italic text-cream shadow-soft"
          >
            {reward}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
