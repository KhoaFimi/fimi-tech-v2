'use client'

import { FC, useState } from 'react'
import { DateRange } from 'react-day-picker'

import ReportFilter from '@/app/(main)/report/_components/report-filter'
import ReportPanel from '@/app/(main)/report/_components/report-panel'
import { ComboboxItem } from '@/types'

interface ReportScressProps {
	campaignData: ComboboxItem[]
}

const ReportScreen: FC<ReportScressProps> = ({ campaignData }) => {
	const [publisherCode, setPublisherCode] = useState<string>('')
	const [date, setDate] = useState<DateRange | undefined>(undefined)
	const [campaign, setCampaign] = useState<string>('')
	const [status, setStatus] = useState<string>('')

	return (
		<div className='flex flex-col gap-6'>
			<ReportFilter
				campaignData={campaignData}
				date={date}
				setDate={setDate}
				publisherCode={publisherCode}
				setPublisherCode={setPublisherCode}
				status={status}
				setStatus={setStatus}
				campaign={campaign}
				setCampaign={setCampaign}
			/>
			<ReportPanel />
		</div>
	)
}

export default ReportScreen
