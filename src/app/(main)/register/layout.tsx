import { FC, PropsWithChildren } from 'react'

import RegisterSuccessDialog from '@/app/(main)/register/_components/success-dialog'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Policies from '@/components/policies'

const RegisterLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<main className='flex w-full items-center justify-center pt-8'>
				<div className='container px-4'>{children}</div>
			</main>
			<Policies />
			<RegisterSuccessDialog />
			<Footer />
		</>
	)
}

export default RegisterLayout
