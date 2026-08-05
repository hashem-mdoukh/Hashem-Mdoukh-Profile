"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MiniCode } from "@/components/ui/MiniCode";
import { tree, patternMeta, type PatternKey } from "@/components/sections/architectureData";

export function Architecture() {
  const copy = { no: "02", title: "How I engineer", subtitle: "Feature-based monorepos, design systems, and scalable React. Explore the architecture — every annotated node is a pattern I work with.", explorer: "EXPLORER · hashem-monorepo", inspector: "PATTERN INSPECTOR", seeProjects: "See it applied in my projects", index: [{ label: "Core", items: "React 19 · Next.js 15 · TypeScript · Tailwind CSS v4" }, { label: "Architecture", items: "Turborepo · pnpm workspaces · Design Systems · Feature-based modules" }, { label: "Data", items: "TanStack Query · TanStack Router · REST APIs · DTO mapping" }, { label: "Backend", items: "Node.js · Express.js · MongoDB · Mongoose" }, { label: "Also", items: "Angular · MUI · Mantine UI · Jotai · CSS Modules · Vite · Git" }], items: { feature: { title: "Feature-based Architecture", claim: "Each domain owns its views, hooks, APIs and services.", desc: "Features are isolated modules with strict boundaries — nothing reaches into another feature's internals. New domains scale the codebase horizontally instead of deepening the tangle." } } };
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
          <div className="relative min-w-0 p-4 sm:p-6 lg:col-span-3 lg:min-h-[420px]">
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
                <p className="mt-1 break-words font-mono text-sm text-brand-300">
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
                  className="group/link mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-brand-300 transition-opacity hover:opacity-80"
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

      {/* always-visible keyword layer for skimmers */}
      <motion.dl
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-6 space-y-1.5 rounded-2xl border border-line bg-surface/60 p-4 font-mono text-sm sm:p-6"
      >
        {(t.raw("index") as { label: string; items: string }[]).map((line) => (
          <div key={line.label} className="flex min-w-0 flex-wrap gap-x-3">
            <dt className="w-28 shrink-0 font-semibold text-accent">{line.label}</dt>
            <dd className="min-w-0 break-words text-muted">{line.items}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
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
