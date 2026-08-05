"use client";

import { useEffect, useState } from "react";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/projects";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const t = (key: string) => ({ rights: "All rights reserved.", note: "Designed & built by Hashem Mdoukh — Next.js 15 · Tailwind v4 · Framer Motion", place: "Built in Gaza, Palestine 🇵🇸" }[key] ?? "");
  const year = new Date().getFullYear();

  // easter egg for anyone who opens DevTools
  useEffect(() => {
    console.log(
      "%c<hm /> %cHey, curious dev 👋 The whole site is hand-built — Next.js 15, Tailwind v4, Framer Motion. Want to talk shop? mr.mdoukh@gmail.com",
      "color:#34d399;font-family:monospace;font-weight:bold;font-size:14px",
      "color:#93a8a0;font-family:monospace",
    );
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* giant ghost watermark */}
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-mono text-[13vw] font-extrabold leading-none tracking-tighter text-ink/4"
      >
        &lt;hashem /&gt;
      </p>

      {/* colophon */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 pb-10 pt-4 text-center sm:flex-row sm:justify-between sm:text-start">
        <div>
          <p className="font-mono font-bold text-ink">
            <span className="text-accent">&lt;</span>hm
            <span className="text-accent"> /&gt;</span>
          </p>
          <p className="mt-1 text-sm text-muted">{t("note")}</p>
          <p className="mt-1 font-mono text-xs text-muted">
            {t("place")} · © {year} · {t("rights")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <GithubIcon />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>

      {/* IDE status bar — the engineer's signature */}
      <div className="border-t border-white/5 bg-[#0d1412]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-5 gap-y-1 px-5 py-2 font-mono text-[11px] text-[#7d938b]">
          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-300"
            >
              <BranchIcon /> main
            </a>
            <span className="inline-flex items-center gap-1" title="No errors, ever 😉">
              <CrossCircleIcon /> 0 <WarnIcon /> 0
            </span>
            <span className="hidden items-center gap-1 sm:inline-flex">
              <CheckIcon /> Prettier
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Ln 42, Col 7</span>
            <span className="hidden sm:inline">UTF-8</span>
            <span title="Built in Gaza, Palestine 🇵🇸">
              Gaza — <GazaClock />
            </span>
            <span className="inline-flex items-center gap-1.5 text-brand-300">
              <span className="size-1.5 rounded-full bg-brand-400" aria-hidden />
              TypeScript React
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GazaClock() {
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

  return <time suppressHydrationWarning>{time ?? "--:--"}</time>;
}

function BranchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}
function CrossCircleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </svg>
  );
}
function WarnIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3zM12 9v4M12 17h.01" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
