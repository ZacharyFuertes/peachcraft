import { Camera } from "lucide-react";

interface PhotoSlotProps {
  /** CSS aspect-ratio value, e.g. "16/8", "4/5", "1/1" */
  aspectRatio: string;
  /** Shot-direction label shown inside the placeholder */
  label: string;
  /** Apply border-radius (defaults to true). Pass false for fully-square crops. */
  rounded?: boolean;
  /** Additional class names forwarded to the outer div */
  className?: string;
}

/**
 * Temporary photography placeholder.
 * Replace each instance with a real <img> once photography is shot.
 * Keep props minimal — this component is intentionally disposable.
 */
export function PhotoSlot({
  aspectRatio,
  label,
  rounded = true,
  className = "",
}: PhotoSlotProps) {
  return (
    <div
      className={className}
      style={{
        aspectRatio,
        background: "var(--blush)",
        border: "1.5px dashed color-mix(in oklab, var(--wine) 35%, transparent)",
        borderRadius: rounded ? "var(--radius)" : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "24px",
          color: "var(--wine)",
          opacity: 0.7,
        }}
      >
        <Camera
          aria-hidden
          style={{
            width: 28,
            height: 28,
            margin: "0 auto 10px",
            opacity: 0.6,
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11.5px",
            letterSpacing: "0.3px",
            lineHeight: 1.6,
            maxWidth: 220,
            margin: "0 auto",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
