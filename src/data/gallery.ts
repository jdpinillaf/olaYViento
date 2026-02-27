export interface GalleryItem {
  slug: string;
  title: string;
  images: string[];
}

const FALLBACK: GalleryItem[] = [
  {
    slug: 'surf',
    title: 'Surf',
    images: [
      '/images/gallery/surf-1.jpg',
      '/images/gallery/surf-2.jpg',
      '/images/gallery/surf-3.jpg',
    ],
  },
  {
    slug: 'kitesurf',
    title: 'Kitesurf',
    images: [
      '/images/gallery/kitesurf-1.jpg',
      '/images/gallery/kitesurf-2.jpg',
      '/images/gallery/kitesurf-3.jpg',
    ],
  },
  {
    slug: 'wing-foil',
    title: 'Wing Foil',
    images: [
      '/images/gallery/wingfoil-1.jpg',
      '/images/gallery/wingfoil-2.jpg',
    ],
  },
  {
    slug: 'atardecer',
    title: 'Atardecer',
    images: [
      '/images/gallery/atardecer-1.jpg',
      '/images/gallery/atardecer-2.jpg',
      '/images/gallery/atardecer-3.jpg',
    ],
  },
  {
    slug: 'clases',
    title: 'Clases',
    images: [
      '/images/gallery/clases-1.jpg',
      '/images/gallery/clases-2.jpg',
    ],
  },
  {
    slug: 'comunidad',
    title: 'Comunidad',
    images: [
      '/images/gallery/comunidad-1.jpg',
      '/images/gallery/comunidad-2.jpg',
      '/images/gallery/comunidad-3.jpg',
    ],
  },
];

export async function fetchGallery(): Promise<GalleryItem[]> {
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    console.warn('[gallery] PUBLIC_SANITY_PROJECT_ID not set — using fallback gallery');
    return FALLBACK;
  }

  try {
    const { client } = await import('../sanity/client');
    const query = `*[_type == "galleryItem"] | order(order asc) { "slug": slug.current, title, "images": images[].asset->url }`;
    const results = await client.fetch<GalleryItem[]>(query);

    if (!results?.length) {
      console.warn('[gallery] No gallery items in Sanity — using fallback');
      return FALLBACK;
    }

    console.log(`[gallery] Loaded ${results.length} gallery items from Sanity`);
    return results;
  } catch (err) {
    console.warn('[gallery] Sanity fetch failed — using fallback gallery:', err);
    return FALLBACK;
  }
}
