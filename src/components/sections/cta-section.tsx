import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { RetroGrid } from "@/components/ui/retro-grid";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-32">
      <RetroGrid />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <BlurFade>
          <h2 className="text-4xl font-bold md:text-5xl">
            Let&apos;s build the future
          </h2>
        </BlurFade>
        <BlurFade delay={0.1}>
          <p className="max-w-md text-muted">
            Have a project in mind? We&apos;d love to hear about it. Let&apos;s
            turn your vision into reality.
          </p>
        </BlurFade>
        <BlurFade delay={0.2}>
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
  );
}
