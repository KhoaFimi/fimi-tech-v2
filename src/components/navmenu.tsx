'use client'

import { useMutation } from '@tanstack/react-query'
import { AlignJustify, SheetIcon, StoreIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'

const links = [
	{
		id: 1,
		label: 'Chiến dịch',
		href: '/campaign',
		icon: StoreIcon
	},
	{
		id: 2,
		label: 'Báo cáo',
		href: '/report',
		icon: SheetIcon
	}
	// {
	// 	id: 3,
	// 	label: 'Báo lỗi',
	// 	href: '/error-report',
	// 	icon: MessageCircleWarningIcon
	// }
]

interface NavmenuMobileProps {
	fullname: string
}

export const NavmenuMobile: FC<NavmenuMobileProps> = ({ fullname }) => {
	const { mutate } = useMutation({
		mutationFn: async () => await logout()
	})

	const [sheetOpen, setSheetOpen] = useState<boolean>(false)

	return (
		<Sheet
			open={sheetOpen}
			onOpenChange={setSheetOpen}
		>
			<SheetTrigger asChild>
				<button className='bg-transparent text-white lg:hidden'>
					<AlignJustify className='size-6 text-white' />
				</button>
			</SheetTrigger>
			<SheetContent
				side='left'
				className='w-80'
			>
				<SheetHeader className='pt-4 font-bold text-foreground/80'>
					<Image
						src='/logo.png'
						width={3148}
						height={1367}
						alt='logo'
						className='mx-auto w-32'
					/>
					<SheetTitle>Chào, {fullname}</SheetTitle>
				</SheetHeader>
				<ul className='space-y-8 pl-4 pt-8'>
					{links.map(link => (
						<li
							key={link.id}
							className='flex items-start gap-x-1.5 text-foreground/80'
							onClick={() => setSheetOpen(false)}
						>
							<link.icon
								className='text-foreground/80'
								strokeWidth={3}
							/>
							<Link
								href={link.href}
								className='font-semibold hover:underline'
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
				<SheetFooter className='fixed inset-x-0 bottom-0 z-30 w-80 p-2'>
					<Button
						type='submit'
						onClick={() => mutate()}
						className='w-full bg-primary px-2 text-base font-semibold text-white transition hover:underline'
					>
						Đăng xuất
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export const Navmenu = () => {
	return (
		<div className='hidden items-center gap-4 lg:flex'>
			{links.map(link => (
				<Button
					asChild
					key={link.id}
					variant='link'
					className='text-[1rem] text-white'
				>
					<Link href={link.href}>{link.label}</Link>
				</Button>
			))}
		</div>
	)
}
