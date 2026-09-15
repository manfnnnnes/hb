"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EnvelopeVisual, { EnvelopeStage } from "./EnvelopeVisual";
import QuestionPanel from "./QuestionPanel";
import ConfirmPanel from "./ConfirmPanel";
import { siteContent, answers } from "@/content/site-content";

export default function EnvelopeGate({ onUnlock }: { onUnlock: () => void }) {
  const [stage, setStage] = useState<EnvelopeStage>("question1");

  useEffect(() => {
    if (stage !== "opening") return;
    // чуть длиннее, чтобы анимация успела раскрыться красиво
    const timer = setTimeout(() => {
      onUnlock();
    }, 2800);
    return () => clearTimeout(timer);
  }, [stage, onUnlock]);

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.9 }}
        className="mb-7 text-sm uppercase tracking-[0.28em] text-champagne/85"
      >
        {siteContent.envelope.eyebrow}
      </motion.p>

      <EnvelopeVisual stage={stage} />

      <AnimatePresence mode="wait">
        {stage === "question1" && (
          <QuestionPanel
            key="q1"
            title={siteContent.question1.title}
            placeholder={siteContent.question1.placeholder}
            button={siteContent.question1.button}
            hint={siteContent.question1.hint}
            accepted={answers.question1}
            onCorrect={() => setStage("question2")}
          />
        )}

        {stage === "question2" && (
          <QuestionPanel
            key="q2"
            title={siteContent.question2.title}
            placeholder={siteContent.question2.placeholder}
            button={siteContent.question2.button}
            hint={siteContent.question2.hint}
            accepted={answers.question2}
            onCorrect={() => setStage("confirm")}
          />
        )}

        {stage === "confirm" && (
          <ConfirmPanel
            key="confirm"
            title={siteContent.confirm.title}
            subtitle={siteContent.confirm.subtitle}
            buttonSoft={siteContent.confirm.buttonSoft}
            buttonOpen={siteContent.confirm.buttonOpen}
            onOpen={() => setStage("opening")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
