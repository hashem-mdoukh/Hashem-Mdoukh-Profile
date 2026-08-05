"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/projects";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export function Contact() {
  const t = (key: string) => ({ no: "05", kicker: "What's next?", title: "Let's build something.", body: "I'm looking for a remote front-end role with a team that cares about the details. My inbox is open — whether you have a role, a project, or just a question about something I built. Based in Gaza (UTC+3) — full-day overlap with European teams, mornings with US East.", email: "mr.mdoukh@gmail.com", copyHint: "Click to copy", copied: "Copied to clipboard", mailApp: "open in mail app", mailSubject: "Hi Hashem — saw your portfolio", statusOpen: "Open to remote roles", statusLocation: "Gaza, Palestine", statusReply: "replies < 24h", localTime: "local", cv: "Résumé" }[key] ?? "");
  const email = t("email");
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 px-5 py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
        />

        <motion.p variants={fadeUp} className="relative font-mono text-sm text-accent">
          {t("no")}. {t("kicker")}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="relative mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="relative mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-muted"
        >
          {t("body")}
        </motion.p>

        {/* the email IS the design element */}
        <motion.div variants={fadeUp} className="relative mt-10">
          <button
            type="button"
            onClick={copyEmail}
            title={t("copyHint")}
            className="group/mail mx-auto block max-w-full cursor-pointer break-all font-mono text-[clamp(1.25rem,5vw,2.75rem)] font-bold text-ink transition-colors hover:text-accent"
          >
            {email}
            <span className="mx-auto mt-1 block h-0.5 w-0 bg-brand-400 transition-all duration-300 motion-reduce:transition-none group-hover/mail:w-full" />
          </button>
          <p aria-live="polite" className="mt-3 h-5 font-mono text-xs text-muted">
            {copied ? (
              <span className="font-semibold text-accent">✓ {t("copied")}</span>
            ) : (
              t("copyHint")
            )}
          </p>
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(t("mailSubject"))}`}
            className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            {t("mailApp")}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform motion-reduce:transition-none group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              aria-hidden>
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </motion.div>

        {/* shell-prompt status line */}
        <motion.p
          variants={fadeUp}
          className="relative mt-10 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-line bg-surface/60 px-5 py-2 font-mono text-xs text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
            </span>
            <span className="text-ink">{t("statusOpen")}</span>
          </span>
          <span aria-hidden>·</span>
          <span>{t("statusLocation")}</span>
          <span aria-hidden>·</span>
          <LocalTime label={t("localTime")} />
          <span aria-hidden>·</span>
          <span className="text-ink">{t("statusReply")}</span>
        </motion.p>

        {/* links */}
        <motion.div
          variants={fadeUp}
          className="relative mt-8 flex items-center justify-center gap-6"
        >
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent">
            <GithubIcon />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent">
            <LinkedinIcon />
          </a>
          <a href="/Hashem_Mdoukh_ATS.pdf" target="_blank" rel="noreferrer"
            className="font-mono text-sm text-muted transition-colors hover:text-accent">
            {t("cv")} ↗
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function LocalTime({ label }: { label: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Gaza",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning>
      {time ?? "--:--"} {label}
    </span>
  );
}
