import { promises as fs } from 'fs'

import ReportScreen from '@/app/(main)/report/_components/report-screen'
import { ComboboxItem } from '@/types'

const ReportPage = async () => {
	const file = await fs.readFile(
		process.cwd() + '/src/data/campaign-data.json',
		'utf-8'
	)

	const campaignData: ComboboxItem[] = JSON.parse(file)

	return <ReportScreen campaignData={campaignData} />
}

export default ReportPage
