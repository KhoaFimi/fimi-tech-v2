'use server'

import { redirect } from 'next/navigation'

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

	await sheets.spreadsheets.values
		.append({
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
		.catch(error => console.log(error))

	if (leadData.sunlifeTnc) {
		const res = await fetch(
			`${process.env.SUNLIFE_BASE_URL ? `${process.env.SUNLIFE_BASE_URL}/api` : 'http://localhost:3000/api'}/add-lead`,
			{
				method: 'POST',
				body: JSON.stringify({
					name: leadData.fullname,
					email: leadData.email,
					phone: leadData.phone,
					province: leadData.city,
					publisherCode: infoData.publisherCode,
					managerCode: infoData.managerCode,
					idClick: oid,
					question: leadData.sunlifeQuestion,
					approach: leadData.sunlifeApproach
				})
			}
		)

		const data = await res.json()

		console.log(data)
	}

	redirect('/insurance/sunlife/success')
}
