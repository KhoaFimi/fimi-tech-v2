import Image from 'next/image'

const MobileHeader = () => {
	return (
		<header className='z-50 flex w-full items-center justify-center'>
			<div className='container flex items-center justify-evenly px-2 pb-4 pt-8 lg:flex-row'>
				<Image
					src='/logo.png'
					width={3148}
					height={1367}
					alt='logo'
					className='w-24'
				/>
				<Image
					src='/sunlife-logo.png'
					width={3148}
					height={1367}
					alt='logo'
					className='w-36'
				/>
			</div>
		</header>
	)
}

export default MobileHeader
