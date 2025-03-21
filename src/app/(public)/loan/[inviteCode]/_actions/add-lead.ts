'use server'

import { Base64 } from 'base64-string'
import { redirect } from 'next/navigation'

import getProductLink from '@/app/(public)/loan/[inviteCode]/_actions/get-product-link'
import { config } from '@/lib/config'
import { genOid } from '@/lib/server/gen-oid'
import { getSheets } from '@/lib/server/google-sheets'
import { parseDate, parseDateTime } from '@/lib/server/parse-date'
import { ParamsSchema, paramsSchema } from '@/schemas/invite-link-params.schema'
import { LoanLeadSchema, loanLeadSchema } from '@/schemas/lead.schema'

export const addLoanLead = async ({
	values,
	info
}: {
	values: LoanLeadSchema
	info: ParamsSchema
}) => {
	const validatedLoanLeadData = loanLeadSchema.safeParse(values)
	const validatedParamsData = paramsSchema.safeParse(info)

	if (!validatedParamsData.success) {
		return {
			error: 'Link giới thiệu không chính xác'
		}
	}

	if (!validatedLoanLeadData.success)
		return {
			error: 'Yêu cầu nhập chính xác thông tin để tiếp tục'
		}

	const leadData = validatedLoanLeadData.data
	const infoData = validatedParamsData.data

	const sheets = await getSheets()

	const oid = genOid()

	if (info.product === 'shbf') {
		const enc = new Base64()

		await sheets.spreadsheets.values.append({
			spreadsheetId: config.SHEET_LOAN_LEAD_ID,
			range: config.SHEET_LOAN_LEAD_NAME,
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
						leadData.loanPackage,
						parseDateTime(leadData.contactTime as Date),
						leadData.loanAmmount,
						leadData.loanTerm,
						'',
						'',
						'',
						infoData.managerCode
					]
				]
			}
		})

		const successData = {
			fullName: leadData.fullname,
			contactTime: parseDateTime(leadData.contactTime as Date)
		}

		redirect(`/loan/success/${enc.encode(JSON.stringify(successData))}`)
	}

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

	const productLink = await getProductLink(
		oid,
		validatedParamsData.data.product
	)

	if (productLink.error) {
		return {
			error: productLink.error
		}
	}

	redirect(productLink.data!)
}
