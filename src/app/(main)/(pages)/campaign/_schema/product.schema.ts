import { z } from 'zod'

import { PRODUCT_CATEGORY } from '@/constant/enum'

export const productSchema = z.object({
	id: z.string(),
	category: z.nativeEnum(PRODUCT_CATEGORY),
	name: z.string(),
	advertiser: z.string(),
	link: z.string(),
	show: z.object({
		image: z.string(),
		limit: z.string().optional().nullish(),
		paymentLimit: z.string().optional().nullish(),
		condition: z.string(),
		keyFeature: z.string(),
		anualFee: z.string().optional().nullish(),
		fee: z.string().optional().nullish()
	}),
	productOffer: z.array(
		z.object({
			summary: z.string(),
			offer: z.array(z.string())
		})
	),
	customerRequirement: z.string(),
	supportArea: z.union([z.string(), z.array(z.string())]),
	creditBackground: z.string().optional().nullish(),
	workBackground: z.string().optional().nullish(),
	income: z.string().optional().nullish(),
	cardLimit: z.string().optional().nullish(),
	dailyCashLimit: z.string().optional().nullish(),
	cardValidTime: z.string().optional().nullish(),
	paymentTerm: z.string().optional().nullish(),
	requiredDocuments: z.string(),
	approvalTime: z.string(),
	finalResultTime: z.string(),
	commisionPolicy: z.object({
		status: z.string(),
		description: z.string(),
		commision: z.array(z.string()),
		note: z.string().optional().nullish()
	}),
	recognitionRules: z.object({
		summary: z.string(),
		rules: z.array(z.string()),
		note: z.string().optional().nullish()
	}),
	registrationProcess: z.array(z.string()),
	rejectReason: z.array(z.string()),
	unqualifiedRecords: z.array(z.string())
})

export const productsSchema = z.array(productSchema)

export type ProductSchema = z.infer<typeof productSchema>
export type ProductsSchema = z.infer<typeof productsSchema>
