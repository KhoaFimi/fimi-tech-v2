'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import {
	Building2,
	Clock2,
	Loader2,
	Mail,
	Package2,
	Phone,
	User
} from 'lucide-react'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getCities } from '@/actions/get-citites'
import { FormError } from '@/components/form-response'
import LeadFormWrapper from '@/components/lead-form-wrapper'
import PolicyButton from '@/components/policies/policy-button'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatetimePicker } from '@/components/ui/datetime-picker'
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
import { ParamsSchema } from '@/schemas/invite-link-params.schema'
import {
	LeadSchema,
	LoanLeadSchema,
	loanLeadSchema
} from '@/schemas/lead.schema'
import { ComboboxItem } from '@/types'

const loanPackages: ComboboxItem[] = [
	{
		id: '1',
		label: 'Vay theo lương',
		value: 'Vay theo lương'
	},
	{
		id: '2',
		label: 'Vay theo bảo hiểm nhân thọ',
		value: 'Vay theo bảo hiểm nhân thọ'
	},
	{
		id: '3',
		label: 'Vay theo tài khoản ngân hàng',
		value: 'Vay theo tài khoản ngân hàng'
	},
	{
		id: '4',
		label: 'Vay theo lịch sử tín dụng',
		value: 'Vay theo lịch sử tín dụng'
	}
]

const loanTerm: ComboboxItem[] = [
	{
		id: '1',
		label: '12 Tháng',
		value: '12'
	},
	{
		id: '2',
		label: '18 Tháng',
		value: '18'
	},
	{
		id: '3',
		label: '24 Tháng',
		value: '24'
	},
	{
		id: '4',
		label: '36 Tháng',
		value: '36'
	}
]

const Leadform: FC<ParamsSchema> = () => {
	const [error, _setError] = useState<string | undefined>(undefined)

	const { onOpen: onOpenSercutiryPolicy } = useSercurityPolicyStore()
	const { onOpen: onOpenTermPolicy } = useTermPolicyStore()
	const { onOpen: onOpenUserPolicy } = useUserPolicyStore()

	const form = useForm<LoanLeadSchema>({
		resolver: zodResolver(loanLeadSchema),
		defaultValues: {
			fullname: '',
			city: '',
			email: '',
			phone: '',
			tnc: false,
			contactTime: new Date(),
			loanPackage: '',
			loanAmmount: '',
			loanTerm: ''
		}
	})

	const { data: citiesData, isPending: getCitiesPending } = useQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	const isPending = false

	const onSubmit = (values: LeadSchema) => {
		console.log(values)
	}

	const formatNumber = (num: number) => {
		return new Intl.NumberFormat('vi-VN').format(num)
	}

	return (
		<LeadFormWrapper title='Đăng ký khoản vay'>
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

						<FormCombobox
							name='loanPackage'
							control={form.control}
							className='w-full'
							popoverClassName='w-[365px]'
							form={form}
							label={
								<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
									<Package2
										className='size-5'
										strokeWidth={3}
									/>
									<p>Gói vay</p>
								</FormLabel>
							}
							items={loanPackages}
							isLoading={isPending || getCitiesPending}
							isMessage
						/>

						<FormField
							name='loanAmmount'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
										<User
											className='size-5'
											strokeWidth={3}
										/>
										<p>Khoản vay mong muốn</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											value={
												field.value ? formatNumber(parseInt(field.value)) : ''
											}
											onChange={e => {
												const inputValue = e.currentTarget.value.replace(
													/\D/g,
													''
												)

												field.onChange(inputValue)
											}}
											className='border border-primary bg-background caret-primary focus-visible:outline-none focus-visible:ring-0'
											placeholder='100.000.000'
										/>
									</FormControl>
									<FormMessage className='text-white/40' />
								</FormItem>
							)}
						/>

						<FormCombobox
							name='loanTerm'
							control={form.control}
							className='w-full'
							popoverClassName='w-[365px]'
							form={form}
							label={
								<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
									<Clock2
										className='size-5'
										strokeWidth={3}
									/>
									<p>Thời hạn vay</p>
								</FormLabel>
							}
							items={loanTerm}
							isLoading={isPending || getCitiesPending}
							isMessage
						/>

						<FormField
							name='contactTime'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
										<Phone
											className='size-5'
											strokeWidth={3}
										/>
										<p>Hẹn liên lạc</p>
									</FormLabel>
									<FormControl>
										<DatetimePicker
											{...field}
											className='bg-white'
											format={[
												['days', 'months', 'years'],
												['hours', 'minutes', 'am/pm']
											]}
										/>
									</FormControl>
								</FormItem>
							)}
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
							Đăng Ký Ngay
						</Button>
					</div>
				</form>
			</Form>
		</LeadFormWrapper>
	)
}

export default Leadform
