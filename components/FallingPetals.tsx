"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Petal = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  hue: "rose" | "champagne";
};

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 9 + Math.random() * 13,
    duration: 16 + Math.random() * 14,
    delay: Math.random() * 14,
    drift: 30 + Math.random() * 55,
    opacity: 0.22 + Math.random() * 0.32,
    hue: Math.random() > 0.45 ? "rose" : "champagne",
  }));
}

function PetalShape({ hue }: { hue: Petal["hue"] }) {
  const fill = hue === "rose" ? "#e8b9b4" : "#dbb48a";
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path
        d="M12 1C7 6 4 10 4 14.5C4 19 7.5 22 12 22C16.5 22 20 19 20 14.5C20 10 17 6 12 1Z"
        fill={fill}
      />
    </svg>
  );
}

export default function FallingPetals({
  density = "full",
}: {
  density?: "full" | "calm";
}) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(generatePetals(density === "full" ? 18 : 8));
  }, [density]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-8%",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            top: "110%",
            x: [0, p.drift, -p.drift * 0.55, 0],
            rotate: [0, 140, 290, 420],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <PetalShape hue={p.hue} />
        </motion.div>
      ))}
    </div>
  );
}
