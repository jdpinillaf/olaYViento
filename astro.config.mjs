// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://olayviento.com',
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap(),
    react(),
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'xqqdaj8t',
      dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
      studioBasePath: '/studio',
      useCdn: true,
    }),
  ]
});
