"use client";

import { motion } from "framer-motion";

export type EnvelopeStage = "question1" | "question2" | "confirm" | "opening";

export default function EnvelopeVisual({ stage }: { stage: EnvelopeStage }) {
  const isOpening = stage === "opening";

  return (
    <div
      className="relative mx-auto mb-10 h-44 w-64 sm:h-52 sm:w-80"
      style={{ perspective: 1200 }}
    >
      {/* мягкое свечение позади конверта */}
      <div className="absolute inset-0 -z-10 rounded-full bg-champagne/10 blur-3xl" />

      {/* письмо, выезжающее при открытии */}
      <motion.div
        className="absolute left-1/2 top-2 h-32 w-52 -translate-x-1/2 rounded-md bg-cream shadow-soft sm:w-64"
        initial={{ y: 0, opacity: 0 }}
        animate={
          isOpening
            ? { y: -120, opacity: 1, rotate: -2 }
            : { y: 0, opacity: 0 }
        }
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.35 }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-1.5 px-6">
          <div className="h-1 w-3/4 rounded-full bg-mauve/20" />
          <div className="h-1 w-full rounded-full bg-mauve/15" />
          <div className="h-1 w-5/6 rounded-full bg-mauve/15" />
          <div className="h-1 w-2/3 rounded-full bg-mauve/15" />
        </div>
      </motion.div>

      {/* корпус конверта */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-b from-mauvelight to-mauve shadow-soft"
        animate={!isOpening ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 6, repeat: isOpening ? 0 : Infinity, ease: "easeInOut" }}
      >
        {/* боковые складки конверта */}
        <div
          className="absolute inset-0 rounded-lg opacity-40"
          style={{
            background:
              "linear-gradient(135deg, transparent 49%, rgba(0,0,0,0.25) 50%, transparent 51%), linear-gradient(-135deg, transparent 49%, rgba(0,0,0,0.25) 50%, transparent 51%)",
          }}
        />
      </motion.div>

      {/* верхний клапан конверта */}
      <motion.div
        className="absolute left-0 top-0 h-24 w-full origin-top sm:h-28"
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 85%)",
          background: "linear-gradient(160deg, #6b4a58, #4a3140)",
          transformStyle: "preserve-3d",
        }}
        animate={isOpening ? { rotateX: -165 } : { rotateX: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />

      {/* лента бантом по центру */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={
          isOpening
            ? { opacity: 0, scale: 0.4, rotate: 25 }
            : { opacity: 1, scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
          <path
            d="M28 20C28 20 8 6 4 14C0 22 18 24 28 20Z"
            fill="#d7ae82"
          />
          <path
            d="M28 20C28 20 48 6 52 14C56 22 38 24 28 20Z"
            fill="#ecd3ab"
          />
          <circle cx="28" cy="20" r="6" fill="#e6b3ae" />
        </svg>
      </motion.div>
    </div>
  );
}
