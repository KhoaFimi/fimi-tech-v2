import { z } from 'zod'

export const leadSchema = z.object({
	fullname: z.string({ required_error: 'Vui lòng nhập họ và tên' }),
	phone: z.string({ required_error: 'Vui lòng nhập số điện thoại' }),
	email: z.string({ required_error: 'Vui lòng nhập email' }),
	city: z.string().min(1, { message: 'Vui lòng chọn khu vực sinh sống' }),
	tnc: z.boolean().default(false),
	sunlifeTnc: z.boolean().default(false),
	sunlifeQuestion: z.array(z.string()),
	sunlifeApproach: z.enum(['Tham gia ngay', 'Tìm hiểu thêm'])
})

export type LeadSchema = z.infer<typeof leadSchema>

export const loanLeadSchema = leadSchema.extend({
	loanPackage: z
		.string()
		.min(1, { message: 'Vui lòng chọn Gói vay' })
		.nullish(),
	contactTime: z.date().optional(),
	loanAmmount: z
		.string()
		.min(1, { message: 'Vui lòng nhập khoản vay mong muốn' })
		.nullish(),
	loanTerm: z
		.string()
		.min(1, { message: 'Vui lòng chọn thời hạn vay' })
		.nullish()
})

export type LoanLeadSchema = z.infer<typeof loanLeadSchema>
