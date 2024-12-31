import { redirect } from 'next/navigation'
import { FC } from 'react'
import { z } from 'zod'

import ResetPasswordForm from '@/app/(main)/(auth)/reset-password/_components/reset-password-form'

interface ResetPasswordPageProps {
	searchParams: SearchParams
}

const searchParamsSchema = z.object({
	token: z.string()
})

type SearchParams = Promise<z.infer<typeof searchParamsSchema>>

const ResetPasswordPage: FC<ResetPasswordPageProps> = async ({
	searchParams
}) => {
	const { token } = searchParamsSchema.parse(await searchParams)

	if (!token) return redirect('/login')

	return <ResetPasswordForm token={token} />
}

export default ResetPasswordPage
