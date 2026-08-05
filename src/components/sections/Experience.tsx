"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Item {
  org: string;
  role: string;
  period: string;
  badge: "professional" | "training";
  summary: string;
  tags: string[];
}

function ExperienceCard({
  item,
  index,
  total,
  t,
  shouldReduce,
}: {
  item: Item;
  index: number;
  total: number;
  t: (key: string) => string;
  shouldReduce: boolean | null;
}) {
  const cardRef = useRef<HTMLLIElement>(null);

  // tracks this card's own scroll progress as the NEXT card scrolls over it
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  const isLast = index === total - 1;

  return (
    <motion.li
      ref={cardRef}
      style={{
        scale: shouldReduce ? 1 : scale,
        opacity: shouldReduce || isLast ? 1 : opacity,
        filter: shouldReduce ? "none" : useTransform(brightness, (b) => `brightness(${b})`),
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="sticky top-24 origin-top list-none pb-4 lg:top-28"
    >
      <div className="group relative grid gap-2 rounded-xl border border-line bg-surface p-5 shadow-xl shadow-black/10 transition-colors sm:grid-cols-8 sm:gap-6 lg:hover:border-brand-500/30">
        {/* period + credibility badge */}
        <div className="relative z-10 sm:col-span-2">
          <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            {item.period}
          </p>
          <span
            className={`mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
              item.badge === "professional"
                ? "border-brand-500/40 text-accent"
                : "border-line text-muted"
            }`}
          >
            {t(`badges.${item.badge}`)}
          </span>
        </div>

        {/* role, impact paragraph, tech pills */}
        <div className="relative z-10 sm:col-span-6">
          <h3 className="font-semibold text-ink transition-colors group-hover:text-accent">
            {item.role}
            <span className="text-muted"> · </span>
            <span className="text-muted transition-colors group-hover:text-ink">
              {item.org}
            </span>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-brand-500/10 px-3 py-1 font-mono text-xs font-medium text-accent"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  );
}

export function Experience() {
  const t = (key: string) => ({ no: "03", title: "Experience & training", resume: "View full résumé", "badges.professional": "Professional", "badges.training": "Intensive training" }[key] ?? "");
  const items: Item[] = [
    { org: "Advanced React Program", role: "Advanced React Developer Trainee", period: "Jan — Mar 2026", badge: "training", summary: "Engineered scalable React applications on a feature-based modular architecture inside a pnpm + Turborepo monorepo with shared Design System packages. Implemented fully type-safe routing with TanStack Router, server-state management with TanStack Query, and advanced patterns — Compound & Headless components, DIP with DTO mappers, and a Context-based feature-flag system for gradual rollouts.", tags: ["React", "TypeScript", "TanStack Query", "TanStack Router", "Turborepo", "pnpm"] },
    { org: "Zakey Tech", role: "Full-Stack Developer Trainee", period: "Sep 2025 — Jan 2026", badge: "training", summary: "Built and shipped responsive full-stack apps with the Next.js App Router, Tailwind CSS v4 and MUI, backed by Node.js/Express REST services and MongoDB models via Mongoose.", tags: ["Next.js", "Node.js", "Express", "MongoDB", "Tailwind v4", "MUI"] },
    { org: "Kumrat Al-Saada", role: "Front-End Developer (Angular)", period: "Apr — Jul 2025", badge: "professional", summary: "Architected an end-to-end notification system and redesigned multiple screens to a unified UX spec, defining an app-wide color and design-token system.", tags: ["Angular", "TypeScript", "Design Tokens", "Performance", "QA"] },
  ];
  const shouldReduce = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-20 px-5 py-20">
      <SectionHeading no={t("no")}>{t("title")}</SectionHeading>

      <ol className="relative lg:ps-10">
        {items.map((item, i) => (
          <ExperienceCard
            key={item.org}
            item={item}
            index={i}
            total={items.length}
            t={t}
            shouldReduce={shouldReduce}
          />
        ))}
      </ol>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 lg:ps-10"
      >
        <a
          href="/Hashem_Mdoukh_ATS.pdf"
          target="_blank"
          rel="noreferrer"
          className="group/link inline-flex items-center gap-1.5 p-5 pt-0 font-mono text-sm font-semibold text-ink transition-colors hover:text-accent"
        >
          {t("resume")}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="transition-transform motion-reduce:transition-none group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            aria-hidden>
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      </motion.p>
    </section>
  );
}
