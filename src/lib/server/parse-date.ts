import { formatInTimeZone } from 'date-fns-tz'

export const parseDate = (datestring: Date | string | number) => {
	const date = formatInTimeZone(datestring, 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd')

	return date.charAt(0) === '0' ? `'${date}` : date
}
