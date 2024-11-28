import { z } from 'zod'

const isAdult = (birthDateString: string): boolean => {
	const birthdate = new Date(birthDateString)

	const today = new Date()

	let age = today.getFullYear() - birthdate.getFullYear()
	const monthDiff = today.getMonth() - birthdate.getMonth()

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthdate.getDate())
	) {
		age--
	}

	return age >= 18
}

export const registerSchema = z.object({
	fullname: z
		.string({ required_error: 'Vui lòng nhập họ và tên' })
		.min(1, { message: 'Vui lòng nhập họ và tên' }),
	gender: z
		.string({ required_error: 'Vui lòng chọn giới tính' })
		.min(1, { message: 'Vui lòng chọn giới tính' }),
	phone: z
		.string({ required_error: 'Vui lòng nhập số điện thoại' })
		.min(10, { message: 'Số điện thoại phải có 10 số' })
		.max(10, { message: 'Số điện thoại chỉ có 10 số' })
		.regex(/^\d+$/, {
			message: 'Số điện thoại chỉ bao gồm số'
		}),
	email: z
		.string({
			required_error: 'Vui lòng nhập email'
		})
		.email({
			message: 'Email không đúng định dạng'
		}),
	workAt: z.string().min(1, { message: 'Vui lòng chọn khu vực làm việc' }),
	dateOfBirth: z.string().refine(value => isAdult(value), {
		message: 'Yêu cầu trên 18 tuổi'
	}),
	placeOfBirth: z.string().min(1, { message: 'Vui lòng chọn nơi sinh' }),
	citizenIdentification: z
		.string({
			required_error: 'Vui lòng nhập cccd'
		})
		.min(12, { message: 'CCCD phải có 12 số' })
		.max(12, { message: 'CCCD chỉ có 12 số' }),
	dateOfIssue: z.string().min(1, { message: 'Vui lòng nhập ngày cấp cccd' }),
	placeOfIssue: z.string().min(1, { message: 'Vui lòng chọn nơi cấp cccd' }),
	currentAddress: z
		.string()
		.min(1, { message: 'Vui lòng nhập địa chỉ thường trú' }),
	currentWard: z.string().min(1, { message: 'Vui lòng chọn phường/xã' }),
	currentDistrict: z.string().min(1, { message: 'Vui lòng chọn quận/huyện' }),
	currentProvince: z.string().min(1, { message: 'Vui lòng chọn tỉnh/thành' }),
	bankAccountName: z
		.string()
		.min(1, { message: 'Vui lòng nhập tên tài khoản ngân hàng' }),
	bankAccountNumber: z
		.string()
		.min(1, { message: 'Vui lòng nhập số tài khoản ngân hàng' }),
	bankName: z.string().min(1, { message: 'Vui lòng chọn ngân hàng' }),
	tnc: z.boolean().default(false)
})

export const registerStep1Schema = registerSchema.pick({
	fullname: true,
	phone: true,
	email: true,
	citizenIdentification: true,
	dateOfIssue: true,
	placeOfIssue: true,
	dateOfBirth: true,
	placeOfBirth: true,
	tnc: true
})

export const registerStep2Schema = registerSchema.pick({
	gender: true,
	workAt: true,
	currentAddress: true,
	currentWard: true,
	currentDistrict: true,
	currentProvince: true
})

export const registerStep3Schema = registerSchema.pick({
	bankAccountName: true,
	bankAccountNumber: true,
	bankName: true
})

export type RegisterStep1Schema = z.infer<typeof registerStep1Schema>
export type RegisterStep2Schema = z.infer<typeof registerStep2Schema>
export type registerStep3Schema = z.infer<typeof registerStep3Schema>
