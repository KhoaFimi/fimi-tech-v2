import Image from 'next/image'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

interface HeaderProps {
	children?: ReactNode
}

const Header: FC<HeaderProps> = ({ children }) => {
	return (
		<header className='fixed inset-x-0 top-0 z-50 flex w-full items-center justify-center bg-gradient-to-r from-primary from-30% to-secondary shadow-md'>
			<div className='container flex items-center justify-between px-2 py-2 lg:flex-row'>
				<Link
					href='https://partner.fimi.tech/chien-dich'
					target='_blank'
				>
					<Image
						src='/logo-negative.png'
						width={3148}
						height={1367}
						alt='logo'
						className='w-20'
					/>
				</Link>

				{children}
			</div>
		</header>
	)
}

export default Header
