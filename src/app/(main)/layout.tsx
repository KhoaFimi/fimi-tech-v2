import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

import RegisterSuccessDialog from '@/app/(main)/(auth)/register/_components/success-dialog'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Navbar from '@/components/navbar'
import Policies from '@/components/policies'

const MainLayout: FC<PropsWithChildren> = async ({ children }) => {
	const cookieStore = await cookies()

	const accessToken = cookieStore.get('access-token')

	return (
		<>
			<Header>
				<Navbar />
			</Header>
			<main className='h-screen justify-center pt-8'>
				<div className='container mx-auto px-2'>{children}</div>
			</main>
			<Policies />
			<RegisterSuccessDialog />
			<Footer />
		</>
	)
}

export default MainLayout
