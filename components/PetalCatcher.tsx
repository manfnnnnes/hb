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
const MODE_KEY = "hb_phrase_mode"; // "soft" | "hot"

export default function PetalCatcher() {
  const [petals, setPetals] = useState<CatchPetal[]>([]);
  const [caught, setCaught] = useState(0);
  const [reward, setReward] = useState<string | null>(null);
  const [isSpicy, setIsSpicy] = useState(false);
  const [mode, setMode] = useState<"soft" | "hot">("hot");
  const idRef = useRef(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const loadedRef = useRef(false);

  // Загрузка счётчика и режима
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const num = parseInt(saved, 10);
        if (!isNaN(num) && num > 0) setCaught(num);
      }
      const savedMode = window.localStorage.getItem(MODE_KEY);
      if (savedMode === "soft" || savedMode === "hot") setMode(savedMode);
    } catch {}
    loadedRef.current = true;
  }, []);

  // Сохранение
  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(caught));
      window.localStorage.setItem(MODE_KEY, mode);
    } catch {}
  }, [caught, mode]);

  useEffect(() => {
    const heartChance = caught >= 100 ? 0.45 : caught >= 50 ? 0.38 : 0.18;
    const spawnSpeed = caught >= 100 ? 900 : caught >= 50 ? 1100 : 1400;

    function spawn() {
      idRef.current += 1;
      const isHeart = Math.random() < heartChance;
      const petal: CatchPetal = {
        id: idRef.current,
        left: 8 + Math.random() * 84,
        duration: 6.5 + Math.random() * 4,
        size: isHeart ? 28 + Math.random() * 14 : 24 + Math.random() * 10,
        isHeart,
      };
      setPetals((prev) => [...prev, petal]);
      const t = setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== petal.id));
      }, (petal.duration + 0.4) * 1000);
      timeoutsRef.current.push(t);
    }

    spawn();
    const interval = setInterval(spawn, spawnSpeed);
    const timeouts = timeoutsRef.current;

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, [caught >= 50, caught >= 100]);

  function vibrate() {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(40);
    }
  }

  function handleCatch(id: number, isHeart: boolean) {
    setPetals((prev) => prev.filter((p) => p.id !== id));

    if (isHeart) vibrate();

    setCaught((c) => {
      const next = c + 1;

      if (isHeart) {
        const rewards =
          mode === "hot"
            ? siteContent.comingSoon.heartRewards
            : siteContent.comingSoon.catchRewards;
        setReward(rewards[Math.floor(Math.random() * rewards.length)]);
        setIsSpicy(mode === "hot");
      } else if (next % 5 === 0) {
        const rewards = siteContent.comingSoon.catchRewards;
        setReward(rewards[Math.floor(Math.random() * rewards.length)]);
        setIsSpicy(false);
      }

      // Особые уровни
      if (next === 50) {
        setTimeout(() => {
          setReward("Я тебя хочу 🔥");
          setIsSpicy(true);
        }, 2800);
      }
      if (next === 100) {
        setTimeout(() => {
          setReward("Ты уже полностью моя… 🔥💋");
          setIsSpicy(true);
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
    }, 3400);
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
              exit={{ opacity: 0, scale: 1.9, transition: { duration: 0.25 } }}
              transition={{ duration: p.duration, ease: "linear" }}
            >
              {p.isHeart ? (
                <svg
                  viewBox="0 0 24 24"
                  width="100%"
                  height="100%"
                  className={
                    caught >= 100
                      ? "drop-shadow-[0_0_12px_rgba(230,179,174,0.95)]"
                      : "drop-shadow-[0_0_8px_rgba(230,179,174,0.7)]"
                  }
                >
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

      <div className="relative z-10 flex flex-col items-center gap-2">
        <p className="text-xs italic text-cream/50">
          {siteContent.comingSoon.gameHint}
        </p>
        <p className="text-[11px] uppercase tracking-widest text-cream/40">
          {siteContent.comingSoon.gameLabel}: {caught}
        </p>

        {/* Переключатель режима */}
        <button
          onClick={() => setMode((m) => (m === "hot" ? "soft" : "hot"))}
          className="mt-1 rounded-full border border-champagne/20 bg-mauve/30 px-3 py-1 text-[10px] uppercase tracking-widest text-cream/50 transition hover:border-champagne/40 hover:text-champagne"
        >
          Режим: {mode === "hot" ? "Горячий 🔥" : "Нежный 💕"}
        </button>
      </div>

      <AnimatePresence>
        {reward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.65, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div
              className={`relative max-w-[90vw] rounded-3xl border px-8 py-5 text-center shadow-2xl backdrop-blur-md ${
                isSpicy
                  ? "border-rose/70 bg-ink/95 text-rose"
                  : "border-champagne/50 bg-ink/90 text-cream"
              }`}
            >
              <div
                className={`absolute -inset-5 -z-10 rounded-[2.2rem] blur-3xl ${
                  isSpicy ? "bg-rose/30" : "bg-champagne/20"
                }`}
              />
              <p className={`text-lg font-medium italic sm:text-xl ${isSpicy ? "text-rose" : "text-cream"}`}>
                {reward}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
