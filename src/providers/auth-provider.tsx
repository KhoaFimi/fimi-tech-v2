'use client'

import { AuthContext } from '@/contexts/auth-context'
import { TokenPayload } from '@/types'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { FC, ReactNode, useEffect, useState } from 'react'

interface AuthProviderProps {
	accessToken:
		| {
				name: string
				value: string
		  }
		| undefined
	children: ReactNode
}

const AuthProvider: FC<AuthProviderProps> = ({ accessToken, children }) => {
	const router = useRouter()
	const [isAuth, setIsAuth] = useState<boolean>(false)
	const [user, setUser] = useState<Partial<TokenPayload>>({})

	useEffect(() => {
		if (!accessToken) {
			setIsAuth(false)
			router.push('/login')
			return
		}

		const decodes = jwtDecode<JwtPayload & TokenPayload>(accessToken.value)

		setIsAuth(true)
		setUser({
			sub: decodes.sub,
			fullname: decodes.fullname,
			managerCode: decodes.managerCode,
			publisherCode: decodes.publisherCode
		})

		router.push('/campaign')
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuth,
				setIsAuth
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
