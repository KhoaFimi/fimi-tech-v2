'use server'

import { Base64 } from 'base64-string'
import { redirect } from 'next/navigation'

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
