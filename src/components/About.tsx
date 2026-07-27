import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const STATS = [
  { label: "Weddings since 2016", value: "200+" },
  { label: "Wyoming growers", value: "6" },
  { label: "Storefront on Wolcott", value: "2019" },
];

export function About() {
  return (
    <section id="about" className="py-18 md:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 md:grid-cols-[.85fr_1.15fr] md:gap-20 md:px-8">
        <Reveal as="figure" className="m-0">
          <div className="relative">
            <div className="absolute -inset-y-5 inset-x-5 -z-10 rounded-lg border border-primary opacity-45 md:-top-7 md:-right-7 md:bottom-5 md:left-7" />
            <img
              src="https://picsum.photos/seed/fbm-mari/800/1000"
              loading="lazy"
              decoding="async"
              width={800}
              height={1000}
              alt="Mari Kowalski in an apron at her workbench, sorting stems in the natural light of the shop's front window"
              className="aspect-[4/5] w-full rounded-lg object-cover shadow-md"
            />
          </div>
          <figcaption className="mt-3 text-sm text-ink-faint italic">Mari, closing up on a Saturday.</figcaption>
        </Reveal>

        <Reveal className="max-w-[58ch]">
          <Badge variant="eyebrow" className="mb-4">
            <span className="mr-3 inline-block h-px w-7 bg-current align-middle opacity-70" />
            The short version
          </Badge>
          <h2 className="mb-4 text-4xl md:text-5xl">
            Started in a <em className="font-normal text-primary italic">garage</em>, three blocks
            from here
          </h2>
          <p className="mb-4 text-muted-foreground">
            Mari Kowalski taught herself to arrange out of a two-stall garage on the west side —
            buckets in the cold, a folding table, and a lot of stems that didn't work out. For three
            years it was word of mouth only: a friend's wedding, then her cousin's, then someone who
            saw the photos and called out of the blue.
          </p>
          <p className="mb-4 text-muted-foreground">
            In 2019 she signed the lease on 214 S. Wolcott, a few blocks off downtown near the Old
            Yellowstone District. Same table. Better cooler.
          </p>
          <p className="text-muted-foreground">
            When the season allows, stems come from growers within a few hours of Casper — sweet peas
            and cosmos in July, dahlias into September, dried grasses and seed pods cut here on the
            prairie to carry us through winter. What we can't grow locally we source carefully, and
            we'll always tell you which is which.
          </p>

          <blockquote className="my-8 border-l-2 border-primary py-6 pl-7">
            <p className="mb-3 font-serif text-xl text-foreground italic md:text-2xl">
              "A florist who'd rather hand you something a little wild than something perfectly
              round."
            </p>
            <cite className="text-xs font-bold tracking-[0.14em] text-sage uppercase not-italic">
              Casper Star-Tribune, <span className="font-normal text-ink-faint">Local Business Spotlight</span> — 2023
            </cite>
          </blockquote>

          <Separator className="mb-7" />
          <dl className="grid grid-cols-3 gap-4 sm:gap-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="mb-1 text-[0.7rem] font-bold tracking-[0.14em] text-ink-faint uppercase">
                  {stat.label}
                </dt>
                <dd className="font-serif text-2xl font-semibold text-primary-hover md:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
