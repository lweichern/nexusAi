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

  function updatePosition(clientX: number, clientY: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: clientX - rect.left, y: clientY - rect.top });
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    updatePosition(e.clientX, e.clientY);
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) {
          updatePosition(touch.clientX, touch.clientY);
          if (!isVisible) setIsVisible(true);
        }
      }}
      onTouchEnd={() => setIsVisible(false)}
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
