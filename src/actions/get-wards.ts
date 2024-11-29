'use server'

import axios from 'axios'

import { AddressApiResponse } from '@/types'

export const getWards = async (id: string = '0') => {
	const { data: resData } = await axios.get<AddressApiResponse>(
		`https://esgoo.net/api-tinhthanh/3/${id}.htm`
	)

	return resData.data
}
