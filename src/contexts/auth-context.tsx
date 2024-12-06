'use client'

import { TokenPayload } from '@/types'
import { createContext, Dispatch, SetStateAction, use } from 'react'

export interface IAuthContext {
	isAuth: boolean
	user: Partial<TokenPayload>
	setIsAuth: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<IAuthContext>({
	isAuth: false,
	user: {},
	setIsAuth: () => {}
})

export const useAuthContext = () => use(AuthContext)
