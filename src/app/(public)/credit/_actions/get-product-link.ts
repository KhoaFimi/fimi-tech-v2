'use server'

import { Base64 } from 'base64-string'
import { promises as fs } from 'fs'

import { productsSchema } from '@/app/(main)/(pages)/campaign/_schema/product.schema'
import { LeadSchema } from '@/app/(public)/credit/_schemas/lead.schema'

const getProductLink = async (
	oid: string,
	productId: string,
	values: LeadSchema,
	code: string
) => {
	const file = await fs.readFile(
		process.cwd() + '/src/data/product-data.json',
		'utf-8'
	)

	console.log(productId)

	const enc = new Base64()

	const products = productsSchema.parse(JSON.parse(file))

	const productIdX = products.findIndex(product => product.id === productId)

	if (productIdX === -1) {
		return {
			error: 'Link giới thiệu không chính xác'
		}
	}

	const product = products[productIdX]

	let link: string

	if (productId.startsWith('vpb') && productId !== 'vpbankneo') {
		const prefillInfo = enc
			.encode(
				JSON.stringify({
					name: values.fullname,
					email: values.email,
					phone: values.phone
				})
			)
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/\=/g, '.')

		link = `https://cards.fimi.tech/?click_id=${oid}&partner=Fimi_affiliate&affiliate_code=${code}&info=${prefillInfo}`

		return {
			data: {
				link
			}
		}
	}

	return {
		data: {
			link: product.link.replace('{{orderId}}', oid)
		}
	}
}

export default getProductLink
