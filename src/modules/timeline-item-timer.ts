import type { TimelineItemType } from '@/types';

import { ref } from 'vue';

import { MILLISECONDS_IN_SECOND } from '@/constants/time';
import { activeTimelineItem, updateTimelineItem } from '@/modules/timeline-items';

// STATE
const timelineItemTimer = ref<NodeJS.Timeout | undefined>();

// FUNCTIONS
export const startTimelineItemTimer = (timelineItem?: TimelineItemType): void => {
	timelineItem = timelineItem ?? activeTimelineItem.value;

	if (!timelineItem) {
		return;
	}

	updateTimelineItem(timelineItem, { isActive: true });

	timelineItemTimer.value = setInterval((): void => {
		if (!timelineItem) {
			return;
		}

		updateTimelineItem(timelineItem, {
			activitySeconds: timelineItem.activitySeconds + 1,
		});
	}, MILLISECONDS_IN_SECOND);
};

export const stopTimelineItemTimer = (): void => {
	if (!activeTimelineItem.value) {
		return;
	}

	updateTimelineItem(activeTimelineItem.value, { isActive: false });
	clearInterval(timelineItemTimer.value);

	timelineItemTimer.value = undefined;
};

export const resetTimelineItemTimer = (timelineItem: TimelineItemType): void => {
	updateTimelineItem(timelineItem, { activitySeconds: 0 });

	if (activeTimelineItem.value) {
		stopTimelineItemTimer();
	}
};
