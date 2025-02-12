'use client'

import { Link2 } from 'lucide-react'
import { FC } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

import { Button } from '@/components/ui/button'

interface InviteLinkProps {
	link: string | undefined
}

const InviteLink: FC<InviteLinkProps> = ({ link }) => {
	const [_, copy] = useCopyToClipboard()

	return (
		<div className='w-full rounded-md border bg-background p-2 shadow-sm'>
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
		</div>
	)
}

export default InviteLink
