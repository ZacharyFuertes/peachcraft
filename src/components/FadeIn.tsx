import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useRevealOnScroll();
  return (
    <div
      ref={ref}
      className={`${isVisible ? "animate-stagger-fade" : "opacity-0"} ${className ?? ""}`}
      style={isVisible && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
