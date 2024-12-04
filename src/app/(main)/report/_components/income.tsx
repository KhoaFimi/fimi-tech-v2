import { Calculator, ChevronDown, User2, Users2 } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'

export const Income: FC<{
	personelIncome: number
	managmentIncome: number
	openDetail: boolean
	setOpenDetail: Dispatch<SetStateAction<boolean>>
}> = ({ personelIncome, managmentIncome, openDetail, setOpenDetail }) => {
	const handleOpen = () => setOpenDetail(!openDetail)

	return (
		<div className='flex w-full flex-col items-start justify-start gap-x-8 gap-y-1.5 rounded-md bg-primary px-2 py-2 shadow-md lg:flex-row lg:items-center'>
			<div className='flex flex-col items-start'>
				<p className='text-sm font-bold uppercase tracking-tighter text-white lg:text-center lg:text-base'>
					Doanh thu
				</p>
				<p className='text-sm font-bold uppercase tracking-tighter text-white lg:text-center lg:text-base'>
					{(personelIncome + managmentIncome).toLocaleString('vi-VN', {
						style: 'currency',
						currency: 'VND'
					})}
				</p>
			</div>
			<div className='flex flex-col items-start gap-y-1 border-l border-white px-2'>
				<div className='flex items-start gap-x-1 text-xs font-semibold text-white/90'>
					<Calculator
						strokeWidth={3}
						className='inline-flex size-4 items-baseline'
					/>{' '}
					<p>
						<span className='hidden lg:inline-block'>Tổng doang thu: </span>
						{(personelIncome + managmentIncome).toLocaleString('vi-VN', {
							style: 'currency',
							currency: 'VND'
						})}
					</p>
				</div>
				<div className='flex items-start gap-x-1 text-xs font-semibold text-white/90'>
					<User2
						strokeWidth={3}
						className='inline-flex size-4 items-baseline'
					/>{' '}
					<p>
						<span className='hidden lg:inline-block'>Doanh thu cá nhân: </span>{' '}
						{personelIncome.toLocaleString('vi-VN', {
							style: 'currency',
							currency: 'VND'
						})}
					</p>
				</div>
				<div className='flex items-start gap-x-1 text-xs font-semibold text-white/90'>
					<Users2
						strokeWidth={3}
						className='inline-flex size-4 items-baseline'
					/>{' '}
					<p>
						<span className='hidden lg:inline-block'>Doanh thu quản lý</span>{' '}
						{managmentIncome.toLocaleString('vi-VN', {
							style: 'currency',
							currency: 'VND'
						})}
					</p>
				</div>
			</div>
			<button
				onClick={handleOpen}
				className='flex w-full justify-center text-white lg:hidden'
			>
				<ChevronDown className='size-5' />
			</button>
		</div>
	)
}

export const IncomeDetail: FC<{
	data: {
		paid: number
		remain: number
	}
	openDetail: boolean
	setOpenDetail: Dispatch<SetStateAction<boolean>>
}> = ({ openDetail, setOpenDetail, data }) => {
	return (
		<div>
			<div className='hidden grid-cols-2 gap-2 lg:grid'>
				<div className='flex flex-col items-center justify-center gap-1.5 rounded-md bg-primary p-1.5 text-white'>
					<p className='text-base font-semibold'>Đã thanh toán</p>
					<p className='text-base font-semibold'>
						{data.paid.toLocaleString('vi-VN', {
							style: 'currency',
							currency: 'VND'
						})}
					</p>
				</div>
				<div className='flex flex-col items-center justify-center gap-1.5 rounded-md bg-primary p-1.5 text-white'>
					<p className='text-base font-semibold'>Còn lại</p>
					<p className='text-base font-semibold'>
						{data.remain.toLocaleString('vi-VN', {
							style: 'currency',
							currency: 'VND'
						})}
					</p>
				</div>
			</div>

			<Collapsible
				open={openDetail}
				onOpenChange={setOpenDetail}
			>
				<CollapsibleContent className='space-y-2 text-white'>
					<div className='rounded-md border bg-primary p-2 font-mono text-sm lg:hidden'>
						Đã thanh toán:{' '}
						{data.paid.toLocaleString('vi-VN', {
							style: 'currency',
							currency: 'VND'
						})}
					</div>
					<div className='rounded-md border bg-primary p-2 font-mono text-sm'>
						Chưa thanh toán:{' '}
						{data.remain.toLocaleString('vi-VN', {
							style: 'currency',
							currency: 'VND'
						})}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	)
}
