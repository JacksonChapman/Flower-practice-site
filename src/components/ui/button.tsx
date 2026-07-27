import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-bold uppercase tracking-wide transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-lg",
        ghost:
          "border border-white/65 text-background bg-transparent backdrop-blur-[2px] hover:bg-background hover:text-foreground hover:border-background hover:-translate-y-0.5",
        outline:
          "border border-border bg-transparent text-foreground hover:border-primary hover:text-primary-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        link: "text-primary-hover underline-offset-4 hover:underline normal-case font-semibold tracking-normal",
      },
      size: {
        default: "h-12 px-8 py-4",
        sm: "h-9 px-5 text-xs",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
