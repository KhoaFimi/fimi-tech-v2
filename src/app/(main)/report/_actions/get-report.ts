'use server'

import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'
import { Report } from '@/types'

export const getReport = async (publisherCode: string) => {
	const sheets = await getSheets()

	const {
		data: { values: reports }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: config.SHEET_LEAD_ID,
		range: config.SHEET_LEAD_NAME
	})

	if (!reports)
		return {
			personelRes: [],
			managmentRes: []
		}

	reports.shift()

	const personelRes = reports
		.filter(report => report[2] === publisherCode)
		.map<Report>(report => ({
			id: report[1],
			createdAt: report[0],
			publisherCode: report[2],
			campaignCode: report[3],
			customerName: report[4],
			customerPhone: report[5],
			customerEmail: report[6],
			customerProvince: report[7],
			status: !report[8] ? 'PENDING' : report[8],
			commision: !report[9] ? 0 : parseInt(report[9]),
			paymentStatus: !report[10] ? 'REMAIN' : report[10],
			managerCode: report[11]
		}))

	const managmentRes = reports
		.filter(report => report[11] === publisherCode)
		.map<Report>(report => ({
			id: report[1],
			createdAt: report[0],
			publisherCode: report[2],
			campaignCode: report[3],
			customerName: report[4],
			customerPhone: report[5],
			customerEmail: report[6],
			customerProvince: report[7],
			status: !report[8] ? 'PENDING' : report[8],
			commision: !report[9] ? 0 : parseInt(report[9]),
			paymentStatus: !report[10] ? 'REMAIN' : report[10],
			managerCode: report[11]
		}))

	return {
		personelRes,
		managmentRes
	}
}
