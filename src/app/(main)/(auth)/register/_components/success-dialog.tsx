'use client'

import { DialogTitle } from '@radix-ui/react-dialog'
import { ChevronRight, ClipboardCopy } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { toast } from 'sonner'
import { useCopyToClipboard } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useRegisterSuccess } from '@/hooks/use-register-success'

const RegisterSuccessDialog = () => {
	const { data, onClose, open } = useRegisterSuccess()

	return (
		<Dialog
			open={open}
			onOpenChange={onClose}
		>
			<DialogContent className='select-none rounded-xl border-none bg-gradient-to-tr from-primary from-30% to-secondary px-3 py-3 text-white'>
				<DialogHeader>
					<DialogTitle className='text-center text-xl font-bold uppercase tracking-tight'>
						Đăng ký thành công
					</DialogTitle>
				</DialogHeader>
				<div className='flex flex-col gap-y-4 rounded-lg bg-white p-4 text-sm text-foreground'>
					<p className='text-base font-bold leading-10'>
						Chúc mừng bạn đã đăng ký mã giới thiệu thành công.
					</p>

					<div className='mx-auto flex w-fit flex-col gap-2'>
						<div className='flex w-full flex-col items-center gap-2 rounded-xl bg-gradient-to-tr from-primary from-30% to-secondary px-2 pt-2'>
							<p className='text-center text-xl font-bold uppercase tracking-tight text-white'>
								Mã giới thiệu:
							</p>
							<div className='w-full bg-background px-8 py-4'>
								<p className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-2xl font-bold uppercase text-transparent selection:bg-secondary selection:p-2 selection:text-white'>
									{data.code}
								</p>
							</div>
							<CopyToClipboard text={data.code} />
						</div>
					</div>

					<Button
						className='mx-auto w-fit bg-gradient-to-tr from-primary from-30% to-secondary shadow-md'
						asChild
						onClick={() => onClose()}
					>
						<Link href='/login'>Đăng nhập để bán hàng ngay</Link>
					</Button>

					<p className='text text-center text-xs font-semibold tracking-tight text-foreground/50'>
						Mã giới thiệu đã được gửi đến email{' '}
						<span className='text-primary/80'>{data.email}</span>
					</p>
					<ul>
						<li className='flex items-center gap-x-1 text-xs font-semibold'>
							<ChevronRight className='size-4' />
							<p className='leading-none'>Nhận thông báo mới nhất từ FIMI</p>
							<Button
								asChild
								variant='link'
								size='sm'
								className='px-0 font-semibold leading-none'
							>
								<a href='https://zalo.me/g/zlheub504'>Tại đây</a>
							</Button>
						</li>
						<li className='flex items-center gap-x-1 text-xs font-semibold'>
							<ChevronRight className='size-4' />
							<p className='leading-none'>Liên hệ với admin qua Zalo OA</p>
							<Button
								asChild
								variant='link'
								size='sm'
								className='px-0 font-semibold leading-none'
							>
								<a href='https://zalo.me/3387059207338415317'>Tại đây</a>
							</Button>
						</li>
						<li className='flex items-center gap-x-1 text-xs font-semibold'>
							<ChevronRight className='size-4' />
							<p className='leading-none'>
								Hãy hoàn tất hợp đồng dịch vụ trước để nhận hoa hồng giới thiệu
								phát sinh nhé.
							</p>
						</li>
					</ul>
				</div>
			</DialogContent>
		</Dialog>
	)
}

interface CopyToClipboardProps {
	text: string
}

const CopyToClipboard: FC<CopyToClipboardProps> = ({ text }) => {
	const [_copiedText, copy] = useCopyToClipboard()

	const handleCopy = (text: string) => {
		copy(text).then(() => {
			console.log('has copied')
			toast(`Đã sao chép mã giới thiệu "${text}"`)
		})
	}

	return (
		<button
			onClick={() => handleCopy(text)}
			className='border-non flex items-center gap-2 bg-transparent px-4 py-2 font-semibold text-white'
		>
			<ClipboardCopy className='size-5' /> <p>Sao chép mã giới thiệu</p>
		</button>
	)
}

export default RegisterSuccessDialog
