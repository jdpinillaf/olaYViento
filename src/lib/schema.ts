import type { ProgrammaticPage } from '../data/pages';
import { getSportBySlug } from '../data/sports';
import { getLocationBySlug } from '../data/locations';

const SITE_URL = 'https://olayviento.com';
const PHONE = '+573150031693';
const WHATSAPP_URL = `https://wa.me/573150031693`;

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'Ola y Viento',
    description: 'Escuela de deportes acuáticos en Barranquilla, Colombia. Clases de surf, kitesurf, wing foil y windsurf.',
    url: SITE_URL,
    telephone: PHONE,
    image: `${SITE_URL}/images/og-default.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Playa de Puerto Mocho, Riomar',
      addressLocality: 'Puerto Colombia, Barranquilla',
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

export function buildCourseSchema(page: ProgrammaticPage) {
  const sport = getSportBySlug(page.sportSlug);
  const location = getLocationBySlug(page.locationSlug);
  if (!sport || !location) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: page.h1,
    description: page.intro,
    provider: {
      '@type': 'Organization',
      name: 'Ola y Viento',
      sameAs: SITE_URL,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      duration: sport.duration,
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
      priceCurrency: 'COP',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function buildFAQSchema(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
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
