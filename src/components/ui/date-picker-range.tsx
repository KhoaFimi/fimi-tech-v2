'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Dispatch, FC, HTMLAttributes, SetStateAction } from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerRangeProps extends HTMLAttributes<HTMLDivElement> {
	date: DateRange | undefined
	setDate: Dispatch<SetStateAction<DateRange | undefined>>
	placeholder?: string
	containerClass?: string
}

export const DatePickerRange: FC<DatePickerRangeProps> = ({
	className,
	date,
	setDate,
	placeholder,
	containerClass
}) => {
	return (
		<div className={cn('grid gap-2', containerClass)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id='date'
						variant={'outline'}
						className={cn(
							'w-[300px] justify-start text-left font-normal',
							!date && 'text-muted-foreground',
							className
						)}
					>
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'dd/MM/yyyy')} -{' '}
									{format(date.to, 'dd/MM/yyyy')}
								</>
							) : (
								format(date.from, 'dd/MM/yyyy')
							)
						) : (
							<>
								{placeholder && (
									<>
										<CalendarIcon />
										<span>{placeholder}</span>
									</>
								)}
							</>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-auto p-0'
					align='end'
				>
					<Calendar
						initialFocus
						mode='range'
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
