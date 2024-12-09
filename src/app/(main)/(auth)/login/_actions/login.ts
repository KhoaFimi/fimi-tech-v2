'use server'

import argon2 from 'argon2'
import jwt, { Secret } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import {
	LoginSchema,
	loginSchema
} from '@/app/(main)/(auth)/login/_schemas/login.schema'
import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'

export const login = async (values: LoginSchema) => {
	const validatedValues = loginSchema.safeParse(values)

	const coockieStore = await cookies()

	if (!validatedValues.success)
		return {
			error: validatedValues.error.message
		}

	const body = validatedValues.data

	const sheets = await getSheets()

	const {
		data: { values: users }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: config.SHEET_USER_ID,
		range: config.SHEET_USER_NAME
	})

	if (!users)
		return {
			error: 'Máy chủ đang gián đoạn, vui lòng thử lại sau'
		}

	const existingUserIdx = users.findIndex(
		row => row[5] === body.phoneOrEmail || row[6] === body.phoneOrEmail
	)

	if (existingUserIdx === -1)
		return {
			error: 'Thông tin đăng nhập không chính xác'
		}

	const existingUser = users[existingUserIdx]

	const hashedPassword = existingUser[22]

	const verifyPassword = await argon2.verify(hashedPassword, body.password)

	if (!verifyPassword)
		return {
			error: 'Thông tin đăng nhập chưa chính xác'
		}

	const accessToken = jwt.sign(
		{
			sub: existingUser[1],
			publisherCode: existingUser[2],
			managerCode: existingUser[3],
			fullname: existingUser[4]
		},
		config.ACCESS_TOKEN_SECRET as Secret
	)

	coockieStore.set('access-token', accessToken, {
		httpOnly: true,
		secure: true,
		maxAge: 60 * 60 * 24 * 30,
		sameSite: 'none',
		path: '/'
	})

	redirect('/campaign')
}
