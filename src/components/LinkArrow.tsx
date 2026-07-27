import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function LinkArrow({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group mt-2 inline-flex items-center gap-2 border-b border-primary-hover text-sm font-bold tracking-wide text-primary-hover uppercase"
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </a>
  );
}
