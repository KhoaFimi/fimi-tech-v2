import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
	return (
		<header className='sticky inset-x-0 top-0 flex w-full items-center justify-center bg-gradient-to-r from-primary to-secondary shadow-md'>
			<div className='container flex items-center justify-between gap-4 px-2 py-2 md:px-28'>
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
			</div>
		</header>
	)
}

export default Header
