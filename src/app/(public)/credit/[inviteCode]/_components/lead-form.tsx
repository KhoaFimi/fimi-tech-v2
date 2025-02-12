'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Building2, Loader2, Mail, Phone, User } from 'lucide-react'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getCities } from '@/actions/get-citites'
import { addLead } from '@/app/(public)/credit/[inviteCode]/_actions/add-lead'
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
import { ParamsSchema } from '@/schemas/invite-link-params-schema'
import { LeadSchema, leadSchema } from '@/schemas/lead-schema'

const LeadForm: FC<ParamsSchema> = ({
	publisherCode,
	managerCode,
	product
}) => {
	const [error, setError] = useState<string | undefined>(undefined)

	const { onOpen: onOpenSercutiryPolicy } = useSercurityPolicyStore()
	const { onOpen: onOpenTermPolicy } = useTermPolicyStore()
	const { onOpen: onOpenUserPolicy } = useUserPolicyStore()

	const form = useForm<LeadSchema>({
		resolver: zodResolver(leadSchema),
		defaultValues: {
			fullname: '',
			city: '',
			email: '',
			phone: '',
			tnc: false
		}
	})

	const { data: citiesData, isPending: getCitiesPending } = useQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			values,
			info
		}: {
			values: LeadSchema
			info: ParamsSchema
		}) =>
			await addLead({
				values,
				info
			}),
		onSuccess: data => {
			if (data?.error) {
				setError(data?.error)
				return
			}
		}
	})

	const onSubmit = (values: LeadSchema) => {
		mutate({
			values,
			info: {
				publisherCode,
				managerCode,
				product
			}
		})
	}

	return (
		<div className='mt-8 px-2'>
			<div className='relative flex flex-col gap-4 pb-10 pt-6'>
				<Image
					src='/fill.png'
					alt='fill'
					width={6642}
					height={8802}
					className='absolute right-4 top-5 z-40 w-20'
				/>
				<h3 className='bg-gradient-to-r from-secondary to-accent bg-clip-text text-xl font-bold uppercase leading-none tracking-tight text-transparent'>
					Đăng ký mở thẻ ngay
				</h3>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<div className='flex flex-col space-y-4 rounded-xl bg-gradient-to-tr from-primary from-30% to-secondary px-2 pb-3 pt-6 shadow-lg'>
							<FormField
								name='fullname'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
											<User
												className='size-5'
												strokeWidth={3}
											/>
											<p>Họ và tên</p>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												onChange={e =>
													field.onChange(e.currentTarget.value.toUpperCase())
												}
												className='border border-primary bg-background caret-primary focus-visible:outline-none focus-visible:ring-0'
												placeholder='Nguyễn Văn A'
											/>
										</FormControl>
										<FormMessage className='text-white/40' />
									</FormItem>
								)}
							/>

							<FormField
								name='email'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
											<Mail
												className='size-5'
												strokeWidth={3}
											/>
											<p>Email</p>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												className='border border-primary bg-background caret-primary focus-visible:outline-none focus-visible:ring-0'
												placeholder='a.nguyenvan@gmail.com'
											/>
										</FormControl>
										<FormMessage className='text-white/40' />
									</FormItem>
								)}
							/>

							<FormField
								name='phone'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
											<Phone
												className='size-5'
												strokeWidth={3}
											/>
											<p>Số điện thoại</p>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												className='border border-primary bg-background caret-primary focus-visible:outline-none focus-visible:ring-0'
												placeholder='091xxxx900'
											/>
										</FormControl>
										<FormMessage className='text-white/40' />
									</FormItem>
								)}
							/>

							<FormCombobox
								name='city'
								control={form.control}
								className='w-full'
								popoverClassName='w-[365px]'
								form={form}
								initalData='Tỉnh/Thành'
								label={
									<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
										<Building2
											className='size-5'
											strokeWidth={3}
										/>
										<p>Khu vực sinh sống</p>
									</FormLabel>
								}
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

							<div className='w-full pt-2'>
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
														Thông báo bảo mật
													</PolicyButton>{' '}
													của chúng tôi.
												</FormDescription>
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<FormError message={error} />

						<div className='flex w-full justify-center'>
							<Button
								type='submit'
								disabled={!form.getFieldState('tnc').isDirty || isPending}
								className='w-[15rem] items-center justify-center gap-4 rounded-full bg-gradient-to-tr from-primary from-30% to-secondary font-bold'
							>
								{isPending && <Loader2 className='size-5 animate-spin' />}
								Mở thẻ ngay
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default LeadForm
