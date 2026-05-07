# Tech Agency Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, cinematic tech agency website with high-impact animations for an AI/Web3/Web+Mobile consultancy.

**Architecture:** Next.js 15 App Router with 4 pages (Landing, Services, Work, Contact). All animation components built from scratch with Framer Motion — no Aceternity UI dependency. Landing page uses section-based composition with a tracing beam scroll spine. Dark theme with electric blue/cyan accent.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion 11, clsx, tailwind-merge

---

## File Structure

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    services/page.tsx
    work/page.tsx
    contact/page.tsx
  components/
    ui/
      blur-fade.tsx
      text-generate-effect.tsx
      flip-words.tsx
      shimmer-button.tsx
      moving-border.tsx
      card-3d.tsx
      infinite-moving-cards.tsx
      animated-beam-network.tsx
      tracing-beam.tsx
      canvas-reveal-effect.tsx
      retro-grid.tsx
      dot-pattern.tsx
      spotlight.tsx
      floating-dock.tsx
      sticky-scroll-reveal.tsx
      card-hover-effect.tsx
    sections/
      hero.tsx
      clients-bar.tsx
      services-overview.tsx
      featured-work.tsx
      cta-section.tsx
      footer.tsx
    layout/
      floating-nav.tsx
  lib/
    utils.ts
  data/
    services.ts
    projects.ts
    clients.ts
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `src/app/globals.css`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Scaffold Next.js project**

Run from the project root `/Users/weichernlim/Documents/RandomProjects/Portfolio/tech`:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack
```

Select defaults for all prompts. This creates Next.js 15 with Tailwind v4 and App Router.

- [ ] **Step 2: Install animation and utility dependencies**

```bash
npm install framer-motion clsx tailwind-merge
```

- [ ] **Step 3: Set up the cn() utility**

Create `src/lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Configure global CSS with theme**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --font-geist-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-geist-mono: "Geist Mono", ui-monospace, monospace;
  --color-background: #0a0a0a;
  --color-foreground: #ededed;
  --color-accent: #00d4ff;
  --color-accent-dark: #0099b8;
  --color-muted: #888888;
  --color-card: #141414;
  --color-card-border: #222222;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-geist-sans);
}

::selection {
  background: var(--color-accent);
  color: var(--color-background);
}
```

- [ ] **Step 5: Update root layout with fonts**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexusAI — AI, Web3 & Digital Solutions",
  description:
    "We build cutting-edge AI, Web3, and digital products for forward-thinking companies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Replace landing page with placeholder**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-accent">NexusAI</h1>
    </main>
  );
}
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000` in browser. Confirm: dark background, cyan "NexusAI" text centered.

- [ ] **Step 8: Initialize git and commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 project with Tailwind v4 and Framer Motion"
```

---

### Task 2: Data Layer

**Files:**
- Create: `src/data/services.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/clients.ts`

- [ ] **Step 1: Create services data**

Create `src/data/services.ts`:

```typescript
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: "brain" | "chain" | "device";
  capabilities: string[];
  technologies: string[];
}

export const services: Service[] = [
  {
    id: "ai",
    title: "AI Solutions",
    description:
      "Intelligent systems that transform data into decisions. From custom ML models to LLM-powered applications.",
    icon: "brain",
    capabilities: [
      "Machine Learning",
      "LLM Integration",
      "Computer Vision",
      "AI Automation",
      "Data Analytics",
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "LangChain"],
  },
  {
    id: "web3",
    title: "Web3 Development",
    description:
      "Decentralized applications and blockchain infrastructure. Building the next generation of the internet.",
    icon: "chain",
    capabilities: [
      "Smart Contracts",
      "DeFi Protocols",
      "NFT Platforms",
      "Blockchain Integration",
      "Token Development",
    ],
    technologies: ["Solidity", "Ethereum", "Polygon", "Hardhat", "IPFS"],
  },
  {
    id: "web-mobile",
    title: "Web & Mobile",
    description:
      "Pixel-perfect applications that scale. From responsive web apps to native mobile experiences.",
    icon: "device",
    capabilities: [
      "Web Applications",
      "Mobile Apps",
      "E-commerce",
      "SaaS Platforms",
      "API Development",
    ],
    technologies: ["React", "Next.js", "React Native", "Node.js", "PostgreSQL"],
  },
];
```

- [ ] **Step 2: Create projects data**

Create `src/data/projects.ts`:

```typescript
export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "neural-trade",
    title: "NeuralTrade Platform",
    client: "QuantumFi Labs",
    description:
      "AI-powered trading platform combining machine learning predictions with DeFi protocols for automated portfolio management.",
    tags: ["AI", "Web3", "DeFi"],
    image: "/projects/placeholder.svg",
    featured: true,
  },
];
```

- [ ] **Step 3: Create clients data**

Create `src/data/clients.ts`:

```typescript
export interface Client {
  name: string;
  logo: string;
}

export const clients: Client[] = [
  { name: "Acme Corp", logo: "Acme" },
  { name: "Quantum Labs", logo: "Quantum" },
  { name: "Nexus Finance", logo: "Nexus" },
  { name: "Vertex AI", logo: "Vertex" },
  { name: "Block Protocol", logo: "Block" },
  { name: "Cipher Systems", logo: "Cipher" },
  { name: "Aether Tech", logo: "Aether" },
  { name: "Prism Digital", logo: "Prism" },
];
```

- [ ] **Step 4: Create placeholder project image**

```bash
mkdir -p public/projects
```

Create `public/projects/placeholder.svg`:

```svg
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#141414"/>
  <rect x="1" y="1" width="598" height="398" fill="none" stroke="#222" stroke-width="1"/>
  <text x="300" y="200" text-anchor="middle" fill="#444" font-family="system-ui" font-size="18">Project Preview</text>
</svg>
```

- [ ] **Step 5: Commit**

```bash
git add src/data/ public/projects/
git commit -m "feat: add data layer for services, projects, and clients"
```

---

### Task 3: BlurFade Component

**Files:**
- Create: `src/components/ui/blur-fade.tsx`

- [ ] **Step 1: Create BlurFade component**

This component is used by almost every section, so it must be built first.

Create `src/components/ui/blur-fade.tsx`:

```tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  type UseInViewOptions,
  type Variant,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  inViewMargin?: UseInViewOptions["margin"];
  blur?: string;
}

const variants = {
  hidden: (props: { yOffset: number; blur: string }) => ({
    y: props.yOffset,
    opacity: 0,
    filter: `blur(${props.blur})`,
  }),
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  } satisfies Variant,
};

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.4,
  yOffset = 6,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: inViewMargin });

  return (
    <motion.div
      ref={ref}
      custom={{ yOffset, blur }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify**

Add to `src/app/page.tsx` temporarily:

```tsx
import { BlurFade } from "@/components/ui/blur-fade";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <BlurFade>
        <h1 className="text-4xl font-bold text-accent">NexusAI</h1>
      </BlurFade>
    </main>
  );
}
```

Refresh browser. The "NexusAI" text should blur-fade in on page load.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/blur-fade.tsx src/app/page.tsx
git commit -m "feat: add BlurFade scroll-reveal animation component"
```

---

### Task 4: Text Animation Components

**Files:**
- Create: `src/components/ui/text-generate-effect.tsx`
- Create: `src/components/ui/flip-words.tsx`

- [ ] **Step 1: Create TextGenerateEffect**

Create `src/components/ui/text-generate-effect.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { opacity: 1, filter: filter ? "blur(0px)" : "none" },
        { duration, delay: stagger(0.1) }
      );
    }
  }, [isInView, animate, duration, filter]);

  return (
    <motion.div ref={scope} className={cn(className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          className="inline-block"
          style={{
            opacity: 0,
            filter: filter ? "blur(10px)" : "none",
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create FlipWords**

Create `src/components/ui/flip-words.tsx`:

```tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function FlipWords({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    const interval = setInterval(next, duration);
    return () => clearInterval(interval);
  }, [next, duration]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[currentIndex]}
        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn("inline-block", className)}
      >
        {words[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Verify both components**

Update `src/app/page.tsx`:

```tsx
import { BlurFade } from "@/components/ui/blur-fade";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FlipWords } from "@/components/ui/flip-words";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <TextGenerateEffect
        words="Building the Future of Technology"
        className="text-4xl font-bold"
      />
      <BlurFade delay={0.5}>
        <div className="flex items-center gap-2 text-xl text-muted">
          We specialize in{" "}
          <FlipWords
            words={["AI Solutions", "Web3 Development", "Digital Products"]}
            className="text-accent font-semibold"
          />
        </div>
      </BlurFade>
    </main>
  );
}
```

Refresh browser. Text should generate word-by-word, then FlipWords should cycle through the three phrases.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/text-generate-effect.tsx src/components/ui/flip-words.tsx src/app/page.tsx
git commit -m "feat: add TextGenerateEffect and FlipWords animation components"
```

---

### Task 5: ShimmerButton and MovingBorder

**Files:**
- Create: `src/components/ui/shimmer-button.tsx`
- Create: `src/components/ui/moving-border.tsx`

- [ ] **Step 1: Create ShimmerButton**

Create `src/components/ui/shimmer-button.tsx`:

```tsx
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

export function ShimmerButton({
  shimmerColor = "#00d4ff",
  shimmerSize = "0.1em",
  shimmerDuration = "2s",
  borderRadius = "100px",
  background = "rgba(0, 0, 0, 0.9)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
        className
      )}
      style={{ borderRadius }}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius }}
      >
        <span
          className="absolute inset-[-100%] animate-[shimmer-spin_2s_linear_infinite]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0 340deg, ${shimmerColor} 360deg)`,
            animationDuration: shimmerDuration,
          }}
        />
      </div>
      <div
        className="absolute inset-px"
        style={{ borderRadius, background }}
      />
      <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
        {children}
      </span>
    </button>
  );
}
```

- [ ] **Step 2: Add shimmer keyframe to globals.css**

Add to the bottom of `src/app/globals.css`:

```css
@keyframes shimmer-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

- [ ] **Step 3: Create MovingBorder**

Create `src/components/ui/moving-border.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
}

export function MovingBorder({
  children,
  duration = 4000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "div",
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const progressRef = useRef(0);
  const circleRef = useRef<SVGCircleElement>(null);

  useAnimationFrame((time) => {
    const path = pathRef.current;
    const circle = circleRef.current;
    if (!path || !circle) return;

    progressRef.current = (time % duration) / duration;
    const length = path.getTotalLength();
    const point = path.getPointAtLength(progressRef.current * length);

    circle.setAttribute("cx", String(point.x));
    circle.setAttribute("cy", String(point.y));
  });

  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-xl p-px",
        containerClassName
      )}
    >
      <div className="absolute inset-0">
        <svg
          className="absolute h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <rect
            ref={pathRef}
            x="0"
            y="0"
            width="100"
            height="100"
            fill="none"
            className="invisible"
            rx="8"
            ry="8"
          />
          <circle
            ref={circleRef}
            r="15"
            fill="url(#moving-border-gradient)"
            className={cn(borderClassName)}
          />
          <defs>
            <radialGradient id="moving-border-gradient">
              <stop offset="0%" stopColor="var(--color-accent)" />
              <stop
                offset="100%"
                stopColor="var(--color-accent)"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div
        className={cn(
          "relative rounded-xl bg-card",
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
}
```

- [ ] **Step 4: Verify both**

Update `src/app/page.tsx`:

```tsx
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MovingBorder } from "@/components/ui/moving-border";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <MovingBorder className="p-6">
        <h2 className="text-xl font-bold">Card with Moving Border</h2>
        <p className="text-muted mt-2">The border gradient orbits the card</p>
      </MovingBorder>
      <ShimmerButton>Get in Touch</ShimmerButton>
    </main>
  );
}
```

Refresh browser. Card should have an orbiting glow on its border. Button should have a spinning shimmer edge.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/shimmer-button.tsx src/components/ui/moving-border.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: add ShimmerButton and MovingBorder components"
```

---

### Task 6: 3D Card Effect

**Files:**
- Create: `src/components/ui/card-3d.tsx`

- [ ] **Step 1: Create 3D Card component**

Create `src/components/ui/card-3d.tsx`:

```tsx
"use client";

import { useState, useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card3DContainerProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Card3DContainer({
  children,
  className,
  containerClassName,
}: Card3DContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    setRotateX(-y);
    setRotateY(x);
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
  }

  return (
    <div
      className={cn("flex items-center justify-center", containerClassName)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
        className={cn("relative", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface Card3DBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function Card3DBody({ children, className }: Card3DBodyProps) {
  return (
    <div
      className={cn("h-full w-full [transform-style:preserve-3d]", className)}
    >
      {children}
    </div>
  );
}

interface Card3DItemProps {
  children: React.ReactNode;
  className?: string;
  translateZ?: number;
}

export function Card3DItem({
  children,
  className,
  translateZ = 0,
}: Card3DItemProps) {
  return (
    <div
      className={cn(className)}
      style={{ transform: `translateZ(${translateZ}px)` }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Update `src/app/page.tsx`:

```tsx
import { Card3DContainer, Card3DBody, Card3DItem } from "@/components/ui/card-3d";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card3DContainer className="w-80">
        <Card3DBody className="rounded-xl border border-card-border bg-card p-6">
          <Card3DItem translateZ={50}>
            <h2 className="text-xl font-bold">3D Card</h2>
          </Card3DItem>
          <Card3DItem translateZ={30} className="mt-2">
            <p className="text-muted">Hover and move your mouse</p>
          </Card3DItem>
        </Card3DBody>
      </Card3DContainer>
    </main>
  );
}
```

Refresh. Card should tilt based on mouse position with layered depth.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/card-3d.tsx src/app/page.tsx
git commit -m "feat: add 3D card tilt effect component"
```

---

### Task 7: InfiniteMovingCards

**Files:**
- Create: `src/components/ui/infinite-moving-cards.tsx`

- [ ] **Step 1: Create InfiniteMovingCards**

Create `src/components/ui/infinite-moving-cards.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InfiniteMovingCardsProps {
  items: { content: React.ReactNode; id: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current || started) return;

    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const clone = item.cloneNode(true);
      scrollerRef.current!.appendChild(clone);
    });

    const speedMap = { fast: "20s", normal: "40s", slow: "60s" };
    containerRef.current.style.setProperty(
      "--animation-duration",
      speedMap[speed]
    );
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    setStarted(true);
  }, [direction, speed, started]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max shrink-0 gap-8 py-4",
          started && "animate-[scroll_var(--animation-duration)_linear_infinite_var(--animation-direction)]",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li key={item.id} className="flex-shrink-0">
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Add scroll keyframe to globals.css**

Add to `src/app/globals.css`:

```css
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

- [ ] **Step 3: Verify**

Update `src/app/page.tsx`:

```tsx
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const items = [
  { id: "1", content: <div className="rounded-lg bg-card px-6 py-3 text-muted">Acme Corp</div> },
  { id: "2", content: <div className="rounded-lg bg-card px-6 py-3 text-muted">Quantum Labs</div> },
  { id: "3", content: <div className="rounded-lg bg-card px-6 py-3 text-muted">Nexus Finance</div> },
  { id: "4", content: <div className="rounded-lg bg-card px-6 py-3 text-muted">Vertex AI</div> },
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <InfiniteMovingCards items={items} speed="normal" />
    </main>
  );
}
```

Refresh. Cards should scroll continuously left with fade masks on edges.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/infinite-moving-cards.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: add InfiniteMovingCards marquee component"
```

---

### Task 8: AnimatedBeamNetwork (Canvas)

**Files:**
- Create: `src/components/ui/animated-beam-network.tsx`

- [ ] **Step 1: Create AnimatedBeamNetwork**

This is the most complex component — a canvas-based neural network visualization.

Create `src/components/ui/animated-beam-network.tsx`:

```tsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Beam {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

interface AnimatedBeamNetworkProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  accentColor?: string;
}

export function AnimatedBeamNetwork({
  className,
  nodeCount = 40,
  connectionDistance = 200,
  accentColor = "#00d4ff",
}: AnimatedBeamNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const beamsRef = useRef<Beam[]>([]);
  const animationRef = useRef<number>(0);

  const initNodes = useCallback(
    (width: number, height: number) => {
      const nodes: Node[] = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 1,
        });
      }
      nodesRef.current = nodes;

      const beams: Beam[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < connectionDistance) {
            beams.push({
              from: i,
              to: j,
              progress: Math.random(),
              speed: Math.random() * 0.003 + 0.001,
            });
          }
        }
      }
      beamsRef.current = beams;
    },
    [nodeCount, connectionDistance]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
      initNodes(rect.width, rect.height);
    }

    resize();
    window.addEventListener("resize", resize);

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    function render() {
      const rect = canvas!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx!.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const beams = beamsRef.current;
      const mouse = mouseRef.current;

      for (const node of nodes) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          node.vx += (dx / dist) * 0.02;
          node.vy += (dy / dist) * 0.02;
        }

        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.99;
        node.vy *= 0.99;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      beamsRef.current = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const existing = beams.find(
              (b) =>
                (b.from === i && b.to === j) || (b.from === j && b.to === i)
            );
            beamsRef.current.push(
              existing
                ? { ...existing, progress: (existing.progress + existing.speed) % 1 }
                : { from: i, to: j, progress: Math.random(), speed: Math.random() * 0.003 + 0.001 }
            );
          }
        }
      }

      for (const beam of beamsRef.current) {
        const from = nodes[beam.from];
        const to = nodes[beam.to];
        const dx = from.x - to.x;
        const dy = from.y - to.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const opacity = 1 - dist / connectionDistance;

        ctx!.beginPath();
        ctx!.moveTo(from.x, from.y);
        ctx!.lineTo(to.x, to.y);
        ctx!.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.15})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();

        const px = from.x + (to.x - from.x) * beam.progress;
        const py = from.y + (to.y - from.y) * beam.progress;
        const gradient = ctx!.createRadialGradient(px, py, 0, px, py, 8);
        gradient.addColorStop(0, `rgba(0, 212, 255, ${opacity * 0.8})`);
        gradient.addColorStop(1, "rgba(0, 212, 255, 0)");
        ctx!.beginPath();
        ctx!.arc(px, py, 8, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();
      }

      for (const node of nodes) {
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx!.fillStyle = accentColor;
        ctx!.fill();

        const glow = ctx!.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        glow.addColorStop(0, `rgba(0, 212, 255, 0.3)`);
        glow.addColorStop(1, "rgba(0, 212, 255, 0)");
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx!.fillStyle = glow;
        ctx!.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initNodes, connectionDistance, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
```

- [ ] **Step 2: Verify**

Update `src/app/page.tsx`:

```tsx
import { AnimatedBeamNetwork } from "@/components/ui/animated-beam-network";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <AnimatedBeamNetwork />
      <h1 className="relative z-10 text-5xl font-bold text-white">NexusAI</h1>
    </main>
  );
}
```

Refresh. Canvas should show drifting nodes with glowing beams. Moving the mouse should attract nearby nodes.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/animated-beam-network.tsx src/app/page.tsx
git commit -m "feat: add AnimatedBeamNetwork canvas visualization"
```

---

### Task 9: TracingBeam

**Files:**
- Create: `src/components/ui/tracing-beam.tsx`

- [ ] **Step 1: Create TracingBeam**

Create `src/components/ui/tracing-beam.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, svgHeight - 200]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <motion.div ref={ref} className={cn("relative hidden md:flex", className)}>
      <div className="absolute top-3 left-4">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 10 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#tracing-gradient)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
            transition={{ duration: 0.1 }}
          />
          <defs>
            <motion.linearGradient
              id="tracing-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="var(--color-accent)" stopOpacity="0" />
              <stop stopColor="var(--color-accent)" />
              <stop offset="0.325" stopColor="var(--color-accent)" />
              <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
        <div className="absolute top-0 left-[5.5px] h-full w-px bg-[linear-gradient(to_bottom,transparent,var(--color-card-border)_10%,var(--color-card-border)_90%,transparent)]" />
      </div>
      <div ref={contentRef} className="ml-12 w-full">
        {children}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/tracing-beam.tsx
git commit -m "feat: add TracingBeam scroll-driven component"
```

---

### Task 10: CanvasRevealEffect

**Files:**
- Create: `src/components/ui/canvas-reveal-effect.tsx`

- [ ] **Step 1: Create CanvasRevealEffect**

Create `src/components/ui/canvas-reveal-effect.tsx`:

```tsx
"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CanvasRevealEffectProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
  dotSize?: number;
  dotGap?: number;
  colors?: [number, number, number][];
  animationSpeed?: number;
}

export function CanvasRevealEffect({
  children,
  revealContent,
  className,
  dotSize = 3,
  dotGap = 5,
  colors = [[0, 212, 255]],
  animationSpeed = 5,
}: CanvasRevealEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const radiusRef = useRef(0);
  const centerRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const maxRadius = Math.sqrt(rect.width ** 2 + rect.height ** 2);
    const targetRadius = isHovered ? maxRadius : 0;

    radiusRef.current += (targetRadius - radiusRef.current) * 0.05 * animationSpeed;

    if (Math.abs(radiusRef.current - targetRadius) < 0.5 && !isHovered) {
      radiusRef.current = 0;
      ctx.clearRect(0, 0, rect.width, rect.height);
      return;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);

    const cx = centerRef.current.x;
    const cy = centerRef.current.y;
    const step = dotSize + dotGap;

    for (let x = 0; x < rect.width; x += step) {
      for (let y = 0; y < rect.height; y += step) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radiusRef.current) {
          const colorIdx = Math.floor(Math.random() * colors.length);
          const [r, g, b] = colors[colorIdx];
          const opacity = Math.max(0, 1 - dist / radiusRef.current) * 0.8;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fillRect(x, y, dotSize, dotSize);
        }
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, [isHovered, dotSize, dotGap, colors, animationSpeed]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={(e) => {
        const rect = containerRef.current!.getBoundingClientRect();
        centerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {revealContent}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/canvas-reveal-effect.tsx
git commit -m "feat: add CanvasRevealEffect hover component"
```

---

### Task 11: Background Effect Components

**Files:**
- Create: `src/components/ui/retro-grid.tsx`
- Create: `src/components/ui/dot-pattern.tsx`
- Create: `src/components/ui/spotlight.tsx`

- [ ] **Step 1: Create RetroGrid**

Create `src/components/ui/retro-grid.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
}

export function RetroGrid({ className, angle = 65 }: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]",
        className
      )}
    >
      <div
        className="absolute inset-0 [transform:rotateX(var(--grid-angle))]"
        style={
          {
            "--grid-angle": `${angle}deg`,
          } as React.CSSProperties
        }
      >
        <div className="animate-[retro-grid_20s_linear_infinite] [background-image:linear-gradient(to_right,rgba(0,212,255,0.15)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,212,255,0.15)_1px,transparent_0)] [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}
```

- [ ] **Step 2: Add retro-grid keyframe to globals.css**

Add to `src/app/globals.css`:

```css
@keyframes retro-grid {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(60px);
  }
}
```

- [ ] **Step 3: Create DotPattern**

Create `src/components/ui/dot-pattern.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
}

export function DotPattern({
  className,
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 1,
}: DotPatternProps) {
  const id = `dot-pattern-${width}-${height}`;
  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-muted/20",
        className
      )}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
```

- [ ] **Step 4: Create Spotlight**

Create `src/components/ui/spotlight.tsx`:

```tsx
"use client";

import { useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
}

export function Spotlight({
  children,
  className,
  size = 400,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] opacity-0 transition-opacity duration-500"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, rgba(0,212,255,0.06), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/retro-grid.tsx src/components/ui/dot-pattern.tsx src/components/ui/spotlight.tsx src/app/globals.css
git commit -m "feat: add RetroGrid, DotPattern, and Spotlight background components"
```

---

### Task 12: FloatingDock

**Files:**
- Create: `src/components/ui/floating-dock.tsx`

- [ ] **Step 1: Create FloatingDock**

Create `src/components/ui/floating-dock.tsx`:

```tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-14 items-end gap-3 rounded-2xl border border-card-border bg-card/80 px-4 pb-2.5 backdrop-blur-md",
        className
      )}
    >
      {items.map((item) => (
        <DockIcon key={item.title} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
}

function DockIcon({
  mouseX,
  title,
  icon,
  href,
}: DockItem & { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        className="group relative flex aspect-square items-center justify-center rounded-full bg-card-border/50"
      >
        <div className="flex items-center justify-center text-foreground">
          {icon}
        </div>
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-card-border bg-card px-2 py-0.5 text-xs opacity-0 transition-opacity group-hover:opacity-100">
          {title}
        </div>
      </motion.div>
    </Link>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/floating-dock.tsx
git commit -m "feat: add FloatingDock macOS-style navigation component"
```

---

### Task 13: StickyScrollReveal

**Files:**
- Create: `src/components/ui/sticky-scroll-reveal.tsx`

- [ ] **Step 1: Create StickyScrollReveal**

Create `src/components/ui/sticky-scroll-reveal.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StickyScrollItem {
  title: string;
  description: React.ReactNode;
  content: React.ReactNode;
}

interface StickyScrollRevealProps {
  items: StickyScrollItem[];
  className?: string;
}

export function StickyScrollReveal({
  items,
  className,
}: StickyScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {items.map((item, index) => (
        <StickyItem
          key={item.title}
          item={item}
          index={index}
          total={items.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function StickyItem({
  item,
  index,
  total,
  progress,
}: {
  item: StickyScrollItem;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, index === total - 1 ? 1 : 0]);
  const scale = useTransform(progress, [start, start + 0.05], [0.95, 1]);

  return (
    <div className="flex min-h-screen items-start">
      <div className="sticky top-0 flex h-screen w-full items-center">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:gap-20">
          <motion.div className="flex-1" style={{ opacity, scale }}>
            <h3 className="text-3xl font-bold lg:text-4xl">{item.title}</h3>
            <div className="mt-4 text-lg text-muted">{item.description}</div>
          </motion.div>
          <motion.div className="flex-1" style={{ opacity }}>
            {item.content}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/sticky-scroll-reveal.tsx
git commit -m "feat: add StickyScrollReveal component for services page"
```

---

### Task 14: CardHoverEffect

**Files:**
- Create: `src/components/ui/card-hover-effect.tsx`

- [ ] **Step 1: Create CardHoverEffect**

Create `src/components/ui/card-hover-effect.tsx`:

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HoverCardItem {
  id: string;
  content: React.ReactNode;
}

interface CardHoverEffectProps {
  items: HoverCardItem[];
  className?: string;
}

export function CardHoverEffect({ items, className }: CardHoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block rounded-2xl bg-accent/10"
                layoutId="hover-card-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 h-full overflow-hidden rounded-xl border border-card-border bg-card p-6">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/card-hover-effect.tsx
git commit -m "feat: add CardHoverEffect grid component"
```

---

### Task 15: Landing Page Sections — Hero

**Files:**
- Create: `src/components/sections/hero.tsx`

- [ ] **Step 1: Create Hero section**

Create `src/components/sections/hero.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "feat: add Hero section with beam network and text animations"
```

---

### Task 16: Landing Page Sections — Clients Bar

**Files:**
- Create: `src/components/sections/clients-bar.tsx`

- [ ] **Step 1: Create ClientsBar section**

Create `src/components/sections/clients-bar.tsx`:

```tsx
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BlurFade } from "@/components/ui/blur-fade";
import { clients } from "@/data/clients";

export function ClientsBar() {
  const items = clients.map((client) => ({
    id: client.name,
    content: (
      <div className="flex h-12 items-center justify-center rounded-lg border border-card-border bg-card/50 px-8">
        <span className="whitespace-nowrap font-mono text-sm text-muted">
          {client.logo}
        </span>
      </div>
    ),
  }));

  return (
    <section className="py-16">
      <BlurFade>
        <p className="mb-8 text-center text-sm uppercase tracking-widest text-muted">
          Trusted by innovative teams
        </p>
      </BlurFade>
      <InfiniteMovingCards items={items} speed="slow" />
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/clients-bar.tsx
git commit -m "feat: add ClientsBar section with infinite marquee"
```

---

### Task 17: Landing Page Sections — Services Overview

**Files:**
- Create: `src/components/sections/services-overview.tsx`

- [ ] **Step 1: Create ServicesOverview section**

Create `src/components/sections/services-overview.tsx`:

```tsx
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
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/services-overview.tsx
git commit -m "feat: add ServicesOverview section with 3D cards and moving borders"
```

---

### Task 18: Landing Page Sections — Featured Work

**Files:**
- Create: `src/components/sections/featured-work.tsx`

- [ ] **Step 1: Create FeaturedWork section**

Create `src/components/sections/featured-work.tsx`:

```tsx
"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { projects } from "@/data/projects";
import Image from "next/image";
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
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <BlurFade
              key={project.id}
              delay={index * 0.1}
              className={featured.length === 1 ? "md:col-span-2 lg:col-span-3 max-w-2xl mx-auto w-full" : ""}
            >
              <Link href="/work" className="group block">
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
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
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
                  <h3 className="mt-2 text-xl font-bold group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{project.client}</p>
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/featured-work.tsx
git commit -m "feat: add FeaturedWork section with canvas reveal effect"
```

---

### Task 19: Landing Page Sections — CTA and Footer

**Files:**
- Create: `src/components/sections/cta-section.tsx`
- Create: `src/components/sections/footer.tsx`

- [ ] **Step 1: Create CTA section**

Create `src/components/sections/cta-section.tsx`:

```tsx
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
```

- [ ] **Step 2: Create Footer**

Create `src/components/sections/footer.tsx`:

```tsx
import Link from "next/link";

const socialLinks = [
  { name: "GitHub", href: "#" },
  { name: "X", href: "#" },
  { name: "LinkedIn", href: "#" },
];

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-card-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-accent">
            NexusAI
          </span>
        </div>
        <nav className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl text-center text-xs text-muted">
        &copy; {new Date().getFullYear()} NexusAI. All rights reserved.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/cta-section.tsx src/components/sections/footer.tsx
git commit -m "feat: add CTA section with retro grid and Footer"
```

---

### Task 20: FloatingNav + Root Layout Integration

**Files:**
- Create: `src/components/layout/floating-nav.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create FloatingNav**

Create `src/components/layout/floating-nav.tsx`:

```tsx
"use client";

import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";

const navItems: DockItem[] = [
  {
    title: "Home",
    href: "/",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Services",
    href: "/services",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: "Work",
    href: "/work",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    title: "Contact",
    href: "/contact",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export function FloatingNav() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <FloatingDock items={navItems} />
    </div>
  );
}
```

- [ ] **Step 2: Update root layout**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FloatingNav } from "@/components/layout/floating-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexusAI — AI, Web3 & Digital Solutions",
  description:
    "We build cutting-edge AI, Web3, and digital products for forward-thinking companies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FloatingNav />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify**

Refresh browser. Floating dock should appear at the bottom center of the viewport with magnifying icons on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/floating-nav.tsx src/app/layout.tsx
git commit -m "feat: add FloatingNav dock and integrate into root layout"
```

---

### Task 21: Assemble Landing Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Assemble all sections into the landing page**

Replace `src/app/page.tsx`:

```tsx
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Hero } from "@/components/sections/hero";
import { ClientsBar } from "@/components/sections/clients-bar";
import { ServicesOverview } from "@/components/sections/services-overview";
import { FeaturedWork } from "@/components/sections/featured-work";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TracingBeam>
        <ClientsBar />
        <ServicesOverview />
        <FeaturedWork />
        <CTASection />
      </TracingBeam>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3000`. Walk through the full landing page:

1. Hero: beam network animation, text generates, words flip, shimmer CTA button
2. Clients: logos scroll infinitely with edge fade
3. Services: three 3D tilt cards with moving borders
4. Featured Work: canvas reveal on hover
5. CTA: retro grid background, shimmer button
6. Footer: links and copyright
7. Tracing beam should animate down the left side on scroll (desktop only)
8. Floating dock at bottom magnifies on hover

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble landing page with all sections and tracing beam"
```

---

### Task 22: Services Page

**Files:**
- Create: `src/app/services/page.tsx`

- [ ] **Step 1: Create services page**

Create `src/app/services/page.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify**

Navigate to `http://localhost:3000/services`. Three service sections should pin-and-reveal as you scroll through the page.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat: add Services page with sticky scroll reveal"
```

---

### Task 23: Work Page

**Files:**
- Create: `src/app/work/page.tsx`

- [ ] **Step 1: Create work page**

Create `src/app/work/page.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify**

Navigate to `http://localhost:3000/work`. Should see one large project card with hover glow effect.

- [ ] **Step 3: Commit**

```bash
git add src/app/work/page.tsx
git commit -m "feat: add Work page with card hover effect grid"
```

---

### Task 24: Contact Page

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create contact page**

Create `src/app/contact/page.tsx`:

```tsx
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
                <h1 className="text-4xl font-bold md:text-6xl">
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
                      <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
                      <a href="#" className="hover:text-foreground transition-colors">X</a>
                      <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
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
                      className="mt-1 block w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
                      className="mt-1 block w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
                      className="mt-1 block w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
                      className="mt-1 block w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
                      className="mt-1 block w-full resize-none rounded-lg border border-card-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
```

- [ ] **Step 2: Verify**

Navigate to `http://localhost:3000/contact`. Should see:
- Spotlight effect following cursor
- Dot pattern background
- Left: contact info, Right: form
- Submit form → success message appears
- Form inputs should have accent focus ring

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add Contact page with spotlight effect and form"
```

---

### Task 25: Responsive Polish and Mobile Navigation

**Files:**
- Modify: `src/components/ui/floating-dock.tsx`
- Modify: `src/components/layout/floating-nav.tsx`

- [ ] **Step 1: Add mobile menu to FloatingDock**

Add a mobile-friendly version to `src/components/ui/floating-dock.tsx`. Add this component at the bottom of the file:

```tsx
interface FloatingDockMobileProps {
  items: DockItem[];
  className?: string;
}

export function FloatingDockMobile({ items, className }: FloatingDockMobileProps) {
  return (
    <div className={cn("flex h-12 items-center gap-4 rounded-full border border-card-border bg-card/90 px-6 backdrop-blur-md", className)}>
      {items.map((item) => (
        <Link key={item.title} href={item.href} className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-foreground">
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Update FloatingNav to show mobile variant on small screens**

Replace `src/components/layout/floating-nav.tsx`:

```tsx
"use client";

import {
  FloatingDock,
  FloatingDockMobile,
  type DockItem,
} from "@/components/ui/floating-dock";

const navItems: DockItem[] = [
  {
    title: "Home",
    href: "/",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Services",
    href: "/services",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: "Work",
    href: "/work",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    title: "Contact",
    href: "/contact",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export function FloatingNav() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="hidden md:block">
        <FloatingDock items={navItems} />
      </div>
      <div className="md:hidden">
        <FloatingDockMobile items={navItems} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify responsive behavior**

1. Desktop (>768px): magnifying dock with spring physics
2. Mobile (<768px): simplified compact icon bar
3. All pages accessible from both variants
4. Test: resize browser window, dock variant should switch

- [ ] **Step 4: Final full-site walkthrough**

Navigate through all pages and verify:
- `/` — Hero animation, scrolling sections, tracing beam, floating dock
- `/services` — Sticky scroll reveal for each service
- `/work` — Card hover effect on project grid
- `/contact` — Spotlight effect, dot pattern, form submission

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/floating-dock.tsx src/components/layout/floating-nav.tsx
git commit -m "feat: add responsive mobile navigation and final polish"
```
