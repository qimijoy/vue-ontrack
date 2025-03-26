import type { ActivityItemType } from '@/types/activity';

import { computed } from 'vue';

import { calculateActivityCompletionPercentage } from '@/composables/activities';
import { timelineItems, calculateTrackedActivitySeconds } from '@/composables/timelineItems';

import { LOW_PERCENT, MEDIUM_PERCENT, HUNDRED_PERCENT } from '@/constants/percentages';

export const useProgress = (activity: ActivityItemType) => {
	const colorClass = computed(() => getProgressColorClass(percentage.value));

	const percentage = computed(() => calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value));

	const trackedActivitySeconds = computed(() => calculateTrackedActivitySeconds(timelineItems.value, activity));

	return {
		trackedActivitySeconds,
		percentage,
		colorClass,
	};
};

export const getProgressColorClass = (percentage: number) => {
	if (percentage < LOW_PERCENT) {
		return 'bg-red-500';
	}

	if (percentage < MEDIUM_PERCENT) {
		return 'bg-yellow-500';
	}

	if (percentage < HUNDRED_PERCENT) {
		return 'bg-blue-500';
	}

	return 'bg-green-500';
};
