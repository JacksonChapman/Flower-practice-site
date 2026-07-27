export function Ticker() {
  const items = [
    <>Same-day delivery in Casper</>,
    <>Tue–Sat, 9am–5pm</>,
    <a href="tel:+13075550148" className="border-b border-background/50 hover:border-current">
      (307) 555-0148
    </a>,
    <>214 S. Wolcott St</>,
  ];

  return (
    <div className="bg-sage text-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-5 py-3.5 text-center text-xs font-medium tracking-[0.13em] uppercase md:px-8">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-4">
            {i > 0 && (
              <span className="opacity-50" aria-hidden="true">
                ·
              </span>
            )}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
