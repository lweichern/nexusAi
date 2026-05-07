"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CanvasRevealEffectProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
  dotSize?: number;
  dotGap?: number;
  colors?: [number, number, number][];
  animationSpeed?: number;
}

export function CanvasRevealEffect({
  children,
  revealContent,
  className,
  dotSize = 3,
  dotGap = 5,
  colors = [[0, 212, 255]],
  animationSpeed = 5,
}: CanvasRevealEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const radiusRef = useRef(0);
  const centerRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const maxRadius = Math.sqrt(rect.width ** 2 + rect.height ** 2);
    const targetRadius = isHovered ? maxRadius : 0;

    radiusRef.current += (targetRadius - radiusRef.current) * 0.05 * animationSpeed;

    if (Math.abs(radiusRef.current - targetRadius) < 0.5 && !isHovered) {
      radiusRef.current = 0;
      ctx.clearRect(0, 0, rect.width, rect.height);
      return;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);

    const cx = centerRef.current.x;
    const cy = centerRef.current.y;
    const step = dotSize + dotGap;

    for (let x = 0; x < rect.width; x += step) {
      for (let y = 0; y < rect.height; y += step) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radiusRef.current) {
          const colorIdx = Math.floor(Math.random() * colors.length);
          const [r, g, b] = colors[colorIdx];
          const opacity = Math.max(0, 1 - dist / radiusRef.current) * 0.8;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fillRect(x, y, dotSize, dotSize);
        }
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, [isHovered, dotSize, dotGap, colors, animationSpeed]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={(e) => {
        const rect = containerRef.current!.getBoundingClientRect();
        centerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {revealContent}
      </motion.div>
    </div>
  );
}
