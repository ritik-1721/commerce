/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static.nike.com", "images.unsplash.com", "localhost"],
  },
};

module.exports = nextConfig;
