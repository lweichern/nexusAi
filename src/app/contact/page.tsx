"use client";

import { useState, type FormEvent } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Spotlight } from "@/components/ui/spotlight";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Footer } from "@/components/sections/footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <Spotlight className="min-h-screen">
        <DotPattern className="opacity-30" />
        <section className="relative z-10 px-6 pt-32 pb-24">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
            <BlurFade>
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl md:text-6xl">
                  Let&apos;s Talk
                </h1>
                <p className="mt-4 max-w-md text-lg text-muted">
                  Have a project in mind? We&apos;d love to hear about it.
                  Reach out and let&apos;s explore what we can build together.
                </p>
                <div className="mt-12 space-y-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                      Email
                    </p>
                    <p className="mt-1 text-muted">hello@nexusai.dev</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                      Location
                    </p>
                    <p className="mt-1 text-muted">
                      San Francisco, CA — Working globally
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                      Social
                    </p>
                    <div className="mt-1 flex gap-4 text-sm text-muted">
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
                      <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">X</a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.2}>
              {submitted ? (
                <div className="flex h-full items-center justify-center rounded-xl border border-card-border bg-card p-12 text-center">
                  <div>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                      <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Message Sent</h3>
                    <p className="mt-2 text-muted">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 rounded-xl border border-card-border bg-card p-8"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-muted"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="mt-1 block w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-muted"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 block w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-muted"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="mt-1 block w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-muted"
                    >
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="mt-1 block w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-base text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <option value="">Select a service</option>
                      <option value="ai">AI Solutions</option>
                      <option value="web3">Web3 Development</option>
                      <option value="web-mobile">Web &amp; Mobile</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-muted"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="mt-1 block w-full resize-none rounded-lg border border-card-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <ShimmerButton type="submit" className="w-full">
                    Send Message
                  </ShimmerButton>
                </form>
              )}
            </BlurFade>
          </div>
        </section>
      </Spotlight>
      <Footer />
    </main>
  );
}
