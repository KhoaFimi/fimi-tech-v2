import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from '@tanstack/react-query'
import { FC, Suspense } from 'react'

import { getCities } from '@/actions/get-citites'
import SunlifeLandingPage from '@/app/(public)/insurance/sunlife/_components/landing-page'
import LeadForm from '@/app/(public)/insurance/sunlife/_components/lead-form'
import { paramsSchema } from '@/schemas/invite-link-params.schema'

type Params = Promise<{ inviteCode: string }>
type SearchParams = Promise<{ step: string }>

interface InviteCodePageProps {
	params: Params
	searchParams: SearchParams
}

const SunlifePage: FC<InviteCodePageProps> = async ({
	params,
	searchParams
}) => {
	const { inviteCode } = await params
	const step = parseInt((await searchParams).step) || 1

	const data = JSON.parse(atob(decodeURIComponent(inviteCode)))

	const { publisherCode, managerCode, product } = paramsSchema.parse(data)

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{step === 1 ? (
				<Suspense>
					<SunlifeLandingPage />
				</Suspense>
			) : (
				<LeadForm
					product={product}
					publisherCode={publisherCode}
					managerCode={managerCode}
				/>
			)}
		</HydrationBoundary>
	)
}

export default SunlifePage
