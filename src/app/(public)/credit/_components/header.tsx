import Image from 'next/image'

const Header = () => {
	return (
		<header
			className={`sticky inset-x-0 top-0 z-50 h-fit select-none bg-gradient-to-r from-primary from-30% to-secondary shadow-md`}
		>
			<div className='flex items-center justify-center space-x-4 px-3 py-2'>
				<Image
					src='/logo-negative.png'
					alt='logo'
					width={3148}
					height={1367}
					className='w-20'
				/>
			</div>
		</header>
	)
}

export default Header
