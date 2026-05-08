"use client";

import { useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { CardHoverEffect, type HoverCardItem } from "@/components/ui/card-hover-effect";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Footer } from "@/components/sections/footer";
import { projects, categories } from "@/data/projects";
import Link from "next/link";

const stats = [
  { label: "Projects Delivered", value: "50+" },
  { label: "Global Clients", value: "30+" },
  { label: "Total Value Secured", value: "$2B+" },
  { label: "Uptime", value: "99.9%" },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const items: HoverCardItem[] = filtered.map((project) => ({
    id: project.id,
    content: (
      <div>
        <div className="aspect-video overflow-hidden rounded-lg bg-background">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
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
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold">{project.title}</h3>
        <p className="mt-1 text-sm text-accent">{project.client}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
      </div>
    ),
  }));

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

          <BlurFade delay={0.3}>
            <CardHoverEffect items={items} className="mt-8" />
          </BlurFade>
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
