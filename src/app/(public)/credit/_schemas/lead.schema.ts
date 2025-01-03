import { z } from 'zod'

export const leadSchema = z.object({
	fullname: z.string({ required_error: 'Vui lòng nhập họ và tên' }),
	phone: z.string({ required_error: 'Vui lòng nhập số điện thoại' }),
	email: z.string({ required_error: 'Vui lòng nhập email' }),
	city: z.string().min(1, { message: 'Vui lòng chọn khu vực sinh sống' }),
	tnc: z.boolean().default(false)
})

export type LeadSchema = z.infer<typeof leadSchema>
