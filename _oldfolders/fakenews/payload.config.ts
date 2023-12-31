import path from 'path';
import dotenv from 'dotenv';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { postgresAdapter } from '@payloadcms/db-postgres';

import { Users } from './collections/Users';
import { Categories } from './collections/Categories';
import { Articles } from './collections/Articles';
import { Images } from './collections/Images';

dotenv.config({
  path: path.resolve(__dirname, '.env'),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Categories, Articles, Images],
  routes: {
    admin: '/admin',
  },
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Fake News',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
