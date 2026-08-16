/**
 * Data for the stack dependency map.
 *
 * Coordinates are hand-placed in a fixed viewBox, never simulated. A runtime
 * force layout would rearrange the whole picture whenever a technology is
 * added, and would jitter under `prefers-reduced-motion`. Fixed coordinates
 * render identically on every load and survive server rendering.
 *
 * Every edge states an objective relationship — "builds on", "runs on",
 * "typed with". None of them encode proficiency: node size and position
 * carry no skill claim, only connectivity.
 */

export const VIEW_W = 1000;
export const VIEW_H = 620;

export interface GraphNode {
  id: string;
  label: string;
  column: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  /** verb for the text description: "<from> <rel> <to>" */
  rel: string;
  /** perpendicular bow, as a fraction of edge length; sign flips the side */
  curve?: number;
}

export const graphColumns = [
  { key: "backend", label: "Backend", x: 92 },
  { key: "data", label: "Data", x: 300 },
  { key: "core", label: "Core", x: 500 },
  { key: "toolbelt", label: "Toolbelt", x: 706 },
  { key: "architecture", label: "Architecture", x: 908 },
] as const;

export const graphNodes: GraphNode[] = [
  // Backend
  { id: "express", label: "Express.js", column: "backend", x: 92, y: 140 },
  { id: "node", label: "Node.js", column: "backend", x: 92, y: 250 },
  { id: "mongoose", label: "Mongoose", column: "backend", x: 92, y: 380 },
  { id: "mongodb", label: "MongoDB", column: "backend", x: 92, y: 500 },

  // Data
  { id: "tsquery", label: "TanStack Query", column: "data", x: 300, y: 70 },
  { id: "rest", label: "REST APIs", column: "data", x: 300, y: 185 },
  { id: "dto", label: "DTO mapping", column: "data", x: 300, y: 300 },
  { id: "tsrouter", label: "TanStack Router", column: "data", x: 300, y: 430 },

  // Core
  { id: "next", label: "Next.js 15", column: "core", x: 500, y: 80 },
  { id: "react", label: "React 19", column: "core", x: 500, y: 200 },
  { id: "typescript", label: "TypeScript", column: "core", x: 500, y: 330 },
  { id: "tailwind", label: "Tailwind CSS v4", column: "core", x: 500, y: 470 },

  // Toolbelt
  { id: "vite", label: "Vite", column: "toolbelt", x: 706, y: 75 },
  { id: "jotai", label: "Jotai", column: "toolbelt", x: 706, y: 175 },
  { id: "mui", label: "MUI", column: "toolbelt", x: 706, y: 270 },
  { id: "mantine", label: "Mantine UI", column: "toolbelt", x: 706, y: 365 },
  { id: "cssmodules", label: "CSS Modules", column: "toolbelt", x: 706, y: 460 },
  { id: "angular", label: "Angular", column: "toolbelt", x: 706, y: 555 },

  // Architecture
  { id: "pnpm", label: "pnpm workspaces", column: "architecture", x: 908, y: 60 },
  { id: "turborepo", label: "Turborepo", column: "architecture", x: 908, y: 155 },
  { id: "features", label: "Feature modules", column: "architecture", x: 908, y: 260 },
  { id: "designsystems", label: "Design Systems", column: "architecture", x: 908, y: 400 },
];

export const graphEdges: GraphEdge[] = [
  { from: "express", to: "node", rel: "runs on" },
  { from: "mongoose", to: "mongodb", rel: "models" },
  { from: "mongoose", to: "node", rel: "runs on" },
  { from: "rest", to: "express", rel: "served by" },
  { from: "dto", to: "rest", rel: "maps responses from" },
  { from: "dto", to: "typescript", rel: "typed with" },
  { from: "tsquery", to: "rest", rel: "caches" },
  { from: "tsquery", to: "react", rel: "builds on" },
  { from: "tsrouter", to: "react", rel: "builds on" },
  { from: "next", to: "react", rel: "builds on" },
  { from: "react", to: "typescript", rel: "typed with" },
  { from: "angular", to: "typescript", rel: "built in", curve: -0.08 },
  { from: "jotai", to: "react", rel: "builds on" },
  { from: "mui", to: "react", rel: "builds on" },
  { from: "mantine", to: "react", rel: "builds on" },
  { from: "vite", to: "react", rel: "bundles" },
  { from: "designsystems", to: "mui", rel: "implemented with" },
  { from: "designsystems", to: "mantine", rel: "implemented with" },
  { from: "designsystems", to: "cssmodules", rel: "implemented with" },
  { from: "designsystems", to: "tailwind", rel: "implemented with", curve: 0.12 },
  { from: "turborepo", to: "pnpm", rel: "orchestrates" },
  { from: "features", to: "turborepo", rel: "built by" },
  { from: "features", to: "typescript", rel: "enforced by", curve: -0.1 },
  { from: "react", to: "vite", rel: "developed with", curve: -0.1 },
];

export const nodeById = new Map(graphNodes.map((n) => [n.id, n]));

/**
 * Quadratic arc between two nodes. The control point is offset along the
 * perpendicular by a fraction of the edge's own length, so short and long
 * edges bow by the same visual amount.
 */
export function edgePath(a: GraphNode, b: GraphNode, curve = 0.16): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (a.x + b.x) / 2 + (-dy / len) * curve * len;
  const cy = (a.y + b.y) / 2 + (dx / len) * curve * len;
  return `M${a.x} ${a.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`;
}

/** id → set of directly connected ids, for 1-hop neighbourhood highlighting. */
export function buildAdjacency(): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>(graphNodes.map((n) => [n.id, new Set<string>()]));
  for (const e of graphEdges) {
    adj.get(e.from)?.add(e.to);
    adj.get(e.to)?.add(e.from);
  }
  return adj;
}

/**
 * The graph's meaning, as prose. SVG connectors carry no semantics for
 * assistive tech, so the relationships have to be stated in text or they
 * do not exist at all.
 */
export function relationSentences(): { id: string; label: string; text: string }[] {
  return graphNodes.map((node) => {
    const outgoing = graphEdges
      .filter((e) => e.from === node.id)
      .map((e) => `${e.rel} ${nodeById.get(e.to)?.label}`);
    const incoming = graphEdges
      .filter((e) => e.to === node.id)
      .map((e) => `${nodeById.get(e.from)?.label} ${e.rel} it`);
    return {
      id: node.id,
      label: node.label,
      text: [...outgoing, ...incoming].join("; ") || "no recorded connections",
    };
  });
}
