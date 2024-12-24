import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'

import { decryptToken } from '@/lib/decrypt-token'

export const verifySession = cache(async () => {
	const cookieStore = await cookies()

	const accessToken = cookieStore.get('access-token')?.value

	if (!accessToken)
		return {
			isAuth: false,
			userId: '',
			publisherCode: '',
			managerCode: '',
			fullname: '',
			role: 'user'
		}

	const { sub, publisherCode, managerCode, fullname, role } =
		decryptToken(accessToken)

	return {
		isAuth: true,
		userId: sub,
		publisherCode,
		managerCode,
		fullname,
		role
	}
})
