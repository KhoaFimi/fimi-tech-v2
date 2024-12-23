'use client'

import { useQuery } from '@tanstack/react-query'
import {
	ChevronDown,
	CircleDollarSign,
	CreditCard,
	HandCoins,
	Loader2,
	Package,
	ShieldAlert,
	Users
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { getProducts } from '@/app/(main)/(pages)/campaign/_actions/get-products'
import CampaignList from '@/app/(main)/(pages)/campaign/_components/campaign-list'
import { PRODUCT_CATEGORY, PRODUCT_CATEGORY_DESSRIPTION } from '@/constant/enum'
import { cn } from '@/lib/utils'

const CampaignScreen = () => {
	const [category, setCategory] = useState<PRODUCT_CATEGORY>(
		PRODUCT_CATEGORY.all
	)

	const { data, status } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts
	})

	if (status === 'pending')
		return (
			<div className='flex h-[calc(100vh-100px)] w-full items-center justify-center'>
				<div className='flex flex-col items-center justify-center gap-y-2'>
					<Loader2 className='size-8 animate-spin text-foreground/70' />
					<p className='font-semibold text-foreground/70'>
						Đang tải chiến dịch
					</p>
				</div>
			</div>
		)

	if (status === 'error')
		return (
			<div className='flex h-[calc(100vh-100px)] w-full items-center justify-center'>
				<div className='flex flex-col items-center justify-center gap-y-2'>
					<ShieldAlert className='size-8 text-destructive/70' />
					<p className='font-semibold text-destructive/70'>
						Lối hệ thống, vui lòng thử lại sau
					</p>
				</div>
			</div>
		)

	return (
		<div className='relative flex flex-col items-center gap-y-4 px-4 pb-4 pt-6 lg:px-0'>
			<div className='container mx-auto flex flex-col items-center justify-center overflow-hidden rounded-lg lg:h-screen'>
				<Image
					src='/bg-img.svg'
					width={1450}
					height={600}
					alt='bg'
				/>
				<ChevronDown className='hidden size-10 animate-bounce text-foreground/70 lg:block' />
			</div>

			<div className='sticky inset-x-0 top-12 z-50 hidden w-full overflow-x-auto bg-gradient-to-r from-primary from-30% to-secondary px-2 py-1.5 shadow-md lg:block lg:px-8'>
				<div className='container mx-auto flex items-center gap-x-4'>
					<h4 className='rounded-md bg-white p-2 text-sm font-semibold leading-none text-black'>
						Chiến dịch
					</h4>
					<div className='flex items-center space-x-4 divide-x-2'>
						{Object.keys(PRODUCT_CATEGORY_DESSRIPTION).map(key => (
							<button
								key={key}
								onClick={() => {
									setCategory(
										PRODUCT_CATEGORY[key as keyof typeof PRODUCT_CATEGORY]
									)
								}}
								className={cn(
									'truncate pl-2 text-sm font-semibold text-white decoration-[1.5px] underline-offset-4 hover:underline',
									{
										['underline']:
											PRODUCT_CATEGORY[key as keyof typeof PRODUCT_CATEGORY] ===
											category
									}
								)}
							>
								{
									PRODUCT_CATEGORY_DESSRIPTION[
										key as keyof typeof PRODUCT_CATEGORY_DESSRIPTION
									]
								}
							</button>
						))}
					</div>
				</div>
			</div>

			<div className='fixed inset-x-0 bottom-0 z-50 w-full rounded-t-3xl bg-primary px-2 pb-4 pt-2 backdrop-blur-md lg:hidden'>
				<div className='flex items-center justify-evenly space-x-4'>
					<button
						onClick={() => setCategory(PRODUCT_CATEGORY.creditCard)}
						className={cn(
							'flex size-10 select-none flex-col items-center justify-center rounded-md object-contain p-1 text-white',
							{
								'bg-white text-primary':
									category === PRODUCT_CATEGORY.creditCard
							}
						)}
					>
						<CreditCard className='size-7' />
					</button>

					<button
						onClick={() => setCategory(PRODUCT_CATEGORY.loan)}
						className={cn(
							'flex size-10 select-none flex-col items-center justify-center rounded-md object-contain p-1 text-white',
							{
								'bg-white text-primary': category === PRODUCT_CATEGORY.loan
							}
						)}
					>
						<HandCoins className='size-7' />
					</button>

					<button
						onClick={() => setCategory(PRODUCT_CATEGORY.all)}
						className={cn(
							'flex size-10 select-none flex-col items-center justify-center rounded-md object-contain p-1 text-white',
							{
								'bg-white text-primary': category === PRODUCT_CATEGORY.all
							}
						)}
					>
						<Package className='size-7' />
					</button>

					<button
						onClick={() => setCategory(PRODUCT_CATEGORY.paymentAccount)}
						className={cn(
							'flex size-10 select-none flex-col items-center justify-center rounded-md object-contain p-1 text-white',
							{
								'bg-white text-primary':
									category === PRODUCT_CATEGORY.paymentAccount
							}
						)}
					>
						<CircleDollarSign className='size-7' />
					</button>

					<button
						onClick={() => setCategory(PRODUCT_CATEGORY.recruitment)}
						className={cn(
							'flex size-10 select-none flex-col items-center justify-center rounded-md object-contain p-1 text-white',
							{
								'bg-white text-primary':
									category === PRODUCT_CATEGORY.recruitment
							}
						)}
					>
						<Users className='size-7' />
					</button>
				</div>
			</div>

			<CampaignList
				products={
					category === PRODUCT_CATEGORY.all
						? data
						: data.filter(product => product.category === category)
				}
			/>
		</div>
	)
}

export default CampaignScreen
