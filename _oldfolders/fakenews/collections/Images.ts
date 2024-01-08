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

export const Images: CollectionConfig = {
  slug: 'images',
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id };
      },
    ],
  },
  // if not admin, only allow access to images that belong to the user
  access: {
    read: async ({ req }) => {
      const referer = req.headers.referer;

      if (!req.user || !referer?.includes('sell')) {
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
  upload: {
    staticURL: '/images',
    staticDir: 'images',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'featured',
        width: 1200,
        height: 628,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'User',
    },
   
  ],
};
