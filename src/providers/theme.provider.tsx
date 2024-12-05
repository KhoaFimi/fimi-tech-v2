'use client'

import {
	type ThemeProviderProps,
	ThemeProvider as NextThemeProvider
} from 'next-themes'
import { FC } from 'react'

const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
	return (
		<NextThemeProvider
			attribute='class'
			defaultTheme='light'
			disableTransitionOnChange
			enableSystem
			{...props}
		>
			{children}
		</NextThemeProvider>
	)
}

export default ThemeProvider
