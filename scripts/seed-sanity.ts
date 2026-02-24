import { createClient } from '@sanity/client';
import { sports } from '../src/data/sports';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('Falta SANITY_WRITE_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId: 'xqqdaj8t',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
});

async function seed() {
  for (const sport of sports) {
    await client.createOrReplace({
      _type: 'sport',
      _id: `sport-${sport.slug}`,
      slug: { _type: 'slug', current: sport.slug },
      price: sport.price,
      duration: sport.duration,
      includes: sport.includes,
    });
    console.log(`✓ ${sport.slug}`);
  }
  console.log('\nListo. Haz redeploy para ver los cambios.');
}

seed().catch(console.error);
