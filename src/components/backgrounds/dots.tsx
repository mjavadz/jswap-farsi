import { cn } from "@/lib/utils";

/** نقطه‌ای. Tiny dots on a grid; keep it under 12% opacity so text stays readable. */
export function DotsBackground({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]", className)}
      style={{
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
