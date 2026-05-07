"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Beam {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

interface AnimatedBeamNetworkProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  accentColor?: string;
}

export function AnimatedBeamNetwork({
  className,
  nodeCount = 40,
  connectionDistance = 200,
  accentColor = "#00d4ff",
}: AnimatedBeamNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const beamsRef = useRef<Beam[]>([]);
  const animationRef = useRef<number>(0);

  const initNodes = useCallback(
    (width: number, height: number) => {
      const nodes: Node[] = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 1,
        });
      }
      nodesRef.current = nodes;

      const beams: Beam[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < connectionDistance) {
            beams.push({
              from: i,
              to: j,
              progress: Math.random(),
              speed: Math.random() * 0.003 + 0.001,
            });
          }
        }
      }
      beamsRef.current = beams;
    },
    [nodeCount, connectionDistance]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
      initNodes(rect.width, rect.height);
    }

    resize();
    window.addEventListener("resize", resize);

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    function render() {
      const rect = canvas!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx!.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const beams = beamsRef.current;
      const mouse = mouseRef.current;

      for (const node of nodes) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          node.vx += (dx / dist) * 0.02;
          node.vy += (dy / dist) * 0.02;
        }

        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.99;
        node.vy *= 0.99;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      beamsRef.current = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const existing = beams.find(
              (b) =>
                (b.from === i && b.to === j) || (b.from === j && b.to === i)
            );
            beamsRef.current.push(
              existing
                ? { ...existing, progress: (existing.progress + existing.speed) % 1 }
                : { from: i, to: j, progress: Math.random(), speed: Math.random() * 0.003 + 0.001 }
            );
          }
        }
      }

      for (const beam of beamsRef.current) {
        const from = nodes[beam.from];
        const to = nodes[beam.to];
        const dx = from.x - to.x;
        const dy = from.y - to.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const opacity = 1 - dist / connectionDistance;

        ctx!.beginPath();
        ctx!.moveTo(from.x, from.y);
        ctx!.lineTo(to.x, to.y);
        ctx!.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.15})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();

        const px = from.x + (to.x - from.x) * beam.progress;
        const py = from.y + (to.y - from.y) * beam.progress;
        const gradient = ctx!.createRadialGradient(px, py, 0, px, py, 8);
        gradient.addColorStop(0, `rgba(0, 212, 255, ${opacity * 0.8})`);
        gradient.addColorStop(1, "rgba(0, 212, 255, 0)");
        ctx!.beginPath();
        ctx!.arc(px, py, 8, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();
      }

      for (const node of nodes) {
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx!.fillStyle = accentColor;
        ctx!.fill();

        const glow = ctx!.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        glow.addColorStop(0, `rgba(0, 212, 255, 0.3)`);
        glow.addColorStop(1, "rgba(0, 212, 255, 0)");
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx!.fillStyle = glow;
        ctx!.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initNodes, connectionDistance, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
