export interface Location {
  slug: string;
  name: string;
  department: string;
  country: string;
  coordinates: { lat: number; lng: number };
  description: string;
}

export const locations: Location[] = [
  {
    slug: 'barranquilla',
    name: 'Barranquilla',
    department: 'Atlántico',
    country: 'Colombia',
    coordinates: { lat: 11.0041, lng: -74.8070 },
    description: 'Capital del Atlántico, ubicada en la costa Caribe colombiana con acceso directo al mar y vientos alisios ideales para deportes náuticos.',
  },
  {
    slug: 'puerto-colombia',
    name: 'Puerto Colombia',
    department: 'Atlántico',
    country: 'Colombia',
    coordinates: { lat: 10.9878, lng: -75.0183 },
    description: 'Municipio costero a 15 minutos de Barranquilla, famoso por sus playas y condiciones ideales para surf.',
  },
  {
    slug: 'colombia-caribe',
    name: 'Caribe Colombiano',
    department: 'Costa Caribe',
    country: 'Colombia',
    coordinates: { lat: 10.96, lng: -74.80 },
    description: 'La costa Caribe de Colombia ofrece más de 1,600 km de litoral con vientos constantes, aguas cálidas y spots de clase mundial para deportes náuticos.',
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find(l => l.slug === slug);
}
