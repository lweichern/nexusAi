import { BlurFade } from "@/components/ui/blur-fade";
import { CardHoverEffect, type HoverCardItem } from "@/components/ui/card-hover-effect";
import { Footer } from "@/components/sections/footer";
import { projects } from "@/data/projects";
import Image from "next/image";

export default function WorkPage() {
  const items: HoverCardItem[] = projects.map((project) => ({
    id: project.id,
    content: (
      <div>
        <div className="aspect-video overflow-hidden rounded-lg bg-background">
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-card-border px-3 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-3 text-lg font-bold">{project.title}</h3>
        <p className="mt-1 text-sm text-accent">{project.client}</p>
        <p className="mt-2 text-sm text-muted">{project.description}</p>
      </div>
    ),
  }));

  return (
    <main>
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <h1 className="text-4xl font-bold md:text-6xl">Our Work</h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Selected projects across AI, Web3, and digital products.
            </p>
          </BlurFade>
          <BlurFade delay={0.2}>
            <CardHoverEffect items={items} className="mt-16" />
          </BlurFade>
        </div>
      </section>
      <Footer />
    </main>
  );
}
