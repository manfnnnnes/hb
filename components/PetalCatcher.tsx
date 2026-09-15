"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteContent } from "@/content/site-content";

type CatchPetal = {
  id: number;
  left: number;
  duration: number;
  size: number;
  isHeart: boolean;
};

const STORAGE_KEY = "hb_petals_caught";

export default function PetalCatcher() {
  const [petals, setPetals] = useState<CatchPetal[]>([]);
  const [caught, setCaught] = useState(0);
  const [reward, setReward] = useState<string | null>(null);
  const [isSpicy, setIsSpicy] = useState(false);
  const idRef = useRef(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const loadedRef = useRef(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const num = parseInt(saved, 10);
        if (!isNaN(num) && num > 0) setCaught(num);
      }
    } catch {}
    loadedRef.current = true;
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(caught));
    } catch {}
  }, [caught]);

  useEffect(() => {
    const heartChance = caught >= 50 ? 0.38 : 0.18; // после 50 — чаще сердечки

    function spawn() {
      idRef.current += 1;
      const isHeart = Math.random() < heartChance;
      const petal: CatchPetal = {
        id: idRef.current,
        left: 8 + Math.random() * 84,
        duration: 6.5 + Math.random() * 4,
        size: isHeart ? 28 + Math.random() * 12 : 24 + Math.random() * 10,
        isHeart,
      };
      setPetals((prev) => [...prev, petal]);
      const t = setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== petal.id));
      }, (petal.duration + 0.4) * 1000);
      timeoutsRef.current.push(t);
    }

    spawn();
    const interval = setInterval(spawn, caught >= 50 ? 1100 : 1400);
    const timeouts = timeoutsRef.current;

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, [caught >= 50]); // перезапускаем при достижении 50

  function handleCatch(id: number, isHeart: boolean) {
    setPetals((prev) => prev.filter((p) => p.id !== id));

    setCaught((c) => {
      const next = c + 1;

      if (isHeart) {
        const rewards = siteContent.comingSoon.heartRewards;
        setReward(rewards[Math.floor(Math.random() * rewards.length)]);
        setIsSpicy(true);
      } else if (next % 5 === 0) {
        const rewards = siteContent.comingSoon.catchRewards;
        setReward(rewards[Math.floor(Math.random() * rewards.length)]);
        setIsSpicy(false);
      }

      // Специальная фраза на 50
      if (next === 50) {
        setTimeout(() => {
          setReward("Я тебя хочу");
          setIsSpicy(true);
        }, 2900);
      }

      if (next % 25 === 0 && next !== 50) {
        setTimeout(() => {
          setReward(`Уровень ${next / 25}! Ты уже настоящая охотница`);
          setIsSpicy(false);
        }, 2800);
      }

      return next;
    });
  }

  useEffect(() => {
    if (!reward) return;
    const t = setTimeout(() => {
      setReward(null);
      setIsSpicy(false);
    }, 3000);
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
              aria-label={p.isHeart ? "Поймать сердечко" : "Поймать лепесток"}
              onClick={() => handleCatch(p.id, p.isHeart)}
              className="pointer-events-auto absolute cursor-pointer touch-manipulation"
              style={{ left: `${p.left}%`, width: p.size, height: p.size }}
              initial={{ top: "-8%", rotate: 0, opacity: 1 }}
              animate={{ top: "108%", rotate: 300 }}
              exit={{ opacity: 0, scale: 1.8, transition: { duration: 0.2 } }}
              transition={{ duration: p.duration, ease: "linear" }}
            >
              {p.isHeart ? (
                <svg viewBox="0 0 24 24" width="100%" height="100%" className="drop-shadow-[0_0_8px_rgba(230,179,174,0.7)]">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="#e6b3ae"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="100%" height="100%">
                  <path
                    d="M12 1C7 6 4 10 4 14.5C4 19 7.5 22 12 22C16.5 22 20 19 20 14.5C20 10 17 6 12 1Z"
                    fill="#e6b3ae"
                  />
                </svg>
              )}
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-10 left-1/2 z-30 -translate-x-1/2 max-w-[90vw] whitespace-nowrap rounded-full border px-5 py-2 text-sm italic shadow-soft ${
              isSpicy
                ? "border-rose/60 bg-ink/95 text-rose"
                : "border-champagne/40 bg-ink/90 text-cream"
            }`}
          >
            {reward}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
