'use client'

import _ from 'lodash'
import {
	CircleDollarSign,
	Clock,
	CreditCard,
	DollarSign,
	HandCoins,
	Package,
	Users
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { ProductSchema } from '@/app/(main)/(pages)/campaign/_schema/product.schema'
import { PRODUCT_CATEGORY, PRODUCT_CATEGORY_DESSRIPTION } from '@/constant/enum'

const CampaignItem: FC<{ product: ProductSchema }> = ({ product }) => {
	const pickIcon = (category: string) => {
		switch (category) {
			case PRODUCT_CATEGORY.creditCard:
				return CreditCard
			case PRODUCT_CATEGORY.all:
				return HandCoins
			case PRODUCT_CATEGORY.paymentAccount:
				return CircleDollarSign
			case PRODUCT_CATEGORY.recruitment:
				return Users
			default:
				return Package
		}
	}

	const Icon = pickIcon(product.category)

	return (
		// <div
		// 	className='flex w-full cursor-pointer gap-2 rounded-md border p-2 shadow-md transition-all duration-200 ease-out'
		// 	key={product.id}
		// >
		// 	<div className='h-fit w-[200px] overflow-hidden rounded-lg border bg-transparent shadow-sm'>
		// 		<Image
		// 			src={`/card/${product.show.image}`}
		// 			alt={product.show.image}
		// 			width={150}
		// 			height={320}
		// 		/>
		// 	</div>

		// 	<div className='flex w-full flex-col gap-y-2'>
		// 		<div className='flex flex-1 flex-col gap-y-1.5 rounded-md border p-1.5'>
		// 			{product.show.limit ? (
		// 				<p className='text-[11px]'>
		// 					<span className='font-bold'>Hạn mức: </span>
		// 					{product.show.limit}
		// 				</p>
		// 			) : null}
		// 			{product.show.income ? (
		// 				<p className='text-[11px]'>
		// 					<span className='font-bold'>Doanh thu: </span>
		// 					{product.show.income}
		// 				</p>
		// 			) : null}
		// 			{product.show.paymentLimit ? (
		// 				<p className='text-[11px]'>
		// 					<span className='font-bold'>Hạn mức thanh toán: </span>
		// 					{product.show.paymentLimit}
		// 				</p>
		// 			) : null}
		// 			{product.show.keyFeature ? (
		// 				<p className='text-[11px]'>
		// 					<span className='font-bold'>Tính năng nổi bật: </span>
		// 					{product.show.keyFeature}
		// 				</p>
		// 			) : null}
		// 			<p className='text-[11px]'>
		// 				<span className='font-bold'>Điều kiện: </span>
		// 				{product.show.condition}
		// 			</p>
		// 			{/* {product.show.anualFee ? (
		// 				<p className='text-[11px]'>
		// 					<span className='font-bold'>Phí thường niên: </span>
		// 					{product.show.anualFee}
		// 				</p>
		// 			) : null}
		// 			{product.show.fee ? (
		// 				<p className='text-[11px]'>
		// 					<span className='font-bold'>Phí: </span>
		// 					{product.show.fee}
		// 				</p>
		// 			) : null} */}
		// 		</div>
		// 		<Button asChild>
		// 			<Link href={`/campaign/${product.id}`}>Giới thiệu ngay</Link>
		// 		</Button>
		// 	</div>
		// </div>
		<Link
			href={`/campaign/${product.id}`}
			className='relative flex h-64 w-[164px] overflow-hidden rounded-xl border bg-white/80 shadow'
		>
			<Image
				src={`/card/${product.show.image}`}
				alt={product.show.image}
				width={176}
				height={256}
				className='absolute z-0 object-contain'
			/>
			<div className='absolute inset-0 bottom-0 h-full w-full bg-black/45 transition-all' />

			<div className='z-30 mt-auto flex h-[35%] w-full select-none flex-col gap-y-1 bg-white p-1 pt-2'>
				<p className='truncate text-[12px] font-semibold leading-none tracking-tight text-primary'>
					{product.name}
				</p>
				<div className='flex items-center gap-x-0.5'>
					<small className='text-[9px] font-bold leading-none text-foreground/70'>
						{
							PRODUCT_CATEGORY_DESSRIPTION[
								_.camelCase(
									product.category.toLowerCase()
								) as keyof typeof PRODUCT_CATEGORY_DESSRIPTION
							]
						}
					</small>
					<Icon
						className='size-3 text-foreground/70'
						strokeWidth={3}
					/>
				</div>
				<div className='mt-1 flex flex-col gap-y-1 pl-0.5'>
					<div className='flex items-center gap-x-0.5'>
						<DollarSign
							className='size-3 text-primary'
							strokeWidth={3}
						/>
						<p className='text-xs font-semibold text-primary/85'>
							Hoa hồng:{' '}
							{product.show.commision ?? (
								<span className='underline'>Chi tiết</span>
							)}
						</p>
					</div>
					<div className='flex items-center gap-x-0.5'>
						<Clock
							className='size-3 text-primary'
							strokeWidth={3}
						/>
						<p className='text-xs font-semibold text-primary/85'>
							Phê duyệt: {product.show.approvalTime}
						</p>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default CampaignItem
