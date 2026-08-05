"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export function SectionHeading({
  no,
  children,
}: {
  no?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.h2
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className="mb-10 flex items-center gap-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
    >
      {no && (
        <span className="font-mono text-sm font-medium text-accent sm:text-lg" aria-hidden>
          {no}.
        </span>
      )}
      <span className="min-w-0">{children}</span>
      <span className="h-px min-w-0 max-w-64 grow bg-line" aria-hidden />
    </motion.h2>
  );
}
