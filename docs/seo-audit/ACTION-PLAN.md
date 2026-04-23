# Action Plan — SEO para 4 keywords target

**Prioridad**: Critical > High > Medium > Low

---

## CRITICAL (fix ya)

Ninguno bloquea indexación. Skip.

---

## HIGH (semana 1)

### H1. Crear página `deportes-acuaticos-puerto-colombia`

**Archivo**: `src/data/pages.ts`
**Acción**: Añadir entrada tier 1.

```ts
{
  slug: 'deportes-acuaticos-puerto-colombia',
  sportSlug: 'surf', // ajustar si existe sport "multi" o usar surf como default
  locationSlug: 'puerto-colombia',
  tier: 1,
  title: 'Deportes Acuáticos en Puerto Colombia | Surf, Kite, Wing Foil | Ola y Viento',
  metaDescription: 'Deportes acuáticos en Puerto Colombia: surf, kitesurf, wing foil, SUP y entrenamiento funcional. Escuela Ola y Viento en Pradomar y Puerto Mocho. Desde $44.400 COP.',
  h1: 'Deportes Acuáticos en Puerto Colombia — Escuela Ola y Viento',
  intro: 'Puerto Colombia es el destino nº1 de deportes acuáticos del Atlántico colombiano ...',
  whyTitle: '¿Por qué Puerto Colombia para deportes náuticos?',
  whyContent: 'Vientos alisios 20-25 nudos Dic-Abr, aguas 28°C, fondos de arena, dos sedes Pradomar y Puerto Mocho ...',
  classesTitle: '¿Qué deportes puedes practicar?',
  classesContent: 'Surf (Pradomar), kitesurf y wing foil (Puerto Mocho), SUP, entrenamiento funcional en playa ...',
  faq: [
    { question: '¿Qué deportes acuáticos hay en Puerto Colombia?', answer: '...' },
    { question: '¿Dónde están las escuelas en Puerto Colombia?', answer: '...' },
    { question: '¿Cuánto cuesta practicar deportes acuáticos en Puerto Colombia?', answer: '...' },
    { question: '¿Qué temporada es mejor para cada deporte?', answer: '...' },
    { question: '¿Puerto Colombia es mejor que Cartagena para deportes acuáticos?', answer: '...' },
    { question: '¿Cómo llego desde Barranquilla?', answer: '...' },
  ],
  relatedSlugs: ['surf-puerto-colombia', 'kitesurf-puerto-colombia', 'clases-de-surf-barranquilla'],
},
```

Target word count: ≥1000. FAQ: ≥6 items.

---

### H2. Reforzar `/surf-puerto-colombia` para query "surf cerca barranquilla"

**Archivo**: `src/data/pages.ts` línea 138
**Cambios**:

1. Añadir H2 nuevo tras el hero (requiere edit al template `[slug].astro` o añadir campo `subtitle`):
   - "Clases de surf cerca de Barranquilla — Puerto Colombia a 15 minutos"

2. En `intro`, reforzar la frase 2x:
   - "...a 15 minutos por la Vía al Mar. Si buscas **surf cerca de Barranquilla**, Puerto Colombia es tu spot..."

3. Recortar `metaDescription` a ≤155 chars:
   > "Surf cerca de Barranquilla en Puerto Colombia: olas suaves, fondo de arena, agua 28°C. Clases desde $44.400 COP con equipo. ¡Reserva!"  (139 chars)

4. Añadir 2 FAQ nuevas:
   - "¿Dónde hacer surf cerca de Barranquilla?"
   - "¿Cuánto tarda llegar desde Barranquilla al spot de surf?"

---

### H3. Imágenes en landings programáticas

**Issue**: 2 `<img>` totales en /surf-puerto-colombia.
**Acción**:
- Añadir hero image al template `[slug].astro` (no solo gradient): usar `sport.image` si existe, o nueva prop `page.heroImage`.
- Añadir sección galería con 3-6 fotos del spot.
- Alt text obligatorio localizado:
  - `alt="Pradomar Puerto Colombia spot de surf cerca de Barranquilla"`
  - `alt="Clase de surf en Puerto Colombia Ola y Viento"`
  - `alt="Playa de Puerto Mocho deportes acuáticos"`

**Archivos**:
- Nuevas imágenes → `public/images/spots/pradomar-1.jpg` etc.
- Optimizar: WebP + `<picture>` con srcset. Usar `astro:assets` `<Image />` component.
- Formato: ≤150KB por imagen, 1600w max.

---

### H4. Link homepage → landings target

**Archivo**: `src/pages/index.astro` + `src/components/home/Ubicacion.astro` + `src/components/home/Deportes.astro`

**Acciones**:
- En Ubicación: CTA "Ver más sobre surf en Puerto Colombia" → `/surf-puerto-colombia`
- En Ubicación: CTA "Todos los deportes en Puerto Colombia" → `/deportes-acuaticos-puerto-colombia`
- En Deportes: cada card de sport linkea a su landing (si ya lo hace, OK)
- En Hero: agregar link "Clases cerca de Barranquilla" al párrafo subtítulo

---

## MEDIUM (semana 2-4)

### M1. Recortar meta descriptions globalmente
Target ≤155 chars. Revisar todas las entradas de `pages.ts`. Script:

```bash
node -e "const p=require('./src/data/pages.ts'); /* ... */"
```
O manual: grep todas las que pasen 160 chars.

### M2. Schema aggregateRating + Review
Si hay testimonials reales, añadir:
- `Review` items dentro de `LocalBusiness`
- `aggregateRating` con ratingValue + reviewCount

**Archivo**: `src/lib/schema.ts`

### M3. `llms.txt` completo
Añadir a `public/llms.txt` todas las páginas tier 1 y tier 2, agrupadas por sport.

### M4. Blog post linking
Post `puerto-colombia-paraiso-deportes-nauticos` debe linkear:
- `/surf-puerto-colombia`
- `/deportes-acuaticos-puerto-colombia` (nueva)
- `/kitesurf-puerto-colombia`

Verificar y añadir si faltan.

### M5. H2/H3 con keywords variantes
Template `[slug].astro`: usar H2 desde `whyTitle` y `classesTitle`. Asegurar que incluyan el keyword target. Actualmente OK — validar para las nuevas páginas.

### M6. Preconnect + font-display
`BaseLayout.astro`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```
Y `font-display: swap` en la URL de Google Fonts.

### M7. Validación Search Console
- Submit sitemap
- Monitor queries reales para "surf cerca barranquilla" y "deportes acuaticos puerto colombia"
- Si `/surf-puerto-colombia` NO rankea por "surf cerca barranquilla", considerar página dedicada con canonical cruzado.

---

## LOW (backlog)

### L1. PageSpeed Insights benchmark + track en Vercel Analytics
### L2. OG image por página (actualmente `sport.image` fallback)
### L3. `VideoObject` schema si hay videos embebidos
### L4. `Event` schema para surf camps
### L5. Breadcrumb visible (Home > Puerto Colombia > Surf) en landings de ubicación
### L6. Canibalización audit: merge `escuela-surf-barranquilla` con `clases-de-surf-barranquilla` si SERP overlap >50%

---

## Resumen por keyword

| Keyword | Acción principal | Esfuerzo | Impacto |
|---------|------------------|----------|---------|
| surf puerto colombia | H2 (imágenes + meta recorte) | S | Medio |
| deportes acuáticos puerto colombia | H1 (crear página) | M | **Alto** |
| surf barranquilla | M5 (keywords en H2/H3) + M1 | S | Bajo-Medio |
| surf cerca barranquilla | H2 (reforzar intro + FAQ) + H4 | S | **Alto** |

**Esfuerzo total HIGH**: ~1 día dev.
