import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    quote:
      "Booked her for my daughter's wedding at a ranch outside town. Mari drove out twice beforehand just to see the light in the barn. The bouquets looked like someone had walked the fence line that morning and gathered them up.",
    name: "Jenna T.",
    place: "Casper, WY",
  },
  {
    quote:
      "I've had the Bloom Club going for two years. Every other Thursday something completely different shows up and it's the best forty dollars on my card. My neighbor signed up after the third one.",
    name: "Dev R.",
    place: "Old Yellowstone District",
  },
  {
    quote:
      "We called about my father's service on a Tuesday morning and she had everything at the funeral home by two. She asked what he liked to grow, and put it in. I won't forget that.",
    name: "Marcy L.",
    place: "Mills, WY",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="border-y border-border bg-secondary py-18 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal as="header" className="mx-auto mb-12 max-w-[44ch] text-center md:mb-16">
          <Badge variant="eyebrow" className="mb-4 justify-center">
            <span className="mr-3 inline-block h-px w-7 bg-current align-middle opacity-70" />
            Kind words
          </Badge>
          <h2 className="text-4xl md:text-5xl">
            What folks <em className="font-normal text-primary italic">say</em>
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3 md:gap-7">
          {TESTIMONIALS.map((t) => (
            <Reveal key={t.name}>
              <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="tracking-[0.18em] text-primary" aria-label="5 out of 5 stars" role="img">
                  ★★★★★
                </div>
                <blockquote className="flex-1">
                  <p className="font-serif text-[1.0625rem] leading-relaxed text-foreground">{t.quote}</p>
                </blockquote>
                <figcaption className="border-t border-border pt-4 text-sm font-bold tracking-wide uppercase">
                  {t.name}
                  <span className="mt-0.5 block text-xs font-normal tracking-normal text-ink-faint normal-case">
                    {t.place}
                  </span>
                </figcaption>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
