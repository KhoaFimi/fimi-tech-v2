import { FC, PropsWithChildren } from 'react'

import RegisterSuccessDialog from '@/app/(main)/(auth)/register/_components/success-dialog'
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
			<main className='flex-1 justify-center pb-24 pt-8'>
				<div className='mx-auto'>{children}</div>
			</main>
			<Policies />
			<Toaster />
			<RegisterSuccessDialog />
			{/* <Footer className='hidden lg:block' /> */}
			<div className='w-full bg-background px-2 py-2 text-right'>
				<p className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-[8px] font-bold text-transparent'>
					Copyright &#169; FIMI Tech Co., Ltd, all right reserved.
				</p>
			</div>
		</div>
	)
}

export default MainLayout
