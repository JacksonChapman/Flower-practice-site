import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/use-scrolled";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BrandMark } from "@/components/BrandMark";

const NAV_LINKS = [
  { href: "#services", label: "Shop" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const scrolled = useScrolled(40);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-border shadow-[0_1px_20px_-12px_rgba(46,41,37,0.5)]"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 md:px-8">
        <a
          href="#top"
          className={cn("flex items-center gap-3", scrolled ? "text-foreground" : "text-background")}
        >
          <BrandMark className="size-7 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-xl font-semibold tracking-tight">Flowers by Me</span>
            <span
              className={cn(
                "text-[0.6875rem] tracking-[0.16em] uppercase",
                scrolled ? "text-ink-faint" : "text-background/80",
              )}
            >
              Casper, Wyoming
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-1 text-sm font-medium tracking-wider uppercase transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
                scrolled ? "text-foreground" : "text-background",
              )}
            >
              {link.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href="#contact">Order flowers</a>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-2 text-xs font-bold tracking-wider uppercase md:hidden",
                scrolled ? "text-foreground" : "text-background",
              )}
              aria-label="Open menu"
            >
              <Menu className="size-6" />
              Menu
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Flowers by Me</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    className="border-b border-border py-4 text-base font-medium tracking-wide uppercase text-foreground last:border-b-0"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <Button asChild className="mt-2 w-full">
                <a href="#contact">Order flowers</a>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
