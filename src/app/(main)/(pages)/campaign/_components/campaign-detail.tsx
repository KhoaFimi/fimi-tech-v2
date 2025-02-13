import { Loader2 } from 'lucide-react'
import { FC } from 'react'

import { ProductSchema } from '@/app/(main)/(pages)/campaign/_schema/product.schema'
import { PRODUCT_CATEGORY } from '@/constant/enum'

interface CampaignDetailProps {
	product: ProductSchema | undefined
}

const CampaignDetail: FC<CampaignDetailProps> = ({ product }) => {
	if (!product) {
		return (
			<div className='flex w-full flex-1 items-center justify-center rounded-lg border p-2 py-80 shadow-sm'>
				<div className='flex flex-col items-center gap-y-2 text-foreground/50'>
					<Loader2 className='size-7 animate-spin' />
					<p className='text-sm font-semibold'>Đang tải chi tiết chiến dịch</p>
				</div>
			</div>
		)
	}

	return (
		<div className='w-full flex-1 rounded-lg border pb-4 shadow-sm'>
			<p className='bg-gradient-to-tr from-primary from-30% to-secondary bg-clip-text p-3 text-center text-base font-bold uppercase text-transparent lg:text-left lg:text-lg'>
				Thông tin sản phẩm
			</p>

			<section className='mt-2 flex flex-col gap-y-1.5 space-x-2.5'>
				<Title title='Thông tin chung' />
				<div className='space-y-2 px-2'>
					<Item
						label='Mã sản phẩm: '
						content={product.id}
					/>
					<Item
						label='Tên sản phẩm: '
						content={product.name}
					/>
					<Item
						label='Nhà cung cấp: '
						content={product.advertiser}
					/>
				</div>
			</section>

			<section className='mt-2 flex flex-col gap-y-1.5 space-x-2.5'>
				<Title
					title={
						product.category === PRODUCT_CATEGORY.loan
							? 'Gói vay'
							: 'Ưu đãi sản phẩm'
					}
				/>
				<div className='space-y-2 px-2'>
					{product.productOffer.map((data, i) => (
						<div
							className='flex flex-col gap-y-1 tracking-tight'
							key={i}
						>
							<Item label={data.summary} />
							<ul
								className='list-disc px-8'
								key={i}
							>
								{data.offer.map((item, i) => (
									<li key={i}>
										<p className='text-justify text-sm'>{item}</p>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			<section className='mt-2 flex flex-col gap-y-1.5 space-x-2.5'>
				<Title title='Thông tin sản phẩm' />
				<div className='space-y-2 px-2'>
					<Item
						label='Điểu kiện: '
						content={product.customerRequirement}
					/>

					{product.loanCustomerRequirement && (
						<div className='flex flex-col gap-y-1 tracking-tight'>
							<Item label={'Điểu kiện chi tiết cho từng gói vay'} />
							<ul className='list-disc px-8'>
								{product.loanCustomerRequirement.map((item, i) => (
									<li key={i}>
										<p className='text-justify text-sm'>{item}</p>
									</li>
								))}
							</ul>
						</div>
					)}

					<Item
						label='Khu vực hỗ trợ: '
						content={
							typeof product.supportArea === 'string'
								? 'Toàn quốc'
								: `Hỗ trợ ${product.supportArea.length} tỉnh/thành bao gồm (${product.supportArea.join(', ')})`
						}
					/>

					{product.creditBackground && (
						<Item
							label='Lịch sử tín dụng: '
							content={product.creditBackground}
						/>
					)}

					{product.workBackground && (
						<Item
							label='Thời gian làm việc: '
							content={product.workBackground}
						/>
					)}

					{product.income && (
						<Item
							label='Thu nhập: '
							content={product.income}
						/>
					)}

					{product.cardLimit && (
						<Item
							label='Hạn mức: '
							content={product.cardLimit}
						/>
					)}

					{product.loanLimit && (
						<Item
							label='Hạn mức khoản vay: '
							content={product.loanLimit}
						/>
					)}

					{product.interest && (
						<Item
							label='Lãi suất'
							content={product.interest}
						/>
					)}

					{product.loanDuration && (
						<Item
							label='Thời hạn khoản vay'
							content={product.loanDuration}
						/>
					)}

					{product.loanPaymentTerm && (
						<div className='flex flex-col gap-y-1 tracking-tight'>
							<Item label={product.loanPaymentTerm.summary} />
							<ul className='list-disc px-8'>
								{product.loanPaymentTerm.term.map((item, i) => (
									<li key={i}>
										<p className='text-justify text-sm'>{item}</p>
									</li>
								))}
							</ul>
						</div>
					)}

					{product.dailyCashLimit && (
						<Item
							label='Hạn mức thanh toán: '
							content={product.dailyCashLimit}
						/>
					)}

					{product.cardValidTime && (
						<Item
							label='Thời hạn sử dụng: '
							content={product.cardValidTime}
						/>
					)}

					{product.paymentTerm && (
						<Item
							label='Hình thức thanh toán: '
							content={product.paymentTerm}
						/>
					)}

					<Item
						label='Hồ sơ đăng ký: '
						content={product.requiredDocuments}
					/>

					<Item
						label='Thời gian phê duyệt: '
						content={product.approvalTime}
					/>

					<Item
						label='Thời gian trả kết quả: '
						content={product.finalResultTime}
					/>
				</div>
			</section>

			<section className='mt-2 flex flex-col gap-y-1.5 space-x-2.5'>
				<Title title='Chính sách hoa hồng' />
				<div className='space-y-2 px-2'>
					<div className='flex flex-col gap-y-1 tracking-tight'>
						<Item
							label='Trạng thái trên báo cáo: '
							content={product.commisionPolicy.status}
						/>

						<Item
							label='Diễn giải: '
							content={product.commisionPolicy.description}
						/>

						<Item label='Hoa hồng' />
						<ul className='list-disc px-8'>
							{product.commisionPolicy.commision.map((item, i) => (
								<li key={i}>
									<p className='text-justify text-sm'>{item}</p>
								</li>
							))}
						</ul>
					</div>
					{product.commisionPolicy.note && (
						<Item
							label='Lưu ý: '
							content={product.commisionPolicy.note}
						/>
					)}
				</div>
			</section>

			<section className='mt-2 flex flex-col gap-y-1.5 space-x-2.5'>
				<Title title='Quy tắc ghi nhận' />
				<div className='space-y-2 px-2'>
					<div className='flex flex-col gap-y-1 tracking-tight'>
						<Item label={product.recognitionRules.summary} />
						<ul className='list-disc px-8'>
							{product.recognitionRules.rules.map((item, i) => (
								<li key={i}>
									<p className='text-justify text-sm'>{item}</p>
								</li>
							))}
						</ul>
					</div>
					{product.recognitionRules.note && (
						<Item
							label='Lưu ý: '
							content={product.recognitionRules.note}
						/>
					)}
				</div>
			</section>

			<section className='mt-2 flex flex-col gap-y-1.5 space-x-2.5'>
				<Title title='Quy trình đăng ký' />
				<div className='space-y-2 px-2'>
					<div className='flex flex-col gap-y-1 tracking-tight'>
						<Item label='Việc đăng ký được thực hiện theo các bước sau: ' />
						<ul className='list-none space-y-2 px-4'>
							{product.registrationProcess.map((item, i) => (
								<li key={i}>
									<p className='text-justify text-sm'>
										<span className='font-semibold'>{`${item.split(':')[0]}:`}</span>
										{item.split(':')[1]}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section className='mt-2 flex flex-col gap-y-1.5 space-x-2.5'>
				<Title title='Lý do từ chối' />
				<div className='space-y-2 px-2'>
					<div className='flex flex-col gap-y-1 tracking-tight'>
						<Item label='Đơn có thể bị từ chối nếu vi phạm một trong các điều sau: ' />
						<ul className='list-disc px-8'>
							{product.rejectReason.map((item, i) => (
								<li key={i}>
									<p className='text-justify text-sm'>{item}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section className='mt-2 flex flex-col gap-y-1.5 space-x-2.5'>
				<Title title='Hồ sơ kém chất lượng' />
				<div className='space-y-2 px-2'>
					<div className='flex flex-col gap-y-1 tracking-tight'>
						<Item label='Hồ sơ kém chất lượng nếu vi phạm một trong các điều sau: ' />
						<ul className='list-disc px-8'>
							{product.unqualifiedRecords.map((item, i) => (
								<li key={i}>
									<p className='text-justify text-sm'>{item}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
		</div>
	)
}

const Title: FC<{ title: string }> = ({ title }) => {
	return (
		<div className='w-full bg-primary px-2 py-2'>
			<p className='text-base font-semibold text-white lg:text-lg'>{title}</p>
		</div>
	)
}

const Item: FC<{ label: string; content?: string | null | string[] }> = ({
	label,
	content
}) => {
	return (
		<p className='text-justify text-sm lg:text-base'>
			<span className='font-semibold'>{label}</span>
			{content}
		</p>
	)
}

export default CampaignDetail
