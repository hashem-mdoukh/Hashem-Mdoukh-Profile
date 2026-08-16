"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MiniCode } from "@/components/ui/MiniCode";
import {
  tree,
  patternMeta,
  stackDomains,
  type PatternKey,
  type StackDomain,
  type StackIcon,
} from "@/components/sections/architectureData";
import { fadeUp, stagger } from "@/lib/motion";
import { StackGraph } from "@/components/sections/StackGraph";

export function Architecture() {
  const copy = { no: "02", title: "How I engineer", subtitle: "Feature-based monorepos, design systems, and scalable React. Explore the architecture — every annotated node is a pattern I work with.", explorer: "EXPLORER · hashem-monorepo", inspector: "PATTERN INSPECTOR", seeProjects: "See it applied in my projects", items: { feature: { title: "Feature-based Architecture", claim: "Each domain owns its views, hooks, APIs and services.", desc: "Features are isolated modules with strict boundaries — nothing reaches into another feature's internals. New domains scale the codebase horizontally instead of deepening the tangle." } } };
  const t: any = Object.assign((key: keyof typeof copy) => copy[key], { raw: (key: keyof typeof copy) => copy[key] });
  const [selected, setSelected] = useState<PatternKey>("feature");
  const meta = patternMeta[selected];
  const item = ({ monorepo: { title: "Monorepo — Turborepo + pnpm", claim: "One repo, many apps, zero duplicated code.", desc: "Shared packages and cached builds keep multiple applications consistent." }, designSystem: { title: "Shared Design System", claim: "UI primitives every app consumes, never copies.", desc: "Reusable tokens and component primitives keep every application visually consistent." }, flags: { title: "Context-based Feature Flags", claim: "Ship features dark, release them remotely.", desc: "Context-driven flags enable gradual rollouts without redeploying." }, feature: copy.items.feature, components: { title: "Compound & Headless Components", claim: "Logic and rendering, decoupled.", desc: "Composable component APIs separate behaviour from markup." }, hooks: { title: "Server State — TanStack Query", claim: "Caching, deduplication and sync, engineered.", desc: "Query hooks manage server state with precise cache control." }, services: { title: "Dependency Inversion (DIP)", claim: "UI depends on interfaces, never on APIs.", desc: "Stable interfaces make API clients swappable and testable." }, mappers: { title: "DTO → Domain Mapping", claim: "Transport types stop at the boundary.", desc: "API payloads are mapped into stable domain models at the edge." } } as const)[selected];

  return (
    <section id="architecture" className="scroll-mt-20 px-5 py-20">
      <SectionHeading no={t("no")}>{t("title")}</SectionHeading>
      <p className="-mt-4 mb-10 max-w-2xl text-pretty text-muted">{t("subtitle")}</p>

      <div className="min-w-0 overflow-hidden rounded-2xl border border-line bg-[#0d1412] shadow-xl shadow-black/20">
        {/* IDE chrome */}
        <div className="flex min-w-0 items-center gap-2 border-b border-white/5 px-3 py-3 sm:px-4">
          <span className="size-2.5 shrink-0 rounded-full bg-white/15" aria-hidden />
          <span className="size-2.5 shrink-0 rounded-full bg-white/15" aria-hidden />
          <span className="size-2.5 shrink-0 rounded-full bg-brand-500/70" aria-hidden />
          <span
            className="ms-2 min-w-0 truncate font-mono text-[10px] uppercase tracking-widest text-[#7d938b] sm:ms-3 sm:text-[11px]"
            title={t("explorer")}
          >
            <span className="sm:hidden">Explorer</span>
            <span className="hidden sm:inline">{t("explorer")}</span>
          </span>
        </div>

        <div className="grid min-w-0 lg:grid-cols-5">
          {/* file tree */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.04 }}
            className="min-w-0 border-b border-white/5 p-2.5 font-mono text-xs leading-relaxed sm:p-3 sm:text-[13px] lg:col-span-2 lg:border-b-0 lg:border-e"
          >
            {tree.map((row) => {
              const isSelectable = !!row.pattern;
              const isSelected = row.pattern === selected;
              return (
                <motion.li
                  key={`${row.depth}-${row.label}`}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                  }}
                >
                  <button
                    type="button"
                    disabled={!isSelectable}
                    aria-pressed={isSelectable ? isSelected : undefined}
                    onClick={() => row.pattern && setSelected(row.pattern)}
                    style={{ paddingInlineStart: `${row.depth * 16 + 10}px` }}
                    className={`group/row flex w-full items-center gap-2 rounded-md py-1 pe-2 text-start transition-colors ${
                      isSelected
                        ? "bg-white/5 text-brand-300"
                        : isSelectable
                          ? "cursor-pointer text-[#c9d8d3] hover:bg-white/5 hover:text-brand-300"
                          : "text-[#5d7269]"
                    }`}
                  >
                    <span aria-hidden className="shrink-0 text-[#5d7269]">
                      {row.kind === "folder" ? <FolderIcon open={isSelected} /> : <FileIcon />}
                    </span>
                    <span className="min-w-0 truncate">
                      {row.label}
                      {row.kind === "folder" ? "/" : ""}
                    </span>
                    {isSelectable && (
                      <span
                        aria-hidden
                        className={`ms-auto size-1.5 shrink-0 rounded-full transition-colors ${
                          isSelected ? "bg-brand-400" : "bg-brand-500/40 group-hover/row:bg-brand-400"
                        }`}
                      />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* pattern inspector */}
          <div className="relative min-w-0 p-4 sm:p-6 lg:col-span-3 lg:min-h-105">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[#5d7269]">
              {t("inspector")}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="min-w-0"
              >
                <h3 className="text-lg font-bold text-[#f0f5f3]">
                  {item.title}
                </h3>
                <p className="mt-1 wrap-break-words font-mono text-sm text-brand-300">
                  {item.claim}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#93a8a0]">
                  {item.desc}
                </p>

                <div className="mt-4 min-w-0">
                  <MiniCode file={meta.file} code={meta.code} />
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {meta.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full bg-brand-500/10 px-3 py-1 font-mono text-xs font-medium text-brand-300"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>

                <a
                  href="#projects"
                  className="group/link mt-5 inline-flex min-h-6 items-center gap-1.5 font-mono text-xs font-semibold text-brand-300 transition-opacity hover:opacity-80"
                >
                  {t("seeProjects")}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="transition-transform motion-reduce:transition-none group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    aria-hidden>
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* the map: an ornament on top of content that already works as a list */}
      <StackGraph />

      {/* always-visible keyword layer for skimmers */}
      <StackIndex />
    </section>
  );
}

/**
 * Skim layer under the explorer. Deliberately calmer than the IDE panel:
 * it carries the keywords a recruiter greps for, weighted by how much
 * of it is genuinely day-to-day work.
 */
function StackIndex() {
  const isNarrow = useMediaQuery("(max-width: 639px)");
  const shouldReduce = useReducedMotion();
  const mobile = isNarrow === true && !shouldReduce;
  const film = mobile && MOBILE_STACK === "filmstrip";
  const deckMode = mobile && MOBILE_STACK !== "filmstrip" ? MOBILE_STACK : null;

  const wrapRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [{ travel, rowH, cardW, viewH }, setMetrics] = useState({
    travel: 0,
    rowH: 0,
    cardW: 0,
    viewH: 0,
  });
  const [active, setActive] = useState(0);

  /* Widths are unaffected by translateX, so the track is measured from one
     card rather than read back off a transformed element. */
  useEffect(() => {
    if (!film) {
      setMetrics({ travel: 0, rowH: 0, cardW: 0, viewH: 0 });
      return;
    }
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;
      const cardW = card.getBoundingClientRect().width;
      const trackW = stackDomains.length * cardW + (stackDomains.length - 1) * TRACK_GAP;
      setMetrics({
        travel: Math.max(0, Math.round(trackW - viewport.clientWidth)),
        // the whole pinned block — track plus the dots under it
        rowH: Math.round(viewport.getBoundingClientRect().height),
        cardW: Math.round(cardW),
        viewH: window.innerHeight,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [film]);

  /* Cards are only as tall as their content, so pinning at a fixed offset
     would leave a screenful of dead space under them. Centring the block
     splits that space evenly instead, and keeps the section short. */
  const filmTop =
    rowH > 0
      ? Math.max(
          STICKY_TOP,
          // capped: on tall screens true centre sits too low, and the eye
          // reads slightly-above-centre as centred
          Math.min(Math.round((viewH - rowH) / 2), Math.round(viewH * 0.3)),
        )
      : STICKY_TOP;

  /* Anchored in pixels rather than "start start"/"end end": the pinned track
     is far shorter than the viewport, so edge-relative offsets would measure
     the wrong span and could invert. */
  const offset = useMemo(
    () => [`start ${filmTop}px`, `end ${filmTop + rowH}px`],
    [filmTop, rowH],
  ) as never;
  const { scrollYProgress } = useScroll({ target: wrapRef, offset });

  /* A straight linear pan leaves you between two half-cards at almost every
     scroll position, so nothing is readable. Instead each card gets a slot:
     it holds still for the first part of the slot, then moves to the next.
     The result behaves like a slider with detents rather than a pan. */
  const [stopsIn, stopsOut] = useMemo(() => {
    const count = stackDomains.length;
    const step = cardW + TRACK_GAP;
    // last card is flush with the right edge, so its stop is clamped
    const stops = Array.from({ length: count }, (_, i) =>
      -Math.min(i * step, travel),
    );
    const input: number[] = [];
    const output: number[] = [];
    for (let i = 0; i < count - 1; i++) {
      const slot = i / (count - 1);
      input.push(slot, slot + DWELL / (count - 1));
      output.push(stops[i], stops[i]);
    }
    input.push(1);
    output.push(stops[count - 1]);
    return [input, output];
  }, [cardW, travel]);

  const x = useTransform(scrollYProgress, stopsIn, stopsOut, { ease: deckEase });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.round(p * (stackDomains.length - 1));
    setActive((current) => (current === next ? current : next));
  });

  /* Focusing a card that is off to the side makes the browser scroll the
     clipped viewport, which then fights the transform. Pin it back to 0. */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !film) return;
    const reset = () => {
      if (viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
    };
    viewport.addEventListener("scroll", reset);
    return () => viewport.removeEventListener("scroll", reset);
  }, [film]);

  const trackLayout =
    MOBILE_STACK === "filmstrip"
      ? "max-sm:flex max-sm:flex-nowrap max-sm:gap-3"
      : "max-sm:block max-sm:space-y-3";

  return (
    <div className="mt-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <h3 className="text-lg font-bold tracking-tight text-ink">
          The stack, and where it&rsquo;s proven
        </h3>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] text-muted">
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-1.5 rounded-full bg-brand-400" />
            Daily driver
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-1.5 rounded-full border border-current" />
            Working knowledge
          </li>
        </ul>
      </div>

      {/* tall enough to spend the whole track on scroll; inert above sm */}
      <div
        ref={wrapRef}
        style={
          film
            ? { height: rowH + SCROLL_PER_CARD * (stackDomains.length - 1) }
            : undefined
        }
      >
        <div
          ref={viewportRef}
          style={film ? { top: filmTop } : undefined}
          className={film ? "sticky" : undefined}
        >
          {/* clipping sits here, not on the pinned block, so the dots below
              stay visible while the track is cut off at both edges */}
          <div className={film ? "overflow-hidden" : undefined}>
            <motion.ul
              ref={trackRef}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              style={film ? { x } : undefined}
              className={`min-w-0 sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-6 ${trackLayout}`}
            >
              {stackDomains.map((domain, i) => (
                <StackTile
                  key={domain.key}
                  domain={domain}
                  index={i}
                  deckMode={deckMode}
                  film={film}
                />
              ))}
            </motion.ul>
          </div>

          {film && (
            <ol className="mt-5 flex items-center justify-center gap-2" aria-hidden>
              {stackDomains.map((domain, i) => (
                <li
                  key={domain.key}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-brand-400" : "w-1.5 bg-line"
                  }`}
                />
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * In deck mode the list item itself must stay neutral — the swing lives on
 * the inner card. It cannot simply drop its `variants`: the parent mounts
 * children in `hidden`, and an element with no variants has no `show` to
 * resolve, so it would stay stranded at opacity 0.
 */
const deckNeutral: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

/**
 * How the stack behaves below `sm`. Change this one value to switch:
 *
 *   "filmstrip" — all five cards ride one horizontal track that is pulled
 *                 left as you scroll. No pinning, no stacking.
 *   "slide"     — cards pin and stack; each new one travels in flat from
 *                 the right and covers the last.
 *   "flip"      — same stacking, but each card hinges on its own right edge
 *                 and swings in through 3D space.
 *
 * All three are kept working; switching is a one-line edit.
 */
const MOBILE_STACK: "filmstrip" | "slide" | "flip" = "flip";

/** Gap between cards in the filmstrip track — matches `gap-3`. */
const TRACK_GAP = 12;
/** Where the track pins while it plays — matches `top-24`. */
const STICKY_TOP = 96;
/**
 * Share of each card's scroll slot spent holding still before moving to the
 * next. 0 is a continuous pan (readable almost nowhere); higher values give
 * longer reading time and a snappier hand-off.
 */
const DWELL = 0.55;
/**
 * Vertical scroll spent advancing one card. Deliberately independent of how
 * far the track actually moves sideways — tying the two together made the
 * section as tall as the track is wide, which is far more scrolling than
 * five cards are worth. Lower is snappier, higher is more gradual.
 */
const SCROLL_PER_CARD = 200;

/** the site's standard curve, so the deck decelerates like everything else */
const deckEase = cubicBezier(0.21, 0.47, 0.32, 0.98);

/**
 * One card. In `filmstrip` mode it is inert — the track above moves as a
 * whole, so a card never animates on its own. In the stacking modes it pins
 * and runs its own entrance. Above `sm` it is always a plain grid cell.
 */
function StackTile({
  domain,
  index,
  deckMode,
  film,
}: {
  domain: StackDomain;
  index: number;
  deckMode: "slide" | "flip" | null;
  film: boolean;
}) {
  const cardRef = useRef<HTMLLIElement>(null);
  const deck = deckMode !== null;

  /* Stacking modes only. The entrance is measured before the card pins —
     once it sticks, its bounding rect stops moving and no scroll progress can
     advance, so the depth cue underneath is the pin ledge, not a transform.
     It starts at 90% rather than the viewport edge because with an eased
     curve most of the travel happens early, and measuring from `end` spends
     it below the fold where nobody sees it. */
  const { scrollYProgress: entry } = useScroll({
    target: cardRef,
    offset: ["start 90%", "start 30%"],
  });

  const slide = deckMode === "slide";
  /* a full card-width of travel, eased so it decelerates into place instead
     of tracking the scroll wheel linearly */
  const x = useTransform(entry, [0, 1], [slide ? "100%" : "46%", "0%"], {
    ease: deckEase,
  });
  const rotateY = useTransform(entry, [0, 1], [slide ? 0 : -38, 0]);
  const opacity = useTransform(
    entry,
    [0, slide ? 0.5 : 0.7],
    [slide ? 0.3 : 0.2, 1],
  );

  // cursor-tracked spotlight; falls back to a static top-left glow
  const trackPointer = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.li
      ref={cardRef}
      variants={deck || film ? deckNeutral : fadeUp}
      /* stacking modes only: each card pins 10px lower than the one before,
         so every covered card keeps a visible ledge and it reads as a deck */
      style={deck ? { top: STICKY_TOP + index * 10 } : undefined}
      className={`min-w-0 ${
        film
          ? /* a shade under full width, so the next card peeks in at the edge
               and the track reads as a slider rather than a page */
            "max-sm:w-[88%] max-sm:shrink-0"
          : "max-sm:sticky max-sm:top-24"
      } ${domain.span}`}
    >
      <motion.div
        onMouseMove={trackPointer}
        /* the slide stays 2D on purpose — no perspective means no permanent
           3D compositing layer behind every card */
        style={
          deck
            ? slide
              ? { x, opacity }
              : { x, rotateY, opacity, transformPerspective: 1100, originX: 1 }
            : undefined
        }
        /* opaque + shadowed below sm: a translucent card would show the one
           it is covering straight through */
        className={`group/tile relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 p-5 transition-colors duration-300 motion-reduce:transition-none max-sm:bg-surface max-sm:shadow-2xl max-sm:shadow-black/50 lg:hover:border-brand-500/40 ${
          film
            ? /* no forced height: the flex row already stretches every card to
                 the tallest one, so each is exactly as tall as the content
                 needs and no taller */
              ""
            : "max-sm:min-h-60"
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 motion-reduce:transition-none lg:group-hover/tile:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--mx, 20%) var(--my, 0%), var(--glow), transparent 65%)",
          }}
        />

        <div className="relative flex min-w-0 grow flex-col">
          <div className="flex min-w-0 items-center gap-2.5">
            <span aria-hidden className="shrink-0 text-accent">
              <DomainIcon name={domain.icon} />
            </span>
            <h4 className="min-w-0 truncate font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              {domain.label}
            </h4>
            <span aria-hidden className="ms-auto shrink-0 font-mono text-[10px] text-muted/50">
              {domain.no}
            </span>
          </div>

          <p className="mt-3 text-pretty font-semibold leading-snug text-ink">
            {domain.claim}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {domain.items.map((item) => (
              <li
                key={item.name}
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-xs ${
                  item.level === "core"
                    ? "border-brand-500/30 bg-brand-500/10 font-medium text-accent"
                    : "border-line text-muted"
                }`}
              >
                <span
                  aria-hidden
                  className={`size-1.5 shrink-0 rounded-full ${
                    item.level === "core" ? "bg-brand-400" : "border border-current"
                  }`}
                />
                <span className="sr-only">
                  {item.level === "core" ? "Daily driver: " : "Working knowledge: "}
                </span>
                {item.name}
              </li>
            ))}
          </ul>

          <a
            href={domain.href}
            className="group/link mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-medium text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden className="font-mono text-accent">
              ↳
            </span>
            <span className="min-w-0">{domain.evidence}</span>
          </a>
        </div>
      </motion.div>
    </motion.li>
  );
}

/** null until mounted, so the server and first client paint agree */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

function DomainIcon({ name }: { name: StackIcon }) {
  const paths: Record<StackIcon, React.ReactNode> = {
    layers: <path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5" />,
    blocks: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
    sync: <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12a9 9 0 0 1 15.5-6.2M3 20v-5h5M21 4v5h-5" />,
    server: (
      <path d="M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01" />
    ),
    tool: (
      <path d="M14.7 6.3a4 4 0 0 1 5.3 5L21 12l-9 9-3-3 9-9-3.3-2.7ZM7 21l-4-4 4-4 4 4-4 4Z" />
    ),
  };

  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {open ? (
        <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
      ) : (
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      )}
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
