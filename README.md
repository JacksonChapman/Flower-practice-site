# Flowers by Me — static site

A one-page website for **Flowers by Me**, a florist in Casper, Wyoming.
Plain HTML, CSS and vanilla JavaScript. No build step, no framework, no npm install.

```
.
├── index.html          all page content and copy
├── css/styles.css      all styling (numbered sections at the top of the file)
├── js/main.js          nav, scroll reveal, gallery filter, lightbox, form validation
└── README.md
```

---

## Run it

Double-click `index.html`, or drag it into a browser. That's it.

If you'd rather serve it over `http://` (recommended — it matches how it will behave once
deployed), run one of these from the project folder:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
npx serve .                     # if you have Node installed
```

---

## Swapping in real photos

Every image is currently a placeholder from [picsum.photos](https://picsum.photos), which is
just a random-photo service — none of them are actual flowers. Replacing them is the first
thing to do before launch.

1. Make an `images/` folder in the project root and drop your photos in it.
2. In `index.html`, find each `<img>` and change the `src`:

   ```html
   <!-- before -->
   <img src="https://picsum.photos/seed/fbm-g1/700/900" loading="lazy" decoding="async"
        width="700" height="900" alt="Bridal bouquet of blush garden roses...">

   <!-- after -->
   <img src="images/bridal-garden-rose.jpg" loading="lazy" decoding="async"
        width="1200" height="1500" alt="Bridal bouquet of blush garden roses...">
   ```

3. **Update `width` and `height`** to the real pixel dimensions of your file. These stop the
   page from jumping around as images load — wrong numbers cause visible layout shift.
4. **Keep the `alt` text accurate.** Describe what's actually in the new photo. Screen readers
   and Google both read it. Never leave it blank on a content photo.
5. Leave `loading="lazy"` on everything **except the hero image**, which is deliberately eager
   with `fetchpriority="high"` so it appears immediately.

### Photo tips for this design

- **Hero** wants a wide, landscape shot with some breathing room in the lower-left — that's
  where the headline sits. Roughly 1800×1200 or larger.
- **Gallery** is a masonry grid, so mixed portrait/landscape shapes look *better* than uniform
  ones. Don't crop them all square.
- **About portrait** is cropped to 4:5 (portrait). Give it room at the edges.
- Aim for natural light and close, textural detail — that's what the whole palette is built
  around. Bright white-background product shots will look out of place.
- Save as JPG at ~80% quality, 1600px on the long edge. Anything larger is wasted bytes.
  WebP is smaller still if your export tool supports it.

### One more image to replace

The social-share preview near the top of `index.html`:

```html
<meta property="og:image" content="https://picsum.photos/seed/fbm-hero/1200/630">
```

Point that at a real 1200×630 photo (absolute URL, e.g. `https://yourdomain.com/images/share.jpg`)
so links posted to Facebook, iMessage or Slack show the right picture.

---

## Editing the copy

All text lives in `index.html` — there's no CMS or data file to hunt through. Each section is
marked with a comment banner (`<!-- ===== SERVICES ===== -->` and so on).

Things that appear in more than one place, so change them everywhere:

| What | Where it appears |
|---|---|
| Phone `(307) 555-0148` | ticker bar, contact card, footer, form success message (`js/main.js`), structured data in `<head>` |
| Address | contact card, footer, structured data |
| Instagram handle | contact card, footer, structured data |
| Hours | ticker bar, contact card, structured data |

Search for the current value and replace all occurrences. When you change the phone number,
also update the `href="tel:+13075550148"` links — the `tel:` value has no spaces or parentheses.

**Tagline** — currently "Wyoming blooms, delivered with heart" in the hero, with
"Prairie-grown, hand-tied" in the footer. Both are in `index.html`; swap freely.

**Prices** appear in the service cards (`$45`, `$38`, `$65`). Update or delete them.

**The Casper Star-Tribune quote in the About section is fictional placeholder text.** Replace it
with a real press mention or delete the whole `<blockquote class="pull-quote">` block before
you go live. Same goes for the three testimonials and the numbers in the `<dl class="stats">`.

### Colors and fonts

Everything is defined once at the top of `css/styles.css` under `:root`:

```css
--cream:       #FBF7F1;   /* page background          */
--sand:        #F5EEE3;   /* alternating bands, cards */
--terracotta:  #B4573A;   /* buttons, accents         */
--sage-deep:   #5C6B50;   /* section labels, ticker   */
--ink:         #2E2925;   /* body text, footer        */
```

Change a value there and it updates across the whole site. Fonts are Fraunces (headings) and
Karla (body), loaded from Google Fonts in `index.html`; both have local fallbacks, so the site
still looks reasonable offline.

---

## Making the form actually send

Right now the form validates in the browser, logs the submission to the console, and opens the
visitor's email app with everything pre-filled (`mailto:`). That works, but it depends on the
visitor having a mail client set up, and it isn't ideal on mobile.

To get real submissions in an inbox, pick one:

**Netlify Forms** (free, easiest if you deploy to Netlify). Add these attributes to the `<form>`
tag in `index.html`:

```html
<form class="form" id="orderForm" name="orders" method="POST" data-netlify="true" novalidate>
```

Then in `js/main.js`, delete the `window.location.href = 'mailto:...'` line and let the form
submit normally — or post it with `fetch()` if you want to keep the inline success message.

**Formspree** (works anywhere). Sign up, get your form ID, and in `js/main.js` replace the
`mailto:` block with:

```js
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(function (r) {
    if (!r.ok) throw new Error('Request failed');
    setStatus('Thanks — we got it and will reply within one business day.', 'success');
    form.reset();
  })
  .catch(function () {
    setStatus('Something went wrong. Please call the shop at (307) 555-0148.', 'error');
  });
```

If you keep `mailto:`, change `SHOP_EMAIL` at the top of the `orderForm` function in
`js/main.js` from `hello@flowersbyme.example` to the real address.

---

## Deploying

The site is fully static, so anything that serves files will host it — all of these are free
for a site this size.

### Netlify (drag and drop)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole project folder onto the page.
3. You get a live URL in about ten seconds. Add a custom domain under **Domain settings**.

For automatic updates, connect the Git repo instead — leave the build command blank and set the
publish directory to `/`.

### Vercel

```bash
npm i -g vercel
vercel          # from the project folder; accept the defaults
vercel --prod   # when you're ready to go live
```

No framework preset is needed — Vercel detects a static site on its own.

### GitHub Pages

1. Push the project to a GitHub repository.
2. **Settings → Pages → Build and deployment**.
3. Source: *Deploy from a branch*. Branch: `main`, folder: `/ (root)`. Save.
4. It publishes at `https://<username>.github.io/<repo>/` after a minute or two.

Because every path in the site is relative (`css/styles.css`, not `/css/styles.css`), it works
from a subfolder URL without changes.

### Custom domain

All three let you point a domain at the site from their dashboard. You'll add a `CNAME` record
at your registrar pointing to the host, and they issue an HTTPS certificate automatically.

---

## What's built in

- **Responsive** at every size — layouts collapse at 900px and 560px; checked at 375 / 768 / 1440.
- **Accessible** — semantic landmarks, one `<h1>`, ordered headings, a skip link, visible focus
  rings, labelled form fields with `role="alert"` errors, and a keyboard-navigable lightbox
  (arrows, Esc, trapped Tab, focus returned to the thumbnail on close).
- **Fast** — no framework, no jQuery. Images lazy-load and carry explicit dimensions. Animation
  is CSS transitions; JavaScript only toggles classes.
- **Respects `prefers-reduced-motion`** — all animation is disabled for visitors who ask for it.
- **SEO basics** — meta description, Open Graph tags, and `Florist` schema.org structured data
  in the `<head>` (update the address and phone there too).
- **Prints cleanly** — nav, filters and the lightbox are hidden; link URLs are expanded.

## Browser support

Current Chrome, Firefox, Safari and Edge. Uses CSS Grid, custom properties, `clamp()`,
`aspect-ratio` and `IntersectionObserver` — all long-standing, widely supported features.
Internet Explorer is not supported.
