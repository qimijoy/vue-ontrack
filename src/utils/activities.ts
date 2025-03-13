import type { selectItemType } from '@/types/select';
import type { ActivityItemType } from '@/types/activity';

import { SECONDS_IN_HOUR } from '@/constants/time';
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
