import { Metadata } from 'next'
import React from 'react'

import LoginForm from '@/app/(main)/(auth)/login/_components/login-form'

export const metadata = {
	title: 'Đăng nhập'
} satisfies Metadata

const LoginPage = () => {
	return <LoginForm />
}

export default LoginPage
