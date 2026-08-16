/**
 * Structure for the interactive repo explorer: an idealized
 * feature-based Turborepo. Pattern copy lives in Architecture.tsx.
 */
export type PatternKey =
  | "monorepo"
  | "designSystem"
  | "flags"
  | "feature"
  | "components"
  | "hooks"
  | "services"
  | "mappers";

export interface TreeRow {
  depth: number;
  label: string;
  kind: "folder" | "file";
  pattern?: PatternKey;
}

export const tree: TreeRow[] = [
  { depth: 0, label: "hashem-monorepo", kind: "folder" },
  { depth: 1, label: "apps", kind: "folder" },
  { depth: 2, label: "web", kind: "folder" },
  { depth: 2, label: "admin", kind: "folder" },
  { depth: 1, label: "packages", kind: "folder" },
  { depth: 2, label: "ui", kind: "folder", pattern: "designSystem" },
  { depth: 2, label: "config", kind: "folder" },
  { depth: 2, label: "feature-flags", kind: "folder", pattern: "flags" },
  { depth: 1, label: "features", kind: "folder" },
  { depth: 2, label: "products", kind: "folder", pattern: "feature" },
  { depth: 3, label: "components", kind: "folder", pattern: "components" },
  { depth: 3, label: "hooks", kind: "folder", pattern: "hooks" },
  { depth: 3, label: "services", kind: "folder", pattern: "services" },
  { depth: 3, label: "mappers", kind: "folder", pattern: "mappers" },
  { depth: 1, label: "turbo.json", kind: "file", pattern: "monorepo" },
  { depth: 1, label: "pnpm-workspace.yaml", kind: "file" },
];

/* ── Stack index ──────────────────────────────────────────────
   The skim layer under the explorer. Two honest levels instead of
   invented percentages, and every domain points at real proof. */

export type StackLevel = "core" | "working";
export type StackIcon = "layers" | "blocks" | "sync" | "server" | "tool";

export interface StackDomain {
  key: string;
  no: string;
  label: string;
  claim: string;
  icon: StackIcon;
  /** grid span — first two tiles lead, the rest fill the row */
  span: string;
  items: { name: string; level: StackLevel }[];
  evidence: string;
  href: string;
}

export const stackDomains: StackDomain[] = [
  {
    key: "core",
    no: "01",
    label: "Core",
    claim: "Interfaces built to survive their second year.",
    icon: "layers",
    span: "sm:col-span-2 lg:col-span-3",
    items: [
      { name: "React 19", level: "core" },
      { name: "Next.js 15", level: "core" },
      { name: "TypeScript", level: "core" },
      { name: "Tailwind CSS v4", level: "core" },
    ],
    evidence: "Every project on this page ships on it",
    href: "#projects",
  },
  {
    key: "architecture",
    no: "02",
    label: "Architecture",
    claim: "Structure decided before the first feature lands.",
    icon: "blocks",
    span: "sm:col-span-2 lg:col-span-3",
    items: [
      { name: "Turborepo", level: "core" },
      { name: "pnpm workspaces", level: "core" },
      { name: "Feature-based modules", level: "core" },
      { name: "Design Systems", level: "core" },
    ],
    evidence: "Advanced React Program, 2026",
    href: "#experience",
  },
  {
    key: "data",
    no: "03",
    label: "Data",
    claim: "Server state that stays in sync, and typed at the edge.",
    icon: "sync",
    span: "lg:col-span-2",
    items: [
      { name: "TanStack Query", level: "core" },
      { name: "REST APIs", level: "core" },
      { name: "DTO mapping", level: "core" },
      { name: "TanStack Router", level: "working" },
    ],
    evidence: "Server state in 2 shipped apps",
    href: "#projects",
  },
  {
    key: "backend",
    no: "04",
    label: "Backend",
    claim: "APIs I can own end to end, not just consume.",
    icon: "server",
    span: "lg:col-span-2",
    items: [
      { name: "Node.js", level: "core" },
      { name: "Express.js", level: "core" },
      { name: "MongoDB", level: "working" },
      { name: "Mongoose", level: "working" },
    ],
    evidence: "Full-stack training at Zakey Tech",
    href: "#experience",
  },
  {
    key: "toolbelt",
    no: "05",
    label: "Toolbelt",
    claim: "Shipped with these, ready to pick any of them back up.",
    icon: "tool",
    span: "sm:col-span-2 lg:col-span-2",
    items: [
      { name: "Angular", level: "core" },
      { name: "Git", level: "core" },
      { name: "Vite", level: "core" },
      { name: "MUI", level: "working" },
      { name: "Mantine UI", level: "working" },
      { name: "Jotai", level: "working" },
      { name: "CSS Modules", level: "working" },
    ],
    evidence: "Angular in production at Kumrat Al-Saada",
    href: "#experience",
  },
];

export const patternMeta: Record<
  PatternKey,
  { file: string; code: string; chips: string[] }
> = {
  monorepo: {
    file: "turbo.json",
    code: `{
  "tasks": {
    "build": { "dependsOn": ["^build"] },
    "lint": {},
    "test": { "outputs": ["coverage/**"] }
  }
}`,
    chips: ["Turborepo", "pnpm workspaces", "Task graph", "Remote caching"],
  },
  designSystem: {
    file: "packages/ui/src/Button.tsx",
    code: `export const Button = ({
  variant = "primary",
  ...props
}: ButtonProps) => (
  <button className={styles[variant]} {...props} />
);`,
    chips: ["Design tokens", "CSS Modules", "React primitives"],
  },
  flags: {
    file: "packages/feature-flags/useFlag.ts",
    code: `export function useFlag(name: FlagName) {
  const flags = useContext(FlagContext);
  return flags[name] ?? false; // remote-controlled
}`,
    chips: ["Context API", "A/B testing", "Gradual rollout"],
  },
  feature: {
    file: "features/products/index.ts",
    code: `// public API — internals stay private
export { ProductsView } from "./components";
export { useProducts } from "./hooks";`,
    chips: ["TypeScript", "Module boundaries", "Domain isolation"],
  },
  components: {
    file: "features/products/components/Select.tsx",
    code: `<Select value={filter} onChange={setFilter}>
  <Select.Trigger />
  <Select.Options>
    {categories.map(toOption)}
  </Select.Options>
</Select>`,
    chips: ["React Context", "Custom hooks", "Composition"],
  },
  hooks: {
    file: "features/products/hooks/useProducts.ts",
    code: `useMutation({
  mutationFn: api.updateProduct,
  onSuccess: () =>
    queryClient.invalidateQueries({
      queryKey: ["products"],
    }),
});`,
    chips: ["TanStack Query", "Cache invalidation", "Optimistic updates"],
  },
  services: {
    file: "features/products/services/api.ts",
    code: `interface ProductsApi {
  getAll(filters: Filters): Promise<Product[]>;
}
// UI depends on this interface — never on fetch
export const restApi: ProductsApi = createRestApi();`,
    chips: ["TypeScript interfaces", "DIP", "Testability"],
  },
  mappers: {
    file: "features/products/mappers/toProduct.ts",
    code: `export const toProduct = (dto: ProductDto): Product => ({
  id: dto.product_id,
  name: dto.display_name,
  price: fromCents(dto.price_cents),
});`,
    chips: ["DTOs", "Domain models", "Type safety"],
  },
};
