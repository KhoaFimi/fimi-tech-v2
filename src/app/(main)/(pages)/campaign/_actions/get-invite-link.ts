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
	if (product === 'fimiinvite')
		return `${config.DOMAIN}/register?ref=${publisherCode}`

	const uniqueToken = encodeURIComponent(
		btoa(
			JSON.stringify({
				publisherCode,
				managerCode,
				product
			})
		)
	)

	return `${config.DOMAIN}/${uniqueToken}`
}
