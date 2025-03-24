'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getCities } from '@/actions/get-citites'
import { addLead } from '@/app/(public)/insurance/sunlife/_action/add-lead'
import { FormError } from '@/components/form-response'
import LeadFormWrapper from '@/components/lead-form-wrapper'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { sunlifeRes1 } from '@/constant/insurance'
import { useSercurityPolicyStore } from '@/hooks/use-sercurity-policy-store'
import { useTermPolicyStore } from '@/hooks/use-term-policy-store'
import { useUserPolicyStore } from '@/hooks/use-user-policy-store'
import { ParamsSchema } from '@/schemas/invite-link-params.schema'
import { LeadSchema, leadSchema } from '@/schemas/lead.schema'

const LeadForm: FC<ParamsSchema> = ({
	publisherCode,
	managerCode,
	product
}) => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [acceptAll, setAcceptAll] = useState<boolean>(false)
	const [isOtherQuestionEdit, setIsOtherQuestionEdit] = useState<boolean>(false)

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
			tnc: false,
			sunlifeQuestion: [],
			sunlifeApproach: 'Tham gia ngay',
			sunlifeTnc: false
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
		<LeadFormWrapper title='Đăng ký mở thẻ ngay'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'
				>
					<div className='flex flex-col space-y-4 rounded-xl border bg-white px-2 py-8 shadow-lg'>
						<FormField
							name='fullname'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-start space-x-1 font-semibold tracking-tight text-black'>
										<p className='text-xs'>Họ và tên</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											onChange={e =>
												field.onChange(e.currentTarget.value.toUpperCase())
											}
											className='bg-background caret-primary focus-visible:outline-none focus-visible:ring-0'
											placeholder='Nguyễn Văn A'
										/>
									</FormControl>
									<FormMessage className='text-primary/40' />
								</FormItem>
							)}
						/>

						<FormField
							name='email'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-black'>
										<p className='text-sm'>Email</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											className='bg-background caret-primary focus-visible:outline-none focus-visible:ring-0'
											placeholder='a.nguyenvan@gmail.com'
										/>
									</FormControl>
									<FormMessage className='text-primary/40' />
								</FormItem>
							)}
						/>

						<FormField
							name='phone'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-black'>
										<p className='text-xs'>Số điện thoại</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											className='bg-background caret-primary focus-visible:outline-none focus-visible:ring-0'
											placeholder='091xxxx900'
										/>
									</FormControl>
									<FormMessage className='text-primary/40' />
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
								<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-black'>
									<p className='text-xs'>Khu vực sinh sống</p>
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

						<FormField
							name='sunlifeQuestion'
							control={form.control}
							render={() => (
								<FormItem>
									<div className='mb-4'>
										<FormLabel className='text-xs opacity-85'>
											1. Trong những vấn đề dưới đây, Anh/Chị đang quan tâm đến
											vấn đề nào nhiều nhất ?
										</FormLabel>
									</div>
									{sunlifeRes1.map((item, i) => (
										<FormField
											key={i}
											control={form.control}
											name='sunlifeQuestion'
											render={({ field }) => {
												return (
													<FormItem
														key={i}
														className='flex flex-row items-center space-x-3 space-y-0'
													>
														<FormControl>
															<Checkbox
																checked={field.value.includes(item)}
																onCheckedChange={checked => {
																	return checked
																		? field.onChange([...field.value, item])
																		: field.onChange(
																				field.value?.filter(
																					value => value !== item
																				)
																			)
																}}
															/>
														</FormControl>
														<FormLabel className='text-xs font-normal leading-none'>
															{item}
														</FormLabel>
													</FormItem>
												)
											}}
										/>
									))}

									<div className='flex items-center space-x-3 space-y-0'>
										<Checkbox
											id='other'
											onCheckedChange={checked => {
												if (checked) {
													setIsOtherQuestionEdit(true)
												}
											}}
										/>
										<label
											htmlFor='other'
											className='cursor-pointer select-none space-y-1 text-justify text-xs font-semibold leading-3 text-muted-foreground'
										>
											Khác
										</label>
									</div>

									{isOtherQuestionEdit ? (
										<Textarea
											disabled={isPending}
											onBlur={e => {
												const currentValue = form.getValues('sunlifeQuestion')

												form.setValue('sunlifeQuestion', [
													...currentValue,
													e.currentTarget.value
												])
											}}
											className='bg-background text-xs caret-primary placeholder:text-xs focus-visible:outline-none focus-visible:ring-0'
											placeholder='Nguyễn Văn A'
										/>
									) : null}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='sunlifeApproach'
							render={({ field }) => (
								<FormItem className='space-y-3'>
									<FormLabel className='text-xs font-normal opacity-95'>
										2. Nếu có một giải pháp có thể giúp Anh/Chị bảo vệ tài chính
										trước các rủi ro trong cuộc sống, tích lũy hiệu quả & hưu
										trí thảnh thơi thì Anh/Chị sẽ:
									</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex flex-col space-y-1'
										>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='Tham gia ngay' />
												</FormControl>
												<FormLabel className='text-xs font-normal'>
													Tham gia ngay
												</FormLabel>
											</FormItem>

											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='Tìm hiểu thêm' />
												</FormControl>
												<FormLabel className='text-xs font-normal'>
													Tìm hiểu thêm
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>

						<div className='flex flex-col space-y-6 rounded-md border bg-background p-4 shadow'>
							<FormField
								name='sunlifeTnc'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
										<FormControl>
											<Checkbox
												checked={field.value}
												disabled={isPending}
												onCheckedChange={e => {
													field.onChange(e)
													if (!e.valueOf() as boolean) {
														setAcceptAll(false)
													}
												}}
											/>
										</FormControl>
										<div className='select-none space-y-1 leading-3'>
											<FormDescription className='cursor-pointer text-justify text-xs font-semibold'>
												Tôi đồng ý cho FIMI thu thập và chia sẻ thông tin do Tôi
												cung cấp cho Sun Life Việt Nam để kết nối với Tư vấn Tài
												chính phù hợp. Theo đó, Tư vấn Tài chính của Sun Life
												Việt Nam có thể liên hệ tư vấn sản phẩm.
											</FormDescription>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								name='tnc'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
										<FormControl>
											<Checkbox
												checked={field.value}
												disabled={isPending}
												onCheckedChange={e => {
													field.onChange(e)
													if (!e.valueOf() as boolean) {
														setAcceptAll(false)
													}
												}}
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

							<div className='flex items-center space-x-3 space-y-0'>
								<Checkbox
									id='accept-all'
									checked={acceptAll}
									onCheckedChange={e => {
										if (e.valueOf() as boolean) {
											setAcceptAll(true)
											form.setValue('sunlifeTnc', true)
											form.setValue('tnc', true)

											return
										}

										setAcceptAll(false)
										form.setValue('sunlifeTnc', false)
										form.setValue('tnc', false)
									}}
								/>
								<label
									htmlFor='accept-all'
									className='cursor-pointer select-none space-y-1 text-justify text-xs font-semibold leading-3 text-muted-foreground'
								>
									Đồng ý tất cả
								</label>
							</div>
						</div>

						<FormError message={error} />

						<div className='flex w-full justify-center'>
							<Button
								type='submit'
								disabled={!form.getValues('tnc') || isPending}
								className='w-[15rem] items-center justify-center gap-4 rounded-md bg-gradient-to-tr from-primary from-30% to-secondary font-bold'
							>
								{isPending && <Loader2 className='size-5 animate-spin' />}
								Đăng ký tư vấn
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</LeadFormWrapper>
	)
}

export default LeadForm
