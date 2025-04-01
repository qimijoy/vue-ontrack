import type { SelectOptionType } from '@/types';

import { SECONDS_IN_MINUTE, MINUTES_IN_HOUR } from '@/constants/time';

const generatePeriodSelectOptionsLabel = (periodInMinutes: number): string => {
	const hours = String(Math.floor(periodInMinutes / MINUTES_IN_HOUR)).padStart(2, '0');
	const minutes = String(periodInMinutes % MINUTES_IN_HOUR).padStart(2, '0');

	return `${hours}:${minutes}`;
};

export const generatePeriodSelectOptions = (): SelectOptionType<number>[] => {
	const periodsInMinutes: number[] = [
		15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
	];

	return periodsInMinutes.map(
		(periodInMinutes): SelectOptionType<number> => ({
			value: periodInMinutes * SECONDS_IN_MINUTE,
			label: generatePeriodSelectOptionsLabel(periodInMinutes),
		}),
	);
};
