"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { projects } from "@/data/projects";

import Link from "next/link";

export function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <BlurFade>
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Our Work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted">
            Delivering results at the intersection of AI, blockchain, and
            modern web.
          </p>
        </BlurFade>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <BlurFade
              key={project.id}
              delay={index * 0.1}
              className={featured.length === 1 ? "md:col-span-2 lg:col-span-3 max-w-2xl mx-auto w-full" : ""}
            >
              <Link href={`/work/${project.id}`} className="group block">
                <CanvasRevealEffect
                  className="aspect-video w-full rounded-xl border border-card-border bg-card"
                  revealContent={
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg font-bold text-white">
                        View Case Study
                      </span>
                      <svg
                        className="h-6 w-6 text-accent"
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
                    </div>
                  }
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </CanvasRevealEffect>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-card-border px-3 py-0.5 text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-2 text-lg font-bold transition-colors group-hover:text-accent sm:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{project.client}</p>
                  <p className="mt-2 text-sm text-muted">
                    {project.description}
                  </p>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
