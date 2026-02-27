/**
 * Sube imágenes de galería a Sanity y crea documentos galleryItem.
 *
 * Uso:
 *   SANITY_TOKEN=<tu-token> node scripts/seed-gallery.mjs
 *
 * Obtener token:
 *   1. Ve a https://www.sanity.io/manage/project/xqqdaj8t/api#tokens
 *   2. Crea un token con permisos "Editor" o "Deploy Studio"
 *   3. Copia el token y pásalo como variable de entorno
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { basename } from 'path';

const PROJECT_ID = 'xqqdaj8t';
const DATASET = 'production';
const TOKEN = process.env.SANITY_TOKEN;

if (!TOKEN) {
  console.error('Error: SANITY_TOKEN no está definido.');
  console.error('');
  console.error('1. Ve a https://www.sanity.io/manage/project/xqqdaj8t/api#tokens');
  console.error('2. Crea un token con permisos "Editor"');
  console.error('3. Ejecuta: SANITY_TOKEN=<tu-token> node scripts/seed-gallery.mjs');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

const GALLERY_ITEMS = [
  {
    slug: 'surf',
    title: 'Surf',
    order: 1,
    files: [
      'public/images/gallery/surf-1.jpg',
      'public/images/gallery/surf-2.jpg',
      'public/images/gallery/surf-3.jpg',
    ],
  },
  {
    slug: 'kitesurf',
    title: 'Kitesurf',
    order: 2,
    files: [
      'public/images/gallery/kitesurf-1.jpg',
      'public/images/gallery/kitesurf-2.jpg',
      'public/images/gallery/kitesurf-3.jpg',
    ],
  },
  {
    slug: 'wing-foil',
    title: 'Wing Foil',
    order: 3,
    files: [
      'public/images/gallery/wingfoil-1.jpg',
      'public/images/gallery/wingfoil-2.jpg',
    ],
  },
  {
    slug: 'atardecer',
    title: 'Atardecer',
    order: 4,
    files: [
      'public/images/gallery/atardecer-1.jpg',
      'public/images/gallery/atardecer-2.jpg',
      'public/images/gallery/atardecer-3.jpg',
    ],
  },
  {
    slug: 'clases',
    title: 'Clases',
    order: 5,
    files: [
      'public/images/gallery/clases-1.jpg',
      'public/images/gallery/clases-2.jpg',
    ],
  },
  {
    slug: 'comunidad',
    title: 'Comunidad',
    order: 6,
    files: [
      'public/images/gallery/comunidad-1.jpg',
      'public/images/gallery/comunidad-2.jpg',
      'public/images/gallery/comunidad-3.jpg',
    ],
  },
];

async function uploadImage(filePath) {
  const buffer = readFileSync(filePath);
  const filename = basename(filePath);
  console.log(`  Subiendo ${filename}...`);
  const asset = await client.assets.upload('image', buffer, { filename });
  return asset._id;
}

async function main() {
  console.log(`Conectando a Sanity (${PROJECT_ID}/${DATASET})...\n`);

  for (const item of GALLERY_ITEMS) {
    console.log(`[${item.slug}] "${item.title}" (${item.files.length} imágenes)`);

    // Upload all images
    const imageRefs = [];
    for (const file of item.files) {
      const assetId = await uploadImage(file);
      imageRefs.push({
        _type: 'image',
        _key: assetId.replace('image-', '').slice(0, 12),
        asset: { _type: 'reference', _ref: assetId },
      });
    }

    // Create or replace the document
    const doc = {
      _type: 'galleryItem',
      _id: `gallery-${item.slug}`,
      slug: { _type: 'slug', current: item.slug },
      title: item.title,
      order: item.order,
      images: imageRefs,
    };

    await client.createOrReplace(doc);
    console.log(`  Documento gallery-${item.slug} creado.\n`);
  }

  console.log('Listo! 6 items de galería creados en Sanity.');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
