import { CollectionConfig } from 'payload/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Tool Name',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Analysis', value: 'Analysis' },
        { label: 'Content', value: 'Content' },
        { label: 'Monitoring', value: 'Monitoring' },
        { label: 'Research', value: 'Research' },
        { label: 'Optimization', value: 'Optimization' },
        { label: 'Technical', value: 'Technical' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Development', value: 'development' },
        { label: 'Coming Soon', value: 'coming-soon' },
      ],
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      label: 'Icon Name (Lucide React)',
      admin: {
        description: 'Enter the icon name from lucide-react (e.g., "Search", "FileText")',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      defaultValue: 'from-blue-500 to-blue-600',
      label: 'Color Gradient',
      admin: {
        description: 'Tailwind CSS gradient classes (e.g., "from-blue-500 to-blue-600")',
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Tool Link',
      admin: {
        description: 'Internal link to the tool (e.g., "/tools/keyword-analyzer")',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Detailed Content',
      editor: lexicalEditor(),
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'SEO Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'SEO Description',
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'SEO Keywords',
        },
      ],
    },
  ],
} 