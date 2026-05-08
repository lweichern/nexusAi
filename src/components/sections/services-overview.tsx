"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Card3DContainer, Card3DBody, Card3DItem } from "@/components/ui/card-3d";
import { MovingBorder } from "@/components/ui/moving-border";
import { services } from "@/data/services";
import Link from "next/link";

const iconMap = {
  brain: (
    <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  chain: (
    <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.182-5.568a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" />
    </svg>
  ),
  device: (
    <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
};

export function ServicesOverview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <BlurFade>
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            What We Build
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted">
            End-to-end solutions across the full spectrum of modern technology.
          </p>
        </BlurFade>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 sm:gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <BlurFade key={service.id} delay={index * 0.15}>
              <Card3DContainer className="w-full">
                <MovingBorder
                  containerClassName="w-full"
                  className="h-full w-full p-6"
                >
                  <Card3DBody>
                    <Card3DItem translateZ={40}>
                      {iconMap[service.icon]}
                    </Card3DItem>
                    <Card3DItem translateZ={30} className="mt-4">
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </Card3DItem>
                    <Card3DItem translateZ={20} className="mt-2">
                      <p className="text-sm text-muted">
                        {service.description}
                      </p>
                    </Card3DItem>
                    <Card3DItem translateZ={10} className="mt-4">
                      <Link
                        href="/services"
                        className="inline-flex items-center text-sm text-accent hover:underline"
                      >
                        Learn more
                        <svg
                          className="ml-1 h-3 w-3"
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
                      </Link>
                    </Card3DItem>
                  </Card3DBody>
                </MovingBorder>
              </Card3DContainer>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
