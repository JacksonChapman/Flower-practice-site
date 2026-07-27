import { Reveal } from "@/components/Reveal";
import { LinkArrow } from "@/components/LinkArrow";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const COMPACT_SERVICES = [
  {
    num: "03",
    title: "Bloom Club",
    body: "A standing bouquet, weekly or every other week, built from whatever is best that morning. Pick up at the shop or have it delivered.",
    meta: "From $38 / delivery · pause anytime",
  },
  {
    num: "04",
    title: "Sympathy & funeral",
    body: "Quiet, dignified work — standing sprays, casket pieces and small arrangements that travel home afterward. We coordinate directly with Casper funeral homes so you don't have to.",
    meta: "Same-day when we can · call us and we'll make it work",
  },
  {
    num: "05",
    title: "Seasonal workshops",
    body: "One evening a month in the back of the shop: wreath-making in the fall, bouquet classes in summer, dried-stem arrangements when the ground is frozen. Wine, ten seats, all materials.",
    meta: "$65 per seat · dates posted on Instagram",
  },
];

export function Services() {
  return (
    <section id="services" className="py-18 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal as="header" className="mb-16 max-w-[44ch] md:mb-24">
          <Badge variant="eyebrow" className="mb-4">
            <span className="mr-3 inline-block h-px w-7 bg-current align-middle opacity-70" />
            What we make
          </Badge>
          <h2 className="mb-3 text-4xl md:text-5xl">
            Flowers for the <em className="font-normal text-primary italic">everyday</em> and the
            once-in-a-lifetime
          </h2>
          <p className="max-w-[52ch] text-lg text-muted-foreground">
            Everything is arranged in the shop on Wolcott Street — no wire service, no cookie-cutter
            catalog. Tell us the person and the occasion, and we'll build to it.
          </p>
        </Reveal>

        <div className="mb-16 grid gap-12 md:mb-24 md:gap-16">
          <Reveal className="grid items-center gap-8 md:grid-cols-[1.05fr_.95fr] md:gap-14">
            <div className="overflow-hidden rounded-lg border border-black/10 shadow-md">
              <img
                src="https://picsum.photos/seed/fbm-everyday/900/700"
                loading="lazy"
                decoding="async"
                width={900}
                height={700}
                alt="Hands trimming stems over a wooden bench scattered with cosmos, sage and dried wheat"
                className="aspect-[9/7] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div>
              <Badge variant="eyebrow" className="mb-3">
                01 — Everyday
              </Badge>
              <h3 className="mb-3 text-2xl">Everyday arrangements &amp; same-day Casper delivery</h3>
              <p className="text-muted-foreground">
                Market bunches, birthday bouquets, "I'm sorry I missed dinner" flowers. Order by{" "}
                <strong className="text-foreground">1pm Tuesday through Saturday</strong> and we'll
                have it on a doorstep in Casper, Mills or Evansville that afternoon.
              </p>
              <ul className="my-5 grid gap-2.5">
                {["Designer's-choice from $45", "Vase or wrapped in kraft & twine", "Handwritten card, always"].map(
                  (item) => (
                    <li key={item} className="relative pl-6 text-sm text-muted-foreground">
                      <span className="absolute top-[0.6em] left-0 size-2 rounded-full bg-primary/80" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <LinkArrow href="#contact">Start an order</LinkArrow>
            </div>
          </Reveal>

          <Reveal id="weddings" className="grid items-center gap-8 md:grid-cols-[.95fr_1.05fr] md:gap-14">
            <div className="order-2 md:order-1">
              <Badge variant="eyebrow" className="mb-3">
                02 — Weddings &amp; events
              </Badge>
              <h3 className="mb-3 text-2xl">Wedding &amp; event florals</h3>
              <p className="text-muted-foreground">
                Full-service design for twenty guests or two hundred. We've worked the barn venues out
                past Bar Nunn, ranch weddings up the Platte, and receptions a block from the{" "}
                <strong className="text-foreground">Nicolaysen Art Museum</strong> — so we know the
                load-in doors, the light, and what wilts in a Wyoming wind.
              </p>
              <ul className="my-5 grid gap-2.5">
                {[
                  "Consultation, mood board & sample piece",
                  "Ceremony installs, arbors & aisle work",
                  "Delivery, setup and end-of-night strike",
                ].map((item) => (
                  <li key={item} className="relative pl-6 text-sm text-muted-foreground">
                    <span className="absolute top-[0.6em] left-0 size-2 rounded-full bg-primary/80" />
                    {item}
                  </li>
                ))}
              </ul>
              <LinkArrow href="#contact">Check your date</LinkArrow>
            </div>
            <div className="order-1 overflow-hidden rounded-lg border border-black/10 shadow-md md:order-2">
              <img
                src="https://picsum.photos/seed/fbm-wedding-feature/900/700"
                loading="lazy"
                decoding="async"
                width={900}
                height={700}
                alt="Bride's loose garden-style bouquet of roses, peonies and trailing greenery resting on a weathered barn door"
                className="aspect-[9/7] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 border-t border-border pt-12 md:grid-cols-3 md:gap-7 md:pt-16">
          {COMPACT_SERVICES.map((service) => (
            <Reveal key={service.num}>
              <Card className="h-full transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                <span className="block font-serif text-sm font-bold tracking-wide text-primary">
                  {service.num}
                </span>
                <h3 className="text-xl">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.body}</p>
                <p className="mt-1 border-t border-border pt-4 text-[0.8125rem] font-medium tracking-wide text-sage">
                  {service.meta}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
