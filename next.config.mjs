/** @type {import('next').NextConfig} */

//const isProductive = process.env.NODE_ENV == 'production';

const nextConfig = {
  //basePath: isProductive ? '/financial-lit' : '',
  output: 'export',
  //assetPrefix: process.env.assetPrefix,
  //basePath: process.env.basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;