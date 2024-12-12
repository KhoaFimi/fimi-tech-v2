import { Metadata } from 'next'

import ReportScreen from '@/app/(main)/(pages)/report/_components/report-screen'
import { verifySession } from '@/lib/dal'

export const metadata = {
	title: 'Báo cáo'
} satisfies Metadata

const ReportPage = async () => {
	const { publisherCode } = await verifySession()

	return <ReportScreen publisherCode={publisherCode} />
}

export default ReportPage
