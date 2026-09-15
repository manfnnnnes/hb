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
    size: 10 + Math.random() * 14,
    duration: 14 + Math.random() * 12,
    delay: Math.random() * 12,
    drift: 40 + Math.random() * 60,
    opacity: 0.25 + Math.random() * 0.35,
    hue: Math.random() > 0.5 ? "rose" : "champagne",
  }));
}

function PetalShape({ hue }: { hue: Petal["hue"] }) {
  const fill = hue === "rose" ? "#e6b3ae" : "#d7ae82";
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
    setPetals(generatePetals(density === "full" ? 20 : 9));
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
            top: "108%",
            x: [0, p.drift, -p.drift * 0.6, 0],
            rotate: [0, 160, 320, 480],
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
