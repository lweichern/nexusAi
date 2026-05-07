import {
  StickyScrollReveal,
  type StickyScrollItem,
} from "@/components/ui/sticky-scroll-reveal";
import { BlurFade } from "@/components/ui/blur-fade";
import { Footer } from "@/components/sections/footer";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  brain: (
    <svg className="h-16 w-16 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  chain: (
    <svg className="h-16 w-16 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.182-5.568a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" />
    </svg>
  ),
  device: (
    <svg className="h-16 w-16 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
};

export default function ServicesPage() {
  const items: StickyScrollItem[] = services.map((service) => ({
    title: service.title,
    description: (
      <div>
        <p className="text-lg">{service.description}</p>
        <div className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">
            Capabilities
          </h4>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {service.capabilities.map((cap) => (
              <li key={cap} className="flex items-center gap-2 text-sm text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {cap}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">
            Technologies
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-card-border bg-card px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    content: (
      <div className="flex h-60 w-full items-center justify-center rounded-xl border border-card-border bg-card/50">
        {iconMap[service.icon]}
      </div>
    ),
  }));

  return (
    <main>
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <h1 className="text-4xl font-bold md:text-6xl">Services</h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Full-spectrum technology services from concept to deployment.
            </p>
          </BlurFade>
        </div>
      </section>
      <StickyScrollReveal items={items} />
      <Footer />
    </main>
  );
}
