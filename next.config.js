/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: "http://purpalpages.digicoms.net/api/",
  },
};

module.exports = nextConfig;
