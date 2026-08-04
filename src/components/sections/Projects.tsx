"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectFrame } from "@/components/ui/ProjectFrame";
import { projectSnippets } from "@/components/sections/projectSnippets";
import { projects, GITHUB_URL } from "@/lib/projects";

const textReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const frameReveal = (fromEnd: boolean): Variants => ({
  hidden: { opacity: 0, x: fromEnd ? 40 : -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
});

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="scroll-mt-20 px-5 py-20">
      <SectionHeading no={t("no")}>{t("title")}</SectionHeading>

      <div className="group/list space-y-20 lg:space-y-24">
        {projects.map((project, i) => {
          const flipped = i % 2 === 1;
          const snippet = projectSnippets[project.key];
          const primaryLink = project.live ?? project.repo;

          return (
            <motion.article
              key={project.key}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ staggerChildren: 0.08 }}
              className={`relative flex flex-col items-center gap-6 transition-opacity duration-300 lg:flex-row lg:group-hover/list:opacity-60 lg:hover:opacity-100! ${
                flipped ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* editor-mockup visual */}
              <motion.div
                variants={frameReveal(!flipped)}
                className="w-full lg:w-[60%] shrink-0"
              >
                <ProjectFrame filename={snippet.filename}>
                  {snippet.code}
                </ProjectFrame>
              </motion.div>

              {/* text column, overlapping the visual on desktop */}
              <motion.div
                variants={textReveal}
                className={`relative z-10 w-full lg:w-[50%] lg:-ms-24 ${
                  flipped ? "lg:-me-24 lg:ms-0 lg:text-start" : "lg:text-end"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -top-16 select-none font-mono text-8xl font-extrabold text-brand-500/10 ${
                    flipped ? "inset-s-0" : "lg:inset-e-0"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="relative font-mono text-xs uppercase tracking-widest text-accent">
                  {t("eyebrow")}
                </p>

                <h3 className="relative mt-2 text-2xl font-bold text-ink">
                  <a
                    href={primaryLink}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-2 transition-colors hover:text-accent"
                  >
                    {t(`items.${project.key}.name`)}
                    <ArrowUpRight />
                  </a>
                </h3>

                <div className="relative mt-4 rounded-xl border border-line bg-surface p-5 text-start shadow-xl shadow-black/10">
                  <p className="text-sm leading-relaxed text-muted">
                    {t(`items.${project.key}.desc`)}
                  </p>
                </div>

                <ul
                  className={`relative mt-4 flex flex-wrap gap-2 ${
                    flipped ? "" : "lg:justify-end"
                  }`}
                >
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-brand-500/10 px-3 py-1 font-mono text-xs font-medium text-accent"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div
                  className={`relative mt-5 flex items-center gap-5 ${
                    flipped ? "" : "lg:justify-end"
                  }`}
                >
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent"
                    >
                      {t("live")} <ArrowUpRight />
                    </a>
                  )}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-accent"
                  >
                    <CodeIcon /> {t("code")}
                  </a>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16 text-center"
      >
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="group/link inline-flex items-center gap-1.5 font-mono text-[10px] text-accent transition-opacity hover:opacity-80"
        >
          {t("more")} <ArrowUpRight />
        </a>
      </motion.p>
    </section>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform motion-reduce:transition-none group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}
