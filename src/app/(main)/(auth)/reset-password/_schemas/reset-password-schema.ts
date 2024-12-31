import { z } from 'zod'

export const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, { message: 'Mật khẩu phải có tối thiểu 8 ký tự' })
			.max(64, { message: 'Mật khẩu không quá 64 ký tự' })
			.refine(password => /[A-Z]/.test(password), {
				message: 'Mật khẩu phải có tối thiểu 1 ký tự in hoa'
			})
			.refine(password => /[a-z]/.test(password), {
				message: 'Mật khẩu phải có tối thiểu 1 ký tự in thường'
			})
			.refine(password => /[0-9]/.test(password), {
				message: 'Mật khẩu phải có 1 chữ số'
			}),
		confirmPassword: z
			.string()
			.min(1, { message: 'Vui lòng nhập lại mật khẩu' })
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'Vui lòng nhập lại chính xác mật khẩu',
		path: ['confirmPassword']
	})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
