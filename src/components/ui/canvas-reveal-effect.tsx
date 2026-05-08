"use client";

import { useRef, useEffect, useState } from "react";
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
  const isHoveredRef = useRef(false);
  const radiusRef = useRef(0);
  const centerRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const rect = container!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
      sizeRef.current = { w: rect.width, h: rect.height };
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    function draw() {
      const { w, h } = sizeRef.current;
      ctx!.clearRect(0, 0, w, h);

      const maxRadius = Math.sqrt(w ** 2 + h ** 2);
      const targetRadius = isHoveredRef.current ? maxRadius : 0;

      radiusRef.current += (targetRadius - radiusRef.current) * 0.05 * animationSpeed;

      if (Math.abs(radiusRef.current - targetRadius) < 0.5 && !isHoveredRef.current) {
        radiusRef.current = 0;
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const cx = centerRef.current.x;
      const cy = centerRef.current.y;
      const step = dotSize + dotGap;
      const radius = radiusRef.current;

      for (let x = 0; x < w; x += step) {
        for (let y = 0; y < h; y += step) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius) {
            const colorIdx = Math.abs((x * 31 + y * 17)) % colors.length;
            const [r, g, b] = colors[colorIdx];
            const opacity = Math.max(0, 1 - dist / radius) * 0.8;
            ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx!.fillRect(x, y, dotSize, dotSize);
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, [dotSize, dotGap, colors, animationSpeed]);

  function activate(clientX: number, clientY: number) {
    const rect = containerRef.current!.getBoundingClientRect();
    centerRef.current = { x: clientX - rect.left, y: clientY - rect.top };
    isHoveredRef.current = true;
    setIsHovered(true);
  }

  function deactivate() {
    isHoveredRef.current = false;
    setIsHovered(false);
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={(e) => activate(e.clientX, e.clientY)}
      onMouseLeave={deactivate}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        if (touch) activate(touch.clientX, touch.clientY);
      }}
      onTouchEnd={deactivate}
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
