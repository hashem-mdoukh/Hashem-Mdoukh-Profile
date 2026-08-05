"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { highlightCode } from "@/components/ui/MiniCode";

const WHOAMI = `const hashem = {
  role: "Front-End Engineer",
  location: "Gaza, Palestine", // UTC+2/3
  stack: ["React", "Next.js", "TypeScript"],
  degree: "B.Sc. ICT — 2025",
  languages: ["Arabic (native)", "English (professional)"],
  remote: { ready: true, style: "async-first" },
  openToWork: true,
} satisfies Engineer;`;

interface Zone {
  city: string;
  start: number;
  end: number;
  me?: boolean;
}

/* overlap track spans 08:00 → 24:00 Gaza time */
const TRACK_START = 8;
const TRACK_HOURS = 16;
const MY_START = 9;
const MY_END = 19;

export function About() {
  const copy = { no: "04", title: "About me", p1: "I'm Hashem — a front-end engineer who builds fast, accessible interfaces with <hl>React</hl>, <hl>Next.js</hl> and <hl>TypeScript</hl>. I care about the part of software that outlives the sprint: <hl>feature-based architectures</hl>, <hl>design systems</hl> and <hl>monorepos</hl> that stay maintainable long after the demo.", p2: "I work <hl>async-first</hl> — written updates, PRs with context, and documentation treated as part of the job, not an afterthought. I work from Gaza, Palestine, and build for teams everywhere.", p3: "Away from the keyboard I'm usually deep in an engineering write-up or refining this site — currently exploring advanced React patterns and type-safe routing.", overlapTitle: "Timezone overlap — my day vs. yours", overlapCaption: "Full-day overlap with European teams · 3h+ with US East, every day", zones: [{ city: "Gaza — me", start: 9, end: 19, me: true }, { city: "Berlin · 9–17 CEST", start: 10, end: 18 }, { city: "London · 9–17 BST", start: 11, end: 19 }, { city: "New York · 9–17 EDT", start: 16, end: 24 }] };
  const t: any = Object.assign((key: keyof typeof copy) => copy[key], { raw: (key: keyof typeof copy) => copy[key], rich: (key: "p1" | "p2" | "p3", { hl }: { hl: (chunks: string) => React.ReactNode }) => copy[key].split(/(<hl>.*?<\/hl>)/g).map((part, i) => { const match = part.match(/^<hl>(.*?)<\/hl>$/); return match ? <span key={i}>{hl(match[1])}</span> : part; }) });
  const zones = copy.zones as Zone[];

  return (
    <section id="about" className="scroll-mt-20 px-5 py-20">
      <SectionHeading no={t("no")}>{t("title")}</SectionHeading>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-10 lg:grid-cols-5"
      >
        {/* narrative with inline keyword highlights */}
        <div className="min-w-0 space-y-5 lg:col-span-3">
          {(["p1", "p2", "p3"] as const).map((key) => (
            <motion.p
              key={key}
              variants={fadeUp}
              className="text-pretty leading-relaxed text-muted md:text-lg"
            >
              {t.rich(key, {
                hl: (chunks: React.ReactNode) => (
                  <span className="font-medium text-accent">{chunks}</span>
                ),
              })}
            </motion.p>
          ))}
        </div>

        {/* whoami identity card */}
        <motion.figure variants={fadeUp} className="min-w-0 lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-line bg-[#0d1412] shadow-xl shadow-black/20">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="size-2.5 rounded-full bg-white/15" aria-hidden />
              <span className="size-2.5 rounded-full bg-white/15" aria-hidden />
              <span className="size-2.5 rounded-full bg-brand-500/70" aria-hidden />
              <span className="ms-3 rounded-md border border-white/5 bg-white/5 px-2.5 py-0.5 font-mono text-xs text-[#93a8a0]">
                hashem.ts
              </span>
            </div>

            <div className="p-5">
              <div className="mb-4 flex items-center gap-4">
                <Image
                  src="/avatar.jpg"
                  alt="Hashem Mdoukh"
                  width={64}
                  height={64}
                  className="rounded-full ring-2 ring-brand-500/60 grayscale transition-[filter] duration-500 hover:grayscale-0"
                />
                <div>
                  <p className="font-semibold text-[#f0f5f3]">Hashem Mdoukh</p>
                  <p className="font-mono text-xs text-[#93a8a0]">$ whoami</p>
                </div>ok
              </div>

              <pre className="overflow-x-auto pb-1 font-mono text-[10px] leading-relaxed text-[#d6e2de] sm:text-[11px]">
                <code>{highlightCode(WHOAMI)}</code>
              </pre>

              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-brand-300 transition-opacity hover:opacity-80"
              >
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
                </span>
                {"// hiring? say hello ↓"}
              </a>
            </div>
          </div>
        </motion.figure>
      </motion.div>

      {/* timezone overlap bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 rounded-2xl border border-line bg-surface/60 p-6"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {t("overlapTitle")}
        </p>

        <div className="mt-5 space-y-3">
          {zones.map((zone, i) => {
            const left = ((zone.start - TRACK_START) / TRACK_HOURS) * 100;
            const width = ((zone.end - zone.start) / TRACK_HOURS) * 100;
            const oStart = Math.max(zone.start, MY_START);
            const oEnd = Math.min(zone.end, MY_END);
            const oLeft = ((oStart - TRACK_START) / TRACK_HOURS) * 100;
            const oWidth = ((oEnd - oStart) / TRACK_HOURS) * 100;

            return (
              <div key={zone.city} className="grid items-center gap-3 sm:grid-cols-[11rem_1fr]">
                <span className="font-mono text-xs text-muted">{zone.city}</span>
                <div className="relative h-3 overflow-hidden rounded-full bg-line">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                    className={`absolute inset-y-0 origin-left rounded-full ${
                      zone.me ? "bg-brand-500" : "bg-muted/30"
                    }`}
                    style={{ left: `${left}%`, width: `${width}%` }}
                  />
                  {!zone.me && oWidth > 0 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                      className="absolute inset-y-0 origin-left rounded-full bg-brand-400/70"
                      style={{ left: `${oLeft}%`, width: `${oWidth}%` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 grid sm:grid-cols-[11rem_1fr]">
          <span className="hidden sm:block" />
          <div className="flex justify-between font-mono text-[10px] text-muted" aria-hidden>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
            <span>24:00</span>
          </div>
        </div>

        <p className="mt-4 font-mono text-xs text-accent">{t("overlapCaption")}</p>
      </motion.div>
    </section>
  );
}
