"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/projects";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

/* Output lines never type — they cascade in like a real terminal. */
const cascade: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const line: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } },
};

export function Hero() {
  const t = (key: string) => ({ terminalTitle: "hashem@gaza — zsh", prompt: "❯", cmd: "npx hashem@latest", name: "Hashem Mdoukh", role: "Front-End Engineer — React · Next.js · TypeScript", tagline: "Fast, scalable, accessible web apps — feature-based architectures & design systems.", statusKey: "status", statusVal: "open to remote & international roles", locationKey: "location", locationVal: "Gaza, Palestine (UTC+2/3) · async-first", linksKey: "links", ctaPrimary: "./view-projects", ctaSecondary: "./contact-me", ctaResume: "resume.pdf", skip: "click to skip ↵" }[key] ?? "");
  const shouldReduce = useReducedMotion();
  const [done, setDone] = useState(false);

  // reduced motion or repeat visit this session → skip straight to the end state
  useEffect(() => {
    if (shouldReduce || sessionStorage.getItem("heroPlayed")) setDone(true);
  }, [shouldReduce]);

  const finish = useCallback(() => {
    setDone(true);
    try {
      sessionStorage.setItem("heroPlayed", "1");
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  return (
    <section id="top" className="relative overflow-hidden px-5 pt-24 pb-20 sm:pt-32 sm:pb-24">
      {/* the terminal is the light source */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 left-1/2 size-120 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0.4, y: 12, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative mx-auto max-w-3xl"
      >
        {/* crawler/AT text, complete from the first byte */}
        <h1 className="sr-only">
          {t("name")} — {t("role")}. {t("tagline")}
        </h1>

        <div
          onClick={done ? undefined : finish}
          onKeyDown={done ? undefined : (e) => e.key === "Enter" && finish()}
          role={done ? undefined : "button"}
          tabIndex={done ? undefined : 0}
          aria-label={done ? undefined : "Skip intro animation"}
          className="overflow-hidden rounded-2xl border border-white/8 bg-[#0c1210] shadow-2xl shadow-black/30 [box-shadow:0_0_80px_-20px_rgb(52_211_153/0.19),0_25px_50px_-12px_rgb(0_0_0/0.4)]"
        >
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <span className="size-3 rounded-full bg-[#ff5f57]/70" aria-hidden />
            <span className="size-3 rounded-full bg-[#febc2e]/70" aria-hidden />
            <span className="size-3 rounded-full bg-brand-500/80" aria-hidden />
            <span className="ms-3 font-mono text-xs text-[#7d938b]">{t("terminalTitle")}</span>
            {!done && (
              <span className="ms-auto hidden font-mono text-[11px] text-white/20 sm:inline">
                {t("skip")}
              </span>
            )}
          </div>

          <div className="relative min-h-105 p-5 font-mono text-sm leading-relaxed sm:p-8">
            {/* ❯ npx hashem@latest */}
            <TypedCommand
              prompt={t("prompt")}
              command={t("cmd")}
              instant={done}
              onDone={finish}
            />

            {/* output cascade — appears, never types */}
            {done && (
              <motion.div variants={cascade} initial="hidden" animate="show">
                <motion.div variants={line} className="mt-5">
                  <p className="font-sans text-4xl font-extrabold tracking-tight text-[#f0f5f3] sm:text-6xl">
                    {t("name")}
                    <span className="text-brand-400">.</span>
                  </p>
                </motion.div>
                <motion.p variants={line} className="mt-2 text-sm text-brand-300 sm:text-base">
                  {t("role")}
                </motion.p>
                <motion.p
                  variants={line}
                  className="mt-1 max-w-xl text-pretty text-[13px] text-[#93a8a0]"
                >
                  {t("tagline")}
                </motion.p>

                <motion.div variants={line} className="mt-5 space-y-1 text-[13px]">
                  <OutputRow k={t("statusKey")}>
                    <span className="inline-flex items-center gap-2 text-[#c9d8d3]">
                      <span className="relative flex size-2" aria-hidden>
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-60 motion-reduce:animate-none" />
                        <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
                      </span>
                      {t("statusVal")}
                    </span>
                  </OutputRow>
                  <OutputRow k={t("locationKey")}>
                    <span className="text-[#c9d8d3]">{t("locationVal")}</span>
                  </OutputRow>
                  <OutputRow k={t("linksKey")}>
                    <span className="inline-flex items-center gap-3">
                      <a href={GITHUB_URL} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#c9d8d3] transition-colors hover:text-brand-300">
                        <GithubIcon size={14} /> github ↗
                      </a>
                      <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#c9d8d3] transition-colors hover:text-brand-300">
                        <LinkedinIcon size={14} /> linkedin ↗
                      </a>
                      <a href="/Hashem_Mdoukh_ATS.pdf" target="_blank" rel="noreferrer"
                        className="text-[#c9d8d3] underline decoration-brand-500/50 underline-offset-4 transition-colors hover:text-brand-300">
                        {t("ctaResume")}
                      </a>
                    </span>
                  </OutputRow>
                </motion.div>

                <motion.div variants={line} className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    className="rounded-lg bg-cta px-5 py-2.5 text-sm font-semibold text-cta-ink shadow-lg shadow-glow transition-transform hover:scale-[1.03]"
                  >
                    {t("ctaPrimary")}
                  </a>
                  <a
                    href="#contact"
                    className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-semibold text-[#f0f5f3] transition-colors hover:border-brand-500 hover:text-brand-300"
                  >
                    {t("ctaSecondary")}
                  </a>
                </motion.div>

                {/* resting prompt — the page's heartbeat */}
                <motion.p variants={line} className="mt-6">
                  <span className="text-brand-400">{t("prompt")}</span>
                  <span className="animate-caret ms-2 inline-block h-4 w-2 translate-y-0.5 rounded-[1px] bg-brand-400" aria-hidden />
                </motion.p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function OutputRow({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-3">
      <span className="w-20 shrink-0 text-[#5d7269]">{k}</span>
      <span className="text-brand-400" aria-hidden>
        ▸
      </span>
      {children}
    </p>
  );
}

/** The only thing that types: the command, with human cadence. */
function TypedCommand({
  prompt,
  command,
  instant,
  onDone,
}: {
  prompt: string;
  command: string;
  instant: boolean;
  onDone: () => void;
}) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (instant) return;
    if (count >= command.length) {
      const id = setTimeout(() => doneRef.current(), 300);
      return () => clearTimeout(id);
    }
    // 650ms initial beat, then ~38ms/char ±40% with human pauses
    let delay = count === 0 ? 650 : 38 * (0.6 + Math.random() * 0.8);
    if (command[count - 1] === " ") delay += 45;
    if ("@./-".includes(command[count] ?? "")) delay += 60;
    const id = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(id);
  }, [instant, count, command]);

  return (
    <p className="text-[#c9d8d3]">
      <span className="text-brand-400">{prompt}</span>{" "}
      <span>{instant ? command : command.slice(0, count)}</span>
      {/* solid while typing, blinking only while idle-waiting to start */}
      {!instant && (
        <span
          className={`ms-0.5 inline-block h-4 w-2 translate-y-0.5 rounded-[1px] bg-brand-400 ${
            count === 0 ? "animate-caret" : ""
          }`}
          aria-hidden
        />
      )}
    </p>
  );
}
