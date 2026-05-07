import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

export function ShimmerButton({
  shimmerColor = "#00d4ff",
  shimmerSize = "0.1em",
  shimmerDuration = "2s",
  borderRadius = "100px",
  background = "rgba(0, 0, 0, 0.9)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
        className
      )}
      style={{ borderRadius }}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius }}
      >
        <span
          className="absolute inset-[-100%] animate-[shimmer-spin_2s_linear_infinite]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0 340deg, ${shimmerColor} 360deg)`,
            animationDuration: shimmerDuration,
          }}
        />
      </div>
      <div
        className="absolute inset-px"
        style={{ borderRadius, background }}
      />
      <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
        {children}
      </span>
    </button>
  );
}
