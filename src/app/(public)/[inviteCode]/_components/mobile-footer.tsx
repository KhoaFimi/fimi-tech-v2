import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const MobileFooter = () => {
	return (
		<footer className='mt-12 flex w-full flex-col items-center'>
			<div className='w-full bg-gradient-to-tr from-primary from-30% to-secondary'>
				<div className='relative flex items-center px-2 py-4'>
					<div className='flex flex-1 flex-col items-start space-y-4'>
						<Image
							src='/logo-negative.png'
							width={3148}
							height={1367}
							alt='logo'
							className='w-24'
						/>
						<h3 className='text-lg font-bold uppercase text-white'>
							Công Ty TNHH Công Nghệ FIMI
						</h3>
						<div className='flex flex-col items-start gap-4'>
							{/* address 2 */}
							<div className='flex items-center gap-x-2'>
								<div className='rounded-full bg-background p-1'>
									<MapPin className='size-4 text-primary' />
								</div>
								<p className='text-xs font-semibold text-white'>
									CN HCM: Tầng 1, Tòa Nhà H3, 384 Hoàng Diệu, Phường 6, Quận 4,
									TP.HCM.
								</p>
							</div>
							{/* info */}
							<div className='flex flex-wrap gap-4 md:gap-12'>
								{/* email */}
								<div className='flex items-center gap-x-2'>
									<div className='rounded-full bg-background p-1'>
										<Mail className='size-4 text-primary' />
									</div>
									<p className='text-xs font-semibold text-white'>
										admin@fimi.tech
									</p>
								</div>
								{/* phone */}
								<div className='flex items-center gap-x-2'>
									<div className='rounded-full bg-background p-1'>
										<Phone className='size-4 text-primary' />
									</div>
									<p className='text-xs font-semibold text-white'>
										0393 017 031
									</p>
								</div>
								{/* work time */}
								<div className='flex items-center gap-x-2'>
									<div className='rounded-full bg-background p-1'>
										<Clock className='size-4 text-primary' />
									</div>
									<p className='text-xs font-semibold text-white'>
										8:30 - 17:30 | Thứ 2 - Thứ 6
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className='absolute right-5 top-4 flex items-center gap-3'>
						<Link href='https://www.facebook.com/fimipubs'>
							<Image
								src='/brand/facebook.png'
								alt='facebook-logo'
								width={512}
								height={512}
								className='w-8'
							/>
						</Link>
						<Link href='https://www.facebook.com/fimipubs'>
							<Image
								src='/brand/youtube.png'
								alt='youtube-logo'
								width={512}
								height={512}
								className='w-8'
							/>
						</Link>
						<Link href='https://www.facebook.com/fimipubs'>
							<Image
								src='/brand/tik-tok.png'
								alt='tiktok-logo'
								width={512}
								height={512}
								className='w-8'
							/>
						</Link>
					</div>
				</div>
			</div>
			<div className='w-full bg-background px-2 py-2'>
				<p className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-xs font-bold text-transparent'>
					Copyright &#169; FIMI Tech Co., Ltd, all right reserved.
				</p>
			</div>
		</footer>
	)
}

export default MobileFooter
