'use client'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { Link2, Loader2 } from 'lucide-react'
import { FC } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

import { FormError, FormPending } from '@/components/form-response'
import { Button } from '@/components/ui/button'

interface InviteLinkProps {
	link: string | undefined
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<string, Error>>
	fetchStatus: 'error' | 'success' | 'pending'
	isLoading?: boolean
}

const InviteLink: FC<InviteLinkProps> = ({
	link,
	refetch,
	fetchStatus,
	isLoading
}) => {
	const [_, copy] = useCopyToClipboard()

	return (
		<div className='w-full rounded-md border bg-background p-2 shadow-sm'>
			{fetchStatus === 'error' ? (
				<div className='flex flex-col items-center gap-2 lg:flex-row'>
					<div className='flex-1'>
						<FormError message='Tạo link giới thiệu không thành công' />
					</div>
					<Button
						className='h-10 gap-x-2'
						disabled={isLoading}
						onClick={() => refetch()}
					>
						{isLoading ? <Loader2 className='sizs-5 animate-spin' /> : null}
						Tạo link mới
					</Button>
				</div>
			) : null}
			{fetchStatus === 'pending' ? (
				<FormPending message='Đang tạo link giới thiệu' />
			) : null}
			{fetchStatus === 'success' ? (
				<div className='flex w-full flex-col items-center gap-x-2 gap-y-2 lg:flex-row'>
					<div className='relative flex max-w-full flex-1 items-center gap-x-1.5 overflow-x-auto rounded-md bg-foreground/15 p-3 text-sm text-foreground/50'>
						<Link2 className='size-4' />
						<p className='font-semibold tracking-tight'>{link}</p>
					</div>
					<Button
						className='mx-auto h-10 w-full gap-x-2 lg:w-fit'
						onClick={() => copy(link as string)}
					>
						Sao chép link giới thiệu
					</Button>
				</div>
			) : null}
		</div>
	)
}

export default InviteLink
