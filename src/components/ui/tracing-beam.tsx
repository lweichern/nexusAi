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
