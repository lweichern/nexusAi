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
    <motion.nav
      aria-label="Main navigation"
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
    </motion.nav>
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
    <Link href={href} aria-label={title}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        className="group relative flex aspect-square items-center justify-center rounded-full bg-card-border/50"
      >
        <div className="flex items-center justify-center text-foreground" aria-hidden="true">
          {icon}
        </div>
        <div
          role="tooltip"
          className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-card-border bg-card px-2 py-0.5 text-xs opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {title}
        </div>
      </motion.div>
    </Link>
  );
}

interface FloatingDockMobileProps {
  items: DockItem[];
  className?: string;
}

export function FloatingDockMobile({ items, className }: FloatingDockMobileProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn("flex h-12 items-center gap-4 rounded-full border border-card-border bg-card/90 px-6 backdrop-blur-md", className)}
    >
      {items.map((item) => (
        <Link key={item.title} href={item.href} aria-label={item.title} className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-foreground">
          <span aria-hidden="true">{item.icon}</span>
        </Link>
      ))}
    </nav>
  );
}
