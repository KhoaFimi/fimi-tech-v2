'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

const AuthLayoutWrapper: FC<PropsWithChildren> = ({ children }) => {
	const pathname = usePathname()

	const paths = ['/forgot-password', '/reset-password']

	return (
		<div className='flex h-full w-full flex-col items-center justify-center pt-16 lg:h-svh lg:pt-8'>
			<div className='flex w-fit items-center'>
				{!paths.includes(pathname) ? (
					<div className='hidden h-full w-[360px] items-center justify-center md:flex'>
						<Image
							src='/register.png'
							alt='register'
							width={1235}
							height={1376}
							className='w-[700px]'
						/>
					</div>
				) : null}
				<div className='h-full w-[420px]'>{children}</div>
			</div>
		</div>
	)
}

export default AuthLayoutWrapper
