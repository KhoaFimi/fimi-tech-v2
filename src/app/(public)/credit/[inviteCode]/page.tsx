import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from '@tanstack/react-query'
import { FC } from 'react'

import { getCities } from '@/actions/get-citites'
import LeadForm from '@/app/(public)/credit/[inviteCode]/_components/lead-form'
import { paramsSchema } from '@/schemas/invite-link-params.schema'

type Params = Promise<{ inviteCode: string }>

interface InviteCodePageProps {
	params: Params
}

const InviteCodePage: FC<InviteCodePageProps> = async ({ params }) => {
	const { inviteCode } = await params

	const data = JSON.parse(atob(decodeURIComponent(inviteCode)))

	const { publisherCode, managerCode, product } = paramsSchema.parse(data)

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LeadForm
				product={product}
				publisherCode={publisherCode}
				managerCode={managerCode}
			/>
		</HydrationBoundary>
	)
}

export default InviteCodePage
