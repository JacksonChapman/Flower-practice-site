import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section id="top" className="relative isolate -mt-[84px] flex min-h-[min(92svh,900px)] flex-col justify-end pt-[84px]">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://picsum.photos/seed/fbm-hero/1800/1200"
          alt="Close-up of a loosely gathered wildflower bouquet — cream ranunculus, dried grasses and eucalyptus — held in warm afternoon light"
          width={1800}
          height={1200}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover"
        />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "linear-gradient(to top, rgba(46,34,26,.82) 0%, rgba(46,34,26,.45) 38%, rgba(46,34,26,.12) 68%, rgba(46,34,26,.3) 100%)",
            "linear-gradient(to right, rgba(142,66,41,.22), transparent 60%)",
          ].join(", "),
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-5 pt-12 pb-18 md:px-8 md:pt-24 md:pb-28">
        <div className="max-w-3xl">
          <Badge variant="eyebrow" className="mb-4 text-background/90 [text-shadow:0_1px_8px_rgba(46,41,37,.5)]">
            <span className="mr-3 inline-block h-px w-7 bg-current align-middle opacity-70" />
            Est. 2016 · Storefront since 2019
          </Badge>
          <h1 className="mb-3 text-6xl text-background [text-shadow:0_2px_30px_rgba(46,34,26,.35)] sm:text-7xl md:text-8xl">
            Flowers <em className="font-normal text-accent">by</em> Me
          </h1>
          <p className="mb-4 font-serif text-2xl text-background italic [text-shadow:0_2px_20px_rgba(46,34,26,.45)] md:text-3xl">
            Wyoming blooms, delivered with heart.
          </p>
          <p className="mb-8 max-w-md text-background/90 [text-shadow:0_1px_12px_rgba(46,34,26,.55)]">
            Hand-tied, gently wild arrangements — sourced from Wyoming growers when in season, and
            always built one stem at a time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a href="#contact">Order flowers</a>
            </Button>
            <Button asChild variant="ghost">
              <a href="#weddings">Book a wedding</a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#services"
        className="absolute right-5 bottom-6 hidden items-center gap-2 text-[0.6875rem] font-bold tracking-[0.18em] text-background/85 uppercase transition-colors hover:text-background md:right-8 md:bottom-10 sm:flex"
      >
        Have a look
        <ArrowDown className="size-[18px] animate-bounce" />
      </a>
    </section>
  );
}
