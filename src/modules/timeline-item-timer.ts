import type { TimelineItemType } from '@/types';

import { ref } from 'vue';

import { MILLISECONDS_IN_SECOND } from '@/constants/time';
import { activeTimelineItem, updateTimelineItem } from '@/modules/timeline-items';

// STATE
const timelineItemTimer = ref<number | undefined>();

// FUNCTIONS
export const startTimelineItemTimer = (timelineItem?: TimelineItemType): void => {
	timelineItem = timelineItem ?? activeTimelineItem.value;
	updateTimelineItem(timelineItem as any, { isActive: true });

	timelineItemTimer.value = setInterval((): void => {
		updateTimelineItem(timelineItem as any, {
			activitySeconds: (timelineItem as any).activitySeconds + 1,
		});
	}, MILLISECONDS_IN_SECOND);
};

export const stopTimelineItemTimer = (): void => {
	updateTimelineItem(activeTimelineItem.value as any, { isActive: false });
	clearInterval(timelineItemTimer.value);

	timelineItemTimer.value = undefined;
};

export const resetTimelineItemTimer = (timelineItem: TimelineItemType): void => {
	updateTimelineItem(timelineItem, { activitySeconds: 0 });

	if (activeTimelineItem.value) {
		stopTimelineItemTimer();
	}
};
