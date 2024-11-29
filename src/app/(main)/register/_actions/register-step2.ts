'use server'

import { redirect } from 'next/navigation'

import {
	RegisterStep2Schema,
	registerStep2Schema
} from '@/app/(main)/register/_schemas/register.schema'
import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'

export const registerStep2 = async (
	id: string | undefined,
	values: RegisterStep2Schema
) => {
	if (!id)
		return {
			error: 'Id chưa chính xác'
		}

	const validatedValues = registerStep2Schema.safeParse(values)

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
		range: `${config.SHEET_USER_NAME}!N${rangToUpdate + 1}`,
		requestBody: {
			values: [
				[
					body.gender,
					body.workAt,
					body.currentWard,
					body.currentDistrict,
					body.currentProvince,
					'Đang làm việc'
				]
			]
		}
	})

	redirect(`/register?step=3&id=${id}`)
}
