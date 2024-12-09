'use server'

import argon2 from 'argon2'

import {
	RegisterStep4Schema,
	registerStep4Schema
} from '@/app/(main)/(auth)/register/_schemas/register.schema'
import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'

export const registrerStep4 = async (
	values: RegisterStep4Schema,
	id: string | undefined
) => {
	if (!id)
		return {
			error: 'Id chưa chính xác'
		}

	const validatedValues = registerStep4Schema.safeParse(values)

	if (!validatedValues.success)
		return {
			error: validatedValues.error.message
		}

	const body = validatedValues.data

	const sheets = await getSheets()

	const {
		data: { values: data }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: config.SHEET_USER_ID,
		range: config.SHEET_USER_NAME
	})

	if (!data)
		return {
			error: 'Hệ thống đang gián đoạn'
		}

	const rangToUpdate = data.findIndex(row => row[1] === id)

	const hashedPassword = await argon2.hash(body.password)

	await sheets.spreadsheets.values.update({
		spreadsheetId: config.SHEET_USER_ID,
		valueInputOption: 'RAW',
		range: `${config.SHEET_USER_NAME}!W${rangToUpdate + 1}`,
		requestBody: {
			values: [[hashedPassword]]
		}
	})

	const existingUser = data[rangToUpdate]

	return {
		data: {
			code: existingUser[2],
			fullname: existingUser[4],
			email: existingUser[6],
			phone: existingUser[5]
		}
	}
}
