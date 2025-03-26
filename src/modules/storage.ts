import { APP_NAME } from '@/constants/application';

export const load = () => {
	const state = localStorage.getItem(APP_NAME);

	return state ? JSON.parse(state) : {};
};

export const save = (data) => {
	localStorage.setItem(
		APP_NAME,
		JSON.stringify({
			...data,
			date: new Date().toDateString(),
		}),
	);
};
