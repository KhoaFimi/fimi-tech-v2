import { FC, PropsWithChildren } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'

const ReportLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<main className='flex w-full items-center justify-center pt-8'>
				<div className='container h-screen px-4 py-2 md:px-28'>{children}</div>
			</main>
			<Footer />
		</>
	)
}

export default ReportLayout
