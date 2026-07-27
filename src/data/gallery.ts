export type GalleryCategory = "weddings" | "everyday" | "seasonal";

export interface GalleryPhoto {
  id: string;
  category: GalleryCategory;
  categoryLabel: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export const galleryPhotos: GalleryPhoto[] = [
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
  {
    id: "fbm-g2",
    category: "everyday",
    categoryLabel: "Everyday",
    src: "https://picsum.photos/seed/fbm-g2/700/560",
    width: 700,
    height: 560,
    alt: "Small jar of cosmos and bachelor buttons on a sunlit kitchen windowsill",
    caption: "Tuesday market jar",
  },
  {
    id: "fbm-g3",
    category: "seasonal",
    categoryLabel: "Seasonal",
    src: "https://picsum.photos/seed/fbm-g3/700/860",
    width: 700,
    height: 860,
    alt: "Dried wheat, yarrow and bleached grasses gathered into a wall wreath on weathered barn wood",
    caption: "Dried prairie wreath",
  },
  {
    id: "fbm-g4",
    category: "weddings",
    categoryLabel: "Weddings",
    src: "https://picsum.photos/seed/fbm-g4/700/540",
    width: 700,
    height: 540,
    alt: "Ceremony arbor draped with greenery and cream roses set against an open Wyoming field",
    caption: "Arbor install, ranch ceremony",
  },
  {
    id: "fbm-g5",
    category: "everyday",
    categoryLabel: "Everyday",
    src: "https://picsum.photos/seed/fbm-g5/700/900",
    width: 700,
    height: 900,
    alt: "Close-up of terracotta-toned ranunculus petals with water beading on the edges",
    caption: "Ranunculus, up close",
  },
  {
    id: "fbm-g6",
    category: "seasonal",
    categoryLabel: "Seasonal",
    src: "https://picsum.photos/seed/fbm-g6/700/620",
    width: 700,
    height: 620,
    alt: "Hands wiring an autumn wreath of seed pods and dried hydrangea at a workshop table",
    caption: "Fall wreath workshop",
  },
  {
    id: "fbm-g7",
    category: "weddings",
    categoryLabel: "Weddings",
    src: "https://picsum.photos/seed/fbm-g7/700/880",
    width: 700,
    height: 880,
    alt: "Long reception table lined with low arrangements of peonies, sage and taper candles inside a barn",
    caption: "Barn reception tables",
  },
  {
    id: "fbm-g8",
    category: "everyday",
    categoryLabel: "Everyday",
    src: "https://picsum.photos/seed/fbm-g8/700/580",
    width: 700,
    height: 580,
    alt: "Kraft-wrapped bouquet tied with jute twine sitting on a shop counter beside clippers",
    caption: "Wrapped for delivery",
  },
  {
    id: "fbm-g9",
    category: "seasonal",
    categoryLabel: "Seasonal",
    src: "https://picsum.photos/seed/fbm-g9/700/900",
    width: 700,
    height: 900,
    alt: "Buckets of freshly cut summer stems lined up in the cooler doorway, backlit by morning sun",
    caption: "Wednesday delivery, mid-July",
  },
  {
    id: "fbm-g10",
    category: "weddings",
    categoryLabel: "Weddings",
    src: "https://picsum.photos/seed/fbm-g10/700/560",
    width: 700,
    height: 560,
    alt: "Boutonniere of a single spray rose, olive leaf and dried grass pinned to a wool lapel",
    caption: "Wool-lapel boutonniere",
  },
  {
    id: "fbm-g11",
    category: "everyday",
    categoryLabel: "Everyday",
    src: "https://picsum.photos/seed/fbm-g11/700/840",
    width: 700,
    height: 840,
    alt: "Sympathy arrangement of white stock, sage and soft greenery in a low ceramic bowl",
    caption: "Sympathy bowl",
  },
  {
    id: "fbm-g12",
    category: "seasonal",
    categoryLabel: "Seasonal",
    src: "https://picsum.photos/seed/fbm-g12/700/640",
    width: 700,
    height: 640,
    alt: "Winter arrangement of evergreen tips, rose hips and dried eucalyptus on a frosted porch step",
    caption: "December porch pot",
  },
];

/** Ask picsum for a larger crop at the same aspect ratio, for the lightbox view. */
export function upscale(src: string, width: number, height: number, target = 1400) {
  const scale = target / Math.max(width, height);
  if (scale <= 1) return src;
  return src.replace(
    `/${width}/${height}`,
    `/${Math.round(width * scale)}/${Math.round(height * scale)}`,
  );
}
