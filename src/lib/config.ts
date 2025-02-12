import { z } from 'zod'

export const envSchema = z.object({
	NODE_ENV: z
		.union([
			z.literal('development'),
			z.literal('testing'),
			z.literal('production')
		])
		.default('development'),
	NEXT_PUBLIC_DOMAIN: z.string().default('http://localhost:3000'),
	BASE_URL: z.string().url().default('http://localhost:3000'),
	GCP_TYPE: z.string(),
	GCP_PROJECT_ID: z.string(),
	GCP_PRIVATE_KEY_ID: z.string(),
	GCP_PRIVATE_KEY: z.string(),
	GCP_CLIENT_EMAIL: z.string(),
	GCP_CLIENT_ID: z.string(),
	GCP_AUTH_URI: z.string(),
	GCP_TOKEN_URI: z.string(),
	GCP_UNIVERSE_DOMAIN: z.string(),
	SHEET_USER_ID: z.string(),
	SHEET_USER_NAME: z.string(),
	SHEET_TOKEN_NAME: z.string(),
	SHEET_LEAD_ID: z.string(),
	SHEET_LEAD_NAME: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	GOOGLE_REFRESH_TOKEN: z.string(),
	ADMIN_EMAIL_ADDRESS: z.string().email(),
	ACCESS_TOKEN_SECRET: z.string(),
	REFRESH_TOKEN_SECRET: z.string()
})

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}

export const config = envSchema.parse(process.env)
