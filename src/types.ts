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
