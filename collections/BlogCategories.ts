import type { CollectionConfig } from 'payload'

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'description'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Category Slug',
      admin: {
        description: 'URL-friendly version of the category name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Category Description',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Category Color',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Purple', value: 'purple' },
        { label: 'Orange', value: 'orange' },
        { label: 'Red', value: 'red' },
        { label: 'Teal', value: 'teal' },
      ],
      defaultValue: 'blue',
    },
  ],
} 