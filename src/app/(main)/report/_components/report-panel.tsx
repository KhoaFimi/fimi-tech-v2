'use client'

import { FC, useMemo, useState } from 'react'

import { Income, IncomeDetail } from '@/app/(main)/report/_components/income'
import { Order, OrderDetail } from '@/app/(main)/report/_components/order'
import { Report } from '@/types'

type ReportPanelProps = {
	data:
		| {
				personelRes: Report[]
				managmentRes: Report[]
		  }
		| undefined
}

type ProcessDataType = {
	order: {
		personelOrder: number
		managmentOrder: number
		approve: number
		pending: number
		reject: number
	}
	income: {
		personelIncome: number
		managmentIncome: number
		paid: number
		remain: number
	}
}

const processData = ({ data }: ReportPanelProps): ProcessDataType => {
	if (!data)
		return {
			order: {
				personelOrder: 0,
				managmentOrder: 0,
				approve: 0,
				pending: 0,
				reject: 0
			},
			income: {
				personelIncome: 0,
				managmentIncome: 0,
				paid: 0,
				remain: 0
			}
		}

	const { personelRes, managmentRes } = data

	return {
		order: {
			personelOrder: personelRes.length,
			managmentOrder: managmentRes.length,
			approve:
				personelRes.filter(res => res.status === 'APPROVED').length +
				managmentRes.filter(res => res.status === 'APPROVED').length,
			reject:
				personelRes.filter(res => res.status === 'REJECTED').length +
				managmentRes.filter(res => res.status === 'REJECTED').length,
			pending:
				personelRes.filter(res => res.status === 'PENDING').length +
				managmentRes.filter(res => res.status === 'PENDING').length
		},
		income: {
			personelIncome: personelRes.reduce(
				(total, curr) => total + curr.commision,
				0
			),
			managmentIncome:
				managmentRes.reduce((total, curr) => total + curr.commision, 0) *
				(1 / 10),
			paid:
				personelRes
					.filter(res => res.paymentStatus === 'PAID')
					.reduce((total, curr) => total + curr.commision, 0) +
				managmentRes
					.filter(res => res.paymentStatus === 'PAID')
					.reduce((total, curr) => total + curr.commision, 0) /
					10,
			remain:
				personelRes
					.filter(res => res.paymentStatus === 'REMAIN')
					.reduce((total, curr) => total + curr.commision, 0) +
				managmentRes
					.filter(res => res.paymentStatus === 'REMAIN')
					.reduce((total, curr) => total + curr.commision, 0) /
					10
		}
	}
}

const ReportPanel: FC<ReportPanelProps> = data => {
	const [openOrderDetail, setOpenOrderDetail] = useState<boolean>(false)
	const [openIncomeDetail, setOpenIncomeDetail] = useState<boolean>(false)

	const { order, income } = useMemo(() => processData(data), [data])

	return (
		<div className='flex flex-col space-y-1'>
			<div className='grid grid-cols-2 gap-x-2 gap-y-1'>
				<Order
					personelOrder={order.personelOrder}
					managmentOrder={order.managmentOrder}
					openDetail={openOrderDetail}
					setOpenDetail={setOpenOrderDetail}
				/>

				<Income
					personelIncome={income.personelIncome}
					managmentIncome={income.managmentIncome}
					openDetail={openIncomeDetail}
					setOpenDetail={setOpenIncomeDetail}
				/>

				<OrderDetail
					data={{
						approve: order.approve,
						pending: order.pending,
						reject: order.reject
					}}
					openDetail={openOrderDetail}
					setOpenDetail={setOpenOrderDetail}
				/>

				<IncomeDetail
					data={{
						paid: income.paid,
						remain: income.remain
					}}
					openDetail={openIncomeDetail}
					setOpenDetail={setOpenIncomeDetail}
				/>
			</div>
		</div>
	)
}

export default ReportPanel
