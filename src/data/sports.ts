export interface Sport {
  slug: string;
  name: string;
  icon: string;
  image: string;
  shortDescription: string;
  duration: string;
  price: string;
  includes: string[];
  heroDescription: string;
}

export const sports: Sport[] = [
  {
    slug: 'surf',
    name: 'Surf',
    icon: '🏄',
    image: 'https://www.federacioncolombianadesurf.org/wp-content/uploads/2020/04/CS8T8277-scaled.jpg',
    shortDescription: 'Domina las olas del Caribe colombiano con instructores certificados.',
    duration: '1-8 horas',
    price: 'Desde $44.400 (clase matutina)',
    includes: ['Tabla de surf', 'Instructor certificado', 'Equipos incluidos'],
    heroDescription: 'El surf en Barranquilla ofrece olas consistentes ideales para principiantes y surfistas intermedios. Las playas de Puerto Colombia y la costa atlántica brindan condiciones perfectas para aprender durante todo el año.',
  },
  {
    slug: 'kitesurf',
    name: 'Kitesurf',
    icon: '🪁',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/fd/1d/31/waterstart-privat-kitesurf.jpg?w=1200&h=-1&s=1',
    shortDescription: 'Vuela sobre el agua con el viento del Caribe. Clases para todos los niveles.',
    duration: '2-8 horas',
    price: 'Desde $720.000 (2h privado)',
    includes: ['Instructor IKO certificado', 'Equipo de kitesurf completo', 'Equipo de seguridad', 'Bote de asistencia y rescate', 'Certificado IKO'],
    heroDescription: 'Barranquilla es uno de los mejores destinos de kitesurf en Colombia gracias a los vientos alisios del noreste que soplan de diciembre a abril con 20-25 nudos constantes. Nuestro spot principal es Puerto Mocho (Puerto Colombia, a 15 min), con aguas planas y viento constante ideal para todos los niveles.',
  },
  {
    slug: 'wing-foil',
    name: 'Wing Foil',
    icon: '🦅',
    image: 'https://algarvewatersport.com/wp-content/uploads/2022/04/Wingfoiling_lagos.jpg',
    shortDescription: 'El deporte náutico del momento. Aprende a volar sobre el agua con un wing.',
    duration: '1 hora',
    price: 'Desde $280.000/hora',
    includes: ['Wing', 'Tabla con foil', 'Chaleco salvavidas', 'Instructor certificado'],
    heroDescription: 'El wing foil es el deporte náutico de mayor crecimiento en el mundo y Barranquilla tiene las condiciones ideales para aprenderlo. Nuestro spot es Puerto Mocho (Puerto Colombia): viento constante, aguas planas y cálidas. Pocos practicantes hacen de esta la oportunidad perfecta para ser pionero.',
  },
  {
    slug: 'sup',
    name: 'Paddle Surf',
    icon: '🚣',
    image: 'https://hoenalu.com/sites/default/files/blog/stand-up-paddle/stand-up-paddle-olas-naish-alta.jpg',
    shortDescription: 'Stand Up Paddle para relajarte o entrenar en el mar Caribe.',
    duration: '1 hora',
    price: 'Desde $60.000 (clase matutina)',
    includes: ['Tabla SUP', 'Remo', 'Leash', 'Chaleco salvavidas', 'Instructor'],
    heroDescription: 'El Stand Up Paddle es perfecto para disfrutar del mar Caribe a tu ritmo. Ideal para todas las edades y niveles de condición física, combina ejercicio completo con la tranquilidad del océano.',
  },
  {
    slug: 'entrenamiento-funcional',
    name: 'Entrenamiento Funcional',
    icon: '💪',
    image: 'https://www.artsurfcamp.com/wp-content/uploads/2017/02/mick-leo-training-joli-QZ10005-700x467.jpg',
    shortDescription: 'Programas de acondicionamiento físico orientados a deportes náuticos.',
    duration: '1 hora',
    price: 'Desde $50.000 COP',
    includes: ['Equipamiento completo', 'Entrenador personal', 'Plan personalizado'],
    heroDescription: 'Nuestros programas de entrenamiento funcional están diseñados para mejorar tu rendimiento en deportes náuticos. Fortalece core, equilibrio y resistencia con rutinas específicas para surfistas y riders.',
  },
];

export function getSportBySlug(slug: string): Sport | undefined {
  return sports.find(s => s.slug === slug);
}
