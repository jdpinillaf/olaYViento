import { defineType, defineField } from 'sanity';

export const sportSchema = defineType({
  name: 'sport',
  title: 'Deporte',
  type: 'document',
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
