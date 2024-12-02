import Combobox from '@/components/ui/combobox'
import { DatePickerRange } from '@/components/ui/date-picker-range'
import { Input } from '@/components/ui/input'
import { ComboboxItem } from '@/types'
import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { DateRange } from 'react-day-picker'

interface ReportFilterProps {
	publisherCode: string
	setPublisherCode: Dispatch<SetStateAction<string>>
	date: DateRange | undefined
	setDate: Dispatch<SetStateAction<DateRange | undefined>>
	campaign: string
	setCampaign: Dispatch<SetStateAction<string>>
	status: string
	setStatus: Dispatch<SetStateAction<string>>
	campaignData: ComboboxItem[]
}

const ReportFilter: FC<ReportFilterProps> = ({
	publisherCode,
	setPublisherCode,
	date,
	setDate,
	campaign,
	setCampaign,
	status,
	setStatus,
	campaignData
}) => {
	const onChangePublisherCode = (e: ChangeEvent<HTMLInputElement>) => {
		setPublisherCode(e.currentTarget.value.toUpperCase())
	}

	return (
		<div className='grid w-full grid-cols-2 flex-wrap justify-center gap-2 lg:grid-cols-4'>
			<Input
				placeholder='Nhập mã giới thiệu'
				onChange={onChangePublisherCode}
				value={publisherCode}
				className='h-10 w-full border border-primary bg-primary p-2 text-sm text-white placeholder:font-semibold placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-0'
			/>
			<Combobox
				initalData='Chọn chiến dịch'
				value={campaign}
				setValue={setCampaign}
				className='h-10 w-full'
				items={campaignData}
			/>
			<Combobox
				initalData='Chọn trạng thái'
				value={status}
				setValue={setStatus}
				className='h-10 w-full'
				items={[]}
			/>
			<DatePickerRange
				date={date}
				setDate={setDate}
				className='h-10 w-full border-primary'
				containerClass='overlow-hidden'
				placeholder='Chọn thời gian'
			/>
		</div>
	)
}

export default ReportFilter
