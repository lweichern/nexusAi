import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Footer } from "@/components/sections/footer";
import { services } from "@/data/services";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  brain: (
    <svg className="h-12 w-12 text-accent sm:h-16 sm:w-16 md:h-20 md:w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  chain: (
    <svg className="h-12 w-12 text-accent sm:h-16 sm:w-16 md:h-20 md:w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.182-5.568a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" />
    </svg>
  ),
  device: (
    <svg className="h-12 w-12 text-accent sm:h-16 sm:w-16 md:h-20 md:w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
};

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your business, users, and technical landscape. Through workshops and research, we define the problem space, identify opportunities, and align on a vision.",
  },
  {
    number: "02",
    title: "Strategy & Architecture",
    description:
      "We design the technical architecture and product roadmap. Every decision is documented — from infrastructure choices to data models — so you know exactly what we're building and why.",
  },
  {
    number: "03",
    title: "Build & Iterate",
    description:
      "Agile development in 2-week sprints with continuous demos. You see working software from week one. We ship incrementally, gathering feedback and refining as we go.",
  },
  {
    number: "04",
    title: "Launch & Scale",
    description:
      "Battle-tested deployments with monitoring, observability, and runbooks. We don't just ship — we ensure your product is production-ready with CI/CD, load testing, and 24/7 alerting.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <h1 className="text-3xl font-bold sm:text-4xl md:text-6xl">Services</h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Full-spectrum technology services from concept to deployment.
              We partner with ambitious teams to build what&apos;s next.
            </p>
          </BlurFade>
        </div>
      </section>

      {services.map((service, index) => (
        <section key={service.id} className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div
              className={`flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:gap-20 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <BlurFade className="flex-1">
                <div className="flex h-40 w-full items-center justify-center rounded-2xl border border-card-border bg-card/50 sm:h-52 lg:h-64">
                  {iconMap[service.icon]}
                </div>
              </BlurFade>

              <div className="flex-1">
                <BlurFade delay={0.1}>
                  <span className="font-mono text-sm text-accent/60">
                    0{index + 1}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">
                    {service.description}
                  </p>
                </BlurFade>

                <BlurFade delay={0.2}>
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">
                      Capabilities
                    </h4>
                    <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {service.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-center gap-2 text-sm text-muted"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>

                <BlurFade delay={0.3}>
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">
                      Technologies
                    </h4>
                    <div className="mt-4 flex flex-wrap gap-2">
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
                </BlurFade>
              </div>
            </div>

            {index < services.length - 1 && (
              <div className="mx-auto mt-20 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-card-border to-transparent" />
            )}
          </div>
        </section>
      ))}

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              How We Work
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted">
              A proven process refined across 50+ projects. Transparent,
              collaborative, and designed to ship.
            </p>
          </BlurFade>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <BlurFade key={step.number} delay={index * 0.1}>
                <div className="group rounded-xl border border-card-border bg-card p-6 transition-colors hover:border-accent/30">
                  <span className="font-mono text-3xl font-bold text-accent/30 transition-colors group-hover:text-accent/60">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { value: "50+", label: "Projects Shipped" },
                { value: "98%", label: "Client Retention" },
                { value: "30+", label: "Team Members" },
                { value: "4", label: "Continents Served" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-card-border bg-card p-6 text-center"
                >
                  <p className="font-mono text-2xl font-bold text-accent md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <BlurFade>
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to build something extraordinary?
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Tell us about your project and we&apos;ll put together a team
              and timeline within 48 hours.
            </p>
          </BlurFade>
          <BlurFade delay={0.1}>
            <Link href="/contact">
              <ShimmerButton className="mt-2">
                Get in Touch
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
