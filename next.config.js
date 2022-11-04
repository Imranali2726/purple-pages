/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL_UAT: "http://purplepages.io/api/",
    BASE_URL_LOCAL: "http://localhost:8000/api/",
    BASE_UAT_SERVER: "http://purplepages.io/",
  },
};

module.exports = nextConfig;
