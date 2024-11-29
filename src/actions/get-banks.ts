'use server'

import axios from 'axios'

import { BankApiResponse } from '@/types'

export const getBanks = async () => {
	const { data: resData } = await axios.get<BankApiResponse>(
		'https://api.vietqr.io/v2/banks'
	)

	return resData.data
}
