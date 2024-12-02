'use client'

import { CollapsibleContent } from '@radix-ui/react-collapsible'
import { Calculator, ChevronDown, User2, Users2 } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useState } from 'react'

import { Collapsible } from '@/components/ui/collapsible'

const ReportPanel = () => {
	const [openOrderDetail, setOpenOrderDetail] = useState<boolean>(false)
	const [openIncomeDetail, setOpenIncomeDetail] = useState<boolean>(false)

	return (
		<div className='flex flex-col space-y-1'>
			<div className='grid grid-cols-2 gap-x-2 gap-y-1'>
				<Order
					personelOrder={0}
					managmentOrder={0}
					openDetail={openOrderDetail}
					setOpenDetail={setOpenOrderDetail}
				/>

				<Income
					personelIncome={1500000000}
					managmentIncome={1000000000}
					openDetail={openIncomeDetail}
					setOpenDetail={setOpenIncomeDetail}
				/>

				<OrderDetail
					data={{
						approve: 0,
						pending: 0,
						reject: 0
					}}
					openDetail={openOrderDetail}
					setOpenDetail={setOpenOrderDetail}
				/>

				<IncomeDetail
					data={{
						hasPaymant: 1000000,
						remain: 10000
					}}
					openDetail={openIncomeDetail}
					setOpenDetail={setOpenIncomeDetail}
				/>
			</div>
		</div>
	)
}

const Order: FC<{
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

const OrderDetail: FC<{
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

const Income: FC<{
	personelIncome: number
	managmentIncome: number
	openDetail: boolean
	setOpenDetail: Dispatch<SetStateAction<boolean>>
}> = ({ personelIncome, managmentIncome, openDetail, setOpenDetail }) => {
	const handleOpen = () => setOpenDetail(!openDetail)

	return (
		<div className='flex w-full flex-col items-start justify-start gap-x-8 gap-y-1.5 rounded-md bg-primary px-2 py-2 shadow-md lg:flex-row lg:items-center'>
			<div className='flex flex-col items-start'>
				<p className='text-sm font-bold uppercase tracking-tighter text-white lg:text-center lg:text-lg'>
					Doanh thu
				</p>
				<p className='text-sm font-bold uppercase tracking-tighter text-white lg:text-center lg:text-lg'>
					2.000.000.000đ
				</p>
			</div>
			<div className='flex w-full flex-col items-start gap-y-1 border-l border-white px-2'>
				<div className='flex items-start gap-x-1 text-sm font-semibold text-white/90'>
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
				<div className='flex items-start gap-x-1 text-sm font-semibold text-white/90'>
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
				<div className='flex items-start gap-x-1 text-sm font-semibold text-white/90'>
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

const IncomeDetail: FC<{
	data: {
		hasPaymant: number
		remain: number
	}
	openDetail: boolean
	setOpenDetail: Dispatch<SetStateAction<boolean>>
}> = ({ openDetail, setOpenDetail, data }) => {
	return (
		<div>
			<div className='hidden grid-cols-2 gap-2 lg:grid'>
				<div className='flex flex-col items-center justify-center gap-1.5 rounded-md bg-primary p-1.5 text-white'>
					<p className='font-semibold'>Đã thanh toán</p>
					<p className='text-lg font-semibold'>
						{data.hasPaymant.toLocaleString('vi-VN', {
							style: 'currency',
							currency: 'VND'
						})}
					</p>
				</div>
				<div className='flex flex-col items-center justify-center gap-1.5 rounded-md bg-primary p-1.5 text-white'>
					<p className='font-semibold'>Còn lại</p>
					<p className='text-lg font-semibold'>
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
						{data.hasPaymant.toLocaleString('vi-VN', {
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

export default ReportPanel
