'use server'

import { config } from '@/lib/config'

export const getInviteLink = async ({
	publisherCode,
	managerCode,
	product
}: {
	publisherCode: string
	managerCode: string
	product: string
}) => {
	return `${config.DOMAIN}/${btoa(
		JSON.stringify({
			publisherCode,
			managerCode,
			product
		})
	)}`
}
