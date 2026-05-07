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
