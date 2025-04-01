import type { ActivityType, SelectOptionType, StateType } from '@/types';

import { ref, computed } from 'vue';

import { HUNDRED_PERCENT } from '@/constants/percentages';

// STATES
export const activities = ref<ActivityType[]>([]);

// COMPUTED
export const trackedActivities = computed<ActivityType[]>(() => {
	return activities.value.filter(({ secondsToComplete }): boolean => secondsToComplete !== 0);
});

export const activitySelectOptions = computed<SelectOptionType[]>(() =>
	generateActivitySelectOptions(activities.value),
);

const totalActivitySecondsToComplete = computed<number>(() => {
	return trackedActivities.value
		.map(({ secondsToComplete }): number => secondsToComplete)
		.reduce((total, seconds) => total + seconds, 0);
});

// FUNCTIONS
export const initializeActivities = (state: StateType): void => {
	activities.value = state.activities || [];
};

export const createActivity = (activity: ActivityType): void => {
	activities.value.push(activity);
};

export const updateActivity = (activity: ActivityType, fields: Partial<ActivityType>): ActivityType => {
	return Object.assign(activity, fields);
};

export const deleteActivity = (activity: ActivityType): void => {
	const index = activities.value.findIndex(({ id }) => id === activity.id);
	activities.value.splice(index, 1);
};

export const calculateActivityCompletionPercentage = (
	{ secondsToComplete }: ActivityType,
	trackedSeconds: number,
): number => {
	return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete);
};

export const calculateCompletionPercentage = (totalTrackedSeconds: number) => {
	return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value);
};

const generateActivitySelectOptions = (activities: ActivityType[]): SelectOptionType[] => {
	return activities.map(
		(activity): SelectOptionType => ({
			label: activity.name,
			value: activity.id,
		}),
	);
};
