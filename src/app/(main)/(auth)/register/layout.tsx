import { Metadata } from 'next'
import React, { FC, PropsWithChildren } from 'react'

export const metadata = {
	title: 'Đăng ký'
} satisfies Metadata

const RegisterLayout: FC<PropsWithChildren> = ({ children }) => {
	return <>{children}</>
}

export default RegisterLayout
