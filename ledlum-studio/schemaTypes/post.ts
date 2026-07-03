// ledlum-studio/schemas/post.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'image', type: 'image' }),
    defineField({ name: 'midSectionTitle', type: 'string' }),
    defineField({ 
      name: 'paragraph', 
      type: 'array', 
      of: [{ type: 'string' }] 
    }),
    defineField({ name: 'midSectionImage', type: 'image' }),
    defineField({
      name: 'outcomeSections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'heading', type: 'string' },
          { name: 'text', type: 'text' }
        ]
      }]
    }),
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'isFeatured', type: 'boolean' }),
  ],
})