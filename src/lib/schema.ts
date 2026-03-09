import type { ProgrammaticPage } from '../data/pages';
import { getSportBySlug } from '../data/sports';
import { getLocationBySlug } from '../data/locations';

const SITE_URL = 'https://www.olayviento.co';
const PHONE = '+573150031693';
const WHATSAPP_URL = `https://wa.me/573150031693`;

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Ola y Viento',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-horizontal.png`,
    telephone: PHONE,
    sameAs: [
      'https://www.instagram.com/escuela_olayviento/',
      WHATSAPP_URL,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE,
      contactType: 'customer service',
      availableLanguage: 'Spanish',
    },
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ola y Viento',
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'es',
  };
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Ola y Viento',
    description: 'Escuela de deportes náuticos en Barranquilla, Colombia. Clases de surf, kitesurf, wing foil y windsurf.',
    url: SITE_URL,
    telephone: PHONE,
    image: `${SITE_URL}/images/og-default.jpg`,
    parentOrganization: {
      '@id': `${SITE_URL}/#organization`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle 2 No. 22-14, Pradomar',
      addressLocality: 'Puerto Colombia',
      addressRegion: 'Atlántico',
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 11.0128,
      longitude: -74.8546,
    },
    sameAs: [
      'https://www.instagram.com/escuela_olayviento/',
      WHATSAPP_URL,
    ],
    priceRange: '$$',
  };
}

// Map human-readable durations to ISO 8601 format
function toIsoDuration(duration: string): string {
  const map: Record<string, string> = {
    '1 hora': 'PT1H',
    '1-8 horas': 'PT2H',
    '2-8 horas': 'PT3H',
  };
  return map[duration] || 'PT1H';
}

// Extract numeric price from formatted price string (e.g. "Desde $44.400 (clase matutina)" → 44400)
function extractNumericPrice(price: string): number | null {
  const match = price.replace(/\./g, '').match(/\$?([\d,]+)/);
  return match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
}

export function buildCourseSchema(page: ProgrammaticPage) {
  const sport = getSportBySlug(page.sportSlug);
  const location = getLocationBySlug(page.locationSlug);
  if (!sport || !location) return null;

  const numericPrice = extractNumericPrice(sport.price);

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: page.h1,
    description: page.intro,
    inLanguage: 'es',
    provider: {
      '@type': 'Organization',
      name: 'Ola y Viento',
      sameAs: SITE_URL,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      duration: toIsoDuration(sport.duration),
      location: {
        '@type': 'Place',
        name: location.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: location.name,
          addressRegion: location.department,
          addressCountry: 'CO',
        },
      },
    },
    offers: {
      '@type': 'Offer',
      category: 'Clase de ' + sport.name,
      ...(numericPrice ? { price: numericPrice.toString() } : {}),
      priceCurrency: 'COP',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/${page.slug}`,
    },
  };
}

// FAQPage schema removed — Google restricted FAQ rich results
// to government and healthcare sites only since August 2023.

export function buildBlogPostSchema(post: { title: string; excerpt?: string; mainImage?: string | null; publishedAt: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.title,
    ...(post.mainImage ? { image: post.mainImage } : {}),
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'Ola y Viento' },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
