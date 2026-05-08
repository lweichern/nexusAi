import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
}

export function RetroGrid({ className, angle = 65 }: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]",
        className
      )}
    >
      <div
        className="absolute inset-0 [transform:rotateX(var(--grid-angle))]"
        style={
          {
            "--grid-angle": `${angle}deg`,
          } as React.CSSProperties
        }
      >
        <div className="animate-[retro-grid_20s_linear_infinite] [background-image:linear-gradient(to_right,rgba(0,212,255,0.15)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,212,255,0.15)_1px,transparent_0)] [background-repeat:repeat] [background-size:40px_40px] [height:200vh] [inset:0%_0px] [margin-left:-100%] [transform-origin:100%_0_0] [width:400vw] sm:[background-size:60px_60px] sm:[height:300vh] sm:[margin-left:-200%] sm:[width:600vw]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}
