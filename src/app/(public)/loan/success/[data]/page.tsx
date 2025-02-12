import { Base64 } from 'base64-string'
import { format } from 'date-fns'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

type Params = Promise<{
	data: string
}>

interface LoanLeadSuccessPageProps {
	params: Params
}

const successLoanSchema = z.object({
	fullName: z.string(),
	contactTime: z.string()
})

const LoanLeadSuccessPage: FC<LoanLeadSuccessPageProps> = async ({
	params
}) => {
	const { data } = await params

	const enc = new Base64()

	const parseData = enc.decode(data)

	const { contactTime, fullName } = successLoanSchema.parse(
		JSON.parse(parseData)
	)

	const parseContactTime = (dateString: string) => {
		const [date, time] = dateString.split(' ')

		const transformTime = (time: string) => {
			const [prefix, suffix] = time.split('-')

			const [hour, minutes] = prefix.split(':')

			return `${suffix === 'PM' ? parseInt(hour) + 12 : hour}:${minutes}`
		}

		return {
			date: format(date, 'dd/MM/yyyy'),
			time: transformTime(time)
		}
	}

	console.log(contactTime)

	const { date, time } = parseContactTime(contactTime)

	return (
		<div className='mt-4 w-full rounded-lg border p-2 shadow'>
			<h3 className='text-center text-xl font-bold uppercase tracking-tighter text-primary drop-shadow'>
				Đăng ký khoản vay thành công
			</h3>
			<div className='space-y-4 p-2'>
				<p className='text-center font-medium'>
					Chúc mừng{' '}
					<span className='font-semibold text-primary'>{fullName}</span> đã đăng
					ký khoản vay thành công
				</p>
				<Image
					src='/congrat.png'
					alt='brand'
					width={350}
					height={640}
				/>
				<p className='text-justify'>
					Tư vấn viên của chúng tôi sẽ liên hệ với bạn vào{' '}
					<span className='font-medium text-primary'>
						{time} - {date}
					</span>
					, hãy chú ý điện thoại nhé.
				</p>
				<Button className='w-full'>
					<Phone className='size-4' /> Liên hệ hỗ trợ
				</Button>
			</div>
		</div>
	)
}

export default LoanLeadSuccessPage
