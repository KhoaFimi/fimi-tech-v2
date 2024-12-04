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
	managmentCommision = 'Hoa hồng quản lý',
	paymentStatus = 'Tình trạng thanh toán'
}
