import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { ProductSchema } from '@/app/(main)/(pages)/campaign/_schema/product.schema'
import { Button } from '@/components/ui/button'

const CampaignItem: FC<{ product: ProductSchema }> = ({ product }) => {
	return (
		<div
			className='flex w-full cursor-pointer gap-2 rounded-md border p-2 shadow-md transition-all duration-200 ease-out'
			key={product.id}
		>
			<div className='h-fit w-[200px] overflow-hidden rounded-md bg-transparent shadow-sm'>
				<Image
					src={`/card/${product.show.image}`}
					alt={product.show.image}
					width={150}
					height={320}
				/>
			</div>

			<div className='flex w-full flex-col gap-y-2'>
				<div className='flex flex-1 flex-col gap-y-1.5 rounded-md border p-1.5'>
					{product.show.limit ? (
						<p className='text-[11px]'>
							<span className='font-bold'>Hạn mức: </span>
							{product.show.limit}
						</p>
					) : null}
					{product.show.income ? (
						<p className='text-[11px]'>
							<span className='font-bold'>Doanh thu: </span>
							{product.show.income}
						</p>
					) : null}
					{product.show.paymentLimit ? (
						<p className='text-[11px]'>
							<span className='font-bold'>Hạn mức thanh toán: </span>
							{product.show.paymentLimit}
						</p>
					) : null}
					{product.show.keyFeature ? (
						<p className='text-[11px]'>
							<span className='font-bold'>Tính năng nổi bật: </span>
							{product.show.keyFeature}
						</p>
					) : null}
					<p className='text-[11px]'>
						<span className='font-bold'>Điều kiện: </span>
						{product.show.condition}
					</p>
					{product.show.anualFee ? (
						<p className='text-[11px]'>
							<span className='font-bold'>Phí thường niên: </span>
							{product.show.anualFee}
						</p>
					) : null}
					{product.show.fee ? (
						<p className='text-[11px]'>
							<span className='font-bold'>Phí: </span>
							{product.show.fee}
						</p>
					) : null}
				</div>
				<Button asChild>
					<Link href={`/campaign/${product.id}`}>Giới thiệu ngay</Link>
				</Button>
			</div>
		</div>
	)
}

export default CampaignItem
