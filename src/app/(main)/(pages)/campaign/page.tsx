import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from '@tanstack/react-query'

import { getProducts } from '@/app/(main)/(pages)/campaign/_actions/get-products'
import CampaignScreen from '@/app/(main)/(pages)/campaign/_components/campaign-screen'

const CampaignPage = async () => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['products'],
		queryFn: getProducts
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CampaignScreen />
		</HydrationBoundary>
	)
}

export default CampaignPage
