'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getBanks } from '@/app/(main)/register/_actions/get-banks'
import { registerStep3 } from '@/app/(main)/register/_actions/register-step-3'
import { sendMailToNewUser } from '@/app/(main)/register/_actions/send-mail'
import { FormWrapper } from '@/app/(main)/register/_components/form-wrapper'
import { registerStep3Schema } from '@/app/(main)/register/_schemas/register.schema'
import { FormError } from '@/components/form-response'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import FormCombobox from '@/components/ui/form-combobox'
import { Input } from '@/components/ui/input'
import { useRegisterSuccess } from '@/hooks/use-register-success'

const RegisterStep3Form: FC<{ id: string | undefined }> = ({ id }) => {
	const router = useRouter()
	const { onOpen, setData } = useRegisterSuccess()

	const [error, setError] = useState<string | undefined>(undefined)

	if (!id) {
		router.push('/register?step=1')
	}

	const { data: banksData, isPending: getBanksPending } = useQuery({
		queryKey: ['banks'],
		queryFn: getBanks
	})

	const form = useForm<registerStep3Schema>({
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
			values: registerStep3Schema
		}) => await registerStep3(values, id),
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

	const onSubmit = (values: registerStep3Schema) => {
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
					className='flex flex-col gap-5 px-2 pt-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						name='bankAccountName'
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
										placeholder='Tên tài khoản ngân hàng'
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
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										className='border border-primary text-sm caret-primary placeholder:text-sm placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0'
										placeholder='Số tài khoản ngân hàng'
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
						popoverClassName='w-[405px]'
						form={form}
						initalData='Ngân hàng'
						items={
							banksData
								? banksData.map(bank => ({
										id: bank.id.toString(),
										value: `${bank.code}-${bank.name}`,
										label: `${bank.code}-${bank.name}`
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

export default RegisterStep3Form
