import { cn } from "@/lib/utils";

/** شبکه. Hairline grid that fades toward the bottom. Drop inside a `relative` parent. */
export function GridBackground({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]", className)}
      style={{
        backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
