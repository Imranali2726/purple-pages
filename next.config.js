/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  env: {
    BASE_URL_UAT: "https://purplepages.io/api/",
    BASE_URL_LOCAL: "http://localhost:8000/api/",
    BASE_UAT_SERVER: "https://purplepages.io/",
    BASE_LOCAL_SERVER: "http://localhost:8000/",
  },
};

module.exports = nextConfig;
