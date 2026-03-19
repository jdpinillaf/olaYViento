import { seedPosts } from './blogPosts';

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  mainImage: string | null;
  body: any[];
  sportSlug: string | null;
  publishedAt: string;
  tags: string[];
}

export async function fetchPosts(): Promise<BlogPost[]> {
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    console.warn('[blog] PUBLIC_SANITY_PROJECT_ID not set — using seed posts only');
    return seedPosts;
  }

  try {
    const { client } = await import('../sanity/client');
    const query = `*[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      excerpt,
      "mainImage": mainImage.asset->url,
      body[]{
        ...,
        _type == "image" => {
          ...,
          "url": asset->url
        }
      },
      sportSlug,
      publishedAt,
      tags
    }`;
    const sanityPosts = await client.fetch<BlogPost[]>(query);
    console.log(`[blog] Loaded ${sanityPosts.length} posts from Sanity`);

    // Merge: Sanity posts override seed posts with same slug
    const sanitySlugSet = new Set(sanityPosts.map(p => p.slug));
    const uniqueSeedPosts = seedPosts.filter(p => !sanitySlugSet.has(p.slug));
    const merged = [...sanityPosts, ...uniqueSeedPosts];
    merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return merged;
  } catch (err) {
    console.warn('[blog] Sanity fetch failed — using seed posts:', err);
    return seedPosts;
  }
}

