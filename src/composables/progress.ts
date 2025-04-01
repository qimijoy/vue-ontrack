import type { ActivityType } from '@/types';

import { computed } from 'vue';

import { calculateActivityCompletionPercentage } from '@/modules/activities';
import { timelineItems, calculateTrackedActivitySeconds } from '@/modules/timeline-items';
import { getProgressColorClass } from '@/utils/progress';

export const useProgress = (activity: ActivityType) => {
	const colorClass = computed(() => getProgressColorClass(percentage.value));

	const percentage = computed(() => calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value));

	const trackedActivitySeconds = computed(() => calculateTrackedActivitySeconds(timelineItems.value, activity));

	return {
		trackedActivitySeconds,
		percentage,
		colorClass,
	};
};
