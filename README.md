# Hashem Mdoukh — Portfolio

Bilingual (EN/AR · RTL/LTR), light/dark personal portfolio built with **Next.js 15**,
**Tailwind CSS v4**, **next-intl**, and **Framer Motion**.

## Features

- 🌐 **Bilingual** — English + Arabic, fully translated content in `messages/`
- ↔️ **RTL/LTR** — `dir` flips automatically per locale; logical utilities (`ps-*`, `me-*`, `start-*`) mean no mirrored CSS
- 🌗 **Light/Dark** — dark by default, no-flash theme script, semantic tokens swapped via `[data-theme]`
- 🎬 **Framer Motion** — staggered reveals, animated role cycle, scroll-triggered sections
- 🎨 **Design tokens** — Tailwind v4 `@theme` + `@theme inline` bridge (violet brand + gold accent)
- 📝 **Content-driven** — every section reads from two JSON files; edit content without touching components

## Requirements

- Node.js 18.18+ (20+ recommended)
- A package manager: **pnpm** (recommended), npm, or yarn

## Getting started

```bash
# install
pnpm install      # or: npm install / yarn

# run dev server → http://localhost:3000 (redirects to /en)
pnpm dev

# production build
pnpm build
pnpm start
```

Visit `/en` for English (LTR) and `/ar` for Arabic (RTL). Use the navbar buttons to
switch language and toggle the theme.

## Editing your content

All copy lives in **`messages/en.json`** and **`messages/ar.json`** with identical keys.
Update both to keep the languages in sync. To wire your real projects, set the `live`
and `repo` URLs under `projects.items` (currently `#` placeholders).

Drop your CV at **`public/Hashem_Mdoukh_Resume.pdf`** to activate the "Download résumé" button.

## Project structure

```
messages/
  en.json                 # English content (data layer)
  ar.json                 # Arabic content
src/
  middleware.ts           # next-intl locale routing (narrow matcher → no static-asset 404s)
  i18n/
    routing.ts            # locales, default, direction map
    navigation.ts         # typed Link / router helpers
    request.ts            # loads messages per request
  app/
    globals.css           # Tailwind v4 tokens + theme variables
    [locale]/
      layout.tsx          # <html dir lang>, fonts, providers
      page.tsx            # section composition
  components/
    theme/ThemeProvider.tsx
    layout/{Navbar,Footer}.tsx
    ui/{ThemeToggle,LocaleSwitch,SectionHeading}.tsx
    sections/{Hero,About,Skills,Patterns,Experience,Projects,Contact}.tsx
  lib/motion.ts           # shared Framer Motion variants
```

## Theming

Brand tokens (`--color-brand-*`, `--color-gold-*`) are fixed in `@theme`. Surface/text
colors are runtime variables (`--base`, `--surface`, `--ink`, `--muted`, `--line`, `--glow`)
that change with `[data-theme]` and are exposed as utilities (`bg-base`, `text-ink`,
`border-line`, …) through `@theme inline`. To recolor the brand, edit the `@theme` block
in `src/app/globals.css`.

## Adding a third language

1. Add the code to `locales` in `src/i18n/routing.ts` (and its direction in `localeDirection`).
2. Create `messages/<code>.json` mirroring the existing keys.
3. The middleware, layout, and switcher pick it up automatically.
