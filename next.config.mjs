/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['knex'],
  experimental: {
    turbo: {
      treeShaking: true,
    },
  },
}

export default nextConfig
