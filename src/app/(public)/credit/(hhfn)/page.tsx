import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from '@tanstack/react-query'
import { FC } from 'react'
import { z } from 'zod'

import { getCities } from '@/actions/get-citites'
import LeadForm from '@/app/(public)/credit/(hhfn)/_components/lead-form'

interface InviteCodePageProps {
	searchParams: Promise<z.infer<typeof searchParamsSchema>>
}

const searchParamsSchema = z.object({
	code: z.string().default('FIMI00001'),
	product: z.string().default('muadee')
})

const InviteCodePage: FC<InviteCodePageProps> = async ({ searchParams }) => {
	const { code, product } = searchParamsSchema.parse(await searchParams)

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LeadForm
				product={product}
				code={code}
			/>
		</HydrationBoundary>
	)
}

export default InviteCodePage
