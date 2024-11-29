'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, Loader2, MapPinHouse, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getCities } from '@/actions/get-citites'
import { getDistricts } from '@/actions/get-districts'
import { getWards } from '@/actions/get-wards'
import { registerStep2 } from '@/app/(main)/register/_actions/register-step2'
import { FormWrapper } from '@/app/(main)/register/_components/form-wrapper'
import {
	RegisterStep2Schema,
	registerStep2Schema
} from '@/app/(main)/register/_schemas/register.schema'
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
import FormCombobox from '@/components/ui/form-combobox'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { GENDER } from '@/constant/enum'

interface RegisterStep2FormProps {
	id: string | undefined
}

const RegisterStep2Form: FC<RegisterStep2FormProps> = ({ id }) => {
	const router = useRouter()

	const [error, setError] = useState<string | undefined>(undefined)

	if (!id) {
		router.push('/register?step=1')
	}

	const { data: citiesData, isPending: getCitiesPending } = useQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	const {
		mutate: fetchDistricts,
		data: districtsData,
		isPending: getDistrictsPending
	} = useMutation({
		mutationFn: async ({ id }: { id: string }) => await getDistricts(id)
	})

	const {
		mutate: fetchWards,
		data: wardsData,
		isPending: getWardsPending
	} = useMutation({
		mutationFn: async ({ id }: { id: string }) => await getWards(id)
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			id,
			values
		}: {
			id: string | undefined
			values: RegisterStep2Schema
		}) => await registerStep2(id, values),
		onSuccess: data => {
			if (data.error) {
				setError(data.error)
				return
			}
		}
	})

	const form = useForm<RegisterStep2Schema>({
		resolver: zodResolver(registerStep2Schema),
		defaultValues: {
			gender: '',
			workAt: '',
			currentAddress: '',
			currentWard: '',
			currentDistrict: '',
			currentProvince: ''
		}
	})

	const onSubmit = (values: RegisterStep2Schema) => {
		mutate({ id, values })
	}

	return (
		<FormWrapper
			title='Đăng ký mã giới thiệu'
			description='Bố sung thông tin'
		>
			<Form {...form}>
				<form
					autoComplete='autocomplete_off_randString'
					className='flex flex-col gap-2.5 px-2 pt-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						name='gender'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-end space-x-1 font-semibold text-foreground/80'>
									<User
										className='size-4'
										strokeWidth={3}
									/>
									<p className='tracking-tight'>Giới tính</p>
								</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger
											disabled={isPending}
											className='border border-primary ring-0 focus:ring-0'
										>
											<SelectValue className='placeholder:text-foreground/50' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={GENDER.MALE}>Nam</SelectItem>
										<SelectItem value={GENDER.FEMALE}>Nữ</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormCombobox
						name='workAt'
						control={form.control}
						popoverClassName='w-[405px]'
						form={form}
						className='w-full'
						label={
							<FormLabel className='flex items-end space-x-1 font-semibold text-foreground/80'>
								<Building
									className='size-4'
									strokeWidth={3}
								/>
								<p className='tracking-tight'>Khu vực làm việc</p>
							</FormLabel>
						}
						initalData=''
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
						name='currentAddress'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-end space-x-1 font-semibold text-foreground/80'>
									<MapPinHouse
										className='size-4'
										strokeWidth={3}
									/>
									<p className='tracking-tight'>Địa chỉ thường trú</p>
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										disabled={isPending}
										className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormCombobox
						name='currentProvince'
						control={form.control}
						className='w-full'
						form={form}
						label={
							<FormLabel className='flex items-end space-x-1 font-semibold text-foreground/80'>
								<MapPinHouse
									className='size-4'
									strokeWidth={3}
								/>
								<p className='tracking-tight'>Tỉnh/Thành</p>
							</FormLabel>
						}
						popoverClassName='w-[405px]'
						initalData=''
						onSelect={id => fetchDistricts({ id })}
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
						name='currentDistrict'
						control={form.control}
						className='w-full'
						popoverClassName='w-[405px]'
						label={
							<FormLabel className='flex items-end space-x-1 font-semibold text-foreground/80'>
								<MapPinHouse
									className='size-4'
									strokeWidth={3}
								/>
								<p className='tracking-tight'>Quận/Huyện</p>
							</FormLabel>
						}
						form={form}
						initalData=''
						onSelect={id => fetchWards({ id })}
						items={
							districtsData
								? districtsData.map(city => ({
										id: city.id,
										value: city.full_name,
										label: city.full_name
									}))
								: []
						}
						isLoading={
							isPending ||
							getDistrictsPending ||
							!districtsData ||
							districtsData.length === 0
						}
						isMessage
					/>

					<FormCombobox
						name='currentWard'
						control={form.control}
						className='w-full'
						popoverClassName='w-[405px]'
						label={
							<FormLabel className='flex items-end space-x-1 font-semibold text-foreground/80'>
								<MapPinHouse
									className='size-4'
									strokeWidth={3}
								/>
								<p className='tracking-tight'>Phường/xã</p>
							</FormLabel>
						}
						form={form}
						initalData=''
						items={
							wardsData
								? wardsData.map(city => ({
										id: city.id,
										value: city.full_name,
										label: city.full_name
									}))
								: []
						}
						isLoading={
							isPending ||
							getWardsPending ||
							!wardsData ||
							wardsData.length === 0
						}
						isMessage
					/>

					<FormError message={error} />

					<Button
						type='submit'
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

export default RegisterStep2Form
