"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Footer } from "@/components/sections/footer";
import type { Project } from "@/data/projects";

interface ProjectDetailProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

const categoryLabels: Record<Project["category"], string> = {
  ai: "AI Solutions",
  web3: "Web3",
  "web-mobile": "Web & Mobile",
};

export function ProjectDetail({
  project,
  prevProject,
  nextProject,
}: ProjectDetailProps) {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <DotPattern className="opacity-40" />
        <div className="relative mx-auto max-w-6xl">
          <BlurFade>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              All Projects
            </Link>
          </BlurFade>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <BlurFade delay={0.05}>
                <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {categoryLabels[project.category]}
                </span>
              </BlurFade>
              <BlurFade delay={0.1}>
                <h1 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                  {project.title}
                </h1>
              </BlurFade>
              <BlurFade delay={0.15}>
                <p className="mt-3 text-lg text-accent sm:text-xl">
                  {project.client}
                </p>
              </BlurFade>
              <BlurFade delay={0.2}>
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                  {project.description}
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.25}>
              <div className="flex flex-wrap gap-6 lg:flex-col lg:items-end lg:gap-4">
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Year
                  </p>
                  <p className="font-mono text-lg font-bold">{project.year}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Timeline
                  </p>
                  <p className="font-mono text-lg font-bold">
                    {project.timeline}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Team
                  </p>
                  <p className="font-mono text-lg font-bold">
                    {project.teamSize}
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>

          <BlurFade delay={0.3}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-card-border px-3 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Project Image */}
      <section className="px-6">
        <BlurFade delay={0.35}>
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-card-border">
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="aspect-video w-full object-cover"
              />
            </motion.div>
          </div>
        </BlurFade>
      </section>

      {/* Challenge */}
      <section className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl">
            <BlurFade>
              <h2 className="text-sm font-medium uppercase tracking-widest text-accent">
                The Challenge
              </h2>
            </BlurFade>
            <BlurFade delay={0.1}>
              <p className="mt-6 text-xl leading-relaxed text-foreground sm:text-2xl md:text-3xl md:leading-relaxed">
                {project.challenge}
              </p>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent">
              Our Solution
            </h2>
          </BlurFade>
          <div className="mt-12">
            <TracingBeam>
              <div className="flex flex-col gap-16 sm:gap-20">
                {project.solution.map((paragraph, i) => (
                  <BlurFade key={i} delay={i * 0.1}>
                    <div className="relative">
                      <span className="absolute -left-4 top-0 hidden font-mono text-5xl font-bold text-card-border md:-left-16 md:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
                        {paragraph}
                      </p>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </TracingBeam>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="relative px-6 py-20 sm:py-28">
        <div className="absolute inset-0 bg-accent/[0.02]" />
        <DotPattern className="opacity-20" />
        <div className="relative mx-auto max-w-6xl">
          <BlurFade>
            <h2 className="text-center text-sm font-medium uppercase tracking-widest text-accent">
              Results & Impact
            </h2>
          </BlurFade>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {project.results.map((result, i) => (
              <BlurFade key={result.label} delay={i * 0.1}>
                <motion.div
                  className="rounded-2xl border border-card-border bg-card p-6 text-center sm:p-8"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <p className="font-mono text-2xl font-bold text-accent sm:text-3xl md:text-4xl">
                    {result.value}
                  </p>
                  <p className="mt-2 text-xs text-muted sm:text-sm">
                    {result.label}
                  </p>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent">
              Tech Stack
            </h2>
          </BlurFade>
          <BlurFade delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.stack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent sm:px-5 sm:py-2.5"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="border-t border-card-border px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {prevProject ? (
              <Link
                href={`/work/${prevProject.id}`}
                className="group flex flex-col rounded-2xl border border-card-border p-6 transition-all hover:border-accent/50 hover:bg-card sm:p-8"
              >
                <span className="text-xs uppercase tracking-wider text-muted">
                  Previous Project
                </span>
                <span className="mt-2 text-lg font-bold transition-colors group-hover:text-accent sm:text-xl">
                  {prevProject.title}
                </span>
                <span className="mt-1 text-sm text-muted">
                  {prevProject.client}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/work/${nextProject.id}`}
                className="group flex flex-col items-end rounded-2xl border border-card-border p-6 text-right transition-all hover:border-accent/50 hover:bg-card sm:p-8"
              >
                <span className="text-xs uppercase tracking-wider text-muted">
                  Next Project
                </span>
                <span className="mt-2 text-lg font-bold transition-colors group-hover:text-accent sm:text-xl">
                  {nextProject.title}
                </span>
                <span className="mt-1 text-sm text-muted">
                  {nextProject.client}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <BlurFade>
            <h2 className="text-3xl font-bold md:text-4xl">
              Interested in working together?
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Let&apos;s discuss how we can bring your next project to life.
            </p>
          </BlurFade>
          <BlurFade delay={0.1}>
            <Link href="/contact">
              <ShimmerButton className="mt-2">
                Start a Conversation
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </ShimmerButton>
            </Link>
          </BlurFade>
        </div>
      </section>

      <Footer />
    </main>
  );
}
