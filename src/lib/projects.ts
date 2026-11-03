/**
 * Locale-independent project facts (links, stack). Human copy for each
 * project copy lives alongside its rendering component.
 */
export interface ProjectMeta {
  key: string;
  stack: string[];
  repo: string;
  live?: string;
}

export const GITHUB_URL = "https://github.com/hashem-mdoukh";
export const LINKEDIN_URL = "https://www.linkedin.com/in/hashem-mdoukh-82a410371/";

export const projects: ProjectMeta[] = [
  {
    key: "resumax",
    stack: ["Next.js 16", "Express 5", "Prisma", "PostgreSQL", "Gemini API", "Puppeteer", "Turborepo"],
    repo: "https://github.com/FALO-Enterprise/SAAS-Resume-Builder",
    live: "https://resumax-frontend.fly.dev/en",
  },
  {
    key: "imagine",
    stack: ["Next.js 16", "React 19", "TypeScript", "Motion", "Lenis", "Tailwind v4"],
    repo: "https://github.com/hashem-mdoukh/Imagine-Agency-Profile",
    live: "https://imagine-agency-profile.vercel.app",
  },
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
];
