export const parseVni = (data: string) =>
	data
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/gi, 'd')
