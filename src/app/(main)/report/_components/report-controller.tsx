'use client'

import { ChevronRight } from 'lucide-react'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface ReportControllerProps {
	setPublisherCode: Dispatch<SetStateAction<string>>
	tab: string
	setTab: Dispatch<SetStateAction<string>>
	isPending: boolean
}

const ReportController: FC<ReportControllerProps> = ({
	setPublisherCode,
	tab,
	setTab,
	isPending
}) => {
	const [code, setCode] = useState<string>('')

	const setPublisherCodeDebound = useDebounceCallback(setPublisherCode, 1000)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value.toUpperCase()

		setCode(val)
		setPublisherCodeDebound(val)
	}

	return (
		<div className='flex flex-col items-start gap-y-2 lg:flex-row lg:items-center lg:space-x-2'>
			<h2 className='bg-gradient-to-tr from-primary from-30% to-secondary bg-clip-text text-xl font-bold uppercase leading-none tracking-tighter text-transparent'>
				Báo cáo
			</h2>
			<ChevronRight className='hidden size-7 text-primary lg:block' />
			<input
				placeholder='Nhập mã giới thiệu'
				value={code}
				onChange={handleChange}
				className='h-9 w-full rounded-md border-2 border-primary px-1.5 text-sm font-semibold text-primary caret-primary placeholder:font-normal focus-visible:outline-none focus-visible:ring-0 lg:w-60'
			/>
			<ChevronRight className='hidden size-7 text-primary lg:block' />

			<Tabs
				value={tab}
				onValueChange={value => setTab(value)}
				className={cn('w-full lg:w-72', {
					['hidden']: !isPending,
					['block']: isPending
				})}
			>
				<TabsList className='grid h-9 w-full grid-cols-2 border border-primary lg:w-72'>
					<TabsTrigger
						value='personel'
						className='h-6 text-sm data-[state=active]:bg-primary data-[state=active]:text-white'
					>
						Publisher
					</TabsTrigger>
					<TabsTrigger
						value='managment'
						className='h-6 text-sm data-[state=active]:bg-primary data-[state=active]:text-white'
					>
						AM
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	)
}

export default ReportController
