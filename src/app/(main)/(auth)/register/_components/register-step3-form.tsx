'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CreditCard, Landmark, Loader2, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getBanks } from '@/actions/get-banks'
import { registerStep3 } from '@/app/(main)/(auth)/register/_actions/register-step3'
import { FormWrapper } from '@/app/(main)/(auth)/register/_components/form-wrapper'
import {
	RegisterStep3Schema,
	registerStep3Schema
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
import FormCombobox from '@/components/ui/form-combobox'
import { Input } from '@/components/ui/input'
import { parseVni } from '@/lib/server/parse-vni'

const RegisterStep3Form: FC<{ id: string | undefined }> = ({ id }) => {
	const router = useRouter()

	const [error, setError] = useState<string | undefined>(undefined)

	if (!id) {
		router.push('/register?step=1')
	}

	const { data: banksData, isPending: getBanksPending } = useQuery({
		queryKey: ['banks'],
		queryFn: getBanks
	})

	const form = useForm<RegisterStep3Schema>({
		resolver: zodResolver(registerStep3Schema),
		defaultValues: {
			bankAccountName: '',
			bankAccountNumber: '',
			bankName: ''
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			id,
			values
		}: {
			id: string | undefined
			values: RegisterStep3Schema
		}) => await registerStep3(values, id),
		onSuccess: async data => {
			if (data.error) {
				setError(data.error)
				return
			}
		}
	})

	const onSubmit = (values: RegisterStep3Schema) => {
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
						name='bankAccountName'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
									<User2
										className='size-3'
										strokeWidth={3}
									/>
									<p className='leading-none'>Tên tài khoản ngân hàng</p>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										onChange={e =>
											field.onChange(e.currentTarget.value.toUpperCase())
										}
										className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='bankAccountNumber'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
									<CreditCard
										className='size-3'
										strokeWidth={3}
									/>
									<p className='leading-none'>Số tài khoản ngân hàng</p>
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

					<FormCombobox
						name='bankName'
						control={form.control}
						className='w-full'
						label={
							<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
								<Landmark
									className='size-3'
									strokeWidth={3}
								/>
								<p className='leading-none'>Ngân hàng</p>
							</FormLabel>
						}
						popoverClassName='w-[405px]'
						form={form}
						initalData=''
						items={
							banksData
								? banksData.map(bank => ({
										id: bank.id.toString(),
										value: `${bank.code} - ${parseVni(bank.name)}`,
										label: `${bank.code} - ${bank.name}`
									}))
								: []
						}
						isLoading={
							isPending ||
							getBanksPending ||
							!banksData ||
							banksData.length === 0
						}
						isMessage
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

export default RegisterStep3Form
