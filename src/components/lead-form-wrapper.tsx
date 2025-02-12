import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'

type LeadFormWrapperProps = PropsWithChildren<{
	title: string
}>

const LeadFormWrapper: FC<LeadFormWrapperProps> = ({ title, children }) => {
	return (
		<div className='mt-8 px-2'>
			<div className='relative flex flex-col gap-4 pb-10 pt-6'>
				<Image
					src='/fill.png'
					alt='fill'
					width={6642}
					height={8802}
					className='absolute right-4 top-5 z-40 w-20'
				/>
				<h3 className='bg-gradient-to-r from-secondary to-accent bg-clip-text text-xl font-bold uppercase leading-none tracking-tight text-transparent'>
					{title}
				</h3>
				{children}
			</div>
		</div>
	)
}

export default LeadFormWrapper
