import { cn } from "@/lib/utils";

/**
 * متن درخشان. A highlight sweeps across the text.
 */
export function TextShimmer({ children, className, duration = 3 }: { children: React.ReactNode; className?: string; duration?: number }) {
  return (
    <span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,1) 45%, rgba(16,185,129,1) 55%, rgba(255,255,255,0.4) 100%)",
        backgroundSize: "250% auto",
        animation: `shimmer ${duration}s linear infinite`,
      }}
    >
      {children}
    </span>
  );
}
