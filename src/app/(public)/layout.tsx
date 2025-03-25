import { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'

import MobileHeader from '@/components/mobile-header'
import Policies from '@/components/policies'

export const metadata = {
	title: 'Credit'
} satisfies Metadata

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<main className='flex h-screen items-center justify-center'>
				<div className='relative h-full w-[400px] overflow-y-auto rounded-xl sm:border sm:border-foreground/20 sm:shadow-md'>
					<MobileHeader />
					<div>{children}</div>
					{/* <MobileFooter /> */}
				</div>
			</main>
			<Policies />
		</>
	)
}

export default PublicLayout
