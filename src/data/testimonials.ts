export interface Testimonial {
  name: string;
  caption: string;
  videoUrl: string;
  posterUrl?: string;
}

const FALLBACK: Testimonial[] = [];

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    console.warn('[testimonials] PUBLIC_SANITY_PROJECT_ID not set — using fallback');
    return FALLBACK;
  }

  try {
    const { client } = await import('../sanity/client');
    const query = `*[_type == "testimonial"] | order(order asc) {
      name,
      "caption": coalesce(caption, ""),
      "videoUrl": video.asset->url,
      "posterUrl": poster.asset->url
    }`;
    const results = await client.fetch<Testimonial[]>(query);

    if (!results?.length) {
      console.warn('[testimonials] No testimonials in Sanity — using fallback');
      return FALLBACK;
    }

    console.log(`[testimonials] Loaded ${results.length} testimonials from Sanity`);
    return results;
  } catch (err) {
    console.warn('[testimonials] Sanity fetch failed — using fallback:', err);
    return FALLBACK;
  }
}
