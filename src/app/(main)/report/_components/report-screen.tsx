'use client'

import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import { getReport } from '@/app/(main)/report/_actions/get-report'
import ManagmentReport from '@/app/(main)/report/_components/managment-report'
import PersonelReport from '@/app/(main)/report/_components/personel-report'
import ReportController from '@/app/(main)/report/_components/report-controller'
import ReportPanel from '@/app/(main)/report/_components/report-panel'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { ComboboxItem } from '@/types'

interface ReportScreenProps {
	campaignData: ComboboxItem[]
}

const ReportScreen: FC<ReportScreenProps> = ({ campaignData }) => {
	const [publisherCode, setPublisherCode] = useState<string>('')
	const [tab, setTab] = useState<string>('personel')

	const { data, isFetching } = useQuery({
		queryKey: ['report', publisherCode],
		queryFn: async () => await getReport(publisherCode),
		enabled: !!publisherCode
	})

	return (
		<div className='flex flex-col gap-2'>
			<ReportController
				isPending={!!data}
				setPublisherCode={setPublisherCode}
				tab={tab}
				setTab={setTab}
			/>

			<ReportPanel data={data} />

			<Tabs
				value={tab}
				onValueChange={value => setTab(value)}
			>
				<TabsContent
					value='personel'
					className='mt-0'
				>
					<PersonelReport
						isPending={isFetching}
						data={!data ? [] : data.personelRes}
						campaignData={campaignData}
					/>
				</TabsContent>
				<TabsContent
					value='managment'
					className='mt-0'
				>
					<ManagmentReport
						isPending={isFetching}
						data={!data ? [] : data.managmentRes}
						campaignData={campaignData}
					/>
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default ReportScreen
