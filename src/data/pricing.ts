export interface PricingData {
  price: string;
  duration: string;
  includes: string[];
  imageUrl?: string;
}

// Fallback prices — matches current values in sports.ts
const FALLBACK: Record<string, PricingData> = {
  'surf': {
    price: 'Desde $44.400 (clase matutina)',
    duration: '1-8 horas',
    includes: ['Tabla de surf', 'Instructor certificado', 'Equipos incluidos'],
  },
  'kitesurf': {
    price: 'Desde $720.000 (2h privado)',
    duration: '2-8 horas',
    includes: ['Instructor IKO certificado', 'Equipo de kitesurf completo', 'Equipo de seguridad', 'Bote de asistencia y rescate', 'Certificado IKO'],
  },
  'wing-foil': {
    price: 'Desde $280.000/hora',
    duration: '1 hora',
    includes: ['Wing', 'Tabla con foil', 'Chaleco salvavidas', 'Instructor certificado'],
  },
  'windsurf': {
    price: 'Desde $150.000 COP',
    duration: '2 horas',
    includes: ['Tabla de windsurf', 'Vela', 'Arnés', 'Instructor certificado', 'Seguro'],
  },
  'sup': {
    price: 'Desde $60.000 (clase matutina)',
    duration: '1 hora',
    includes: ['Tabla SUP', 'Remo', 'Leash', 'Chaleco salvavidas', 'Instructor'],
  },
  'entrenamiento-funcional': {
    price: 'Desde $50.000 COP',
    duration: '1 hora',
    includes: ['Equipamiento completo', 'Entrenador personal', 'Plan personalizado'],
  },
};

export async function fetchPricing(): Promise<Map<string, PricingData>> {
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    console.warn('[pricing] PUBLIC_SANITY_PROJECT_ID not set — using fallback prices');
    return new Map(Object.entries(FALLBACK));
  }

  try {
    const { client } = await import('../sanity/client');
    const query = `*[_type == "sport"]{ "slug": slug.current, price, duration, includes, "imageUrl": image.asset->url }`;
    const results = await client.fetch<Array<{
      slug: string;
      price?: string;
      duration?: string;
      includes?: string[];
      imageUrl?: string;
    }>>(query);

    const map = new Map<string, PricingData>();
    for (const item of results) {
      const key = item.slug;
      if (!key) continue;
      map.set(key, {
        price: item.price || FALLBACK[key]?.price || '',
        duration: item.duration || FALLBACK[key]?.duration || '',
        includes: item.includes?.length ? item.includes : FALLBACK[key]?.includes || [],
        imageUrl: item.imageUrl || undefined,
      });
    }
    console.log(`[pricing] Loaded ${map.size} sport prices from Sanity`);
    return map;
  } catch (err) {
    console.warn('[pricing] Sanity fetch failed — using fallback prices:', err);
    return new Map(Object.entries(FALLBACK));
  }
}

// Merge Sanity pricing into a sport object (non-mutating)
export function applyPricing<T extends { slug: string; price: string; duration: string; includes: string[]; image?: string }>(
  sport: T,
  pricing: Map<string, PricingData>,
): T {
  const p = pricing.get(sport.slug);
  if (!p) return sport;
  return {
    ...sport,
    price: p.price,
    duration: p.duration,
    includes: p.includes,
    ...(p.imageUrl ? { image: p.imageUrl } : {}),
  };
}
