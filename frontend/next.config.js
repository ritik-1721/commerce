/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static.nike.com", "images.unsplash.com", "localhost","assets.myntassets.com","via.placeholder.com"],
  },
};

module.exports = nextConfig;
