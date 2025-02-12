import { z } from 'zod'

export const paramsSchema = z.object({
	publisherCode: z.string(),
	managerCode: z.string(),
	product: z.string()
})

export const parmasAndOidSchema = paramsSchema.extend({
	oid: z.string()
})

export type ParamsSchema = z.infer<typeof paramsSchema>
export type ParamsAndOidSchema = z.infer<typeof parmasAndOidSchema>
