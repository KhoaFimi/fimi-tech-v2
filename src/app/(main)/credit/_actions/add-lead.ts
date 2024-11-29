'use server'

import { redirect } from 'next/navigation'

import {
	LeadSchema,
	leadSchema
} from '@/app/(main)/credit/_schemas/lead.schema'
import { creditCardLink } from '@/constant/credit-card-link'
import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'
import { parseDate } from '@/lib/server/parse-date'

const genOid = (length: number = 12): string => {
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'

	const result = Array.from(
		{ length },
		() => characters[Math.floor(Math.random() * characters.length)]
	).join('')

	return result
}

export const addLead = async ({
	values,
	info
}: {
	values: LeadSchema
	info: { publisherCode: string; campaignCode: string }
}) => {
	const validatedData = leadSchema.safeParse(values)

	if (!validatedData.success)
		return {
			error: validatedData.error.message
		}

	const body = validatedData.data

	if (!info.campaignCode || !info.publisherCode)
		return {
			error: 'Thông tin publisher chưa chính xác'
		}

	const sheets = await getSheets()

	const orderId = genOid()

	await sheets.spreadsheets.values.append({
		spreadsheetId: config.SHEET_LEAD_ID,
		range: config.SHEET_LEAD_NAME,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [
				[
					parseDate(new Date()),
					orderId,
					info.publisherCode,
					info.campaignCode,
					body.fullname,
					`'${body.phone}`,
					body.email,
					body.city
				]
			]
		}
	})

	const link = creditCardLink({
		campaignCode: info.campaignCode,
		orderId
	})

	redirect(link)
}
