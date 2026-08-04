/**
 * Locale-independent project facts (links, stack). Human copy for each
 * project lives in messages/{en,ar}.json under `projects.items[key]`.
 */
export interface ProjectMeta {
  key: string;
  stack: string[];
  repo: string;
  live?: string;
}

export const GITHUB_URL = "https://github.com/hashem-mdoukh";
export const LINKEDIN_URL = "https://linkedin.com/in/hashem-mdoukh";

export const projects: ProjectMeta[] = [
  {
    key: "rickmorty",
    stack: ["React 19", "TypeScript", "TanStack Query 5", "React Router", "Vite"],
    repo: "https://github.com/hashem-mdoukh/Rick-and-Morty-Characters",
  },
  {
    key: "weather",
    stack: ["Next.js 15", "React 19", "TanStack Query", "Jotai", "Tailwind v4"],
    repo: "https://github.com/hashem-mdoukh/Weather-App",
    live: "https://weather-app-three-sigma-56.vercel.app",
  },
  {
    key: "transportation",
    stack: ["Next.js 15", "TypeScript", "React Leaflet", "Tailwind v4"],
    repo: "https://github.com/hashem-mdoukh/amana-transportation",
    live: "https://amana-transportation-two.vercel.app",
  },
  {
    key: "financial",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4"],
    repo: "https://github.com/hashem-mdoukh/amana-financial",
  },
];
