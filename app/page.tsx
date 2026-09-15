"use client";

import { useEffect, useState } from "react";
import FallingPetals from "@/components/FallingPetals";
import EnvelopeGate from "@/components/EnvelopeGate";
import MainContent from "@/components/MainContent";
import ComingSoon from "@/components/ComingSoon";

// Дата, когда сайт открывается для всех.
const REVEAL_DATE = new Date("2026-11-13T00:00:00");

// Секретный способ заглянуть раньше: ?preview=true
const PREVIEW_PARAM = "preview";

// Ключ в localStorage
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
    } catch {
      // localStorage может быть недоступен
    }

    setReady(true);
  }, []);

  // Меняем название вкладки
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
    } catch {
      // если localStorage недоступен
    }
    setUnlocked(true);
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

      {!ready ? null : !dateReached ? (
        <ComingSoon target={REVEAL_DATE} />
      ) : !unlocked ? (
        <EnvelopeGate onUnlock={handleUnlock} />
      ) : (
        <MainContent />
      )}
    </main>
  );
}
