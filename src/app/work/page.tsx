"use client";

import { useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Footer } from "@/components/sections/footer";
import { projects, categories } from "@/data/projects";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const stats = [
  { label: "Projects Delivered", value: "50+" },
  { label: "Global Clients", value: "30+" },
  { label: "Total Value Secured", value: "$2B+" },
  { label: "Uptime", value: "99.9%" },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main>
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <h1 className="text-3xl font-bold sm:text-4xl md:text-6xl">Our Work</h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Selected projects across AI, Web3, and digital products — each
              one built to push boundaries and deliver measurable results.
            </p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-card-border bg-card p-6 text-center"
                >
                  <p className="font-mono text-xl font-bold text-accent sm:text-2xl md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] text-muted sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-2 sm:mt-12 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-card-border text-muted hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </BlurFade>

          <motion.div layout className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-2"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onTouchStart={() => setHoveredIndex(idx)}
                  onTouchEnd={() => setHoveredIndex(null)}
                >
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.span
                        className="absolute inset-0 block rounded-2xl bg-accent/10"
                        layoutId="work-hover-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.15 } }}
                        exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                      />
                    )}
                  </AnimatePresence>
                  <Link
                    href={`/work/${project.id}`}
                    className="group relative z-10 block overflow-hidden rounded-xl border border-card-border bg-card p-4 sm:p-6"
                  >
                    <div className="aspect-video overflow-hidden rounded-lg bg-background">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-card-border px-3 py-0.5 text-xs text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="font-mono text-xs text-muted">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-accent">{project.client}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      View Case Study
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <BlurFade>
            <h2 className="text-3xl font-bold md:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-4 max-w-md text-muted">
              We&apos;re always looking for the next challenge. Let&apos;s
              discuss how we can bring your vision to life.
            </p>
          </BlurFade>
          <BlurFade delay={0.1}>
            <Link href="/contact">
              <ShimmerButton className="mt-2">
                Start a Project
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
