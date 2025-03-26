import type { ActivityItemType } from '@/types/activity';

import { ref, computed } from 'vue';

import { HUNDRED_PERCENT } from '@/constants/percentages';

// STATES
export const activities = ref([]);

// COMPUTED
export const activitySelectOptions = computed(() =>
	activities.value.map((activity) => ({
		label: activity.name,
		value: activity.id,
	})),
);

const totalActivitySecondsToComplete = computed(() => {
	return trackedActivities.value
		.map(({ secondsToComplete }) => secondsToComplete)
		.reduce((total, seconds) => total + seconds, 0);
});

export const trackedActivities = computed(() => {
	return activities.value.filter(({ secondsToComplete }) => secondsToComplete !== 0);
});

// FUNCTIONS
export const initializeActivities = (state) => {
	activities.value = state.activities || [];
};

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

export const calculateCompletionPercentage = (totalTrackedSeconds: number) => {
	return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value);
};
