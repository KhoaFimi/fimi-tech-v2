'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2, LockKeyhole, RectangleEllipsis } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { sendMailToNewUser } from '@/actions/send-new-user-mail'
import { registrerStep4 } from '@/app/(main)/(auth)/register/_actions/register-step4'
import { FormWrapper } from '@/app/(main)/(auth)/register/_components/form-wrapper'
import {
	RegisterStep4Schema,
	registerStep4Schema
} from '@/app/(main)/(auth)/register/_schemas/register.schema'
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
import { useRegisterSuccess } from '@/hooks/use-register-success'

const RegisterStep4Form: FC<{ id: string | undefined }> = ({ id }) => {
	const router = useRouter()

	const [error, setError] = useState<string | undefined>(undefined)
	const { onOpen, setData } = useRegisterSuccess()

	if (!id) {
		router.push('/register?step=1')
	}

	const form = useForm<RegisterStep4Schema>({
		resolver: zodResolver(registerStep4Schema),
		defaultValues: {
			password: '',
			confirmPassword: ''
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			id,
			values
		}: {
			id: string | undefined
			values: RegisterStep4Schema
		}) => await registrerStep4(values, id),
		onSuccess: async data => {
			if (data.error) {
				setError(data.error)
				return
			}

			if (data.data) {
				form.reset()
				setData(data.data)
				onOpen()
				await sendMailToNewUser(data.data)
			}
		}
	})

	const onSubmit = (values: RegisterStep4Schema) => {
		mutate({ id, values })
	}

	return (
		<FormWrapper
			title='Đăng ký mã giới thiệu'
			description='Thông tin ngân hàng'
		>
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

export default RegisterStep4Form
