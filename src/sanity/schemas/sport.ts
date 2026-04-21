import { defineType, defineField } from 'sanity';

export const sportSchema = defineType({
  name: 'sport',
  title: 'Deporte',
  type: 'document',
  preview: {
    select: { slug: 'slug.current', price: 'price', media: 'image' },
    prepare({ slug, price, media }) {
      const names: Record<string, string> = {
        'surf': 'Surf',
        'kitesurf': 'Kitesurf',
        'wing-foil': 'Wing Foil',
        'sup': 'SUP (Paddle Board)',
        'entrenamiento-funcional': 'Entrenamiento Funcional',
      };
      return { title: names[slug] || slug, subtitle: price, media };
    },
  },
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Identificador único (debe coincidir con el slug en código: surf, kitesurf, wing-foil, sup, entrenamiento-funcional)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'string',
      description: 'Ej: Desde $44.400 (clase matutina)',
    }),
    defineField({
      name: 'duration',
      title: 'Duración',
      type: 'string',
      description: 'Ej: 1-8 horas',
    }),
    defineField({
      name: 'includes',
      title: 'Incluye',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de ítems incluidos en la clase',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
