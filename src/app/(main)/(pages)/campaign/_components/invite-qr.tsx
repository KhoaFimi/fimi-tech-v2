'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { FC, useRef } from 'react'

import { Button } from '@/components/ui/button'

interface InviteQrProps {
	link: string | undefined
	publisherCode: string
	product: string
}

const InviteQr: FC<InviteQrProps> = ({ link, publisherCode, product }) => {
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
					<QRCodeCanvas
						value={link as string}
						size={220}
						ref={qrRef}
						level={'H'}
					/>
				</div>
				<Button onClick={downloadQr}>Tải xuống QR</Button>
			</div>
		</div>
	)
}

export default InviteQr
