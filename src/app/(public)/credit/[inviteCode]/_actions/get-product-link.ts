/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { Base64 } from 'base64-string'
import { promises as fs } from 'fs'

import { productsSchema } from '@/app/(main)/(pages)/campaign/_schema/product.schema'
import { ParamsSchema } from '@/schemas/invite-link-params.schema'
import { LeadSchema } from '@/schemas/lead.schema'

const getProductLink = async (
	oid: string,
	productId: string,
	info: ParamsSchema,
	values: LeadSchema
) => {
	const file = await fs.readFile(
		process.cwd() + '/src/data/product-data.json',
		'utf-8'
	)

	const enc = new Base64()

	const products = productsSchema.parse(JSON.parse(file))

	const product = products.find(product => product.id === productId)

	if (!product) {
		return {
			error: 'Link giới thiệu không chính xác'
		}
	}

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

		link = `https://cards.fimi.tech/?click_id=${oid}&partner=Fimi_affiliate&affiliate_code=${info.publisherCode}&info=${prefillInfo}`

		return {
			data: {
				link
			}
		}
	}

	link = product.link.replace('{{orderId}}', oid)

	return {
		data: {
			link
		}
	}
}

export default getProductLink
