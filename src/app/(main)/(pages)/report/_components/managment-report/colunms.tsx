import { ColumnDef } from '@tanstack/react-table'
import { formatInTimeZone } from 'date-fns-tz'
import { ArrowUpDown } from 'lucide-react'

import { REPORT_STATUS } from '@/constant/enum'
import { cn } from '@/lib/utils'
import { Report } from '@/types'

export const managmentReportColumns: ColumnDef<Report>[] = [
	// #region: id field
	{
		accessorKey: 'id',
		header: () => (
			<div className='truncate text-left text-xs lg:text-sm'>Mã đơn</div>
		),

		cell: ({ row }) => (
			<div className='text-left text-xs'>{row.getValue('id')}</div>
		)
	},
	// #endregion

	// #region: createdAt field
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<div
					className='flex w-fit cursor-pointer items-center justify-start gap-2 text-xs lg:text-sm'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<p className='truncate'>Ngày lên đơn</p>
					<ArrowUpDown className='ml-2 size-3' />
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

			return <div className='truncate text-left text-xs'>{nativeDate}</div>
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
					className='flex w-fit cursor-pointer items-center justify-start gap-2 text-xs lg:text-sm'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<p className='truncate'>Chiến dịch</p>
					<ArrowUpDown className='ml-2 size-3' />
				</div>
			)
		},
		cell: ({ row }) => (
			<div className='text-left text-xs'>{row.getValue('campaignCode')}</div>
		)
	},
	// #endregion

	// #region: publisherCode field
	{
		accessorKey: 'publisherCode',
		header: () => (
			<div className='truncate text-left text-xs lg:text-sm'>Mã publisher</div>
		),
		cell: ({ row }) => (
			<div className='text-left text-xs'>{row.getValue('publisherCode')}</div>
		)
	},
	// #endregion

	// #region: customerName field
	{
		accessorKey: 'customerName',
		header: () => (
			<div className='truncate text-left text-xs lg:text-sm'>
				Tên khách hàng
			</div>
		),
		cell: ({ row }) => (
			<div className='truncate text-left text-xs'>
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
			return (
				<div className='truncate text-start text-xs lg:text-sm'>Trạng thái</div>
			)
		},
		cell: ({ row }) => {
			const status = row.getValue('status')

			const nativeStatus = REPORT_STATUS[status as keyof typeof REPORT_STATUS]

			return (
				<div
					className={cn(
						'w-fit truncate rounded-md p-1 text-center text-xs leading-none text-white',
						{
							'bg-green-500': status === 'APPROVED',
							'bg-primary': status === 'REJECTED',
							'bg-blue-500': status === 'PENDING'
						}
					)}
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
			return (
				<div className='truncate text-start text-xs lg:text-sm'>Hoa hồng</div>
			)
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
					className={cn(
						'w-fit truncate rounded-md p-1 text-center text-xs leading-none text-white',
						{
							'bg-green-500': status === 'APPROVED',
							'bg-primary': status === 'REJECTED',
							'bg-blue-500': status === 'PENDING'
						}
					)}
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
			return (
				<div className='truncate text-left text-xs lg:text-sm'>Hoa hồng AM</div>
			)
		},
		cell: ({ row }) => {
			const status = row.getValue('status')
			const managerCode = row.getValue('managerCode')

			if (managerCode !== '') {
				const value = parseInt(row.getValue('commision')) / 10

				const nativeCurrency = value.toLocaleString('vi-VN', {
					style: 'currency',
					currency: 'VND'
				})

				return (
					<div
						className={cn(
							'w-fit truncate rounded-md p-1 text-center text-xs leading-none text-white',
							{
								'bg-green-500': status === 'APPROVED',
								'bg-primary': status === 'REJECTED',
								'bg-blue-500': status === 'PENDING'
							}
						)}
					>
						{nativeCurrency}
					</div>
				)
			}

			return (
				<div
					className={cn(
						'w-fit truncate rounded-md p-1 text-center text-xs leading-none text-white',
						{
							'bg-green-500': status === 'APPROVED',
							'bg-primary': status === 'REJECTED',
							'bg-blue-500': status === 'PENDING'
						}
					)}
				>
					0 đ
				</div>
			)
		}
	},
	// #endregion

	// #region: managerCode field
	{
		accessorKey: 'managerCode',
		enableHiding: false,
		filterFn: (
			row,
			colunmId,
			filterValue: { type: 'all' | 'am' | 'pub'; publisherCode: string }
		) => {
			if (filterValue.type === 'all') return true

			if (filterValue.type === 'am')
				return row.getValue<string>(colunmId) === filterValue.publisherCode

			if (filterValue.type === 'pub')
				return row.getValue<string>(colunmId) !== filterValue.publisherCode

			return true
		}
	}
	// #endregion
]
