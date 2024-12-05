import { FC, PropsWithChildren } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'

const ReportLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<main className='w-full pt-8'>
				<div className='container mx-auto h-screen px-2 py-2 md:px-28'>
					{children}
				</div>
			</main>
			<Footer />
		</>
	)
}

export default ReportLayout
