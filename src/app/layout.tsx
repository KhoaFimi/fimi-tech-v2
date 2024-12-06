import '@/app/globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { FC, PropsWithChildren } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { QueryProvider } from '@/providers/query.provider'
import ThemeProvider from '@/providers/theme.provider'

import ogImage from '../../public/og.jpg'
import AuthLayout from '@/app/(main)/(auth)/layout'
import AuthProvider from '@/providers/auth-provider'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
	title: {
		default: 'FIMI',
		template: 'FIMI | %s'
	},
	description: 'Công Ty TNHH Công Nghệ FIMI - Giải Pháp Bán Hàng Đa Kênh',
	metadataBase: new URL('https://aff.fimi.tech'),
	openGraph: {
		title: 'Đăng ký mã giới thiệu',
		description: 'FIMI - Giải pháp bán hàng đa kênh',
		url: 'https://fimi-register.vercel.app',
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
	const cookieStore = await cookies()

	const accessToken = cookieStore.get('access-token')

	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body className={cn('antialiased', font.className)}>
				<ThemeProvider>
					<AuthProvider accessToken={accessToken}>
						<QueryProvider>
							{children}
							<ReactQueryDevtools initialIsOpen={false} />
						</QueryProvider>
						<Toaster />
						<GoogleAnalytics gaId='G-9K0WHTB0EB' />
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
