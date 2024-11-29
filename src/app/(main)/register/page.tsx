import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from '@tanstack/react-query'
import Image from 'next/image'
import { FC } from 'react'
import { z } from 'zod'

import { getBanks } from '@/actions/get-banks'
import { getCities } from '@/actions/get-citites'
import RegisterStep1Form from '@/app/(main)/register/_components/register-step1-form'
import RegisterStep2Form from '@/app/(main)/register/_components/register-step2-form'
import RegisterStep3Form from '@/app/(main)/register/_components/register-step3-form'

interface MainPageProps {
	searchParams: SearchParams
}

const searchParamsSchema = z.object({
	step: z.string().regex(/^\d+$/).transform(Number).default('1'),
	referal: z.string().optional(),
	id: z.string().optional()
})

type SearchParams = Promise<z.infer<typeof searchParamsSchema>>

const MainPage: FC<MainPageProps> = async ({ searchParams }) => {
	const { step, id, referal } = searchParamsSchema.parse(await searchParams)

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	await queryClient.prefetchQuery({
		queryKey: ['banks'],
		queryFn: getBanks
	})

	return (
		<div className='flex h-full w-full flex-col items-center justify-center pt-12'>
			<div className='flex h-screen w-fit items-center'>
				<div className='hidden h-full w-[360px] flex-col md:flex'>
					<Image
						src='/quote.svg'
						alt='quote'
						width={360}
						height={224}
					/>
					<Image
						src='/brand.svg'
						alt='brand'
						width={360}
						height={307}
					/>
				</div>
				<div className='h-full w-[420px]'>
					{step === 1 && (
						<HydrationBoundary state={dehydrate(queryClient)}>
							<RegisterStep1Form referral={referal} />
						</HydrationBoundary>
					)}
					{step === 2 && (
						<HydrationBoundary state={dehydrate(queryClient)}>
							<RegisterStep2Form id={id} />
						</HydrationBoundary>
					)}
					{step === 3 && (
						<HydrationBoundary state={dehydrate(queryClient)}>
							<RegisterStep3Form id={id} />
						</HydrationBoundary>
					)}
				</div>
			</div>
		</div>
	)
}

export default MainPage
