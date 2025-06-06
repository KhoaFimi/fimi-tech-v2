'use server'

import { redirect } from 'next/navigation'

import getProductLink from '@/app/(public)/credit/(hhfn)/_actions/get-product-link'
import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'
import { parseDate } from '@/lib/server/parse-date'
import { LeadSchema, leadSchema } from '@/schemas/lead.schema'

const genOid = (length: number = 12): string => {
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'

	const result = Array.from(
		{ length },
		() => characters[Math.floor(Math.random() * characters.length)]
	).join('')

	return result
}

export const addLead = async (
	values: LeadSchema,
	code: string,
	product: string
) => {
	const validatedLeadData = leadSchema.safeParse(values)

	if (!validatedLeadData.success)
		return {
			error: 'Yêu cầu nhập chính xác thông tin để tiếp tục'
		}

	const leadData = validatedLeadData.data

	const sheets = await getSheets()

	const oid = genOid()

	await sheets.spreadsheets.values.append({
		spreadsheetId: config.SHEET_LEAD_ID,
		range: config.SHEET_LEAD_NAME,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [
				[
					parseDate(new Date()),
					oid,
					code,
					product,
					leadData.fullname,
					`'${leadData.phone}`,
					leadData.email,
					leadData.city
				]
			]
		}
	})

	const productLink = await getProductLink(oid, product, leadData, code)

	const res = await fetch(
		`${process.env.SUNLIFE_BASE_URL ? `${process.env.SUNLIFE_BASE_URL}/api` : 'http://localhost:3000/api'}/add-lead`,
		{
			method: 'POST',
			body: JSON.stringify({
				name: leadData.fullname,
				email: leadData.email,
				phone: leadData.phone,
				province: leadData.city
			})
		}
	)

	const data = await res.json()

	console.log(data)

	if (productLink.error) {
		return {
			error: productLink.error
		}
	}

	if (productLink.data) {
		redirect(productLink.data.link)
	}
}
