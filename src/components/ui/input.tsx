import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-sm border border-input bg-white px-4 py-2 text-base text-foreground shadow-xs transition-colors outline-none placeholder:text-ink-faint/80",
        "hover:border-primary/40",
        "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20",
        "aria-invalid:border-primary aria-invalid:bg-[#fff8f5]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
