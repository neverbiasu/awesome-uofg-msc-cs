import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  turbo: {
    resolveAlias: {
      '@': './src'
    }
  },
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  images: {
    formats: ['image/webp', 'image/avif']
  }
};

export default withMDX(config);
