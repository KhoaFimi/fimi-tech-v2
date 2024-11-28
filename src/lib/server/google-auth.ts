import { JWT } from 'google-auth-library'
import { google } from 'googleapis'

import { config } from '@/lib/config'

export const getGoogleAuth = async () => {
	return await google.auth.getClient({
		projectId: config.GCP_PROJECT_ID,
		credentials: {
			type: config.GCP_TYPE,
			project_id: config.GCP_PROJECT_ID,
			private_key_id: config.GCP_PRIVATE_KEY_ID,
			private_key: config.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
			client_email: config.GCP_CLIENT_EMAIL,
			universe_domain: config.GCP_UNIVERSE_DOMAIN
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	})
}

export const getGoogleAuthV2 = async () => {
	const serviceAccountAuth = new JWT({
		email: config.GCP_CLIENT_EMAIL,
		key: config.GCP_PRIVATE_KEY,
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	})

	return serviceAccountAuth
}
