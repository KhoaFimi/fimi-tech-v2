export const genOid = (length: number = 12): string => {
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'

	const result = Array.from(
		{ length },
		() => characters[Math.floor(Math.random() * characters.length)]
	).join('')

	return result
}
