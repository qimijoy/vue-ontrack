import type { ActivityItemType } from '@/types/activity';

import { ref, computed } from 'vue';

import { HUNDRED_PERCENT } from '@/constants/percentages';
import { id } from '@/utils/generators';

const generateActivities = (): ActivityItemType[] => {
	return ['Coding', 'Reading', 'Training'].map((name) => ({
		id: id(),
		name,
		secondsToComplete: 15 * 60,
	}));
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

export const trackedActivities = computed(() => {
	return activities.value.filter(({ secondsToComplete }) => secondsToComplete !== 0);
});

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

export const calculateActivityCompletionPercentage = (
	{ secondsToComplete }: ActivityItemType,
	trackedSeconds: number,
) => {
	return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete);
};
