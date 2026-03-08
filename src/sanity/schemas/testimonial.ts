import { defineType, defineField } from 'sanity';

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del alumno',
      type: 'string',
      description: 'Nombre que aparece debajo del video',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Descripción corta',
      type: 'string',
      description: 'Ej: "Alumno de kitesurf" o "Primera clase de surf"',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Video del testimonio (MP4 recomendado)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen que se muestra antes de reproducir el video',
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
