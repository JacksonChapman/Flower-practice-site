import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-32 w-full rounded-sm border border-input bg-white px-4 py-3 text-base text-foreground shadow-xs transition-colors outline-none placeholder:text-ink-faint/80 resize-y leading-relaxed",
        "hover:border-primary/40",
        "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20",
        "aria-invalid:border-primary aria-invalid:bg-[#fff8f5]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
