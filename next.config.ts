import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	serverExternalPackages: ['argon2'],
	async redirects() {
		return [
			{
				source: '/',
				destination: '/campaign',
				permanent: true
			}
		]
	}
}

export default nextConfig
