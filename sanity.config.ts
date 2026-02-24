import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { sportSchema } from './src/sanity/schemas/sport';

export default defineConfig({
  name: 'ola-y-viento',
  title: 'Ola y Viento',
  projectId: 'xqqdaj8t',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [sportSchema],
  },
});
