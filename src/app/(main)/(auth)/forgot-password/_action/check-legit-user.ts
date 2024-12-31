'use server'

import { randomUUID as uuidV4 } from 'crypto'
import { redirect } from 'next/navigation'

import {
	ForgotPasswordSchema,
	forgotPasswordSchema
} from '@/app/(main)/(auth)/forgot-password/_schemas/forgot-password-schema'
import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'

export const checkLegitUser = async (values: ForgotPasswordSchema) => {
	const validatedData = forgotPasswordSchema.safeParse(values)

	if (!validatedData.success)
		return {
			error: validatedData.error.message
		}

	const { email } = validatedData.data

	const sheets = await getSheets()

	const {
		data: { values: users }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: config.SHEET_USER_ID,
		range: config.SHEET_USER_NAME
	})

	if (!users)
		return {
			error: 'Máy chủ đang gián đoạn'
		}

	const existringUserIdx = users.findIndex(row => row[6] === email)

	if (existringUserIdx === -1)
		return {
			error: 'Email không chính xác'
		}

	const existingUser = users[existringUserIdx]

	const token = uuidV4()

	await sheets.spreadsheets.values.append({
		spreadsheetId: config.SHEET_USER_ID,
		range: config.SHEET_TOKEN_NAME,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [[token, existingUser[6]]]
		}
	})

	redirect(`/reset-password?token=${token}`)
}
