# Flowers by Me — website

A one-page website for **Flowers by Me**, a florist in Casper, Wyoming. Built with
**Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui**.

```
.
├── index.html                 Vite entry HTML (meta tags, fonts, structured data)
├── src/
│   ├── main.tsx                React root
│   ├── App.tsx                 Page layout — assembles every section
│   ├── index.css               Design tokens (colors, fonts, radius) + Tailwind import
│   ├── components/
│   │   ├── ui/                 shadcn/ui primitives (Button, Card, Input, Dialog, Sheet, …)
│   │   ├── SiteHeader.tsx       Sticky nav + mobile menu (Sheet)
│   │   ├── Hero.tsx
│   │   ├── Ticker.tsx           Hours / phone / address strip
│   │   ├── Services.tsx         Everyday, weddings, Bloom Club, sympathy, workshops
│   │   ├── Gallery.tsx          Filterable masonry grid + lightbox (Dialog)
│   │   ├── About.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx          Order form + shop info card
│   │   └── SiteFooter.tsx
│   ├── data/gallery.ts          Gallery photo list (source of truth for captions/categories)
│   ├── hooks/                   useInView (scroll reveal), useScrolled (sticky header)
│   └── lib/utils.ts             `cn()` class-merging helper
└── package.json
```

No CMS, no backend — every piece of copy lives in a `.tsx` file under `src/components/`.

---

## Run it

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Hot-reloads on save.

To check the production build locally:

```bash
npm run build      # type-checks with tsc, then builds to dist/
npm run preview    # serves the dist/ build
```

---

## Swapping in real photos

Every image is currently a placeholder from [picsum.photos](https://picsum.photos) — none of
them are actual flowers. Replacing them is the first thing to do before launch.

**Gallery photos** all come from one file, `src/data/gallery.ts`. Each entry looks like:

```ts
{
  id: "fbm-g1",
  category: "weddings",
  categoryLabel: "Weddings",
  src: "https://picsum.photos/seed/fbm-g1/700/900",
  width: 700,
  height: 900,
  alt: "Bridal bouquet of blush garden roses and trailing eucalyptus held against an ivory dress",
  caption: "Garden-rose bridal bouquet",
},
```

Put your photos in `public/images/` (create the folder) and point `src` at them, e.g.
`/images/bridal-garden-rose.jpg`. **Update `width`/`height`** to the file's real pixel dimensions —
these stop the masonry grid from jittering as images load. **Keep `alt` accurate**; it's read by
screen readers and Google alike.

**Everything else** — hero, the two big service photos, and the About portrait — is a plain
`<img>` in its component:

| Photo | File |
|---|---|
| Hero background | `src/components/Hero.tsx` |
| Everyday-arrangements photo | `src/components/Services.tsx` |
| Wedding-florals photo | `src/components/Services.tsx` |
| Mari's portrait | `src/components/About.tsx` |
| Social-share preview (`og:image`) | `index.html` |

Same rule everywhere: match `width`/`height` to the real file, write a real `alt`.

### Photo tips for this design

- **Hero** wants a wide, landscape shot with room in the lower-left for the headline. 1800×1200 or
  larger.
- **Gallery** is a masonry grid — mixed portrait/landscape shapes look *better* than uniform ones.
- **About portrait** is cropped to 4:5 (portrait).
- Natural light, close textural detail — bright white-background product shots will look out of
  place against this palette.
- JPG at ~80% quality, 1600px on the long edge (or WebP, smaller still).

---

## Editing the copy

Every section is its own component under `src/components/`. Open the one you want to change —
there's no templating layer, it's just JSX text.

| What | Where |
|---|---|
| Tagline, hero copy | `src/components/Hero.tsx` |
| Hours / phone / address strip | `src/components/Ticker.tsx` |
| Service descriptions & prices | `src/components/Services.tsx` |
| Gallery captions & categories | `src/data/gallery.ts` |
| Mari's story, stats, press quote | `src/components/About.tsx` |
| Testimonials | `src/components/Testimonials.tsx` |
| Shop hours/address/Instagram card | `src/components/Contact.tsx` |
| Footer | `src/components/SiteFooter.tsx` |
| Page `<title>`, meta description, structured data | `index.html` |

**Phone, address and Instagram appear in multiple places** — Ticker, Contact's info card, the
footer, and the JSON-LD block in `index.html`. Search for the current value
(`(307) 555-0148`, `214 S. Wolcott`, `flowersbyme.casper`) and replace every occurrence. The
`tel:` link (`href="tel:+13075550148"`) has no spaces or parentheses — update that format too.

**The Casper Star-Tribune quote, the three testimonials, and the stats in `About.tsx` (200+
weddings, 6 growers) are fictional placeholders.** Replace or delete them before launch.

### Colors and fonts

Every design token lives once, at the top of `src/index.css`:

```css
--background: #fbf7f1;   /* page background        */
--secondary:  #f5eee3;   /* alternating bands/cards */
--primary:    #b4573a;   /* buttons, links, accents */
--sage:       #5c6b50;   /* eyebrows, ticker strip  */
--foreground: #2e2925;   /* body text, footer       */
```

Change a value there and every shadcn component (Button, Card, Input, Badge, …) picks it up
automatically — they're all built on these tokens, not hardcoded colors. Fonts are Fraunces
(headings, `--font-serif`) and Karla (body, `--font-sans`), loaded from Google Fonts in
`index.html`.

---

## Making the form actually send

`src/components/Contact.tsx` validates in the browser, logs the payload to the console, then
opens the visitor's email app with everything pre-filled (`mailto:`). That's fine for a first
launch but depends on the visitor having a mail client configured.

To collect real submissions, replace the body of `handleSubmit` (after validation passes) with a
call to a form backend:

**Netlify Forms** — add `data-netlify="true"` and a `name` to the `<form>` in `Contact.tsx`, and
add a hidden `<input type="hidden" name="form-name" value="orders" />`. Netlify parses the HTML at
build time, no JS wiring needed (drop the `fetch`/`mailto` logic for a native form submit, or
`fetch` to `/`).

**Formspree** — sign up, get a form ID, and swap the `mailto:` block for:

```ts
await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
```

If you keep `mailto:`, change `SHOP_EMAIL` near the top of `Contact.tsx` from
`hello@flowersbyme.example` to the real inbox.

---

## Deploying

This is now a real build — `npm run build` produces static files in `dist/`, but a build step is
required (unlike a plain HTML/CSS/JS site). All of the hosts below run that build for you.

### Vercel

Connect the repo — Vercel auto-detects Vite (`npm run build`, output `dist`). No config needed.
Or from the CLI:

```bash
npm i -g vercel
vercel          # accept the defaults
vercel --prod
```

### Netlify

Connect the repo. Build command: `npm run build`. Publish directory: `dist`.

### GitHub Pages

Static hosts that serve from a subpath need `base` set in `vite.config.ts` (e.g.
`base: "/your-repo-name/"`), then build and deploy the `dist/` folder — e.g. with the
`peaceiris/actions-gh-pages` GitHub Action, or `gh-pages` npm package pointed at `dist`.

---

## What's built in

- **Componentized on shadcn/ui** — Button, Card, Input, Textarea, Label, Select, Separator, Badge,
  Sheet (mobile nav), Dialog (lightbox), ToggleGroup (gallery filter), Alert (form status), all
  themed from the tokens in `src/index.css` — no dark mode, by design.
- **Responsive** — checked at 375 / 768 / 1440px, no horizontal overflow at any width.
- **Accessible** — semantic landmarks, one `<h1>`, labelled form fields with `role="alert"`
  errors, visible focus rings, a fully keyboard- and screen-reader-friendly lightbox and mobile
  menu (both are real Radix Dialogs — focus trap and restore, Esc to close, are automatic).
- **Fast** — images lazy-load below the hero and carry explicit dimensions; scroll-reveal animation
  is CSS transitions driven by a small `IntersectionObserver` hook, not a JS animation library.
- **Respects `prefers-reduced-motion`.**
- **SEO basics** — meta description, Open Graph tags, and `Florist` schema.org structured data in
  `index.html`.

## Browser support

Current Chrome, Firefox, Safari and Edge.
