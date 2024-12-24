export interface ComboboxItem {
	id: string
	value: string
	label: string
}

export interface AddressApiResponse {
	error: number
	error_text: string
	data_name?: string
	data: CityType[]
}

export interface BankApiResponse {
	code: string
	desc: string
	data: BankType[]
}

export type CityType = {
	id: string
	name: string
	name_en: string
	full_name: string
	full_name_en: string
	latitude: string
	longitude: string
}

export type BankType = {
	id: number
	name: string
	code: string
	bin: string
	shortName: string
	logo: string
	transferSupported: number
	lookupSupported: number
	short_name: string
	support: number
	isTransfer: number
	swift_code: string
}

export type Report = {
	id: string
	createdAt: string
	publisherCode: string
	campaignCode: string
	customerName: string
	customerPhone: string
	customerEmail: string
	customerProvince: string
	status: 'APPROVED' | 'REJECTED' | 'PENDING'
	commision: number
	paymentStatus: 'PAID' | 'REMAIN'
	managerCode: string
}

export type ReportResponse = {
	data: Report[]
	commision: {
		pub: number
		am: number
		total: number
		remain: number
		paid: number
	}
	order: {
		total: number
		amOrder: number
		pubOrder: number
		approved: number
		rejected: number
		pending: number
	}
}

export type TokenPayload = {
	sub: string
	publisherCode: string
	managerCode: string
	fullname: string
	role: string
}
