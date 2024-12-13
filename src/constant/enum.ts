export enum GENDER {
	MALE = 'Nam',
	FEMALE = 'Nữ'
}

export enum REPORT_STATUS {
	PENDING = 'Chưa hoàn thành đơn',
	APPROVED = 'Ghi nhận hoa hồng',
	REJECTED = 'Từ chối'
}

export enum PAYMENT_STATUS {
	REMAIN = 'Chưa thanh toán',
	PAID = 'Đã thanh toán'
}

export enum NATIVE_COLUMNS {
	id = 'Mã đơn',
	createdAt = 'Ngày lên đơn',
	customerName = 'Tên khách hàng',
	status = 'Trạng thái',
	commision = 'Hoa hồng',
	campaignCode = 'Chiến dịch',
	publisherCode = 'Mã giới thiệu',
	managmentCommission = 'Hoa hồng AM',
	paymentStatus = 'Tình trạng thanh toán'
}

export enum PRODUCT_CATEGORY {
	all = 'ALL',
	creditCard = 'CREDIT_CARD',
	paymentAccount = 'PAYMENT_ACCOUNT',
	recruitment = 'RECRUITMENT',
	loan = 'LOAN'
}

export enum PRODUCT_CATEGORY_DESSRIPTION {
	all = 'Tất cả',
	creditCard = 'Thẻ tín dụng',
	paymentAccount = 'Tài khoản thanh toán',
	recruitment = 'Tuyển dụng',
	loan = 'Vay tín chấp'
}
