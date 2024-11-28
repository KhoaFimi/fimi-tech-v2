import { google } from 'googleapis'
import * as nodemailer from 'nodemailer'

import { config } from '@/lib/config'

export const mailerConfig = async () => {
	const Oauth2 = google.auth.OAuth2

	const oauth2Client = new Oauth2(
		config.GOOGLE_CLIENT_ID,
		config.GOOGLE_CLIENT_SECRET
	)

	oauth2Client.setCredentials({
		refresh_token: config.GOOGLE_REFRESH_TOKEN
	})

	const accessTokenObj = await oauth2Client.getAccessToken()

	const accessToken = accessTokenObj.token

	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: config.ADMIN_EMAIL_ADDRESS,
			clientId: config.GOOGLE_CLIENT_ID,
			clientSecret: config.GOOGLE_CLIENT_SECRET,
			refreshToken: config.GOOGLE_REFRESH_TOKEN,
			accessToken
		},
		from: `FIMI ${config.ADMIN_EMAIL_ADDRESS}`
	} as nodemailer.TransportOptions)

	return transport
}

export const sendMail = async (options: nodemailer.SendMailOptions) => {
	const mailer = await mailerConfig()

	const res = await mailer.sendMail(options)

	return res
}
