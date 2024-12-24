'use client'

import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import { getCampaignCode } from '@/app/(main)/(pages)/report/_actions/get-campaign-code'
import { getReportV2 } from '@/app/(main)/(pages)/report/_actions/get-report'
import ManagmentReport from '@/app/(main)/(pages)/report/_components/managment-report'
import ReportPanel from '@/app/(main)/(pages)/report/_components/report-panel'

interface ReportScreenProps {
	publisherCode: string
}

const initialData = [
	{ id: '0', label: 'vpbstepup', value: 'vpbstepup' },
	{ id: '1', label: 'vpblady', value: 'vpblady' },
	{ id: '2', label: 'vpbgenz', value: 'vpbgenz' },
	{ id: '3', label: 'vpbmc2', value: 'vpbmc2' },
	{ id: '4', label: 'vpbvna', value: 'vpbvna' },
	{ id: '5', label: 'tpbevo', value: 'tpbevo' },
	{ id: '6', label: 'hdbvjp', value: 'hdbvjp' },
	{ id: '7', label: 'hdb4in1', value: 'hdb4in1' },
	{ id: '8', label: 'muadee', value: 'muadee' },
	{ id: '9', label: 'vibtra', value: 'vibtra' },
	{ id: '10', label: 'vibsup', value: 'vibsup' },
	{ id: '11', label: 'vibpre', value: 'vibpre' },
	{ id: '12', label: 'vibrew', value: 'vibrew' },
	{ id: '13', label: 'vibcas', value: 'vibcas' },
	{ id: '14', label: 'vibfam', value: 'vibfam' },
	{ id: '15', label: 'vibfin', value: 'vibfin' },
	{ id: '16', label: 'vpbankneo', value: 'vpbankneo' }
]

const ReportScreen: FC<ReportScreenProps> = ({ publisherCode }) => {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['report', publisherCode],
		queryFn: getReportV2
	})

	const { data: campaignData } = useQuery({
		queryKey: ['campaign-codes'],
		queryFn: getCampaignCode,
		initialData
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
		<div className='container mx-auto flex flex-col gap-2 px-2 py-10'>
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
				refetch={refetch}
				publisherCode={publisherCode}
				isPending={isFetching}
				data={!data ? [] : data.data}
				campaignData={campaignData ?? []}
			/>
		</div>
	)
}

export default ReportScreen
