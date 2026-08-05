"use client";

import { useRef, type ReactNode } from "react";

/**
 * Code-editor style cover: macOS chrome bar with the project's real
 * filename, a short syntax-highlighted snippet, and a cursor-tracked
 * emerald spotlight. Mouse position is written straight to CSS vars
 * (no state, no re-renders).
 */
export function ProjectFrame({
  filename,
  children,
}: {
  filename: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="group/frame relative overflow-hidden rounded-2xl border border-line bg-[#0d1412] shadow-xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1"
    >
      {/* per-project gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 85% -10%, rgb(16 185 129 / 0.14), transparent 55%)",
        }}
      />
      {/* cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(16 185 129 / 0.09), transparent 70%)",
        }}
      />

      {/* chrome bar */}
      <div className="relative flex min-w-0 items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" aria-hidden />
        <span className="size-2.5 rounded-full bg-white/15" aria-hidden />
        <span className="size-2.5 rounded-full bg-brand-500/70" aria-hidden />
        <span className="min-w-0 truncate ms-3 rounded-md border border-white/5 bg-white/5 px-2.5 py-0.5 font-mono text-xs text-[#93a8a0]">
          {filename}
        </span>
      </div>

      {/* snippet body */}
      <pre className="relative overflow-x-auto p-5 font-mono text-[10px] md:text-[13px] leading-relaxed" dir="ltr">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* Minimal hand-tokenized syntax colors — fixed values on the fixed-dark
   editor panel, independent of the site theme. */
export const tok = {
  kw: "text-[#c792ea]",
  fn: "text-[#82aaff]",
  str: "text-[#c3e88d]",
  type: "text-[#ffcb6b]",
  num: "text-[#f78c6c]",
  cm: "text-[#546e7a]",
  base: "text-[#d6e2de]",
  punc: "text-[#89a8a0]",
} as const;

export function Kw({ children }: { children: ReactNode }) {
  return <span className={tok.kw}>{children}</span>;
}
export function Fn({ children }: { children: ReactNode }) {
  return <span className={tok.fn}>{children}</span>;
}
export function Str({ children }: { children: ReactNode }) {
  return <span className={tok.str}>{children}</span>;
}
export function Type({ children }: { children: ReactNode }) {
  return <span className={tok.type}>{children}</span>;
}
export function Num({ children }: { children: ReactNode }) {
  return <span className={tok.num}>{children}</span>;
}
export function Cm({ children }: { children: ReactNode }) {
  return <span className={tok.cm}>{children}</span>;
}
export function Base({ children }: { children: ReactNode }) {
  return <span className={tok.base}>{children}</span>;
}
