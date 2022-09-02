/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL_UAT: "http://purpalpages.digicoms.net/api/",
    BASE_URL_LOCAL: "http://localhost:8001/api/",
  },
};

module.exports = nextConfig;
