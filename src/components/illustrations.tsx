import { useState, useEffect } from "react";
import slide1 from "@/assets/slide-show-pictures/peachcraft-slideshow-pic-1.jpg";
import slide2 from "@/assets/slide-show-pictures/peachcraft-slideshow-pic-2.jpg";
import slide3 from "@/assets/slide-show-pictures/peachcraft-slideshow-pic-3.jpg";
import slide4 from "@/assets/slide-show-pictures/peachcraft-slideshow-pic-4.jpg";

const SLIDE_IMAGES = [slide1, slide2, slide3, slide4];

function useSlideshow(length: number, interval = 5000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, interval);
    return () => clearInterval(timer);
  }, [length, interval]);

  return index;
}

function ProductSlideshow({ className }: { className?: string }) {
  const index = useSlideshow(SLIDE_IMAGES.length);

  return (
    <div className={`relative overflow-hidden rounded-full ${className ?? ""}`} aria-hidden>
      {SLIDE_IMAGES.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export function CakeIllustration({ className }: { className?: string }) {
  return <ProductSlideshow className={className} />;
}

export function HandmadeIllustration({ className }: { className?: string }) {
  return <ProductSlideshow className={className} />;
}

export function KawaiiIllustration({ className }: { className?: string }) {
  return <ProductSlideshow className={className} />;
}

export function PackagingIllustration({ className }: { className?: string }) {
  return <ProductSlideshow className={className} />;
}
