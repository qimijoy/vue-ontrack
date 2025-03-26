import type { timelineItemType } from '@/types/timeline';

import { ref } from 'vue';

import { MILLISECONDS_IN_SECOND } from '@/constants/time';
import { activeTimelineItem, updateTimelineItem } from '@/modules/timeline-items';

// STATE
const timelineItemTimer = ref(null);

// FUNCTIONS
export const startTimelineItemTimer = (timelineItem: timelineItemType) => {
	timelineItem = timelineItem ?? activeTimelineItem.value;
	updateTimelineItem(timelineItem, { isActive: true });

	timelineItemTimer.value = setInterval(() => {
		updateTimelineItem(timelineItem, {
			activitySeconds: timelineItem.activitySeconds + 1,
		});
	}, MILLISECONDS_IN_SECOND);
};

export const stopTimelineItemTimer = () => {
	updateTimelineItem(activeTimelineItem.value, { isActive: false });
	clearInterval(timelineItemTimer.value);

	timelineItemTimer.value = null;
};

export const resetTimelineItemTimer = (timelineItem: timelineItemType) => {
	updateTimelineItem(timelineItem, { activitySeconds: 0 });

	if (activeTimelineItem.value) {
		stopTimelineItemTimer();
	}
};
