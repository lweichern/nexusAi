"use client";

import { useId, useRef } from "react";
import { useAnimationFrame } from "framer-motion";
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
  const gradientId = useId();
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef(0);
  const circleRef = useRef<SVGCircleElement>(null);

  useAnimationFrame((time) => {
    const path = pathRef.current;
    const circle = circleRef.current;
    if (!path || !circle) return;

    const length = path.getTotalLength();
    if (length === 0) return;

    progressRef.current = (time % duration) / duration;
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
          <path
            ref={pathRef}
            d="M8,0 H92 A8,8 0 0,1 100,8 V92 A8,8 0 0,1 92,100 H8 A8,8 0 0,1 0,92 V8 A8,8 0 0,1 8,0 Z"
            fill="none"
            className="invisible"
          />
          <circle
            ref={circleRef}
            r="15"
            fill={`url(#${gradientId})`}
            className={cn(borderClassName)}
          />
          <defs>
            <radialGradient id={gradientId}>
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
