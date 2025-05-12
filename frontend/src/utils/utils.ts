import moment from 'moment';

const priceFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export const formatAsPrice = (price: number) => priceFormatter.format(price);

export function buildUtcISOString(
	input: string | Date,
	hour: number = 0,
	minute: number = 0
): string {
	const date = typeof input === 'string' ? new Date(input) : input;

	const utc = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute)
	);

	return dateFormatter3(utc);
}

export const dateFormatter3 = (date: Date) => {
	//const m = moment(date).format('YYYY-MM-DD HH:mm:ss.SSSSSSS');
	return moment.utc(date).format('YYYY-MM-DDTHH:mm:ss[Z]');
};

export const utcISOString = (date: string) => {
	return moment(date, 'DD/MM/YYYY').utc().startOf('day').toISOString();
};
