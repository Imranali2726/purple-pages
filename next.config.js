/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL_UAT: "http://153.92.210.69/index.php/api/",
    BASE_URL_LOCAL: "http://localhost:8000/api/",
    BASE_UAT_SERVER: "http://153.92.210.69/index.php/",
  },
};

module.exports = nextConfig;
