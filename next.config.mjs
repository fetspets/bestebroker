/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.bol.com' },
      { protocol: 'https', hostname: 'media.bol.com' },
      { protocol: 'https', hostname: 'media.s-bol.com' },
    ],
  },
}

export default nextConfig
