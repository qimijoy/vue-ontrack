import type { selectItemType } from '@/types/select';
import type { ActivityItemType } from '@/types/activity';

import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE, MINUTES_IN_HOUR } from '@/constants/time';
import { id } from '@/utils/generators';

export const generateActivities = (): ActivityItemType[] => {
	return [
		{
			id: id(),
			name: 'Coding',
			secondsToComplete: 0 * SECONDS_IN_HOUR,
		},
		{
			id: id(),
			name: 'Training',
			secondsToComplete: 1 * SECONDS_IN_HOUR,
		},
		{
			id: id(),
			name: 'Reading',
			secondsToComplete: 2 * SECONDS_IN_HOUR,
		},
	];
};

export const generateActivitySelectOptions = (activities: ActivityItemType[]): selectItemType[] => {
	return activities.map((activity) => ({ label: activity.name, value: activity.id }));
};

const generatePeriodSelectOptionsLabel = (periodInMinutes: number) => {
	const hours = String(Math.floor(periodInMinutes / MINUTES_IN_HOUR)).padStart(2, '0');
	const minutes = String(periodInMinutes % MINUTES_IN_HOUR).padStart(2, '0');

	return `${hours}:${minutes}`;
};

export const generatePeriodSelectOptions = (): selectItemType[] => {
	const periodsInMinutes: number[] = [
		15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
	];

	return periodsInMinutes.map((periodInMinutes) => ({
		value: periodInMinutes * SECONDS_IN_MINUTE,
		label: generatePeriodSelectOptionsLabel(periodInMinutes),
	}));
};
