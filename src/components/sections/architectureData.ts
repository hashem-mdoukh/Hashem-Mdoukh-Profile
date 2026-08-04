/**
 * Structure for the interactive repo explorer: an idealized
 * feature-based Turborepo. Copy for each pattern lives in
 * messages/en.json under `architecture.items`.
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
