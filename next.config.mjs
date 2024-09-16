/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['knex'],
  experimental: {
    turbo: {},
    serverActions: { allowedOrigins: ['*'] },
  },
}

export default nextConfig
