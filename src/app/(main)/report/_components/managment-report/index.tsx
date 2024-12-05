import {
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState
} from '@tanstack/react-table'
import { Columns3, Filter, FilterX, Search } from 'lucide-react'
import { FC, useEffect, useState } from 'react'

import { managmentReportColumns } from '@/app/(main)/report/_components/managment-report/colunms'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { NATIVE_COLUMNS } from '@/constant/enum'
import { cn } from '@/lib/utils'
import { ComboboxItem, Report } from '@/types'

interface ManagmentReportProps {
	publisherCode: string
	data: Report[]
	campaignData: ComboboxItem[]
	isPending: boolean
}

const ManagmentReport: FC<ManagmentReportProps> = ({
	data,
	campaignData,
	publisherCode,
	isPending
}) => {
	// #region: table
	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'createdAt',
			desc: true
		}
	])

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
		{
			id: 'managerCode',
			value: {
				publisherCode,
				type: 'all'
			}
		}
	])

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

	const [campaignFilterValue, setCampaignFilterValue] = useState<string[]>(
		campaignData.map(data => data.value)
	)

	const table = useReactTable<Report>({
		data: data,
		columns: managmentReportColumns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onColumnFiltersChange: setColumnFilters,
		state: {
			sorting,
			columnFilters,
			columnVisibility
		}
	})
	// #endregion

	// #region: Bulk filter
	const [statusFilterValue, setStatusFilterValue] = useState<string[]>([
		'APPROVED',
		'REJECTED',
		'PENDING'
	])

	useEffect(() => {
		table.getColumn('status')?.setFilterValue(statusFilterValue)
	}, [statusFilterValue, table])

	useEffect(() => {
		table.getColumn('campaignCode')?.setFilterValue(campaignFilterValue)
	}, [campaignFilterValue, table])
	// #endregion

	return (
		<div className='flex flex-col gap-y-2'>
			{/* Filter and search tool */}
			<div
				className={cn(
					'grid w-full grid-cols-2 justify-center gap-2 lg:grid-cols-4',
					{
						['hidden']: data.length === 0
					}
				)}
			>
				{/* Filter by status and payment status */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							size='sm'
							className='justify-start border-primary font-semibold text-foreground/70'
							variant='outline'
						>
							<Filter strokeWidth={3} /> Trạng thái / Loại đơn
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-80'>
						{/* Filter by order status */}
						<DropdownMenuLabel>Loại đơn</DropdownMenuLabel>
						<RadioGroup
							className='px-2 pt-2'
							defaultValue='all'
							onValueChange={value =>
								table.getColumn('managerCode')?.setFilterValue({
									publisherCode,
									type: value
								})
							}
						>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='all'
									id='r1'
								/>
								<Label htmlFor='r1'>Tất cả</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='am'
									id='r2'
								/>
								<Label htmlFor='r2'>Đơn AM</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='pub'
									id='r3'
								/>
								<Label htmlFor='r3'>Đơn cá nhân</Label>
							</div>
						</RadioGroup>
						<DropdownMenuSeparator />
						<DropdownMenuLabel>Trạng thái đơn</DropdownMenuLabel>
						<div className='flex flex-col gap-2 px-2 pt-2'>
							<div className='flex items-center gap-2'>
								<Checkbox
									defaultChecked={statusFilterValue.includes('APPROVED')}
									onCheckedChange={checked => {
										if (checked) {
											setStatusFilterValue(state => [...state, 'APPROVED'])
											return
										}

										setStatusFilterValue(state =>
											state.filter(status => status !== 'APPROVED')
										)
									}}
								/>
								<Label>Ghi nhận hoa hồng</Label>
							</div>
							<div className='flex items-center gap-2'>
								<Checkbox
									defaultChecked={statusFilterValue.includes('PENDING')}
									onCheckedChange={checked => {
										if (checked) {
											setStatusFilterValue(state => [...state, 'PENDING'])
											return
										}

										setStatusFilterValue(state =>
											state.filter(status => status !== 'PENDING')
										)
									}}
								/>
								<Label>Chưa hoàn tất đơn</Label>
							</div>
							<div className='flex items-center gap-2'>
								<Checkbox
									defaultChecked={statusFilterValue.includes('REJECTED')}
									onCheckedChange={checked => {
										if (checked) {
											setStatusFilterValue(state => [...state, 'REJECTED'])
											return
										}

										setStatusFilterValue(state =>
											state.filter(status => status !== 'REJECTED')
										)
									}}
								/>
								<Label>Từ chối</Label>
							</div>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Filter by campaign and order type */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							size='sm'
							className='justify-start border-primary font-semibold text-foreground/70'
							variant='outline'
						>
							<Filter strokeWidth={3} /> Chiến dịch
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-80'>
						<DropdownMenuLabel>Chiến dịch</DropdownMenuLabel>
						<div className='flex flex-col gap-2'>
							<div className='flex items-center gap-2'>
								<Button
									size='sm'
									onClick={() =>
										setCampaignFilterValue(campaignData.map(data => data.value))
									}
								>
									<Filter /> Chọn tất cả
								</Button>
								<Button
									size='sm'
									onClick={() => setCampaignFilterValue([])}
								>
									<FilterX /> Xoá tất cả
								</Button>
							</div>
							<div className='grid max-h-80 grid-cols-3 gap-2 overflow-y-auto px-2 pt-2'>
								{campaignData.map(campaign => (
									<div
										key={campaign.id}
										className='flex h-fit items-center gap-1 p-1.5 tracking-tight'
									>
										<Checkbox
											id={campaign.value}
											checked={campaignFilterValue.includes(campaign.value)}
											onCheckedChange={checked => {
												if (checked) {
													setCampaignFilterValue(state => [
														...state,
														campaign.value
													])
													return
												}

												setStatusFilterValue(state =>
													state.filter(status => status !== campaign.value)
												)
											}}
										/>
										<Label
											htmlFor={campaign.value}
											className='cursor-pointer'
										>
											{campaign.label}
										</Label>
									</div>
								))}
							</div>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Search by customer name and created at */}
				<Popover>
					<PopoverTrigger asChild>
						<Button
							size='sm'
							className='justify-start border-primary font-semibold text-foreground/70'
							variant='outline'
						>
							<Search strokeWidth={3} /> Tìm kiếm
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-96'>
						<div className='grid gap-4'>
							<div className='space-y-2'>
								<h4 className='font-medium leading-none'>Tìm kiếm</h4>
								<p className='text-sm text-muted-foreground'>
									Nhập dữ liệu tìm kiếm
								</p>
							</div>
							<div className='grid gap-2'>
								<div className='grid grid-cols-3 items-center gap-4'>
									<Label htmlFor='orderId'>Mã đơn</Label>
									<Input
										id='orderId'
										value={
											(table.getColumn('id')?.getFilterValue() as string) ?? ''
										}
										onChange={e => {
											table
												.getColumn('id')
												?.setFilterValue(e.currentTarget.value)
										}}
										className='col-span-2 h-8 border-primary focus-visible:outline-none focus-visible:ring-0'
									/>
								</div>
								<div className='grid grid-cols-3 items-center gap-4'>
									<Label htmlFor='publisherCode'>Mã publisher</Label>
									<Input
										id='publisherCode'
										value={
											(table
												.getColumn('publisherCode')
												?.getFilterValue() as string) ?? ''
										}
										onChange={e => {
											table
												.getColumn('publisherCode')
												?.setFilterValue(e.currentTarget.value)
										}}
										className='col-span-2 h-8 border-primary focus-visible:outline-none focus-visible:ring-0'
									/>
								</div>
								<div className='grid grid-cols-3 items-center gap-4'>
									<Label htmlFor='customerName'>Tên khách hàng</Label>
									<Input
										id='customerName'
										value={
											(table
												.getColumn('customerName')
												?.getFilterValue() as string) ?? ''
										}
										onChange={e => {
											table
												.getColumn('customerName')
												?.setFilterValue(e.currentTarget.value)
										}}
										className='col-span-2 h-8 border-primary focus-visible:outline-none focus-visible:ring-0'
									/>
								</div>
								<div className='grid grid-cols-3 items-center gap-4'>
									<Label htmlFor='createdAt'>Ngày lên đơn</Label>
									<Input
										id='createdAt'
										type='date'
										value={
											(table
												.getColumn('createdAt')
												?.getFilterValue() as string) ?? ''
										}
										onChange={e => {
											table
												.getColumn('createdAt')
												?.setFilterValue(e.currentTarget.value)
										}}
										className='col-span-2 h-8 border-primary focus-visible:outline-none focus-visible:ring-0'
									/>
								</div>
							</div>
						</div>
					</PopoverContent>
				</Popover>

				{/*  Visible column menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							size='sm'
							variant='outline'
							className='justify-start border-primary font-semibold text-foreground/70'
						>
							<Columns3 strokeWidth={3} />
							Hiển thị cột
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align='start'
						className='w-80'
					>
						{table
							.getAllColumns()
							.filter(column => column.getCanHide())
							.filter(column => column.id !== 'managerCode')
							.map(column => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										checked={column.getIsVisible()}
										onCheckedChange={value => column.toggleVisibility(!!value)}
									>
										{NATIVE_COLUMNS[column.id as keyof typeof NATIVE_COLUMNS]}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Data table */}
			<div className='h-[27rem] overflow-y-auto rounded-md border'>
				<Table className='relative overflow-x-auto'>
					<TableHeader className='sticky inset-x-0 top-0 z-30 bg-background'>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers
									.filter(header => header.id !== 'managerCode')
									.map(header => (
										<TableHead key={header.id}>
											<div className='flex flex-col gap-1'>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
											</div>
										</TableHead>
									))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row
										.getVisibleCells()
										.filter(cell => cell.column.id !== 'managerCode')
										.map(cell => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
								</TableRow>
							))
						) : isPending ? (
							<TableRow>
								<TableCell
									colSpan={managmentReportColumns.length}
									className='h-24 text-center'
								>
									Đang tải báo cáo
								</TableCell>
							</TableRow>
						) : data.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={managmentReportColumns.length}
									className='h-24 text-center'
								>
									Không tìm thấy kết quả khả dụng, vui lòng kiểm tra lại mã giới
									thiệu.
								</TableCell>
							</TableRow>
						) : (
							<TableRow>
								<TableCell
									colSpan={managmentReportColumns.length}
									className='h-24 text-center'
								>
									Không tìm thấy kết quả khả dụng
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			<div className='flex items-center justify-end space-x-2 py-2'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Trang trước
				</Button>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Tiếp theo
				</Button>
			</div>
		</div>
	)
}

export default ManagmentReport
