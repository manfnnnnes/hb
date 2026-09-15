"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RevealCard from "./RevealCard";
import PhotoFrame from "./PhotoFrame";
import MusicToggle from "./MusicToggle";
import { siteContent } from "@/content/site-content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export default function MainContent() {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    const phrases = siteContent.hero.randomPhrases;
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

  function scrollToLetter() {
    const el = document.getElementById("letter-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="relative z-10">
      <MusicToggle />

      {/* герой */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-serif text-4xl leading-tight text-cream sm:text-6xl"
        >
          {siteContent.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          className="mt-6 max-w-lg font-serif text-lg italic text-champagnelight sm:text-xl"
        >
          {siteContent.hero.subtitle}
        </motion.p>

        {phrase && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.1 }}
            className="mt-8 text-sm italic text-rose/80"
          >
            {phrase}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-14 flex flex-col items-center gap-2 text-cream/50"
        >
          <span className="text-xs uppercase tracking-[0.3em]">Листай вниз</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-8 w-px bg-cream/40"
          />
        </motion.div>
      </section>

      {/* письмо */}
      <section id="letter-section" className="mx-auto max-w-2xl px-6 py-24">
        <motion.div {...fadeUp}>
          <h2 className="mb-8 text-center font-serif text-2xl text-champagnelight sm:text-3xl">
            {siteContent.letter.heading}
          </h2>
          <div className="rounded-3xl border border-champagne/15 bg-mauve/30 p-8 backdrop-blur-sm sm:p-12">
            <div className="space-y-5 font-serif text-base leading-relaxed text-cream/90 sm:text-lg">
              {siteContent.letter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-8 text-right font-serif italic text-champagne">
              {siteContent.letter.signature}
            </p>
          </div>
        </motion.div>
      </section>

      {/* карточки */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <motion.h2
          {...fadeUp}
          className="mb-10 text-center font-serif text-2xl text-champagnelight sm:text-3xl"
        >
          {siteContent.cardsHeading}
        </motion.h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {siteContent.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: "easeOut" }}
              className={
                siteContent.cards.length % 2 !== 0 && i === siteContent.cards.length - 1
                  ? "sm:col-span-2"
                  : ""
              }
            >
              <RevealCard title={card.title} text={card.text} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* фото */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <motion.h2
          {...fadeUp}
          className="mb-10 text-center font-serif text-2xl text-champagnelight sm:text-3xl"
        >
          {siteContent.photos.heading}
        </motion.h2>
        <div className="grid grid-cols-2 gap-5 sm:gap-8">
          {siteContent.photos.items.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <PhotoFrame caption={photo.caption} src={photo.src} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* финал */}
      <section className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-32 text-center">
        <motion.p
          {...fadeUp}
          className="font-serif text-xl leading-relaxed text-cream sm:text-2xl"
        >
          {siteContent.final.text}
        </motion.p>
        <motion.p
          {...fadeUp}
          className="font-serif text-lg italic text-champagne"
        >
          {siteContent.final.signature}
        </motion.p>

        <motion.button
          {...fadeUp}
          onClick={scrollToLetter}
          className="mt-8 rounded-full border border-champagne/30 bg-mauve/40 px-6 py-2.5 text-xs uppercase tracking-widest text-champagne transition hover:border-champagne/60 hover:bg-mauve/60"
        >
          Ещё раз прочитать письмо
        </motion.button>
      </section>
    </div>
  );
}
