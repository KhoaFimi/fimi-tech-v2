import { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'

import RegisterSuccessDialog from '@/app/(main)/register/_components/success-dialog'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Policies from '@/components/policies'

export const metadata = {
	title: 'Register'
} satisfies Metadata

const RegisterLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<main className='justify-center pt-8'>
				<div className='container mx-auto px-2'>{children}</div>
			</main>
			<Policies />
			<RegisterSuccessDialog />
			<Footer />
		</>
	)
}

export default RegisterLayout
