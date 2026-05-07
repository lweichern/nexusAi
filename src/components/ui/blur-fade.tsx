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
