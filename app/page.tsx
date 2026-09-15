"use client";

import { useState } from "react";
import FallingPetals from "@/components/FallingPetals";
import EnvelopeGate from "@/components/EnvelopeGate";
import MainContent from "@/components/MainContent";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-plum via-mauve to-ink">
      {/* мягкое виньетирование + тёплое свечение сверху */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 12%, rgba(219,180,138,0.13), transparent 52%), radial-gradient(circle at 50% 100%, rgba(0,0,0,0.38), transparent 58%)",
        }}
      />

      <FallingPetals density={unlocked ? "calm" : "full"} />

      <BackgroundMusic active={unlocked} />

      {!unlocked ? (
        <EnvelopeGate onUnlock={() => setUnlocked(true)} />
      ) : (
        <MainContent />
      )}
    </main>
  );
}
