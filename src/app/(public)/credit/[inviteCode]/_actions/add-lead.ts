'use server'

import { redirect } from 'next/navigation'

import getProductLink from '@/app/(public)/credit/[inviteCode]/_actions/get-product-link'
import { config } from '@/lib/config'
import { genOid } from '@/lib/server/gen-oid'
import { getSheets } from '@/lib/server/google-sheets'
import { parseDate } from '@/lib/server/parse-date'
import { ParamsSchema, paramsSchema } from '@/schemas/invite-link-params.schema'
import { LeadSchema, leadSchema } from '@/schemas/lead.schema'

export const addLead = async ({
	values,
	info
}: {
	values: LeadSchema
	info: ParamsSchema
}) => {
	const validatedLeadData = leadSchema.safeParse(values)
	const validatedParamsData = paramsSchema.safeParse(info)

	if (!validatedParamsData.success) {
		return {
			error: 'Link giới thiệu không chính xác'
		}
	}

	if (!validatedLeadData.success)
		return {
			error: 'Yêu cầu nhập chính xác thông tin để tiếp tục'
		}

	const leadData = validatedLeadData.data
	const infoData = validatedParamsData.data

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
					infoData.publisherCode,
					infoData.product,
					leadData.fullname,
					`'${leadData.phone}`,
					leadData.email,
					leadData.city,
					'',
					'',
					infoData.managerCode
				]
			]
		}
	})
	const productLink = await getProductLink(
		oid,
		validatedParamsData.data.product,
		validatedParamsData.data,
		validatedLeadData.data
	)

	if (productLink.error) {
		return {
			error: productLink.error
		}
	}

	if (productLink.data) {
		redirect(productLink.data.link)
	}
}
