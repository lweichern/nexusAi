"use client";

import { useMemo, useRef, useEffect } from "react";
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
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    if (!containerRef.current) return;
    const speedMap = { fast: "20s", normal: "40s", slow: "60s" };
    containerRef.current.style.setProperty("--animation-duration", speedMap[speed]);
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        className={cn(
          "flex w-max shrink-0 gap-8 py-4 animate-[scroll_var(--animation-duration)_linear_infinite_var(--animation-direction)]",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {duplicatedItems.map((item, idx) => (
          <li key={`${item.id}-${idx}`} className="shrink-0">
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
