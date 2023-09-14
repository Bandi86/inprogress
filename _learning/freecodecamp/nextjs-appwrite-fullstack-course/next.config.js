/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    reactStrictMode: true,
    env: {
      MONGO_URI: 'mongodb+srv://susutechno:sARJxldRlX1aQvfv@cluster0.ivay4xh.mongodb.net/app?retryWrites=true&w=majority'
    },
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
};

module.exports = nextConfig;
