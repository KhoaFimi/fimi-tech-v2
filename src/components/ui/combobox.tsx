/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ChevronsUpDown } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ComboboxItem } from '@/types'

interface ComboboxProps {
	items: {
		id: string
		value: string
		label: string
	}[]
	isLoading?: boolean
	notFoundMessage?: string
	onSelect?: (item: ComboboxItem) => void
	placeholder?: string
	initalData: string
	value: string
	setValue: Dispatch<SetStateAction<string>>
	className?: string
	popoverClassName?: string
}

const Combobox: FC<ComboboxProps> = ({
	items,
	value = '',
	setValue,
	isLoading = false,
	onSelect,
	className,
	popoverClassName,
	notFoundMessage = 'Not Found',
	placeholder = 'Tìm kiếm',
	initalData = 'Data'
}) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger
				asChild
				disabled={isLoading}
			>
				<Button
					variant='outline'
					role='combobox'
					className={cn(
						`relative w-[200px] justify-between overflow-hidden border border-primary bg-background`,
						value && 'text-muted-foreground',
						className
					)}
				>
					{value ? (
						items.find(item => item.value === value)?.label
					) : (
						<p className='text-foreground/50'>{initalData}</p>
					)}
					<div className='z-400 absolute right-0 top-1/2 -translate-y-1/2 border-l bg-background px-1 py-2 text-foreground/50'>
						<ChevronsUpDown className='h-4 w-4 shrink-0' />
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={cn(
					'z-40 w-[200px] border border-foreground/30 p-0',
					popoverClassName
				)}
				side='bottom'
				align='start'
			>
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandList>
						<CommandEmpty>{notFoundMessage}</CommandEmpty>
						<CommandGroup className='max-h-[200px] overflow-auto'>
							{items.map(item => (
								<CommandItem
									value={item.label}
									key={item.value}
									className='cursor-pointer'
									onSelect={() => {
										setValue(item.value)
										setOpen(false)

										if (onSelect) {
											onSelect(item)
										}
									}}
								>
									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default Combobox
