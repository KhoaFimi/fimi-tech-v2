'use client'

import { Archive, Ban, CheckCircle, Clock7, User, Users } from 'lucide-react'
import { FC } from 'react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'

type ReportPanelProps = {
	order: {
		total: number
		amOrder: number
		pubOrder: number
		approved: number
		rejected: number
		pending: number
	}

	commision: {
		pub: number
		am: number
		total: number
		remain: number
		paid: number
	}
}

const ReportPanel: FC<ReportPanelProps> = ({ order, commision }) => {
	return (
		<div className='flex flex-col space-y-1'>
			<div className='grid grid-cols-2 gap-x-2 gap-y-1'>
				<div className='flex flex-col gap-2 rounded-lg border p-2 shadow-md'>
					<h5 className='bg-gradient-to-tr from-primary from-30% to-secondary bg-clip-text text-center text-sm font-bold uppercase text-transparent'>
						Đơn hàng
					</h5>
					<Accordion
						type='single'
						defaultValue='item-1'
						collapsible
						className='w-full'
					>
						<AccordionItem value='item-1'>
							<AccordionTrigger>Tổng đơn: {order.total}</AccordionTrigger>
							<AccordionContent>
								<ul className='space-y-1.5'>
									<li className='flex items-start gap-1'>
										<User className='size-4' />
										<p>
											Đơn cá nhân:{' '}
											<span className='font-semibold text-primary'>
												{order.pubOrder}
											</span>{' '}
										</p>
									</li>
									<li className='flex items-start gap-1'>
										<Users className='size-4' />
										Đơn AM:{' '}
										<span className='font-semibold text-primary'>
											{order.amOrder}
										</span>{' '}
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-2'>
							<AccordionTrigger>Tình trạng đơn</AccordionTrigger>
							<AccordionContent>
								<ul className='space-y-1.5'>
									<li className='flex items-start gap-1'>
										<CheckCircle className='size-4 text-green-500' />
										<p>
											<span className='font-semibold text-green-500'>
												{order.approved}
											</span>{' '}
										</p>
									</li>
									<li className='flex items-start gap-1'>
										<Clock7 className='size-4 text-blue-500' />
										<span className='font-semibold text-blue-500'>
											{order.pending}
										</span>{' '}
									</li>
									<li className='flex items-start gap-1'>
										<Ban className='size-4 text-primary' />
										<span className='font-semibold text-primary'>
											{order.pending}
										</span>{' '}
									</li>
								</ul>
								<div className='mt-1 flex flex-col gap-y-1 rounded-md border p-2'>
									<div className='flex items-start gap-0.5'>
										<CheckCircle className='size-3' />
										<p className='text-xs'>: Ghi nhận hoa hồng</p>
									</div>
									<div className='flex items-start gap-0.5'>
										<Clock7 className='size-3' />
										<p className='text-xs'>: Chưa hoàn thành đơn</p>
									</div>
									<div className='flex items-start gap-0.5'>
										<Ban className='size-3' />
										<p className='text-xs'>: Từ chối</p>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				{/* commision */}
				<div className='flex flex-col gap-2 rounded-lg border p-2 shadow-md'>
					<h5 className='bg-gradient-to-tr from-primary from-30% to-secondary bg-clip-text text-center text-sm font-bold uppercase text-transparent'>
						Doanh thu
					</h5>
					<Accordion
						type='single'
						defaultValue='item-1'
						collapsible
						className='w-full'
					>
						<AccordionItem value='item-1'>
							<AccordionTrigger>
								Tổng:{' '}
								{commision.total.toLocaleString('vi-VN', {
									style: 'currency',
									currency: 'VND'
								})}
							</AccordionTrigger>
							<AccordionContent>
								<ul className='space-y-1.5'>
									<li className='flex items-start gap-1'>
										<User className='size-4' />
										<p>
											Cá nhân:{' '}
											<span className='text-[0.8rem] font-semibold tracking-tight text-primary'>
												{commision.pub.toLocaleString('vi-VN', {
													style: 'currency',
													currency: 'VND'
												})}
											</span>{' '}
										</p>
									</li>
									<li className='flex items-start gap-1'>
										<Users className='size-4' />
										AM:{' '}
										<span className='text-[0.8rem] font-semibold tracking-tight text-primary'>
											{commision.am.toLocaleString('vi-VN', {
												style: 'currency',
												currency: 'VND'
											})}
										</span>{' '}
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-2'>
							<AccordionTrigger>Thanh toán</AccordionTrigger>
							<AccordionContent>
								<ul className='space-y-1.5'>
									<li className='flex items-start gap-1'>
										<CheckCircle className='size-4 text-green-500' />
										<p>
											<span className='font-semibold text-green-500'>
												{commision.paid.toLocaleString('vi-VN', {
													style: 'currency',
													currency: 'VND'
												})}
											</span>{' '}
										</p>
									</li>
									<li className='flex items-start gap-1'>
										<Archive className='size-4 text-yellow-500' />
										<span className='font-semibold text-yellow-500'>
											{commision.remain.toLocaleString('vi-VN', {
												style: 'currency',
												currency: 'VND'
											})}
										</span>{' '}
									</li>
								</ul>
								<div className='mt-1 flex flex-col gap-y-1 rounded-md border p-2'>
									<div className='flex items-start gap-0.5'>
										<CheckCircle className='size-3' />
										<p className='text-xs'>: Đã thanh toán</p>
									</div>
									<div className='flex items-start gap-0.5'>
										<Archive className='size-3' />
										<p className='text-xs'>: Chưa thanh toán</p>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	)
}

export default ReportPanel
