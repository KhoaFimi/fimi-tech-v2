import { Judson } from 'next/font/google'
import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

type LeadFormWrapperProps = PropsWithChildren<{
	title: string
}>

const font = Judson({
	subsets: ['latin', 'vietnamese'],
	weight: ['400']
})

const LeadFormWrapper: FC<LeadFormWrapperProps> = ({ children }) => {
	return (
		<div className='relative mt-8'>
			<Image
				src='/sunlife-brand2.jpg'
				alt='brand2'
				width={1200}
				height={1200}
			/>

			<h2
				className={cn(
					font.className,
					'absolute left-10 top-12 z-50 text-[20px] leading-[100%] text-[#003946]'
				)}
			>
				Tài chính cho mình <br />
				Lạc quan do mình
			</h2>

			<div className='relative flex flex-col gap-4 px-2 pb-10 pt-6'>
				{/* <h3 className='bg-gradient-to-r from-secondary to-accent bg-clip-text text-xl font-bold uppercase leading-none tracking-tight text-transparent'>
					{title}
				</h3> */}
				{children}
			</div>
		</div>
	)
}

export default LeadFormWrapper
