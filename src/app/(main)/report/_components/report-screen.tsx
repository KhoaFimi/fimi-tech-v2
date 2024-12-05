'use client'

import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

import { getReportV2 } from '@/app/(main)/report/_actions/get-report'
import ManagmentReport from '@/app/(main)/report/_components/managment-report'
import ReportController from '@/app/(main)/report/_components/report-controller'
import ReportPanel from '@/app/(main)/report/_components/report-panel'
import { ComboboxItem } from '@/types'

interface ReportScreenProps {
	campaignData: ComboboxItem[]
}

const ReportScreen: FC<ReportScreenProps> = ({ campaignData }) => {
	const [publisherCode, setPublisherCode] = useState<string>('')

	const { data, isFetching, refetch } = useQuery({
		queryKey: ['report', publisherCode],
		queryFn: async () => await getReportV2(publisherCode),
		enabled: !!publisherCode
	})

	useEffect(() => {
		console.log(data)
	}, [data])

	const defaultOrder = {
		total: 0,
		amOrder: 0,
		pubOrder: 0,
		approved: 0,
		rejected: 0,
		pending: 0
	}

	const defaultCommision = {
		pub: 0,
		am: 0,
		total: 0,
		remain: 0,
		paid: 0
	}

	return (
		<div className='flex flex-col gap-2'>
			<ReportController
				isPending={isFetching}
				setPublisherCode={setPublisherCode}
				refetch={refetch}
			/>

			<ReportPanel
				order={!data ? defaultOrder : data.order}
				commision={!data ? defaultCommision : data.commision}
			/>

			<ManagmentReport
				publisherCode={publisherCode}
				isPending={isFetching}
				data={!data ? [] : data.data}
				campaignData={campaignData}
			/>
		</div>
	)
}

export default ReportScreen
