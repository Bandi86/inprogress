/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lira.erbacdn.net',
            pathname: '**',
          },
        ],
      },

}

module.exports = nextConfig
