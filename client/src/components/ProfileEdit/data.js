const range = (from, to) => { 
	const arr = [];
	for (let i = from; i <= to; i++) { 
		arr[arr.length] = i;
	}
	return arr;
}

const year = new Date().getFullYear();

export const genders = [
	'Male',
	'Female',
	'Non-Binary',
	'Prefer Not to Say'
];

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const days = range(1, 31);
export const years = range(year - 80, year);
