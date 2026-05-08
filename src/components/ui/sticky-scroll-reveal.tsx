"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StickyScrollItem {
  title: string;
  description: ReactNode;
  content: ReactNode;
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
    <div className={cn(className)}>
      {/* Mobile: stacked layout */}
      <div className="space-y-16 px-6 lg:hidden">
        {items.map((item) => (
          <div key={item.title}>
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <div className="mt-4 text-muted">{item.description}</div>
            <div className="mt-6">{item.content}</div>
          </div>
        ))}
      </div>

      {/* Desktop: sticky scroll reveal */}
      <div
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: `${(items.length + 1) * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-6xl items-start gap-20 px-6">
            <div className="relative flex-1">
              {items.map((item, index) => (
                <ScrollPanel
                  key={item.title}
                  index={index}
                  total={items.length}
                  progress={scrollYProgress}
                >
                  <h3 className="text-4xl font-bold">{item.title}</h3>
                  <div className="mt-4 text-lg text-muted">
                    {item.description}
                  </div>
                </ScrollPanel>
              ))}
            </div>
            <div className="relative flex-1">
              {items.map((item, index) => (
                <ScrollPanel
                  key={`visual-${item.title}`}
                  index={index}
                  total={items.length}
                  progress={scrollYProgress}
                >
                  {item.content}
                </ScrollPanel>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollPanel({
  children,
  index,
  total,
  progress,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const fade = 0.02;

  const opacity = useTransform(
    progress,
    index === 0
      ? [end - fade, end]
      : index === total - 1
        ? [start, start + fade]
        : [start, start + fade, end - fade, end],
    index === 0
      ? [1, 0]
      : index === total - 1
        ? [0, 1]
        : [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    index === 0 ? [end - fade, end] : [start, start + fade],
    index === 0 ? [0, -10] : [10, 0]
  );

  return (
    <motion.div
      className={index === 0 ? "relative" : "absolute inset-x-0 top-0"}
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
}
