import { defineType, defineField } from 'sanity';

export const postSchema = defineType({
  name: 'post',
  title: 'Artículo del Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      description: 'Resumen corto para listado y meta description (máx. 200 caracteres)',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'sportSlug',
      title: 'Deporte relacionado',
      type: 'string',
      options: {
        list: [
          { title: 'Surf', value: 'surf' },
          { title: 'Kitesurf', value: 'kitesurf' },
          { title: 'Wing Foil', value: 'wing-foil' },
          { title: 'SUP', value: 'sup' },
          { title: 'Entrenamiento Funcional', value: 'entrenamiento-funcional' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  orderings: [
    {
      title: 'Fecha de publicación (desc)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', date: 'publishedAt' },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString('es-CO') : 'Sin fecha',
      };
    },
  },
});
