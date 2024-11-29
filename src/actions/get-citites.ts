'use server'

import axios from 'axios'

import { AddressApiResponse } from '@/types'

export const getCities = async () => {
	const { data: resData } = await axios.get<AddressApiResponse>(
		'https://esgoo.net/api-tinhthanh/1/0htm'
	)

	return resData.data
}
