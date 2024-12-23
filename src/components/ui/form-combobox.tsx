/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ChevronsUpDown } from 'lucide-react'
import { FC, ReactNode, useState } from 'react'

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
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface FormComboboxProps {
	items: {
		id: string
		value: string
		label: string
	}[]
	name: string
	isMessage?: boolean
	isLoading?: boolean
	notFoundMessage?: string
	onSelect?: (id: string) => void
	placeholder?: string
	initalData: string
	className?: string
	label?: ReactNode
	popoverClassName?: string
	form: any
	control: any
}

const FormCombobox: FC<FormComboboxProps> = ({
	items,
	control,
	name,
	isMessage = true,
	isLoading = false,
	form,
	onSelect,
	label,
	className,
	popoverClassName,
	notFoundMessage = 'Not Found',
	placeholder = 'Tìm kiếm',
	initalData = 'Data'
}) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className=''>
					{label ?? label}
					<Popover
						open={open}
						onOpenChange={setOpen}
					>
						<PopoverTrigger
							asChild
							disabled={isLoading}
						>
							<FormControl>
								<Button
									variant='outline'
									role='combobox'
									className={cn(
										`relative h-7 w-[200px] justify-between overflow-hidden border border-primary bg-background text-xs`,
										!field.value && 'text-muted-foreground',
										className
									)}
								>
									{field.value ? (
										items.find(item => item.value === field.value)?.label
									) : (
										<p className='font-semibold'>{initalData}</p>
									)}
									<div className='z-400 absolute right-0 top-1/2 -translate-y-1/2 border-l bg-background px-1 py-2 text-foreground/50'>
										<ChevronsUpDown className='h-4 w-4 shrink-0' />
									</div>
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent
							className={cn(
								'w-[200px] border border-foreground/30 p-0',
								popoverClassName
							)}
							side='bottom'
							align='start'
						>
							<Command>
								<CommandInput
									placeholder={placeholder}
									className='text-xs'
								/>
								<CommandList>
									<CommandEmpty>{notFoundMessage}</CommandEmpty>
									<CommandGroup className='max-h-[200px] overflow-auto'>
										{items.map(item => (
											<CommandItem
												value={item.label}
												key={item.value}
												className='cursor-pointer text-xs'
												onSelect={() => {
													form.setValue(name, item.value)
													setOpen(false)

													if (onSelect) {
														onSelect(item.id)
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
					{isMessage && <FormMessage />}
				</FormItem>
			)}
		/>
	)
}

export default FormCombobox
