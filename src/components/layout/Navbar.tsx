"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { GITHUB_URL } from "@/lib/projects";

const NAV_ITEMS = [
  { key: "projects", href: "#projects", id: "projects", no: "01" },
  { key: "architecture", href: "#architecture", id: "architecture", no: "02" },
  { key: "experience", href: "#experience", id: "experience", no: "03" },
  { key: "about", href: "#about", id: "about", no: "04" },
  { key: "contact", href: "#contact", id: "contact", no: "05" },
] as const;

export function Navbar() {
  const labels = { projects: "Projects", architecture: "Architecture", experience: "Experience", about: "About", contact: "Contact" };
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 8);
    // hide when scrolling down past the hero, reveal on any scroll up
    setHidden(latest > prev && latest > 400 && !open);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`sticky inset-0 z-50 border-b bg-base/70 backdrop-blur-md transition-shadow ${
        scrolled ? "border-line shadow-lg shadow-black/5" : "border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:inset-s-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-cta focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cta-ink"
      >
        Skip to content
      </a>

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* <hm /> mark + terminal-path name */}
        <a href="#top" className="group/logo flex shrink-0 items-baseline gap-3">
          <span className="whitespace-nowrap font-mono text-lg font-bold tracking-tight text-ink">
            <span className="text-accent transition-transform">&lt;</span>
            hm
            <span className="text-accent">
              {" "}
              /&gt;
            </span>
          </span>
          {/* hidden between md and lg: the desktop nav appears at md and the
              two together overflow the bar, which squeezed the logo onto
              two lines */}
          <span className="hidden items-baseline font-mono text-sm text-muted transition-colors group-hover/logo:text-ink sm:inline-flex md:hidden lg:inline-flex">
            hashem<span className="text-accent">-</span>mdoukh
            <span
              aria-hidden
              className="animate-caret ms-1 inline-block h-3.5 w-1.75 self-center rounded-[1px] bg-brand-400"
            />
          </span>
        </a>

        <ul className="hidden items-center gap-5 md:flex lg:gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.key} className="relative">
              <a
                href={item.href}
                aria-current={active === item.id ? "true" : undefined}
                /* padding on an inline link grows the hit area to the 24px
                   minimum without changing the line box, so the active
                   underline stays put */
                className={`py-1.5 font-mono text-[13px] transition-colors hover:text-ink ${
                  active === item.id ? "text-ink" : "text-muted"
                }`}
              >
                <span
                  className={`me-1 text-[11px] transition-colors ${
                    active === item.id ? "text-accent" : "text-muted/60"
                  }`}
                >
                  {item.no}.
                </span>
                {labels[item.key]}
              </a>
              {active === item.id && (
                <motion.span
                  layoutId="nav-active"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-x-0 -bottom-1.5 h-px bg-brand-400"
                  aria-hidden
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-full border border-line bg-surface/60 text-muted transition-colors hover:text-accent"
          >
            <GithubIcon size={17} />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-full border border-line bg-surface/60 text-ink md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* scroll progress beam */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-linear-to-r from-brand-500 to-brand-300"
      />

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-base/95 md:hidden"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.li
                key={item.key}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                className="border-b border-line last:border-0"
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3.5 font-mono text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <span className="me-2 text-xs text-accent">{item.no}.</span>
                  {labels[item.key]}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/** Scrollspy: highlights the nav link of the section in view. */
function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
