import { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'

import MobileFooter from '@/app/(public)/[inviteCode]/_components/mobile-footer'
import MobileHeader from '@/app/(public)/[inviteCode]/_components/mobile-header'
import Policies from '@/components/policies'

export const metadata = {
	title: 'Credit'
} satisfies Metadata

const CreditLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<main className='flex h-screen items-center justify-center'>
				<div className='h-full w-full overflow-y-auto sm:w-[400px] sm:rounded-xl sm:border sm:border-foreground/20 sm:shadow-md'>
					<MobileHeader />
					<div className='h-screen'>{children}</div>
					<MobileFooter />
				</div>
			</main>
			<Policies />
		</>
	)
}

export default CreditLayout
