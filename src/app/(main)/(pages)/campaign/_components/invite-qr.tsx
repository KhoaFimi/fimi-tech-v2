'use client'

import { Ban, Loader2 } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { FC, useRef } from 'react'

import { Button } from '@/components/ui/button'

interface InviteQrProps {
	link: string | undefined
	fetchStatus: 'error' | 'success' | 'pending'
	publisherCode: string
	product: string
}

const InviteQr: FC<InviteQrProps> = ({
	link,
	fetchStatus,
	publisherCode,
	product
}) => {
	const qrRef = useRef<HTMLCanvasElement>(null)

	const downloadQr = () => {
		const canvas = qrRef.current

		if (!canvas) return

		const pngUrl = canvas
			.toDataURL('image/png')
			.replace('image/png', 'image/octet-steam')

		const downloadLink = document.createElement('a')

		downloadLink.href = pngUrl
		downloadLink.download = `${product}-${publisherCode}.png`
		document.body.appendChild(downloadLink)
		downloadLink.click()
		document.body.removeChild(downloadLink)
	}

	return (
		<div className='top-[4.25rem] flex w-full flex-col gap-y-4 overflow-hidden rounded-lg border p-2 shadow-md lg:sticky lg:max-w-80'>
			<div className='flex w-full flex-col items-center gap-y-2 p-2'>
				<p className='bg-gradient-to-tr from-primary from-30% to-secondary bg-clip-text text-center text-base font-bold uppercase text-transparent lg:text-lg'>
					Mã QR giới thiệu
				</p>
				<div className='flex size-60 items-center justify-center rounded-lg border p-2 shadow-sm'>
					{fetchStatus === 'success' ? (
						<QRCodeCanvas
							value={link as string}
							size={220}
							ref={qrRef}
							level={'H'}
						/>
					) : null}
					{fetchStatus === 'pending' ? (
						<div className='flex flex-col items-center gap-y-2 text-foreground/50'>
							<Loader2 className='size-6 animate-spin' />
							<p className='text-sm font-semibold'>Đang tạo QR</p>
						</div>
					) : null}
					{fetchStatus === 'error' ? (
						<div className='flex h-full w-full flex-col items-center justify-center gap-y-2 rounded-md bg-destructive/15 text-destructive'>
							<Ban className='size-6' />
							<p className='text-sm font-semibold'>Tạo QR không thành công</p>
						</div>
					) : null}
				</div>
				<Button onClick={downloadQr}>Tải xuống QR</Button>
			</div>
		</div>
	)
}

export default InviteQr
