import type { ProgressColorClassType } from '@/types';

import { computed } from 'vue';

import { trackedActivities, calculateCompletionPercentage } from '@/modules/activities';
import { timelineItems, calculateTrackedActivitySeconds } from '@/modules/timeline-items';
import { getProgressColorClass } from '@/utils/progress';

export const useTotalProgress = () => {
	const colorClass = computed((): ProgressColorClassType => getProgressColorClass(percentage.value));

	const percentage = computed((): number => calculateCompletionPercentage(totalTrackedSeconds.value));

	const totalTrackedSeconds = computed((): number => {
		return trackedActivities.value
			.map((activity): number =>
				Math.min(calculateTrackedActivitySeconds(timelineItems.value, activity), activity.secondsToComplete),
			)
			.reduce((total, seconds): number => total + seconds, 0);
	});

	return {
		colorClass,
		percentage,
	};
};
