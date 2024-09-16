/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['knex'],
  experimental: {
    turbo: {},
    serverActions: { allowedOrigins: ['localhost:3000', '*.github.dev'] },
  },
}

export default nextConfig
