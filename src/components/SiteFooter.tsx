const FOOTER_LINKS = [
  { href: "#services", label: "Shop" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-foreground pt-14 text-background md:pt-18">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-10 md:grid-cols-[1.2fr_.8fr_1fr] md:gap-10 md:px-8 md:pb-14">
        <div>
          <p className="mb-1 font-serif text-2xl font-semibold">Flowers by Me</p>
          <p className="text-background/60">Prairie-grown, hand-tied. Casper, Wyoming.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid gap-2.5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-background/82 hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid content-start gap-2.5">
          <a href="tel:+13075550148" className="text-background/82 hover:text-accent">
            (307) 555-0148
          </a>
          <a
            href="https://instagram.com/flowersbyme.casper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/82 hover:text-accent"
          >
            @flowersbyme.casper
          </a>
          <span className="text-background/60">214 S. Wolcott St, Casper, WY 82601</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-background/14 px-5 py-6 text-xs text-background/50 md:px-8">
        <p>&copy; {new Date().getFullYear()} Flowers by Me. All rights reserved.</p>
        <p>Photos are placeholders from picsum.photos.</p>
      </div>
    </footer>
  );
}
