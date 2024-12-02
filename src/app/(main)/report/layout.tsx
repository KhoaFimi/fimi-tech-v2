import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'

const ReportLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header>
				<div className='flex items-center gap-4'>
					<Button
						asChild
						variant='link'
						className='underline-offset-3 text-base font-semibold tracking-tight text-white decoration-[1.5px]'
					>
						<Link href='https://partner.fimi.tech/chien-dich'>Chiến dịch</Link>
					</Button>
					<Button
						asChild
						variant='link'
						className='underline-offset-3 text-base font-semibold tracking-tight text-white decoration-[1.5px]'
					>
						<Link href='/register'>Đăng ký MGT</Link>
					</Button>
					<Button
						asChild
						variant='link'
						className='underline-offset-3 text-base font-semibold tracking-tight text-white decoration-[1.5px]'
					>
						<Link href='https://partner.fimi.tech/huong-dan'>Hướng dẫn</Link>
					</Button>
				</div>
			</Header>
			<main className='flex w-full items-center justify-center pt-8'>
				<div className='container h-screen px-4 py-2 md:px-28'>
					<h2 className='my-1 bg-gradient-to-tr from-primary from-30% to-secondary bg-clip-text text-2xl font-bold uppercase tracking-tighter text-transparent'>
						Báo cáo
					</h2>
					{children}
				</div>
			</main>
			<Footer />
		</>
	)
}

export default ReportLayout
