/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.bol.com' },
      { protocol: 'https', hostname: 'media.bol.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.bestebroker.be' }],
        destination: 'https://bestebroker.be/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
