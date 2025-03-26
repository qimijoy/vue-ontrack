import type { timelineItemType } from '@/types/timeline';

import { ref, watchEffect } from 'vue';

import { MILLISECONDS_IN_SECOND } from '@/constants/time';
import { activeTimelineItem, updateTimelineItem } from '@/modules/timeline-items';
import { now } from '@/modules/time';

// STATE
export const timelineItemTimer = ref(null);

// FUNCTIONS
export const startTimelineItemTimer = (timelineItem: timelineItemType) => {
	updateTimelineItem(timelineItem, { isActive: true });

	timelineItemTimer.value = setInterval(() => {
		updateTimelineItem(timelineItem, {
			activitySeconds: timelineItem.activitySeconds + 1,
		});
	}, MILLISECONDS_IN_SECOND);
};

export const stopTimelineItemTimer = (timelineItem: timelineItemType) => {
	updateTimelineItem(timelineItem, { isActive: false });
	clearInterval(timelineItemTimer.value);

	timelineItemTimer.value = null;
};

export const resetTimelineItemTimer = (timelineItem: timelineItemType) => {
	updateTimelineItem(timelineItem, { activitySeconds: 0 });

	stopTimelineItemTimer(timelineItem);
};

watchEffect(() => {
	if (activeTimelineItem.value && activeTimelineItem.value.hour !== now.value.getHours()) {
		stopTimelineItemTimer(activeTimelineItem.value);
	}
});
