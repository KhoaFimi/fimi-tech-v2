import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from '@tanstack/react-query'
import { FC } from 'react'
import { z } from 'zod'

import { getCities } from '@/actions/get-citites'
import LeadForm from '@/app/(public)/credit/_components/lead-form'

const searchParamsSchema = z.object({
	code: z.string().default('FIMI'),
	product: z.string().default('vpbankcc')
})

type SeachParams = Promise<z.infer<typeof searchParamsSchema>>

interface CreditPageProps {
	searchParams: SeachParams
}

const CreditPage: FC<CreditPageProps> = async ({ searchParams }) => {
	const { code, product } = searchParamsSchema.parse(await searchParams)

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LeadForm
				campaignCode={product}
				publisherCode={code}
			/>
		</HydrationBoundary>
	)
}

export default CreditPage
