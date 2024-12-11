import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from '@tanstack/react-query'
import { FC } from 'react'

import { getInviteLink } from '@/app/(main)/(pages)/campaign/_actions/get-invite-link'
import { getProductById } from '@/app/(main)/(pages)/campaign/_actions/get-product-by-id'
import CampaignDetailScreen from '@/app/(main)/(pages)/campaign/_components/campaign-detail-screen'
import { verifySession } from '@/lib/dal'

type Params = Promise<{ campaignId: string }>

interface CampaignIdPageProps {
	params: Params
}

const CampaignIdPage: FC<CampaignIdPageProps> = async ({ params }) => {
	const { campaignId } = await params
	const { publisherCode, managerCode } = await verifySession()

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['product', campaignId],
		queryFn: async () => getProductById(campaignId)
	})

	await queryClient.prefetchQuery({
		queryKey: ['invite-link', publisherCode, managerCode],
		queryFn: async () => getInviteLink({ publisherCode, managerCode })
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CampaignDetailScreen
				campaignId={campaignId}
				managerCode={managerCode}
				publisherCode={publisherCode}
			/>
		</HydrationBoundary>
	)
}

export default CampaignIdPage
