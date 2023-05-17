const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'images.unsplash.com',
      'woo3145-community-s3.s3.us-east-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
