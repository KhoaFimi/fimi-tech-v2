import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'

const AuthLayout: FC<PropsWithChildren> = async ({ children }) => {
	return (
		<div className='flex h-full w-full flex-col items-center justify-center pt-12'>
			<div className='flex w-fit items-center'>
				<div className='hidden h-full w-[360px] flex-col md:flex'>
					<Image
						src='/register.png'
						alt='register'
						width={1235}
						height={1376}
						className='w-[700px]'
					/>
				</div>
				<div className='h-full w-[420px]'>{children}</div>
			</div>
		</div>
	)
}

export default AuthLayout
