import '@/app/globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { FC, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'
import { QueryProvider } from '@/providers/query.provider'
import ThemeProvider from '@/providers/theme.provider'

import ogImage from '../../public/og.jpg'

export const metadata: Metadata = {
	title: {
		default: 'FIMI',
		template: 'FIMI | %s'
	},
	description: 'Công Ty TNHH Công Nghệ FIMI - Giải Pháp Bán Hàng Đa Kênh',
	metadataBase: new URL('https://aff.fimi.tech'),
	openGraph: {
		title: 'Công Ty TNHH Công Nghệ FIMI - Giải Pháp Bán Hàng Đa Kênh',
		description: 'FIMI - Giải pháp bán hàng đa kênh',
		url: 'https://aff.fimi.tech',
		siteName: 'FIMI',
		images: [
			{
				url: ogImage.src,
				width: ogImage.width,
				height: ogImage.height
			}
		]
	}
}

const font = Montserrat({
	subsets: ['vietnamese', 'latin']
})

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body className={cn('antialiased', font.className)}>
				<ThemeProvider>
					<QueryProvider>
						{children}
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryProvider>
					<GoogleAnalytics gaId='G-9K0WHTB0EB' />
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
