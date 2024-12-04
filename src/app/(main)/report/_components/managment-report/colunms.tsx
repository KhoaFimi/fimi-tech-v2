import { ColumnDef } from '@tanstack/react-table'
import { formatInTimeZone } from 'date-fns-tz'
import { ArrowUpDown } from 'lucide-react'

import { PAYMENT_STATUS, REPORT_STATUS } from '@/constant/enum'
import { cn } from '@/lib/utils'
import { Report } from '@/types'

export const managmentReportColumns: ColumnDef<Report>[] = [
	// #region: id field
	{
		accessorKey: 'id',
		header: () => <div className='truncate text-left'>Mã đơn</div>,

		cell: ({ row }) => (
			<div className='w-40 text-left'>{row.getValue('id')}</div>
		)
	},
	// #endregion

	// #region: createdAt field
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<div
					className='flex cursor-pointer items-center justify-start gap-2'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<p className='truncate'>Ngày lên đơn</p>
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</div>
			)
		},
		sortDescFirst: true,
		sortingFn: 'datetime',
		cell: ({ row }) => {
			const nativeDate = formatInTimeZone(
				row.getValue('createdAt'),
				'Asia/Ho_Chi_Minh',
				'dd/MM/yyyy'
			)

			return <div className='w-40 truncate text-left'>{nativeDate}</div>
		}
	},
	// #endregion

	// #region: campaignCode field
	{
		accessorKey: 'campaignCode',
		filterFn: (row, columnId, filterValue: string[]) => {
			return filterValue.includes(row.getValue(columnId))
		},
		header: ({ column }) => {
			return (
				<div
					className='flex cursor-pointer items-center justify-start gap-2'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<p className='truncate'>Chiến dịch</p>
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</div>
			)
		},
		cell: ({ row }) => (
			<div className='w-40 text-left'>{row.getValue('campaignCode')}</div>
		)
	},
	// #endregion

	// #region: publisherCode field
	{
		accessorKey: 'publisherCode',
		header: () => <div className='truncate text-left'>Mã publisher</div>,
		cell: ({ row }) => (
			<div className='w-40 text-left'>{row.getValue('publisherCode')}</div>
		)
	},
	// #endregion

	// #region: customerName field
	{
		accessorKey: 'customerName',
		header: () => <div className='truncate text-left'>Tên khách hàng</div>,
		cell: ({ row }) => (
			<div className='w-60 truncate text-left'>
				{row.getValue('customerName')}
			</div>
		)
	},
	// #endregion

	// #region: status field
	{
		accessorKey: 'status',
		filterFn: (row, columnId, filterValue: string[]) => {
			return filterValue.includes(row.getValue(columnId))
		},
		header: () => {
			return <div className='truncate text-center'>Trạng thái</div>
		},
		cell: ({ row }) => {
			const status = row.getValue('status')

			const nativeStatus = REPORT_STATUS[status as keyof typeof REPORT_STATUS]

			return (
				<div
					className={cn('w-44 truncate rounded-full text-center text-white', {
						'bg-green-500': status === 'APPROVED',
						'bg-primary': status === 'REJECTED',
						'bg-blue-500': status === 'PENDING'
					})}
				>
					{nativeStatus}
				</div>
			)
		}
	},
	// #endregion

	// #region: commision field
	{
		accessorKey: 'commision',
		header: () => {
			return <div className='truncate text-center'>Hoa hồng</div>
		},
		cell: ({ row }) => {
			const status = row.getValue('status')

			const nativeCurrency = parseInt(row.getValue('commision')).toLocaleString(
				'vi-VN',
				{
					style: 'currency',
					currency: 'VND'
				}
			)

			return (
				<div
					className={cn('truncate rounded-full px-2 text-center text-white', {
						'bg-green-500': status === 'APPROVED',
						'bg-primary': status === 'REJECTED',
						'bg-blue-500': status === 'PENDING'
					})}
				>
					{nativeCurrency}
				</div>
			)
		}
	},
	// #endregion

	// #region: managmentCommision field
	{
		accessorKey: 'managmentCommission',
		header: () => {
			return <div className='truncate text-center'>Hoa hồng AM</div>
		},
		cell: ({ row }) => {
			const status = row.getValue('status')

			const value = parseInt(row.getValue('commision')) / 10

			const nativeCurrency = value.toLocaleString('vi-VN', {
				style: 'currency',
				currency: 'VND'
			})

			return (
				<div
					className={cn('truncate rounded-full px-2 text-center text-white', {
						'bg-green-500': status === 'APPROVED',
						'bg-primary': status === 'REJECTED',
						'bg-blue-500': status === 'PENDING'
					})}
				>
					{nativeCurrency}
				</div>
			)
		}
	},
	// #endregion

	// #region: paymentStatus field
	{
		accessorKey: 'paymentStatus',
		header: () => {
			return <div className='truncate text-center'>Tình trạng thanh toán</div>
		},
		filterFn: (row, columnId, filterValue: string[]) => {
			return filterValue.includes(row.getValue(columnId))
		},
		cell: ({ row }) => {
			const status = row.getValue('paymentStatus')

			const nativeStatus = PAYMENT_STATUS[status as keyof typeof PAYMENT_STATUS]

			return (
				<div
					className={cn('truncate rounded-full text-center text-white', {
						'bg-green-500': status === 'PAID',
						'bg-orange-500': status === 'REMAIN'
					})}
				>
					{nativeStatus}
				</div>
			)
		}
	}
	// #endregion
]
