"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Тихая фоновая музыка.
 * Положи свой трек в public/music.mp3 (или .ogg) — он подхватится автоматически.
 * Если файла нет, компонент просто молчит.
 */
export default function BackgroundMusic({ active }: { active: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.28;
    audio.preload = "auto";

    const onCanPlay = () => setReady(true);
    audio.addEventListener("canplaythrough", onCanPlay);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !ready) return;

    if (active && !muted) {
      audio.play().catch(() => {
        // браузер может блокировать autoplay — пользователь нажмёт кнопку
      });
    } else {
      audio.pause();
    }
  }, [active, muted, ready]);

  if (!active) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      onClick={() => setMuted((m) => !m)}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-champagne/30 bg-mauve/70 text-champagne shadow-soft backdrop-blur-md transition-colors hover:border-champagne/55 hover:bg-mauve/90"
      aria-label={muted ? "Включить музыку" : "Выключить музыку"}
      title={muted ? "Включить музыку" : "Выключить музыку"}
    >
      {muted ? (
        // muted icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        // sound icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </motion.button>
  );
}
