import { defineType, defineField } from 'sanity';

export const galleryItemSchema = defineType({
  name: 'galleryItem',
  title: 'Galería',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Identificador único (ej: surf, kitesurf, atardecer)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Nombre que aparece sobre la imagen',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Una o más imágenes. Si hay varias, se muestran como carrusel automático.',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición (menor = primero)',
    }),
  ],
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
