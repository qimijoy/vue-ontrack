import { computed } from 'vue';

import { trackedActivities, calculateCompletionPercentage } from '@/modules/activities';
import { timelineItems, calculateTrackedActivitySeconds } from '@/modules/timeline-items';
import { getProgressColorClass } from '@/composables/progress';

export const useTotalProgress = () => {
	const colorClass = computed(() => getProgressColorClass(percentage.value));

	const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value));

	const totalTrackedSeconds = computed(() => {
		return trackedActivities.value
			.map((activity) =>
				Math.min(calculateTrackedActivitySeconds(timelineItems.value, activity), activity.secondsToComplete),
			)
			.reduce((total, seconds) => total + seconds, 0);
	});

	return {
		percentage,
		colorClass,
	};
};
