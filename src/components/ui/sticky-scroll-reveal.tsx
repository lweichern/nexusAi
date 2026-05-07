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
