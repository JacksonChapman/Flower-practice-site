import * as React from "react";

import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

type RevealProps = React.ComponentProps<"div"> & { as?: keyof React.JSX.IntrinsicElements };

/** Fades content up into place the first time it scrolls into view. */
export function Reveal({ className, as = "div", ...props }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Comp = as as React.ElementType;

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(.2,.7,.3,1)]",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
      {...props}
    />
  );
}
