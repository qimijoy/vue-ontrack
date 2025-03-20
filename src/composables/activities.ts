import type { ActivityItemType } from '@/types/activity';

import { ref, computed } from 'vue';

import { SECONDS_IN_HOUR } from '@/constants/time';
import { id } from '@/utils/generators';

const generateActivities = (): ActivityItemType[] => {
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

// STATES
export const activities = ref(generateActivities());

// COMPUTED
export const activitySelectOptions = computed(() =>
	activities.value.map((activity) => ({
		label: activity.name,
		value: activity.id,
	})),
);

// FUNCTIONS
export const createActivity = (activity: ActivityItemType) => {
	activities.value.push(activity);
};

export const updateActivity = (activity: ActivityItemType, fields) => {
	return Object.assign(activity, fields);
};

export const deleteActivity = (activity: ActivityItemType) => {
	const index = activities.value.findIndex(({ id }) => id === activity.id);
	activities.value.splice(index, 1);
};
