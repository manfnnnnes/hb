"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    // Пробуем включить автоматически. Если браузер не разрешит,
    // просто останется кнопка, чтобы включить вручную одним нажатием.
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Выключить музыку" : "Включить музыку"}
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-champagne/30 bg-ink/70 text-champagne backdrop-blur-sm transition-colors hover:border-champagne/60"
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 9V15H8L13 20V4L8 9H4Z"
              fill="currentColor"
            />
            <path
              d="M16 8.5C17 9.5 17.5 10.7 17.5 12C17.5 13.3 17 14.5 16 15.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M18.5 6C20 7.5 21 9.6 21 12C21 14.4 20 16.5 18.5 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 9V15H8L13 20V4L8 9H4Z" fill="currentColor" />
            <path
              d="M16 9L21 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M21 9L16 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </>
  );
}
