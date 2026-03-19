# SEO Action Plan — Ola y Viento

**Current Score: 75/100** | **Target Score: 90+/100**
**Date:** 2026-03-18

---

## Critical — Fix Immediately (Score impact: +8-10 pts)

### C1. Create Privacy Policy + Terms of Service pages
- **Why:** Legal requirement in Colombia. Major trust signal gap. Google QRG flags sites without legal pages.
- **Files:** Create `src/pages/politica-privacidad.astro` + `src/pages/terminos-condiciones.astro`
- **Also:** Add links in `src/components/layout/Footer.astro`
- **Impact:** Trust +3

### C2. Create About Us page with instructor bios
- **Why:** Single biggest E-E-A-T gap. Zero information about who teaches. Google needs to see Experience + Expertise signals from real people.
- **Files:** Create `src/pages/nosotros.astro`
- **Content needed:** Founder story, instructor names + photos + certifications (IKO numbers), years of experience, student count
- **Impact:** Experience +4, Expertise +3, Trust +2

### C3. Self-host sport images (eliminate 5 third-party domains)
- **Why:** Current images load from federacioncolombianadesurf.org, tripadvisor.com, algarvewatersport.com, hoenalu.com, artsurfcamp.com. Each requires DNS+TLS+HTTP. Unreliable, slow, may break without notice.
- **Files:** `src/data/sports.ts` (lines 18, 29, 40, 51, 62) → update to local paths
- **Action:** Download images, optimize to 600x400 WebP (~25 KB each), save to `public/images/sports/`
- **Impact:** LCP -500ms to -1s, eliminates 5 third-party connections

### C4. Resize massively oversized PNGs
- **Why:** ~700 KB wasted per page load. Spirals are 2084x2084 displayed at 160px. Logo-icon is 1400x1400 displayed at 80px.
- **Files:**
  - `public/images/spirals/*.png` → Resize to 256x256, convert to WebP (<5 KB each)
  - `public/images/logo-icon.png` → Create 192x192 WebP version
  - `public/images/logo-horizontal.png` → Create 534x128 WebP version
  - Favicon → Create 32x32 `.ico` (currently serving the 120 KB full-size PNG)
- **Impact:** Save ~500+ KB per page load

### C5. Remove FAQPage schema from all pages
- **Why:** Since August 2023, Google restricts FAQ rich results to government/healthcare authority sites only. This is a commercial water sports school — the schema produces zero rich result benefit. It is dead weight in the HTML.
- **Files:** `src/pages/index.astro` (remove `buildFAQPageSchema()` call), `src/pages/[slug].astro` (remove `buildFAQPageSchema()` call)
- **Keep:** The HTML FAQ content (`<details>/<summary>`) — still good for UX and regular SEO
- **Impact:** Cleaner markup, avoids confusing Google's schema parser

---

## High — Fix Within 1 Week (Score impact: +5-7 pts)

### H1. Expand 7 thinnest programmatic pages to 500+ words
- **Why:** Pages under 500 words risk being flagged as thin content by Google's Helpful Content system.
- **Pages:** kitesurf-puerto-colombia (~180w), entrenamiento-funcional-playa (~180w), surf-colombia-caribe (~180w), windsurf-colombia (~200w), paddle-board-barranquilla (~200w), clases-wing-foil-barranquilla (~210w), deportes-acuaticos-barranquilla (~220w — hub page, should be richest)
- **Files:** `src/data/pages.ts`
- **Impact:** Content quality +5

### H2. Add width/height attributes to sport card images
- **Why:** Missing dimensions cause CLS of 0.05-0.1 before CSS loads.
- **File:** `src/components/home/Deportes.astro` (line ~58)
- **Action:** Add `width="600" height="400"` to all `<img>` tags
- **Impact:** CLS -0.05 to -0.1

### H3. Self-host fonts (Fredoka + Inter woff2 files)
- **Why:** Current strategy preloads Google Fonts CSS, not the woff2 files. Browser must: fetch CSS → parse → discover woff2 URLs → fetch woff2. Two sequential round-trips to third-party servers.
- **Files:** `src/layouts/BaseLayout.astro` (lines 57-61)
- **Action:** Download woff2 files, add to `public/fonts/`, add `@font-face` declarations in `src/styles/global.css`
- **Impact:** LCP -200 to -400ms

### H4. Fix Course schema errors
- **Why:** Invalid `offers.category` property, inaccurate duration mapping.
- **File:** `src/lib/schema.ts`
- **Actions:**
  - Remove `category: 'Clase de ' + sport.name` from Offer (line ~132)
  - Fix `toIsoDuration()` to use minimum of range (line ~82)
  - Add `@id` to Course schemas
- **Impact:** Schema validation pass

### H5. Add `dateModified` to BlogPosting schema
- **Why:** Required by Google for Article rich results.
- **Files:** `src/pages/blog/[slug].astro`, `src/lib/schema.ts`
- **Action:** Add `dateModified` field (use `publishedAt` as default, add `updatedAt` field to blog data)
- **Impact:** Article rich result eligibility

### H6. Add blog post images
- **Why:** ALL 30 posts have `mainImage: null`. Posts without images fail Google's Article rich result validation and have ~20-30% lower CTR.
- **Files:** `src/data/blogPosts.ts` (all 30 entries)
- **Impact:** CTR +20-30%, social sharing, Article schema validation

### H7. Consolidate or differentiate kitesurf cannibalization pair
- **Why:** `/escuela-de-kitesurf-barranquilla` and `/clases-kitesurf-barranquilla` both target [kitesurf barranquilla] with overlapping content.
- **Options:**
  - A) Merge into one page with 301 redirect from the other
  - B) Differentiate: one targets "escuela" (school info, methodology, certifications) and the other targets "clases" (class types, pricing, booking)
- **Monitor:** Check Search Console for keyword cannibalization data first
- **Impact:** Avoid ranking dilution

---

## Medium — Fix Within 1 Month (Score impact: +4-6 pts)

### M1. Use Astro `<Image />` component for all images
- **Why:** Auto WebP/AVIF conversion, responsive `srcset`, automatic width/height injection. Single highest-leverage image change.
- **Files:** All components using `<img>` tags
- **Impact:** -30% image bytes, CLS prevention

### M2. Add sitemap filter for /404 and /studio
- **File:** `astro.config.mjs`
- **Action:** Add `filter: (page) => !page.includes('/404') && !page.includes('/studio')`
- **Impact:** Clean sitemap

### M3. Fix sitemap lastmod (remove or use real dates)
- **File:** `astro.config.mjs` (lines 19-22)
- **Action:** Remove `serialize` callback entirely, or map per-page dates (blog posts have `publishedAt`)
- **Impact:** Crawl efficiency

### M4. Add Content-Security-Policy header
- **File:** `vercel.json`
- **Starter policy:** `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' https: data:; frame-src https://olayviento.site.agendapro.com https://maps.google.com; connect-src 'self' https://*.sanity.io`
- **Impact:** Lighthouse security score, best practice

### M5. Add named author(s) with Person schema to blog
- **Why:** Google prefers `Person` author for Article rich results. AI search cites named experts more than organizations.
- **Files:** `src/data/blogPosts.ts`, `src/pages/blog/[slug].astro`, `src/lib/schema.ts`
- **Impact:** E-E-A-T expertise signal

### M6. Add more sameAs links to Organization schema
- **Why:** Only 2 links (Instagram + WhatsApp). Missing: Google Business Profile, Facebook, TripAdvisor, IKO directory.
- **File:** `src/lib/schema.ts` (Organization block)
- **Impact:** Authority signals

### M7. Add VideoObject schema for testimonial videos
- **File:** `src/lib/schema.ts`, `src/pages/index.astro`
- **Impact:** Video rich result eligibility

### M8. Add AggregateRating to LocalBusiness schema
- **Prerequisite:** Must use real, verifiable review data (Google reviews, TripAdvisor)
- **File:** `src/lib/schema.ts`
- **Impact:** Review stars in search results

### M9. Break programmatic page content into multiple paragraphs
- **Why:** Single `<p>` blocks hurt readability and AI passage extraction.
- **Files:** `src/data/pages.ts` (content fields), `src/pages/[slug].astro` (rendering)
- **Impact:** Readability, AI citation readiness +10

### M10. Expand Organization logo to ImageObject format
- **File:** `src/lib/schema.ts` (line ~16)
- **Action:** Change from plain URL to `{@type: ImageObject, url, width, height}`
- **Impact:** Schema compliance

### M11. Increase hamburger menu touch target to 48px
- **File:** `src/components/layout/Header.astro`
- **Impact:** Mobile usability, accessibility

### M12. Update 2 page titles from "2025" to "2026"
- **File:** `src/data/pages.ts`
- **Pages:** mejores-playas-kitesurf-barranquilla, temporada-kitesurf-colombia
- **Impact:** Freshness signal

### M13. Add HTML comparison tables to comparison pages
- **Why:** Comparison pages (kitesurf-vs-wing-foil, surf-vs-kitesurf, etc.) use prose instead of `<table>`. AI search extracts and cites tables.
- **Files:** `src/data/pages.ts` (6 comparison pages), `src/pages/[slug].astro`
- **Impact:** AI citation readiness, featured snippet eligibility

---

## Low — Backlog (Score impact: +2-3 pts)

### L1. Add cross-links from programmatic pages to relevant blog posts
- **File:** `src/pages/[slug].astro`
- **Impact:** Internal link equity to blog

### L2. Add CollectionPage schema to blog index
- **File:** `src/pages/blog/index.astro`

### L3. Remove `item` URL from last breadcrumb element
- **File:** `src/lib/schema.ts`

### L4. Add Google Maps facade pattern (static image + click-to-load)
- **File:** `src/components/home/Ubicacion.astro`
- **Impact:** -1 MB JS on scroll

### L5. Add analytics (Vercel Analytics or Plausible)
- **Why:** No CrUX data without real user monitoring. No visitor insights.
- **Impact:** Data collection for ongoing optimization

### L6. Expand blog posts to 1,500+ words with lists, tables, steps
- **Files:** `src/data/blogPosts.ts`
- **Impact:** Content depth, keyword coverage

### L7. Add first-person experience language throughout content
- **Why:** Current content reads impersonally. No "nosotros", "en nuestra experiencia" — flags as potentially AI-generated.
- **Files:** `src/data/pages.ts`, `src/data/blogPosts.ts`

### L8. Add IKO center registration link and instructor IDs
- **Why:** IKO certification is claimed but unverified. Link to IKO profile substantiates the claim.
- **Files:** About page, sport descriptions

### L9. Add cancellation/refund policy page
- **Why:** Currently only brief FAQ mention. Dedicated page builds trust.

### L10. Add student reviews/testimonials page
- **Why:** No social proof page exists. Reviews build trust + authority.

---

## Implementation Timeline

```
Week 1:  C1, C2, C3, C4, C5, H2, H4, H5, M12
Week 2:  H1, H3, H6, H7
Week 3:  M1, M2, M3, M4, M5, M9, M11
Week 4:  M6, M7, M8, M10, M13
Ongoing: L1-L10 as capacity allows
```

## Expected Score After Full Implementation

| Category | Current | Target |
|----------|---------|--------|
| Technical SEO | 88 | 95 |
| Content Quality | 72 | 88 |
| On-Page SEO | 80 | 90 |
| Schema | 75 | 92 |
| Performance | 65 | 90 |
| Images | 50 | 85 |
| AI Readiness | 58 | 80 |
| **Weighted Total** | **75** | **91** |
