'use server'
import { promises as fs } from 'fs'

import { productsSchema } from '@/app/(main)/(pages)/campaign/_schema/product.schema'

export const getProductById = async (productId: string) => {
	const file = await fs.readFile(
		process.cwd() + '/src/data/product-data.json',
		'utf-8'
	)

	const products = productsSchema.parse(JSON.parse(file))

	return products.find(product => product.id === productId)
}
