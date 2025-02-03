'use server'

import argon2 from 'argon2'
import { redirect } from 'next/navigation'

import {
	ResetPasswordSchema,
	resetPasswordSchema
} from '@/app/(main)/(auth)/reset-password/_schemas/reset-password-schema'
import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'

export const resetPassword = async (
	token: string,
	values: ResetPasswordSchema
) => {
	const sheets = await getSheets()

	const validatedData = resetPasswordSchema.safeParse(values)

	if (!validatedData.success)
		return {
			error: validatedData.error.message
		}

	const {
		data: { values: users }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: config.SHEET_USER_ID,
		range: config.SHEET_USER_NAME
	})

	const {
		data: { values: tokens }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: config.SHEET_USER_ID,
		range: config.SHEET_TOKEN_NAME
	})

	if (!users || !tokens)
		return {
			error: 'Hệ thống đang gián đoạn'
		}

	const existingTokenIdx = tokens.findIndex(row => row[0] === token)

	if (existingTokenIdx === -1)
		return {
			error: 'Thay đổi mật khẩu không thành công'
		}

	const existingToken = tokens[existingTokenIdx]

	const existingUserIdx = users.findIndex(row => row[6] === existingToken[1])

	if (existingUserIdx === -1)
		return {
			error: 'Thay đổi mật khẩu không thành công'
		}

	const hashedPassword = await argon2.hash(validatedData.data.password)

	await sheets.spreadsheets.values.update({
		spreadsheetId: config.SHEET_USER_ID,
		valueInputOption: 'RAW',
		range: `${config.SHEET_USER_NAME}!W${existingUserIdx + 1}`,
		requestBody: {
			values: [[hashedPassword]]
		}
	})

	await sheets.spreadsheets.values.batchUpdate({
		spreadsheetId: config.SHEET_USER_ID,
		requestBody: {
			valueInputOption: 'RAW',
			data: [
				{
					range: `${config.SHEET_TOKEN_NAME}!A${existingTokenIdx + 1}`,
					values: [['']]
				},
				{
					range: `${config.SHEET_TOKEN_NAME}!B${existingTokenIdx + 1}`,
					values: [['']]
				}
			]
		}
	})

	redirect('/login')
}
