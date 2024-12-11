'use client'

import * as _ from 'lodash'
import {
	CircleDollarSign,
	CreditCard,
	HandCoins,
	Package,
	Users
} from 'lucide-react'
import { FC } from 'react'

import CampaignItem from '@/app/(main)/(pages)/campaign/_components/campaign-item'
import { ProductsSchema } from '@/app/(main)/(pages)/campaign/_schema/product.schema'
import { PRODUCT_CATEGORY, PRODUCT_CATEGORY_DESSRIPTION } from '@/constant/enum'

const CampaignList: FC<{ products: ProductsSchema }> = ({ products }) => {
	const productsData = _.groupBy(products, product => product.category)

	return (
		<div className='container flex w-full flex-col gap-y-12 px-2 lg:px-8 lg:pt-32'>
			{_.keys(productsData).map(category => {
				const products = productsData[category]

				if (products.length < 1) return null

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

				const Icon = pickIcon(category)

				return (
					<div
						key={category}
						className='flex flex-col gap-y-2'
					>
						<div className='flex items-center gap-x-2'>
							<Icon
								className='size-9 text-primary'
								strokeWidth={3}
							/>
							<h3 className='bg-gradient-to-tr from-primary from-30% to-secondary bg-clip-text text-center text-lg font-bold uppercase text-transparent lg:text-left lg:text-2xl'>
								{
									PRODUCT_CATEGORY_DESSRIPTION[
										_.camelCase(
											category.toLowerCase()
										) as keyof typeof PRODUCT_CATEGORY_DESSRIPTION
									]
								}
							</h3>
						</div>
						<div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
							{products.map(product => (
								<CampaignItem
									key={product.id}
									product={product}
								/>
							))}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default CampaignList
