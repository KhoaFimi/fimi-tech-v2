'use client'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { RefreshCcw } from 'lucide-react'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import { ReportResponse } from '@/types'

interface ReportControllerProps {
	setPublisherCode: Dispatch<SetStateAction<string>>
	isPending: boolean
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<ReportResponse, Error>>
}

const ReportController: FC<ReportControllerProps> = ({
	setPublisherCode,
	isPending,
	refetch
}) => {
	const [code, setCode] = useState<string>('')

	const setPublisherCodeDebound = useDebounceCallback(setPublisherCode, 1000)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value.toUpperCase()

		setCode(val)
		setPublisherCodeDebound(val)
	}

	return (
		<div className='flex items-center justify-between gap-y-2'>
			<h2 className='bg-gradient-to-tr from-primary from-30% to-secondary bg-clip-text text-2xl font-bold uppercase leading-none tracking-tighter text-transparent'>
				Báo cáo
			</h2>
			<div className='flex w-fit items-center gap-x-2'>
				<input
					placeholder='Nhập mã giới thiệu'
					value={code}
					onChange={handleChange}
					className='h-8 w-full rounded-md border border-primary px-1.5 text-sm font-semibold text-primary caret-primary placeholder:font-normal focus-visible:outline-none focus-visible:ring-0 lg:w-60'
				/>
				<Button
					className='size-8 border border-primary text-primary'
					variant='outline'
					disabled={isPending}
					onClick={() => refetch({})}
				>
					<RefreshCcw />
				</Button>
			</div>
		</div>
	)
}

export default ReportController
