'use server'

import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'
import { Report, ReportResponse } from '@/types'

export const getReportV2 = async (
	publisherCode: string
): Promise<ReportResponse> => {
	const sheets = await getSheets()

	const {
		data: { values: reports }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: config.SHEET_LEAD_ID,
		range: config.SHEET_LEAD_NAME
	})

	if (!reports)
		return {
			data: [],
			order: {
				total: 0,
				amOrder: 0,
				pubOrder: 0,
				approved: 0,
				rejected: 0,
				pending: 0
			},
			commision: {
				pub: 0,
				am: 0,
				total: 0,
				remain: 0,
				paid: 0
			}
		}

	reports.shift()

	const filterReport = reports.filter(report => {
		const isPublisher = report[2] === publisherCode
		const isAM = report[11] === publisherCode

		return isPublisher || isAM
	})

	const { commision, order } = filterReport.reduce(
		(total, report) => {
			const { order, commision } = total

			const commisionValue = !report[9] ? 0 : parseInt(report[9])
			const statusValue = !report[8] ? 'PENDING' : report[8]
			const paymentStatusValue = !report[10] ? 'REMAIN' : report[10]

			order.TOTAL += 1

			order[statusValue as keyof typeof order] += 1

			const currentCommisionPUB = commisionValue
			const currentCommisionAM = commisionValue / 10

			if (report[2] === publisherCode) {
				commision.PUB += currentCommisionPUB
				commision[paymentStatusValue as keyof typeof commision] +=
					currentCommisionPUB
				order.PUB_ORDER += 1
			} else if (report[11] === publisherCode) {
				commision.AM += currentCommisionAM
				commision[paymentStatusValue as keyof typeof commision] +=
					currentCommisionAM
				order.AM_ORDER += 1
			}

			return total
		},
		{
			commision: {
				PUB: 0,
				AM: 0,
				PAID: 0,
				REMAIN: 0
			},
			order: {
				TOTAL: 0,
				PUB_ORDER: 0,
				AM_ORDER: 0,
				APPROVED: 0,
				REJECTED: 0,
				PENDING: 0
			}
		}
	)

	return {
		data: filterReport.map<Report>(report => ({
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
		})),
		commision: {
			pub: commision.PUB,
			am: commision.AM,
			total: commision.PUB + commision.AM,
			remain: commision.REMAIN,
			paid: commision.PAID
		},
		order: {
			total: order.TOTAL,
			pubOrder: order.PUB_ORDER,
			amOrder: order.AM_ORDER,
			approved: order.APPROVED,
			rejected: order.REJECTED,
			pending: order.PENDING
		}
	}
}
