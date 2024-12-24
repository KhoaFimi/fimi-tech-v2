import jwt, { JwtPayload } from 'jsonwebtoken'

import { config } from '@/lib/config'
import { TokenPayload } from '@/types'

export const decryptToken = (accessToken: string) => {
	const { sub, publisherCode, managerCode, fullname, role } = jwt.verify(
		accessToken,
		config.ACCESS_TOKEN_SECRET
	) as JwtPayload & TokenPayload

	return {
		sub,
		publisherCode,
		managerCode,
		fullname,
		role
	}
}
