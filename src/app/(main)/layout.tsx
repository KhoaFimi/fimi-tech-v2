import { FC, PropsWithChildren } from 'react'

import RegisterSuccessDialog from '@/app/(main)/(auth)/register/_components/success-dialog'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Navbar from '@/components/navbar'
import Policies from '@/components/policies'
import { Toaster } from '@/components/ui/sonner'

const MainLayout: FC<PropsWithChildren> = async ({ children }) => {
	return (
		<div className='flex h-screen flex-col gap-y-2'>
			<Header>
				<Navbar />
			</Header>
			<main className='flex-1 justify-center pt-8'>
				<div className='mx-auto'>{children}</div>
			</main>
			<Policies />
			<Toaster />
			<RegisterSuccessDialog />
			<Footer />
		</div>
	)
}

export default MainLayout
