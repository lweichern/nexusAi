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
