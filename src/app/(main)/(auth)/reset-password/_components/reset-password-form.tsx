'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2, LockKeyhole, RectangleEllipsis } from 'lucide-react'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormWrapper } from '@/app/(main)/(auth)/register/_components/form-wrapper'
import { checkLegitToken } from '@/app/(main)/(auth)/reset-password/_action/check-legit-token'
import { resetPassword } from '@/app/(main)/(auth)/reset-password/_action/reset-password'
import {
	ResetPasswordSchema,
	resetPasswordSchema
} from '@/app/(main)/(auth)/reset-password/_schemas/reset-password-schema'
import { FormError } from '@/components/form-response'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface ResetPasswordFormProps {
	token: string
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ token }) => {
	const form = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: ''
		}
	})

	const [error, setError] = useState<string | undefined>(undefined)

	const { status } = useQuery({
		queryKey: ['is-legit-token', token],
		queryFn: async () => await checkLegitToken(token)
	})

	const { isPending, mutate } = useMutation({
		mutationFn: async ({
			token,
			values
		}: {
			token: string
			values: ResetPasswordSchema
		}) => await resetPassword(token, values),
		onSuccess: data => {
			if (data.error) {
				setError(data.error)
			}
		}
	})

	const onSubmit = (values: ResetPasswordSchema) => {
		mutate({ token, values })
	}

	if (status === 'pending')
		return (
			<div className='flex h-full w-full flex-col items-center justify-center space-y-4 text-foreground/50'>
				<Loader2 className='size-8 animate-spin' />
				<p className='text-sm font-medium'>Đang xác thực</p>
			</div>
		)

	if (status === 'success') {
		return (
			<FormWrapper title='Tạo mật khẩu mới'>
				<Form {...form}>
					<form
						autoComplete='autocomplete_off_randString'
						className='flex flex-col gap-2.5 px-2 pt-4'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							name='password'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
										<LockKeyhole
											className='size-3'
											strokeWidth={3}
										/>
										<p className='leading-none'>Mật khẩu</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='password'
											disabled={isPending}
											className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='confirmPassword'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
										<RectangleEllipsis
											className='size-3'
											strokeWidth={3}
										/>
										<p className='leading-none'>Xác nhận mật khẩu</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='password'
											disabled={isPending}
											className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormError message={error} />

						<Button
							type='submit'
							size='sm'
							className='items-center gap-4 bg-gradient-to-tr from-primary from-30% to-secondary text-xs font-bold'
						>
							{isPending && <Loader2 className='size-5 animate-spin' />}
							Tiếp tục
						</Button>
					</form>
				</Form>
			</FormWrapper>
		)
	}

	return null
}

export default ResetPasswordForm
