import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { fetchPosts } from '../data/blog';

export async function GET(context: APIContext) {
  const posts = await fetchPosts();
  return rss({
    title: 'Ola y Viento Blog',
    description: 'Artículos sobre surf, kitesurf y deportes náuticos en Barranquilla',
    site: context.site!.toString(),
    items: posts.map(post => ({
      title: post.title,
      description: post.excerpt || '',
      pubDate: new Date(post.publishedAt),
      link: `/blog/${post.slug}/`,
    })),
  });
}
