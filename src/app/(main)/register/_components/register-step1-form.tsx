'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getCities } from '@/actions/get-citites'
import { registerStep1 } from '@/app/(main)/register/_actions/register-step1'
import { FormWrapper } from '@/app/(main)/register/_components/form-wrapper'
import {
	RegisterStep1Schema,
	registerStep1Schema
} from '@/app/(main)/register/_schemas/register.schema'
import { FormError } from '@/components/form-response'
import PolicyButton from '@/components/policies/policy-button'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DateInput } from '@/components/ui/date-input'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import FormCombobox from '@/components/ui/form-combobox'
import { Input } from '@/components/ui/input'
import { useSercurityPolicyStore } from '@/hooks/use-sercurity-policy-store'
import { useTermPolicyStore } from '@/hooks/use-term-policy-store'
import { useUserPolicyStore } from '@/hooks/use-user-policy-store'

const RegisterStep1Form: FC<{ referral: string | undefined }> = ({
	referral
}) => {
	const { onOpen: onOpenSercutiryPolicy } = useSercurityPolicyStore()
	const { onOpen: onOpenTermPolicy } = useTermPolicyStore()
	const { onOpen: onOpenUserPolicy } = useUserPolicyStore()

	const form = useForm<RegisterStep1Schema>({
		resolver: zodResolver(registerStep1Schema),
		defaultValues: {
			fullname: '',
			email: '',
			phone: '',
			dateOfBirth: '',
			placeOfBirth: '',
			citizenIdentification: '',
			dateOfIssue: '',
			placeOfIssue: '',
			tnc: false
		}
	})

	const [error, setError] = useState<string | undefined>(undefined)

	const { data: citiesData, isPending: getCitiesPending } = useQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (
			values: RegisterStep1Schema & { referral: string | undefined }
		) => await registerStep1(values),
		onSuccess: data => {
			if (data.error) {
				setError(data.error)
				return
			}

			form.reset()
		}
	})

	const onSubmit = (values: RegisterStep1Schema) => {
		mutate({ ...values, referral })
	}

	return (
		<FormWrapper
			title='Đăng ký mã giới thiệu'
			description='Hãy cung cấp một số thông tin cơ bản để tạo mã giới thiệu'
		>
			<Form {...form}>
				<form
					autoComplete='autocomplete_off_randString'
					className='flex flex-col gap-5 px-2 pt-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						name='fullname'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										onChange={e =>
											field.onChange(e.currentTarget.value.toUpperCase())
										}
										className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
										placeholder='Họ và tên'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='phone'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
										placeholder='Số điện thoại'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='email'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
										placeholder='Email'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid w-full grid-cols-2 gap-2'>
						<FormField
							name='dateOfBirth'
							control={form.control}
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormControl>
										<DateInput
											disabled={isPending}
											placeholder='Ngày sinh'
											className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormCombobox
							name='placeOfBirth'
							control={form.control}
							form={form}
							className='w-full'
							initalData='Khu vực làm việc'
							items={
								citiesData
									? citiesData.map(city => ({
											id: city.id,
											value: city.full_name,
											label: city.full_name
										}))
									: []
							}
							isLoading={isPending || getCitiesPending}
							isMessage
						/>
					</div>

					<FormField
						name='citizenIdentification'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
										placeholder='Căn cước công dân'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid w-full grid-cols-2 gap-2'>
						<FormField
							name='dateOfIssue'
							control={form.control}
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormControl>
										<DateInput
											{...field}
											disabled={isPending}
											className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
											placeholder='Ngày cấp cccd'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormCombobox
							name='placeOfIssue'
							control={form.control}
							form={form}
							className='w-full'
							initalData='Nơi phát hành'
							items={
								citiesData
									? [
											{
												id: '0',
												value: 'Cục cảnh sát quản lý về trật tự xá hội',
												label: 'Cục cảnh sát quản lý về trật tự xá hội'
											},
											...citiesData.map(city => ({
												id: city.id,
												value: city.full_name,
												label: city.full_name
											}))
										]
									: []
							}
							isLoading={isPending || getCitiesPending}
							isMessage
						/>
					</div>

					<FormField
						name='tnc'
						control={form.control}
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border border-primary bg-background p-4 shadow'>
								<FormControl>
									<Checkbox
										checked={field.value}
										disabled={isPending}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='select-none space-y-1 leading-3'>
									<FormDescription className='cursor-pointer text-justify text-xs font-semibold'>
										Bằng việc cung cấp thông tin, bạn đã đồng ý với{' '}
										<PolicyButton onOpen={onOpenSercutiryPolicy}>
											Điều khoản sử dụng dịch vụ FIMI
										</PolicyButton>
										,{' '}
										<PolicyButton onOpen={onOpenTermPolicy}>
											Chính sách bảo vệ dữ liệu cá nhân
										</PolicyButton>{' '}
										và{' '}
										<PolicyButton onOpen={onOpenUserPolicy}>
											Thông báo bảo mật của chúng tôi
										</PolicyButton>
										.
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>

					<FormError message={error} />

					<Button
						type='submit'
						disabled={!form.getFieldState('tnc').isDirty || isPending}
						className='items-center gap-4 bg-gradient-to-tr from-primary from-30% to-secondary font-bold'
					>
						{isPending && <Loader2 className='size-5 animate-spin' />}
						Tiếp tục
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

export default RegisterStep1Form
