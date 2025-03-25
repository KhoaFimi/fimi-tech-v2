'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

const SunlifeLandingPage = () => {
	const { inviteCode } = useParams()

	return (
		<div className='relative flex flex-col'>
			<Image
				src='/sunlife-brand.png'
				alt='brand'
				width={1500}
				height={1500}
			/>
			<section className='my-8 flex select-none items-end gap-x-2 p-2'>
				<Image
					src='/mascot-shield.png'
					alt='shield'
					width={1500}
					height={1500}
					className='w-[180px]'
				/>
				<div>
					<div className='flex flex-col'>
						<h1 className='text-[24px] font-[800] uppercase text-primary'>
							Sun sống mới
						</h1>
						<p className='text-[15px] font-bold text-primary'>
							Bảo hiểm liên kết chung
						</p>
					</div>

					<p className='text-justify text-[11px] font-medium leading-tight'>
						Chắp cánh cho hành trình khác biệt. <br />
						Cuộc sống muôn màu. Hãy khám phá những hành trình độc đáo để đánh
						thức sự mới mẻ trong bạn. Sống hết mình, tự tin yêu thương và tận
						hưởng những trải nghiệm khác biệt với SUN - Sống Mới.
					</p>
				</div>
			</section>

			<section className='flex w-full select-none items-start justify-between space-x-2 bg-primary px-4 py-6'>
				<div className='flex w-[110px] flex-col items-center space-y-4 text-center'>
					<Image
						src='/icon/star-point.svg'
						width={35}
						height={40}
						alt='start'
						className='h-[40px] w-[35px]'
					/>
					<div>
						<h3 className='text-[15px] font-bold text-white'>Tích lũy:</h3>
						<p className='text-[11px] text-white'>
							20 triệu VND/năm, sau 10 năm được 300 triệu VND.
						</p>
					</div>
				</div>

				<div className='flex w-[110px] flex-col items-center space-y-4 text-center'>
					<Image
						src='/icon/bulb-hand.svg'
						width={50}
						height={50}
						alt='start'
						className='size-[42px]'
					/>
					<div>
						<h3 className='text-[15px] font-bold text-white'>Đầu tư:</h3>
						<p className='text-[11px] text-white'>
							Lợi suất 6-8%/năm, đạt 500 triệu VND sau 15 năm.
						</p>
					</div>
				</div>

				<div className='flex w-[110px] flex-col items-center space-y-4 text-center'>
					<Image
						src='/icon/cash-out.svg'
						width={49.35}
						height={47}
						alt='start'
						className='h-[47px] w-[49.35px]'
					/>
					<div>
						<h3 className='text-[15px] font-bold text-white'>Rút tiền:</h3>
						<p className='text-[11px] text-white'>
							50 triệu VND/lần từ năm thứ 5.
						</p>
					</div>
				</div>
			</section>

			<section className='relative mb-8 mt-16 flex select-none p-2'>
				<div className='w-[245px]'>
					<div className='flex flex-col'>
						<h1 className='text-[24px] font-[800] uppercase text-primary'>
							SỐNG CHẤT
						</h1>
						<p className='text-[15px] font-bold text-primary'>
							Bảo hiểm bổ sung
						</p>
					</div>

					<p className='text-justify text-[11px] font-medium leading-tight'>
						Quỹ chăm sóc sức khỏe gia đình đột phá Gia đình và sức khỏe là bệ
						phóng để theo đuổi những ước mơ và mục đích sống của mỗi người.{' '}
						<br />
						Hãy chăm sóc sức khỏe cho cả gia đình theo cách khác biệt với Bảo
						hiểm Bổ sung (BHBS) - Sống Chất, mang đến những quyền lợi hấp dẫn
						chưa từng có tại Việt Nam, giúp Khách hàng có thêm những trải nghiệm
						mới để tận hưởng cuộc sống chất lượng, đẳng cấp theo chất riêng.
					</p>
				</div>
				<Image
					src='/mascot-umbrela.png'
					alt='shield'
					width={1500}
					height={1500}
					className='absolute -top-8 right-2 w-[246px]'
				/>
			</section>

			<section className='flex w-full select-none items-start justify-between space-x-2 bg-primary px-4 py-6'>
				<div className='flex w-[110px] flex-col items-center space-y-4 text-center'>
					<Image
						src='/icon/health.svg'
						width={35}
						height={40}
						alt='start'
						className='h-[40px] w-[35px]'
					/>
					<div>
						<h3 className='text-[15px] font-bold text-white'>Quỹ sức khỏe</h3>
						<p className='text-[11px] text-white'>
							10 triệu VND/năm cho mỗi thành viên để khám và điều trị.
						</p>
					</div>
				</div>

				<div className='flex w-[110px] flex-col items-center space-y-4 text-center'>
					<Image
						src='/icon/health-doc.svg'
						width={47}
						height={47}
						alt='start'
						className='size-[47px]'
					/>
					<div>
						<h3 className='text-[15px] font-bold text-white'>Chi trả y tế</h3>
						<p className='text-[11px] text-white'>
							500 triệu VND/năm cho nội trú, kể cả bệnh hiểm nghèo.
						</p>
					</div>
				</div>

				<div className='flex w-[110px] flex-col items-center space-y-4 text-center'>
					<Image
						src='/icon/hand-coin.svg'
						width={49.35}
						height={47}
						alt='start'
						className='h-[47px] w-[49.35px]'
					/>
					<div>
						<h3 className='text-[15px] font-bold text-white'>
							Thưởng linh hoạt
						</h3>
						<p className='text-[11px] text-white'>
							50 triệu VND nếu không dùng quyền lợi trong năm.
						</p>
					</div>
				</div>

				<div className='flex w-[110px] flex-col items-center space-y-4 text-center'>
					<Image
						src='/icon/health-sheild.svg'
						width={49.35}
						height={47}
						alt='start'
						className='h-[47px] w-[49.35px]'
					/>
					<div>
						<h3 className='text-[15px] font-bold text-white'>Bảo vệ tối đa</h3>
						<p className='text-[11px] text-white'>
							1 tỷ VND cho rủi ro tử vong do bệnh
						</p>
					</div>
				</div>
			</section>

			<div className='fixed bottom-0 w-full overflow-hidden rounded-b-lg rounded-t-lg bg-white/80 px-2 py-2 backdrop-blur-lg sm:w-[398px]'>
				<Button
					className='w-full self-center'
					asChild
				>
					<Link href={`/insurance/sunlife/${inviteCode}?step=2`}>
						Đăng ký tư vấn
					</Link>
				</Button>
			</div>

			<section className='bg-primary py-4'>
				<p className='text-center text-[11px] font-medium text-white'>
					FIMI - Bản quyền đã được bảo hộ <br />
					Chính sách bảo mật
				</p>
			</section>
		</div>
	)
}

export default SunlifeLandingPage
