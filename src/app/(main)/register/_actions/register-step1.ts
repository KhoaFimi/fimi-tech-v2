'use server'

import { randomUUID as uuidV4 } from 'crypto'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { redirect } from 'next/navigation'

import {
	RegisterStep1Schema,
	registerStep1Schema
} from '@/app/(main)/register/_schemas/register.schema'
import { config } from '@/lib/config'
import { getGoogleAuthV2 } from '@/lib/server/google-auth'
import { getSheets } from '@/lib/server/google-sheets'
import { parseDate } from '@/lib/server/parse-date'

const genCode = (): string => {
	const numbers = Array.from({ length: 5 }, () =>
		Math.floor(Math.random() * 10)
	)

	return `FIMI${numbers.join('')}`
}

export const registerStep1 = async ({
	values,
	referal
}: {
	values: RegisterStep1Schema
	referal: string | undefined
}) => {
	const validateData = registerStep1Schema.safeParse(values)

	if (!validateData.success)
		return {
			error: validateData.error.message
		}

	const body = validateData.data

	const auth = await getGoogleAuthV2()

	const doc = new GoogleSpreadsheet(config.SHEET_USER_ID, auth)

	await doc.loadInfo()

	const sheets = await getSheets()

	const {
		data: { values: users }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: config.SHEET_USER_ID,
		range: config.SHEET_USER_NAME
	})

	let referalCode: string = ''

	if (!users)
		return {
			error: 'Máy chủ đang gián đoạn, vui lòng thử lại sau'
		}

	if (referal) {
		const existingManagerIdx = users.findIndex(user => user[2] === referal)

		if (existingManagerIdx !== -1) {
			referalCode = referal
		}
	}

	const duplicatedIndex = users.findIndex(user => {
		const duplicatedEmail = user.includes(body.email)
		const duplicatedPhone = user.includes(body.phone)

		return duplicatedEmail || duplicatedPhone
	})

	if (duplicatedIndex !== -1)
		return {
			error: 'Người dùng đã tồn tại'
		}

	const id = uuidV4()
	const code = genCode()

	await sheets.spreadsheets.values.append({
		spreadsheetId: config.SHEET_USER_ID,
		range: config.SHEET_USER_NAME,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [
				[
					parseDate(new Date()),
					`'${id}`,
					code,
					referalCode,
					body.fullname,
					`'${body.phone}`,
					body.email,
					`'${body.citizenIdentification}`,
					parseDate(new Date(body.dateOfIssue)),
					body.placeOfIssue,
					parseDate(new Date(body.dateOfBirth)),
					body.placeOfBirth,
					body.tnc
				]
			]
		}
	})

	redirect(`/register?step=2&id=${id}`)
}
