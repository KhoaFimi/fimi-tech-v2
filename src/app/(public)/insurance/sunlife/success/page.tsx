import { CheckCircle } from 'lucide-react'

const SuccessPage = () => {
	return (
		<div className='m-4 flex flex-col items-center space-y-6 rounded-lg border px-8 py-12 shadow-md'>
			<CheckCircle className='size-24 text-primary' />
			<h2 className='text-xl font-semibold uppercase text-primary'>
				Chúc mừng !
			</h2>
			<p className='text-center font-normal text-primary'>
				Bạn đã đăng ký thành công. Vui lòng chờ ít phút, nhân viên tư vấn của
				chúng tôi sẽ liên hệ với bạn ngay!
			</p>
		</div>
	)
}

export default SuccessPage
