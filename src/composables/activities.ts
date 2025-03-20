import type { ActivityItemType } from '@/types/activity';

import { ref, computed } from 'vue';

import { timelineItems } from '@/composables/timelineItems';
import { generateActivities, generateActivitySelectOptions } from '@/utils/activities';

// STATES
export const activities = ref(generateActivities());

// COMPUTED
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

// FUNCTIONS
export const createActivity = (activity: ActivityItemType) => {
	activities.value.push(activity);
};

export const deleteActivity = (activity: ActivityItemType) => {
	timelineItems.value.forEach((timelineItem) => {
		if (timelineItem.activityId === activity.id) {
			timelineItem.activityId = null;
			timelineItem.activitySeconds = 0;
		}
	});

	const index = activities.value.findIndex(({ id }) => id === activity.id);
	activities.value.splice(index, 1);
};

export const setActivitySecondsToComplete = (activity: ActivityItemType, secondsToComplete: number) => {
	activity.secondsToComplete = secondsToComplete || 0;
};
