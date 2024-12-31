import { FC, PropsWithChildren } from 'react'

import AuthLayoutWrapper from '@/app/(main)/(auth)/_components/auth-layout-wrapper'

const AuthLayout: FC<PropsWithChildren> = async ({ children }) => {
	return (
		<AuthLayoutWrapper>{children}</AuthLayoutWrapper>
		// <div className='flex h-full w-full flex-col items-center justify-center pt-16 lg:h-svh lg:pt-8'>
		// 	<div className='flex w-fit items-center'>
		// 		<div className='hidden h-full w-[360px] items-center justify-center md:flex'>
		// 			<Image
		// 				src='/register.png'
		// 				alt='register'
		// 				width={1235}
		// 				height={1376}
		// 				className='w-[700px]'
		// 			/>
		// 		</div>
		// 		<div className='h-full w-[420px]'>{children}</div>
		// 	</div>
		// </div>
	)
}

export default AuthLayout
