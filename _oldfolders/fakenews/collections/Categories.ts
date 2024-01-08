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

export const Categories: CollectionConfig = {
  slug: 'categories',
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
  fields: [{ name: 'name', type: 'text', required: true, label: 'Name' }],
};
