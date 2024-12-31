'use server'

import { redirect } from 'next/navigation'

import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'

export const checkLegitToken = async (token: string) => {
	const sheets = await getSheets()

	const {
		data: { values: tokens }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: config.SHEET_USER_ID,
		range: config.SHEET_TOKEN_NAME
	})

	if (!tokens)
		return {
			error: 'Hệ thông bọ gián đoạn'
		}

	const existingTokenIds = tokens.findIndex(row => row[0] === token)

	if (!existingTokenIds) redirect('/login')

	return {
		success: token
	}
}
