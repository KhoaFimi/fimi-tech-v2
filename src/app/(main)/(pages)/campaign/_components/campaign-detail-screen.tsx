'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2, ShieldAlert } from 'lucide-react'
import { FC } from 'react'

import { getInviteLink } from '@/app/(main)/(pages)/campaign/_actions/get-invite-link'
import { getProductById } from '@/app/(main)/(pages)/campaign/_actions/get-product-by-id'
import CampaignDetail from '@/app/(main)/(pages)/campaign/_components/campaign-detail'
import InviteLink from '@/app/(main)/(pages)/campaign/_components/invite-link'
import InviteQr from '@/app/(main)/(pages)/campaign/_components/invite-qr'

interface CampaignDetailScreenProps {
	campaignId: string
	managerCode: string
	publisherCode: string
}

const CampaignDetailScreen: FC<CampaignDetailScreenProps> = ({
	campaignId,
	managerCode,
	publisherCode
}) => {
	const { data: product, status: fetchProductStatus } = useQuery({
		queryKey: ['product', campaignId],
		queryFn: async () => await getProductById(campaignId)
	})

	const {
		data: inviteLink,
		status: fetchInviteLinkStatus,
		refetch: refetchInviteLink,
		isFetching: isFetchingInviteLink
	} = useQuery({
		queryKey: ['invite-link', publisherCode, managerCode],
		queryFn: async () =>
			getInviteLink({ publisherCode, managerCode, product: campaignId })
	})

	if (fetchProductStatus === 'pending')
		return (
			<div className='flex h-[calc(100vh-100px)] w-full items-center justify-center'>
				<div className='flex flex-col items-center justify-center gap-y-2'>
					<Loader2 className='size-8 animate-spin text-foreground/70' />
					<p className='font-semibold text-foreground/70'>
						Đang tải chi tiết chiến dịch
					</p>
				</div>
			</div>
		)

	if (fetchProductStatus === 'error')
		return (
			<div className='flex h-[calc(100vh-100px)] w-full items-center justify-center'>
				<div className='flex flex-col items-center justify-center gap-y-2'>
					<ShieldAlert className='size-8 text-destructive/70' />
					<p className='font-semibold text-destructive/70'>
						Lối hệ thống, vui lòng thử lại sau
					</p>
				</div>
			</div>
		)

	return (
		<div className='container mx-auto flex flex-col gap-x-4 gap-y-4 px-2 py-8'>
			<InviteLink
				link={inviteLink}
				refetch={refetchInviteLink}
				fetchStatus={fetchInviteLinkStatus}
				isLoading={isFetchingInviteLink}
			/>
			<div className='flex w-full flex-col items-center gap-x-4 gap-y-4 lg:flex-row lg:items-start'>
				<InviteQr
					link={inviteLink}
					fetchStatus={fetchInviteLinkStatus}
					publisherCode={publisherCode}
					product={campaignId}
				/>
				<CampaignDetail product={product} />
			</div>
		</div>
	)
}

export default CampaignDetailScreen
