# SEO Audit — Ola y Viento

**Fecha**: 2026-04-23
**Dominio**: https://www.olayviento.co
**Keywords objetivo**:
1. `surf puerto colombia`
2. `deportes acuáticos puerto colombia`
3. `surf barranquilla`
4. `surf cerca barranquilla`

**Negocio**: Escuela de deportes náuticos (surf, kitesurf, wing foil, SUP), es_CO.

---

## 1. Executive Summary

**SEO Health Score: 78/100**

| Área | Score | Nota |
|------|-------|------|
| Technical SEO | 92/100 | Canonical, schema, headers, sitemap OK |
| Content Quality | 85/100 | Tier 1 pages ~1200 palabras, FAQ largo, E-E-A-T sólido |
| On-Page (keywords) | 60/100 | 2 de 4 keywords sin landing dedicada |
| Schema | 95/100 | Course, FAQ, Breadcrumb, SportsActivityLocation |
| Performance | 90/100 | TTFB 400ms, Vercel edge cache HIT |
| Images | 45/100 | Solo 2 `<img>` en /surf-puerto-colombia |
| AI Search | 88/100 | llms.txt presente, ClaudeBot/GPTBot permitidos |

### Top 5 issues críticos/altos

1. **[HIGH] Falta página `deportes-acuaticos-puerto-colombia`** — solo existe variante Barranquilla. Keyword sin landing.
2. **[HIGH] Falta landing dedicada para `surf cerca barranquilla`** — frase usada solo en H1 de `/surf-puerto-colombia`, no hay slug dedicado.
3. **[HIGH] Imágenes escasas en landings programáticas** — 2 `<img>` en /surf-puerto-colombia. Sin foto del spot, sin galería, sin alt localizado.
4. **[MED] Homepage no enlaza directo a `/surf-puerto-colombia`** — link equity perdido para top target keyword.
5. **[MED] H2/H3 no incluyen variantes exactas** — "Surf cerca de Barranquilla" y "Surf Puerto Colombia" solo en H1.

### Top 5 quick wins

1. Agregar `deportes-acuaticos-puerto-colombia` a `pages.ts` (tier 1, copia adaptada de `deportes-acuaticos-barranquilla`).
2. Agregar `surf-cerca-barranquilla` como landing tier 1 o hacer redirect 301 → `/surf-puerto-colombia` con reescritura del H1.
3. Añadir 4-6 imágenes de spots (Pradomar, Puerto Mocho, muelle histórico) con alt localizado en cada página target.
4. Link desde hero + sección "Ubicación" de homepage a `/surf-puerto-colombia` y `/deportes-acuaticos-puerto-colombia`.
5. Reforzar H2: añadir "Clases de surf cerca de Barranquilla" y "Deportes acuáticos en Puerto Colombia" como H2 en páginas relevantes.

---

## 2. Technical SEO

### OK
- HTTPS + HSTS `max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` set
- `robots.txt` explícito para GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended
- Sitemap index + `sitemap-0.xml` (65 URLs), `/studio` excluido correctamente
- Canonical absoluto en cada página
- `trailingSlash: 'never'` consistente
- `output: 'static'` + Vercel edge cache (`x-vercel-cache: HIT`)
- TTFB ~400ms, tamaño HTML /surf-puerto-colombia = 41KB

### Issues
- `Cache-Control: public, max-age=0, must-revalidate` — depende 100% del edge cache. OK para Vercel, pero si edge falla revalidación total. Bajo impacto.
- No hay `hreflang` — sitio es es_CO only, no crítico.

---

## 3. Content Quality — por keyword target

### 3.1 `surf puerto colombia` — ✅ FUERTE
- Página: `/surf-puerto-colombia` (tier 1)
- Title: "Surf en Puerto Colombia | Clases de Surf cerca de Barranquilla | Ola y Viento" (78 chars, OK)
- Meta desc: 191 chars (TRUNCA a ~160 en SERP — ver action plan)
- H1: "Surf en Puerto Colombia — El Mejor Spot cerca de Barranquilla" ✓
- ~1200 palabras, 6 FAQ items
- Incluye intent: "cómo llegar", "temporada", "seguridad", "spots", "combinar deportes", "dónde comer"
- Schema Course + LocalBusiness + FAQ + Breadcrumb

**Mejoras**:
- Recortar meta description a ≤155 chars
- Añadir foto hero de Pradomar con alt "Pradomar Puerto Colombia spot de surf cerca de Barranquilla"
- Añadir sección "Mapa + cómo llegar" (ya tiene texto, falta mapa embebido)

### 3.2 `deportes acuáticos puerto colombia` — ❌ MISSING
- No existe slug `deportes-acuaticos-puerto-colombia`
- Solo existe `deportes-acuaticos-barranquilla` (tier 2)
- Keyword va a quedar huérfana; competencia puede rankear fácil

**Acción**: crear entrada programática tier 1.

### 3.3 `surf barranquilla` — ✅ CUBIERTA
Páginas relevantes:
- `/clases-de-surf-barranquilla` (tier 1, ~1400 palabras, 8 FAQ)
- `/escuela-surf-barranquilla` (tier 3)
- `/mejores-escuelas-surf-barranquilla` (tier 2)
- `/clases-surf-ninos-barranquilla` (tier 2)

Riesgo: posible canibalización entre `/clases-de-surf-barranquilla` y `/escuela-surf-barranquilla`. Verificar si la segunda es suficientemente distinta o mergear.

### 3.4 `surf cerca barranquilla` — ⚠ PARCIAL
- Frase exacta aparece en H1 y title de `/surf-puerto-colombia`
- No hay slug dedicado `surf-cerca-barranquilla`
- Alternativas SERP-wise: Google probablemente rankea `/surf-puerto-colombia` por esta query — verificar con Search Console

**Acción recomendada**: NO crear página separada (riesgo de duplicado). En su lugar:
- Reforzar `/surf-puerto-colombia` con H2 "Clases de Surf Cerca de Barranquilla — a 15 minutos"
- Añadir `surf cerca de barranquilla` en el intro natural 2-3 veces más
- Internal links desde homepage y /clases-de-surf-barranquilla con anchor "surf cerca de Barranquilla"

---

## 4. On-Page SEO

### Titles (samples)
- Home: "Ola y Viento | Escuela de Surf, Kitesurf y Wing Foil en Barranquilla" — OK, 68 chars
- /surf-puerto-colombia: OK
- /clases-de-surf-barranquilla: "Clases de Surf en Barranquilla | Escuela de Surf Ola y Viento" — OK

### Meta descriptions
Muchas pasan 160 chars (ej. /clases-de-surf-barranquilla 215 chars, /surf-puerto-colombia 191 chars). Google trunca.

### Heading structure (/surf-puerto-colombia)
```
H1 × 1 (correcto)
H2 × 2: "¿Por qué Puerto Colombia es el mejor lugar para surfear?", "Clases de surf en Puerto Colombia con Ola y Viento"
H3 × 7: related links + footer
```
**Issue**: FAQ sin marcarse como H3 semánticos (están dentro de FAQ schema pero sin headings visuales numerados). Verificar template.

### Internal linking
- `relatedSlugs` en cada página genera bloque de 3 links. Bien.
- Homepage enlaza a Reservar/Deportes/Ubicación (secciones), NO a páginas programáticas. **Pérdida de link equity** hacia `/surf-puerto-colombia`.
- Blog tiene `puerto-colombia-paraiso-deportes-nauticos` — verificar que linkee internamente a landing `/surf-puerto-colombia` y `/deportes-acuaticos-puerto-colombia` (nueva).

---

## 5. Schema & Structured Data

### Presentes
- `Organization`, `WebSite` (BaseLayout)
- `SportsActivityLocation` (LocalBusiness variant)
- `Course` + `CourseInstance` + `Offer`
- `FAQPage` con `Question`/`Answer`
- `BreadcrumbList`
- `Place`, `PostalAddress`, `GeoCoordinates`

### Oportunidades
- `Course.provider` — verificar que apunte a Organization `@id`
- Añadir `aggregateRating` si hay testimonials reales (existe `src/data/testimonials.ts`)
- `Review` schema en testimonials
- `VideoObject` si hay videos del blog
- `Event` si hay surf camps con fechas

---

## 6. Performance

- TTFB 400ms (bueno)
- HTML 41KB (razonable)
- `x-vercel-cache: HIT` edge cache activo
- Zero client-side JS por default (Astro static)
- Fuentes: Google Fonts (Fredoka + Inter) — considerar `font-display: swap` + preload
- No hay CDN de imágenes propio (Sanity CDN cuando aplica)

### CWV estimado
Sin medición real, estáticos con JS=0 = LCP <1.5s, CLS ≈0, INP ≈0. Validar con PageSpeed Insights.

---

## 7. Images

`/surf-puerto-colombia` tiene **2 imágenes totales** (probablemente logo header + 1 más).
- Sin hero photo del spot
- Sin galería
- Sin picture/srcset para responsive
- Alt text no verificado

**Impacto alto**: Google Images + AI Overviews priorizan páginas con imágenes relevantes con alt localizado.

---

## 8. AI Search Readiness

### OK
- `llms.txt` presente con páginas principales
- Bots de IA permitidos (GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, CCBot)
- FAQ schema ayuda citability
- Contenido estructurado en secciones (whyContent, classesContent)

### Mejora
- `llms.txt` no lista `/deportes-acuaticos-barranquilla` ni muchas tier 2
- Añadir sección "Datos clave para citación" en cada página (precio, duración, ubicación en bullets)
- Asegurar que cada FAQ answer sea una respuesta citable standalone (2-4 frases)

---

## 9. Competitive gaps (sin data real)

Para validar con Ahrefs/SEMrush/DataForSEO:
- Volumen búsqueda `surf puerto colombia` vs `surf barranquilla`
- SERP features: Local Pack, Knowledge Panel, AI Overview
- Backlinks de escuelas competidoras
- Brand mentions en Reddit/YouTube/TripAdvisor

---

## 10. Coverage matrix

| Keyword | Slug actual | Tier | Word count | FAQ | Schema | Score |
|---------|-------------|------|------------|-----|--------|-------|
| surf puerto colombia | surf-puerto-colombia | 1 | 1200 | 6 | ✓ | 9/10 |
| deportes acuaticos puerto colombia | — | — | 0 | 0 | — | 0/10 |
| surf barranquilla | clases-de-surf-barranquilla | 1 | 1400 | 8 | ✓ | 9/10 |
| surf cerca barranquilla | surf-puerto-colombia (proxy) | 1 | 1200 | 6 | ✓ | 6/10 |

**Promedio coverage: 6/10** — suficiente margen para ganar 2 keywords con trabajo mínimo.
