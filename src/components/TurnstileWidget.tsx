import { useEffect, useRef, useCallback } from "react";

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, opts: {
        sitekey: string;
        callback: (token: string) => void;
        "expired-callback"?: () => void;
        "error-callback"?: () => void;
        theme?: "light" | "dark" | "auto";
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export function TurnstileWidget({ onToken, onExpired }: { onToken: (token: string) => void; onExpired?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const callback = useCallback(
    (token: string) => {
      onToken(token);
    },
    [onToken],
  );

  const expiredCallback = useCallback(() => {
    onExpired?.();
  }, [onExpired]);

  useEffect(() => {
    if (!SITE_KEY) return;

    if (window.turnstile && containerRef.current) {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        callback,
        "expired-callback": expiredCallback,
        "error-callback": expiredCallback,
        theme: "light",
      });
    } else {
      const checkInterval = setInterval(() => {
        if (window.turnstile && containerRef.current) {
          clearInterval(checkInterval);
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: SITE_KEY,
            callback,
            "expired-callback": expiredCallback,
            "error-callback": expiredCallback,
            theme: "light",
          });
        }
      }, 200);

      // Timeout after 10 seconds
      setTimeout(() => clearInterval(checkInterval), 10000);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [callback, expiredCallback]);

  if (!SITE_KEY) {
    return null;
  }

  return <div ref={containerRef} />;
}
