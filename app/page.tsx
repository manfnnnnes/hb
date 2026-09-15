"use client";

import { useEffect, useState } from "react";
import FallingPetals from "@/components/FallingPetals";
import EnvelopeGate from "@/components/EnvelopeGate";
import MainContent from "@/components/MainContent";
import ComingSoon from "@/components/ComingSoon";

const REVEAL_DATE = new Date("2026-11-13T00:00:00");
const PREVIEW_PARAM = "preview";
const STORAGE_KEY = "hb_unlocked";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [dateReached, setDateReached] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isPreview = params.get(PREVIEW_PARAM) === "true";
    setDateReached(isPreview || new Date() >= REVEAL_DATE);

    try {
      const remembered = window.localStorage.getItem(STORAGE_KEY) === "true";
      if (remembered) setUnlocked(true);
    } catch {}

    // Небольшая задержка для красивой загрузки
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!dateReached) {
      document.title = "Секрет для Настюши";
    } else if (!unlocked) {
      document.title = "Письмо для тебя";
    } else {
      document.title = "С днём рождения, Настюша";
    }
  }, [ready, dateReached, unlocked]);

  function handleUnlock() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setUnlocked(true);
  }

  // Красивый скелетон загрузки
  if (!ready) {
    return (
      <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-plum via-mauve to-ink">
        <div className="flex flex-col items-center gap-6">
          <div className="h-16 w-16 animate-pulse rounded-full border border-champagne/30 bg-mauve/40" />
          <div className="h-3 w-40 animate-pulse rounded-full bg-cream/10" />
          <div className="h-3 w-28 animate-pulse rounded-full bg-cream/10" />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-plum via-mauve to-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 15%, rgba(215,174,130,0.10), transparent 55%), radial-gradient(circle at 50% 100%, rgba(0,0,0,0.45), transparent 60%)",
        }}
      />

      <FallingPetals density={unlocked ? "calm" : "full"} />

      {!dateReached ? (
        <ComingSoon target={REVEAL_DATE} />
      ) : !unlocked ? (
        <EnvelopeGate onUnlock={handleUnlock} />
      ) : (
        <MainContent />
      )}
    </main>
  );
}
