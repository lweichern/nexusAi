"use client";

import { AnimatedBeamNetwork } from "@/components/ui/animated-beam-network";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FlipWords } from "@/components/ui/flip-words";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <AnimatedBeamNetwork className="opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <TextGenerateEffect
          words="NexusAI"
          className="text-6xl font-bold tracking-tight md:text-8xl"
        />
        <div className="flex min-h-[2em] items-center text-xl text-muted md:text-2xl">
          <FlipWords
            words={["AI Solutions", "Web3 Development", "Digital Products"]}
            className="text-accent font-semibold"
          />
        </div>
        <p className="max-w-md text-muted">
          We build cutting-edge technology for forward-thinking companies.
        </p>
        <Link href="/contact">
          <ShimmerButton className="mt-4">
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
      </div>
    </section>
  );
}
