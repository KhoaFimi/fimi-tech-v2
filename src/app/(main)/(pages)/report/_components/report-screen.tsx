'use client'

import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import { getReportV2 } from '@/app/(main)/(pages)/report/_actions/get-report'
import ManagmentReport from '@/app/(main)/(pages)/report/_components/managment-report'
import ReportPanel from '@/app/(main)/(pages)/report/_components/report-panel'
import { ComboboxItem } from '@/types'

interface ReportScreenProps {
	campaignData: ComboboxItem[]
	publisherCode: string
}

const ReportScreen: FC<ReportScreenProps> = ({
	campaignData,
	publisherCode
}) => {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['report', publisherCode],
		queryFn: async () => await getReportV2()
	})

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
			{/* <ReportController
				isPending={isFetching}
				setPublisherCode={setPublisherCode}
				refetch={refetch}
			/> */}

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
