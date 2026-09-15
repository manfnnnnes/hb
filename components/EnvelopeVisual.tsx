"use client";

import { motion, AnimatePresence } from "framer-motion";

export type EnvelopeStage = "question1" | "question2" | "confirm" | "opening";

export default function EnvelopeVisual({ stage }: { stage: EnvelopeStage }) {
  const isOpening = stage === "opening";

  return (
    <div
      className="relative mx-auto mb-10 h-48 w-72 sm:h-56 sm:w-88"
      style={{ perspective: 1400 }}
    >
      {/* мягкое свечение позади */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full bg-champagne/15 blur-3xl"
        animate={
          isOpening
            ? { scale: [1, 1.6, 1.2], opacity: [0.4, 0.85, 0.5] }
            : { scale: 1, opacity: 0.4 }
        }
        transition={{ duration: 1.8, ease: "easeOut" }}
      />

      {/* вспышка при открытии */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.7, 0], scale: [0.4, 1.8, 2.4] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 z-20 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/30 blur-2xl"
          />
        )}
      </AnimatePresence>

      {/* письмо, выезжающее при открытии */}
      <motion.div
        className="absolute left-1/2 top-3 h-36 w-56 -translate-x-1/2 rounded-md bg-cream shadow-soft sm:w-68"
        initial={{ y: 28, opacity: 0, scale: 0.92 }}
        animate={
          isOpening
            ? { y: -140, opacity: 1, scale: 1, rotate: -3 }
            : { y: 28, opacity: 0, scale: 0.92 }
        }
        transition={{
          duration: 1.35,
          ease: [0.22, 1, 0.36, 1],
          delay: isOpening ? 0.45 : 0,
        }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-1.5 px-7 pt-2">
          <div className="mb-2 h-1.5 w-10 rounded-full bg-rose/40" />
          <div className="h-1 w-3/4 rounded-full bg-mauve/20" />
          <div className="h-1 w-full rounded-full bg-mauve/15" />
          <div className="h-1 w-5/6 rounded-full bg-mauve/15" />
          <div className="h-1 w-2/3 rounded-full bg-mauve/15" />
          <div className="mt-3 h-1 w-1/2 rounded-full bg-mauve/10" />
        </div>
      </motion.div>

      {/* корпус конверта */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-b from-mauvelight to-mauve shadow-soft"
        animate={!isOpening ? { scale: [1, 1.015, 1] } : { scale: 1 }}
        transition={{
          duration: 5.5,
          repeat: isOpening ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        {/* боковые складки */}
        <div
          className="absolute inset-0 rounded-xl opacity-35"
          style={{
            background:
              "linear-gradient(135deg, transparent 49%, rgba(0,0,0,0.22) 50%, transparent 51%), linear-gradient(-135deg, transparent 49%, rgba(0,0,0,0.22) 50%, transparent 51%)",
          }}
        />
      </motion.div>

      {/* верхний клапан (открывается с 3D) */}
      <motion.div
        className="absolute left-0 top-0 h-28 w-full origin-top sm:h-32"
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 88%)",
          background: "linear-gradient(165deg, #6b4a58 0%, #4a3140 100%)",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
        animate={isOpening ? { rotateX: -172 } : { rotateX: 0 }}
        transition={{ duration: 1.15, ease: [0.33, 1, 0.68, 1] }}
      />

      {/* лента / бант */}
      <motion.div
        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
        animate={
          isOpening
            ? { opacity: 0, scale: 0.35, y: -18, rotate: 32 }
            : { opacity: 1, scale: 1, y: 0, rotate: 0 }
        }
        transition={{ duration: 0.55, ease: "easeInOut" }}
      >
        <svg width="64" height="46" viewBox="0 0 64 46" fill="none">
          <path
            d="M32 23C32 23 9 6 4 16C-1 26 20 28 32 23Z"
            fill="#dbb48a"
          />
          <path
            d="M32 23C32 23 55 6 60 16C65 26 44 28 32 23Z"
            fill="#efd6b2"
          />
          <circle cx="32" cy="23" r="7" fill="#e8b9b4" />
          <circle cx="32" cy="23" r="3.5" fill="#dbb48a" />
        </svg>
      </motion.div>
    </div>
  );
}
