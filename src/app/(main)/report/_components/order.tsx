import { Calculator, ChevronDown, User2, Users2 } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'

export const Order: FC<{
	personelOrder: number
	managmentOrder: number
	openDetail: boolean
	setOpenDetail: Dispatch<SetStateAction<boolean>>
}> = ({ personelOrder, managmentOrder, openDetail, setOpenDetail }) => {
	const handleOpen = () => setOpenDetail(!openDetail)

	return (
		<div className='flex w-full flex-col items-center justify-start gap-y-1.5 rounded-md bg-primary px-2 py-2 shadow-md'>
			<p className='text-sm font-bold uppercase tracking-tighter text-white lg:text-center lg:text-lg'>
				Số lượng đơn đã lên
			</p>
			<div className='flex w-full flex-col items-start gap-y-1 lg:flex-row lg:justify-evenly'>
				<div className='flex items-start gap-x-1 text-base font-semibold text-white/90 lg:text-lg'>
					<Calculator
						strokeWidth={3}
						className='inline-flex size-5 items-baseline'
					/>{' '}
					<p>Tổng: {personelOrder + managmentOrder}</p>
				</div>
				<div className='flex items-start gap-x-1 text-base font-semibold text-white/90 lg:text-lg'>
					<User2
						strokeWidth={3}
						className='inline-flex size-5 items-baseline'
					/>{' '}
					<p>Đơn cá nhân: {personelOrder}</p>
				</div>
				<div className='flex items-start gap-x-1 text-base font-semibold text-white/90 lg:text-lg'>
					<Users2
						strokeWidth={3}
						className='inline-flex size-5 items-baseline'
					/>{' '}
					<p>Đơn quản lý: {managmentOrder}</p>
				</div>
			</div>
			<button
				className='mt-2 w-fit text-white lg:hidden'
				onClick={handleOpen}
			>
				<ChevronDown className='size-5' />
			</button>
		</div>
	)
}

export const OrderDetail: FC<{
	data: {
		approve: number
		pending: number
		reject: number
	}
	openDetail: boolean
	setOpenDetail: Dispatch<SetStateAction<boolean>>
}> = ({ openDetail, setOpenDetail, data }) => {
	return (
		<div>
			<div className='hidden grid-cols-3 gap-2 lg:grid'>
				<div className='flex flex-col items-center justify-center gap-1.5 rounded-md bg-primary p-1.5 text-white'>
					<p className='font-semibold'>Đơn đã phê duyệt</p>
					<p className='text-lg font-semibold'>{data.approve}</p>
				</div>
				<div className='flex flex-col items-center justify-center gap-1.5 rounded-md bg-primary p-1.5 text-white'>
					<p className='font-semibold'>Đơn chưa hoàn tất </p>
					<p className='text-lg font-semibold'>{data.pending}</p>
				</div>
				<div className='flex flex-col items-center justify-center gap-1.5 rounded-md bg-primary p-1.5 text-white'>
					<p className='font-semibold'>Đơn bị từ chối</p>
					<p className='text-lg font-semibold'>{data.reject}</p>
				</div>
			</div>

			<Collapsible
				open={openDetail}
				onOpenChange={setOpenDetail}
			>
				<CollapsibleContent className='space-y-2 text-white'>
					<div className='rounded-md border bg-primary p-2 font-mono text-sm lg:hidden'>
						Chưa hoàn tất: {data.pending}
					</div>
					<div className='rounded-md border bg-primary p-2 font-mono text-sm'>
						Phê duyệt: {data.approve}
					</div>
					<div className='rounded-md border bg-primary p-2 font-mono text-sm'>
						Từ chối: {data.reject}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	)
}
