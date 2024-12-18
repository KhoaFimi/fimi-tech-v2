'use server'

import { promises as fs } from 'fs'

import { productsSchema } from '@/app/(main)/(pages)/campaign/_schema/product.schema'

const getProductLink = async (oid: string, productId: string) => {
	const file = await fs.readFile(
		process.cwd() + '/src/data/product-data.json',
		'utf-8'
	)

	const products = productsSchema.parse(JSON.parse(file))

	const productIdX = products.findIndex(product => product.id === productId)

	if (productIdX === -1) {
		return {
			error: 'Link giới thiệu không chính xác'
		}
	}

	const product = products[productIdX]

	console.log(product)

	return {
		data: {
			link: product.link.replace('{{orderId}}', oid)
		}
	}
}

export default getProductLink
