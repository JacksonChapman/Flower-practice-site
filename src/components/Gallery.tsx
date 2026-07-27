import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { galleryPhotos, upscale, type GalleryCategory } from "@/data/gallery";

const FILTERS: { value: "all" | GalleryCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "weddings", label: "Weddings" },
  { value: "everyday", label: "Everyday" },
  { value: "seasonal", label: "Seasonal" },
];

export function Gallery() {
  const [filter, setFilter] = useState<"all" | GalleryCategory>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? galleryPhotos : galleryPhotos.filter((p) => p.category === filter)),
    [filter],
  );

  const step = (delta: number) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + delta + visible.length) % visible.length;
    });
  };

  const active = openIndex !== null ? visible[openIndex] : null;

  return (
    <section id="gallery" className="border-y border-border bg-secondary py-18 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal as="header" className="mb-10 max-w-[44ch] md:mb-14">
          <Badge variant="eyebrow" className="mb-4">
            <span className="mr-3 inline-block h-px w-7 bg-current align-middle opacity-70" />
            Recent work
          </Badge>
          <h2 className="mb-3 text-4xl md:text-5xl">
            A year of <em className="font-normal text-primary italic">stems</em>
          </h2>
          <p className="max-w-[52ch] text-lg text-muted-foreground">
            Pieces from the last few seasons. Tap any photo to see it larger — use the arrow keys or
            swipe to move through, Esc to close.
          </p>
        </Reveal>

        <Reveal className="mb-8">
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(value) => value && setFilter(value as "all" | GalleryCategory)}
            aria-label="Filter gallery by category"
          >
            {FILTERS.map((f) => (
              <ToggleGroupItem key={f.value} value={f.value}>
                {f.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Reveal>

        {visible.length > 0 ? (
          <div className="columns-1 gap-3 sm:columns-2 md:gap-5 lg:columns-3">
            {visible.map((photo, index) => (
              <figure key={photo.id} className="mb-3 break-inside-avoid md:mb-5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-black/10 text-left"
                >
                  <img
                    src={photo.src}
                    loading="lazy"
                    decoding="async"
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt}
                    className="w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2e221a]/62 to-transparent to-48% opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 flex-col gap-0.5 px-4.5 pt-6 pb-4 text-background opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-accent uppercase">
                      {photo.categoryLabel}
                    </span>
                    <span className="text-sm font-medium">{photo.caption}</span>
                  </span>
                </button>
              </figure>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-muted-foreground italic">No photos in that category yet — check back soon.</p>
        )}
      </div>

      <Dialog open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <DialogContent
          className="flex w-screen max-w-none flex-col items-center gap-4 bg-transparent p-4 shadow-none sm:w-auto sm:max-w-[90vw] sm:p-8"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              step(-1);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              step(1);
            }
          }}
          onTouchStart={(e) => {
            const t = e.changedTouches[0];
            touchStart.current = { x: t.clientX, y: t.clientY };
          }}
          onTouchEnd={(e) => {
            if (!touchStart.current) return;
            const t = e.changedTouches[0];
            const dx = t.clientX - touchStart.current.x;
            const dy = t.clientY - touchStart.current.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              step(dx < 0 ? 1 : -1);
            }
          }}
        >
          {active && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute top-1/2 left-2 z-10 hidden size-13 -translate-y-1/2 items-center justify-center rounded-full border border-background/25 bg-background/8 text-background transition-all hover:scale-105 hover:border-background/50 hover:bg-background/20 sm:flex md:left-4"
              >
                <ChevronLeft className="size-6" />
              </button>

              <figure className="m-0 flex flex-col items-center gap-4">
                <img
                  src={upscale(active.src, active.width, active.height)}
                  alt={active.alt}
                  className="max-h-[76svh] max-w-full rounded-lg bg-background/5 object-contain shadow-2xl"
                />
                <figcaption className="flex max-w-[60ch] flex-wrap items-baseline justify-center gap-x-4 gap-y-1 text-center text-background/90">
                  <span>
                    {active.categoryLabel} — {active.caption}
                  </span>
                  <span className="text-xs tracking-[0.16em] text-background/55 uppercase">
                    {openIndex! + 1} / {visible.length}
                  </span>
                </figcaption>
              </figure>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute top-1/2 right-2 z-10 hidden size-13 -translate-y-1/2 items-center justify-center rounded-full border border-background/25 bg-background/8 text-background transition-all hover:scale-105 hover:border-background/50 hover:bg-background/20 sm:flex md:right-4"
              >
                <ChevronRight className="size-6" />
              </button>

              <div className="flex gap-6 sm:hidden">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="flex size-12 items-center justify-center rounded-full border border-background/25 bg-background/14 text-background"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="flex size-12 items-center justify-center rounded-full border border-background/25 bg-background/14 text-background"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
