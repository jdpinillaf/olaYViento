import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'xqqdaj8t',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2026-01-01',
});
