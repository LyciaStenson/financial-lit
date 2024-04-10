/** @type {import('next').NextConfig} */

const isProductive = process.env.NODE_ENV == 'production';

const nextConfig = {
  basePath: isProductive ? '/financial-lit' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;