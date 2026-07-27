import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva("rounded-sm border-l-[3px] px-5 py-4 text-sm font-medium", {
  variants: {
    variant: {
      success: "bg-sage-soft border-sage text-sage",
      destructive: "bg-[#fbede7] border-primary text-primary-hover",
    },
  },
});

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div data-slot="alert" role="status" className={cn(alertVariants({ variant }), className)} {...props} />
  );
}

export { Alert };
