"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  VIEW_W,
  VIEW_H,
  graphColumns,
  graphNodes,
  graphEdges,
  nodeById,
  edgePath,
  buildAdjacency,
  relationSentences,
  type GraphNode,
} from "@/components/sections/stackGraphData";

/**
 * The stack as a dependency map.
 *
 * Structure follows the guidance for complex images: the SVG is decorative
 * and hidden from assistive tech (connectors carry no semantics there), the
 * nodes are real focusable buttons, and the relationships are restated as
 * prose in a visible disclosure below. Nothing here is the only copy of
 * anything — the grouped list under it holds the same facts.
 */
export function StackGraph() {
  const shouldReduce = useReducedMotion();
  const reduce = shouldReduce ?? false;

  const [active, setActive] = useState<string | null>(null);
  const [tabbable, setTabbable] = useState(graphNodes[0].id);
  const buttons = useRef(new Map<string, HTMLButtonElement>());

  const adjacency = useMemo(buildAdjacency, []);
  const relations = useMemo(relationSentences, []);
  const relationById = useMemo(
    () => new Map(relations.map((r) => [r.id, r.text])),
    [relations],
  );

  /** nodes grouped by column, top to bottom — the arrow-key grid */
  const grid = useMemo(
    () =>
      graphColumns.map((col) =>
        graphNodes.filter((n) => n.column === col.key).sort((a, b) => a.y - b.y),
      ),
    [],
  );

  const isLit = (id: string) =>
    active === null || active === id || adjacency.get(active)?.has(id) === true;

  const focusNode = (id: string) => {
    setTabbable(id);
    buttons.current.get(id)?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, node: GraphNode) => {
    const col = grid.findIndex((c) => c.some((n) => n.id === node.id));
    const row = grid[col].findIndex((n) => n.id === node.id);
    const clamp = (v: number, max: number) => Math.max(0, Math.min(v, max));

    // horizontal moves land on whichever node in the next column is nearest vertically
    const nearestIn = (targetCol: number) => {
      const column = grid[clamp(targetCol, grid.length - 1)];
      return column.reduce((best, n) =>
        Math.abs(n.y - node.y) < Math.abs(best.y - node.y) ? n : best,
      );
    };

    const next = {
      ArrowDown: () => grid[col][clamp(row + 1, grid[col].length - 1)],
      ArrowUp: () => grid[col][clamp(row - 1, grid[col].length - 1)],
      ArrowRight: () => nearestIn(col + 1),
      ArrowLeft: () => nearestIn(col - 1),
      Home: () => grid[col][0],
      End: () => grid[col][grid[col].length - 1],
    }[event.key];

    if (!next) return;
    event.preventDefault();
    focusNode(next().id);
  };

  return (
    <figure className="m-0 mt-10 hidden lg:block">
      <figcaption className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h3 className="text-lg font-bold tracking-tight text-ink">
          Dependency map
        </h3>
        <p className="font-mono text-[11px] text-muted">
          {graphNodes.length} technologies · {graphEdges.length} relationships ·
          hover or focus a node to trace its connections
        </p>
      </figcaption>

      {/* column headings, aligned to the graph's own coordinate system */}
      <div className="relative mb-1 h-5" aria-hidden>
        {graphColumns.map((col) => (
          <span
            key={col.key}
            style={{ left: `${(col.x / VIEW_W) * 100}%` }}
            className="absolute -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-muted/60"
          >
            {col.label}
          </span>
        ))}
      </div>

      <div
        onMouseLeave={() => setActive(null)}
        className="relative w-full rounded-2xl border border-line bg-surface/40 p-2"
        style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      >
        {/* decorative layer — the connectors have no meaning for assistive tech,
            so they are hidden from it and described in prose instead */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 size-full overflow-visible"
          aria-hidden
          focusable="false"
        >
          <motion.g
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {graphEdges.map((edge, i) => {
              const a = nodeById.get(edge.from);
              const b = nodeById.get(edge.to);
              if (!a || !b) return null;

              const d = edgePath(a, b, edge.curve);
              const on = active === edge.from || active === edge.to;
              const dim = active !== null && !on;

              return (
                /* plain <g> on purpose: an explicit `animate` prop here would
                   cut variant propagation to the paths below it */
                <g
                  key={`${edge.from}-${edge.to}`}
                  style={{ opacity: dim ? 0.12 : 1 }}
                  className="transition-opacity duration-300 motion-reduce:transition-none"
                >
                  {/* faux bloom: a wide soft stroke instead of a blur filter,
                      which would rasterise a filter region every frame */}
                  <path
                    d={d}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={on ? 7 : 5}
                    strokeLinecap="round"
                    opacity={on ? 0.18 : 0.05}
                    className="transition-all duration-300 motion-reduce:transition-none"
                  />
                  <motion.path
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={on ? 1.8 : 1.1}
                    strokeLinecap="round"
                    opacity={on ? 0.95 : 0.34}
                    custom={i}
                    variants={{
                      hidden: { pathLength: reduce ? 1 : 0 },
                      show: (index: number) => ({
                        pathLength: 1,
                        transition: {
                          duration: reduce ? 0 : 0.75,
                          delay: reduce ? 0 : 0.5 + index * 0.03,
                          ease: "easeInOut",
                        },
                      }),
                    }}
                    className="transition-[stroke-width,opacity] duration-300 motion-reduce:transition-none"
                  />
                  {/* a dash travelling the path reads as current through a trace.
                      Interaction-triggered and finite, so it never becomes
                      auto-playing motion the user cannot stop. */}
                  {on && !reduce && (
                    <motion.path
                      d={d}
                      pathLength={1}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth={2.4}
                      strokeLinecap="round"
                      strokeDasharray="0.12 0.88"
                      initial={{ strokeDashoffset: 1 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </g>
              );
            })}
          </motion.g>
        </svg>

        {/* real, focusable nodes on top of the decorative layer */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="absolute inset-0 list-none"
        >
          {graphNodes.map((node) => {
            const col = graphColumns.findIndex((c) => c.key === node.column);
            const lit = isLit(node.id);

            return (
              <motion.li
                key={node.id}
                custom={col}
                variants={{
                  hidden: { opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.82 },
                  show: (index: number) => ({
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: reduce ? 0 : 0.4,
                      delay: reduce ? 0 : index * 0.07 + (node.y / VIEW_H) * 0.12,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    },
                  }),
                }}
                style={{
                  left: `${(node.x / VIEW_W) * 100}%`,
                  top: `${(node.y / VIEW_H) * 100}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  type="button"
                  ref={(el) => {
                    if (el) buttons.current.set(node.id, el);
                    else buttons.current.delete(node.id);
                  }}
                  tabIndex={tabbable === node.id ? 0 : -1}
                  aria-describedby={`rel-${node.id}`}
                  onMouseEnter={() => setActive(node.id)}
                  onFocus={() => {
                    setActive(node.id);
                    setTabbable(node.id);
                  }}
                  onBlur={() => setActive(null)}
                  onKeyDown={(e) => onKeyDown(e, node)}
                  className={`whitespace-nowrap rounded-lg border px-2.5 py-1.5 font-mono text-[11px] leading-none transition-all duration-300 motion-reduce:transition-none ${
                    active === node.id
                      ? "border-brand-400 bg-brand-500/15 text-accent shadow-lg shadow-glow"
                      : lit
                        ? "border-line bg-surface text-ink hover:border-brand-500/50"
                        : "border-line/50 bg-surface text-muted opacity-30"
                  }`}
                >
                  {node.label}
                </button>
                {/* lives next to the node, not in the disclosure below —
                    a closed <details> is hidden from the accessibility tree */}
                <span id={`rel-${node.id}`} className="sr-only">
                  {relationById.get(node.id)}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      {/* The relationships as text. Visible rather than screen-reader-only —
          it is the same content, and useful to anyone skimming or searching. */}
      <details className="group/rel mt-3 rounded-2xl border border-line bg-surface/40 px-4 py-3">
        <summary className="cursor-pointer list-none font-mono text-xs font-medium text-muted transition-colors hover:text-accent">
          <span aria-hidden className="me-2 inline-block transition-transform group-open/rel:rotate-90">
            ▸
          </span>
          Read the dependency map as text
        </summary>
        <ul className="mt-3 space-y-1.5 text-xs leading-relaxed">
          {relations.map((rel) => (
            <li key={rel.id} className="flex flex-wrap gap-x-2">
              <span className="font-mono font-semibold text-accent">{rel.label}</span>
              <span className="text-muted">{rel.text}</span>
            </li>
          ))}
        </ul>
      </details>
    </figure>
  );
}
