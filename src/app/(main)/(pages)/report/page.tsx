import { promises as fs } from 'fs'

import ReportScreen from '@/app/(main)/(pages)/report/_components/report-screen'
import { verifySession } from '@/lib/dal'
import { ComboboxItem } from '@/types'

const ReportPage = async () => {
	const file = await fs.readFile(
		process.cwd() + '/src/data/campaign-data.json',
		'utf-8'
	)

	const campaignData: ComboboxItem[] = JSON.parse(file)

	const { publisherCode } = await verifySession()

	return (
		<ReportScreen
			campaignData={campaignData}
			publisherCode={publisherCode}
		/>
	)
}

export default ReportPage
