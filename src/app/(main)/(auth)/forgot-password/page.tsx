import { Metadata } from 'next'

import ForgotPasswordForm from '@/app/(main)/(auth)/forgot-password/_components/forgot-password-form'

export const metadata = {
	title: 'Đăng nhập'
} satisfies Metadata

const ForgotPasswordPage = () => {
	return <ForgotPasswordForm />
}

export default ForgotPasswordPage
