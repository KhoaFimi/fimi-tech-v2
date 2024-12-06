import { promises as fs } from 'fs'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { cookies } from 'next/headers'

import ReportScreen from '@/app/(main)/(pages)/report/_components/report-screen'
import { ComboboxItem, TokenPayload } from '@/types'

const ReportPage = async () => {
	const file = await fs.readFile(
		process.cwd() + '/src/data/campaign-data.json',
		'utf-8'
	)

	const cookieStore = await cookies()

	const accessToken = cookieStore.get('access-token')

	// const { publisherCode } = jwtDecode<JwtPayload & TokenPayload>(
	// 	accessToken.value
	// )

	const publisherCode = 'FIMI00001'

	const campaignData: ComboboxItem[] = JSON.parse(file)

	return (
		<ReportScreen
			campaignData={campaignData}
			publisherCode={publisherCode}
		/>
	)
}

export default ReportPage
