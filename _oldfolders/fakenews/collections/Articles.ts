import { User } from '../payload-types';
import { Access, CollectionConfig } from 'payload/types';

const isAdmin =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined;

    if (!user) return false;
    if (user.role === 'admin') return true;

    return {
      user: {
        equals: req.user.id,
      },
    };
  };

export const Articles: CollectionConfig = {
  slug: 'articles',
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id };
      },
    ],
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.referer;

      if (!req.user) {
        return true;
      }

      return await isAdmin()({ req });
    },
    delete: isAdmin(),
    update: isAdmin(),
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Title' },
    { name: 'description', type: 'text', required: true, label: 'Description' },
    { name: 'content', type: 'richText', required: true, label: 'Content' },
    {
      name: 'images',
      type: 'array',
      label: 'Article images',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'images',
          required: true,
        },
      ],
    },
   /*  {
      name: 'category',
      type: 'select',
      options: async () => {
        // Itt lehetőséged van egy API hívást tenni a rendelkezésre álló kategóriák lekérésére
        // Például Payload API segítségével
        const response = await fetch('/api/categories');
        const categories = await response.json();

        // Az API válaszának megfelelően alakítsd át az objektumokat az 'Option' típusra
        return categories.map((category: any) => ({
          label: category.name,
          value: category.id,
        }));
      },
      label: 'Category',
      required: true,
    }, */

    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Author',
    },
    {
      name: 'published',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      label: 'Published',
    },
  ],
};
