import { QueryClient } from '@tanstack/react-query'
import { FC } from 'react'

import { getCities } from '@/actions/get-citites'
import { paramsSchema } from '@/schemas/invite-link-params-schema'

type Params = Promise<{ inviteCode: string }>

interface LoanInviteCodePageProps {
	params: Params
}

const LoanInviteCodePage: FC<LoanInviteCodePageProps> = async ({ params }) => {
	const { inviteCode } = await params

	const data = JSON.parse(atob(decodeURIComponent(inviteCode)))

	const _paramsData = paramsSchema.parse(data)

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	return <div>LoanInviteCodePage</div>
}

export default LoanInviteCodePage
