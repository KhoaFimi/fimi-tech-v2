'use server'

import { formatInTimeZone } from 'date-fns-tz'

import { config } from '@/lib/config'
import { sendMail } from '@/lib/server/mailer'
import { newUserMailTemplate } from '@/lib/server/templaces/new-user'

export const sendMailToNewUser = async (data: {
	code: string
	fullname: string
	email: string
	phone: string
}) => {
	const timeStamp = formatInTimeZone(
		new Date(),
		'Asia/Ho_Chi_Minh',
		'dd/MM/yyyy'
	)

	const template = newUserMailTemplate({
		code: data.code,
		name: data.fullname,
		phone: data.phone,
		date: timeStamp
	})

	await sendMail({
		to: data.email,
		html: template,
		from: `FIMI ${config.ADMIN_EMAIL_ADDRESS}`
	})
}
