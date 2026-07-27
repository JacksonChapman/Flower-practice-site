import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element first scrolls into view, then stops observing.
 * Starts already "in view" for prefers-reduced-motion visitors and when
 * IntersectionObserver isn't available, so content is never stuck hidden.
 */
export function useInView<T extends HTMLElement>(threshold = 0.08) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
