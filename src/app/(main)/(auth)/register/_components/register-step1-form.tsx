'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
	Building2,
	Cake,
	CalendarDays,
	House,
	IdCard,
	Loader2,
	Mail,
	Phone,
	User
} from 'lucide-react'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getCities } from '@/actions/get-citites'
import { registerStep1 } from '@/app/(main)/(auth)/register/_actions/register-step1'
import { FormWrapper } from '@/app/(main)/(auth)/register/_components/form-wrapper'
import {
	RegisterStep1Schema,
	registerStep1Schema
} from '@/app/(main)/(auth)/register/_schemas/register.schema'
import { FormError } from '@/components/form-response'
import PolicyButton from '@/components/policies/policy-button'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import FormCombobox from '@/components/ui/form-combobox'
import { Input } from '@/components/ui/input'
import { useSercurityPolicyStore } from '@/hooks/use-sercurity-policy-store'
import { useTermPolicyStore } from '@/hooks/use-term-policy-store'
import { useUserPolicyStore } from '@/hooks/use-user-policy-store'

const RegisterStep1Form: FC<{ referal: string | undefined }> = ({
	referal
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
		mutationFn: async (data: {
			values: RegisterStep1Schema
			referal: string | undefined
		}) => await registerStep1(data),
		onSuccess: data => {
			if (data.error) {
				setError(data.error)
				return
			}

			form.reset()
		}
	})

	const onSubmit = (values: RegisterStep1Schema) => {
		mutate({ values, referal })
	}

	return (
		<FormWrapper
			title='Đăng ký mã giới thiệu'
			description='Hãy cung cấp một số thông tin cơ bản để tạo mã giới thiệu'
		>
			<Form {...form}>
				<form
					autoComplete='autocomplete_off_randString'
					className='flex flex-col gap-2.5 px-2'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						name='fullname'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
									<User
										className='size-3'
										strokeWidth={3}
									/>
									<p className='leading-none'>Họ và tên</p>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										onChange={e =>
											field.onChange(e.currentTarget.value.toUpperCase())
										}
										className='border border-primary text-xs caret-primary focus-visible:outline-none focus-visible:ring-0'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid w-full grid-cols-[auto_1fr] gap-2'>
						<FormField
							name='phone'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
										<Phone
											className='size-3'
											strokeWidth={3}
										/>
										<p className='leading-none tracking-tight'>Số điện thoại</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
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
									<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
										<Mail
											className='size-3'
											strokeWidth={3}
										/>
										<p className='leading-none tracking-tight'>Email</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='grid w-full grid-cols-[auto_1fr] gap-2'>
						<FormField
							name='dateOfBirth'
							control={form.control}
							render={({ field }) => (
								<FormItem className='w-[150px]'>
									<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
										<Cake
											className='size-3'
											strokeWidth={3}
										/>
										<p className='leading-none tracking-tight'>Ngày sinh</p>
									</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											type='date'
											placeholder='Ngày sinh'
											className='border border-primary caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
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
							label={
								<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
									<House
										className='size-3'
										strokeWidth={3}
									/>
									<p className='leading-none tracking-tight'>Nơi sinh</p>
								</FormLabel>
							}
							initalData=''
							popoverClassName='w-[245px]'
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
								<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
									<IdCard
										className='size-3'
										strokeWidth={3}
									/>
									<p className='leading-none tracking-tight'>
										Số căn cước công dân
									</p>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid w-full grid-cols-[auto_1fr] gap-2'>
						<FormField
							name='dateOfIssue'
							control={form.control}
							render={({ field }) => (
								<FormItem className='w-[150px]'>
									<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
										<CalendarDays
											className='size-3'
											strokeWidth={3}
										/>
										<p className='leading-none tracking-tight'>Ngày cấp cccd</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='date'
											disabled={isPending}
											className='border border-primary text-xs caret-primary focus-visible:outline-none focus-visible:ring-0'
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
							label={
								<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
									<Building2
										className='size-3'
										strokeWidth={3}
									/>
									<p className='leading-none tracking-tight'>Nơi cấp cccd</p>
								</FormLabel>
							}
							popoverClassName='w-[245px]'
							className='w-full'
							initalData=''
							items={
								citiesData
									? [
											{
												id: '0',
												value: 'Cục cảnh sát',
												label: 'Cục cảnh sát'
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
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border border-primary bg-background p-2 shadow'>
								<FormControl>
									<Checkbox
										checked={field.value}
										disabled={isPending}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='select-none space-y-1 leading-3'>
									<FormDescription className='cursor-pointer text-justify text-xs font-medium'>
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
						size='sm'
						disabled={isPending}
						className='items-center gap-4 bg-gradient-to-tr from-primary from-30% to-secondary text-xs font-bold'
					>
						{isPending && <Loader2 className='size-5 animate-spin' />}
						Tiếp tục
					</Button>
				</form>
			</Form>

			<p className='px-2 py-2.5 text-xs'>
				Bạn đã có mã giới thiệu{' '}
				<span className='font-semibold text-primary transition hover:underline'>
					<Link href={'/login'}>Đăng nhập</Link>
				</span>
			</p>
		</FormWrapper>
	)
}

export default RegisterStep1Form
