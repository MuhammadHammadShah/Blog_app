/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.unsplash.com", "thrangra.sirv.com"],
    dangerouslyAllowSVG: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
