'use server'

import { redirect } from 'next/navigation'

import {
	RegisterStep3Schema,
	registerStep3Schema
} from '@/app/(main)/(auth)/register/_schemas/register.schema'
import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'

export const registerStep3 = async (
	values: RegisterStep3Schema,
	id: string | undefined
) => {
	if (!id)
		return {
			error: 'Id chưa chính xác'
		}

	const validatedValues = registerStep3Schema.safeParse(values)

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

	await sheets.spreadsheets.values.update({
		spreadsheetId: config.SHEET_USER_ID,
		valueInputOption: 'RAW',
		range: `${config.SHEET_USER_NAME}!T${rangToUpdate + 1}`,
		requestBody: {
			values: [
				[
					body.bankAccountName,
					body.bankAccountName.charAt(0) === '0'
						? `'${body.bankAccountNumber}`
						: body.bankAccountNumber,
					body.bankName
				]
			]
		}
	})

	redirect(`/register?step=4&id=${id}`)
}
