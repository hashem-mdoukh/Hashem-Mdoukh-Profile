import type { ReactNode } from "react";

/* Lightweight regex highlighter for short, controlled snippets.
   Groups: 1 comment · 2 string · 3 keyword · 4 Type · 5 number */
const TOKEN =
  /(\/\/.*$)|("[^"]*"|'[^']*'|`[^`]*`)|\b(export|const|function|return|interface|type|async|await|import|from|satisfies|new|extends|implements)\b|\b([A-Z][A-Za-z0-9]*)\b|\b(\d[\d_]*)\b/gm;

const COLORS = [
  "", // unused (full match)
  "text-[#546e7a]", // comment
  "text-[#c3e88d]", // string
  "text-[#c792ea]", // keyword
  "text-[#ffcb6b]", // Type
  "text-[#f78c6c]", // number
];

export function highlightCode(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of code.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(code.slice(last, idx));
    const group = m.slice(1).findIndex((g) => g !== undefined) + 1;
    out.push(
      <span key={key++} className={COLORS[group]}>
        {m[0]}
      </span>,
    );
    last = idx + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

/** Small fixed-dark code excerpt with a filename caption. */
export function MiniCode({ file, code }: { file?: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/5 bg-black/30">
      {file && (
        <div className="border-b border-white/5 px-3.5 py-1.5 font-mono text-[11px] text-[#7d938b]">
          {file}
        </div>
      )}
      <pre className="overflow-x-auto p-3.5 font-mono text-xs leading-relaxed text-[#d6e2de]">
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
}
