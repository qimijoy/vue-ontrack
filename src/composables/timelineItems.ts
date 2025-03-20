import type { timelineItemType } from '@/types/timeline';

import { ref } from 'vue';

import { activities } from '@/composables/activities';
import { generateTimelineItems } from '@/utils/timelines';

// STATES
export const timelineItems = ref(generateTimelineItems(activities.value));

// FUNCTIONS
export const setTimelineItemActivity = (timelineItem: timelineItemType, activityId: string) => {
	timelineItem.activityId = activityId;
};

export const updateTimelineItemActivitySeconds = (timelineItem: timelineItemType, activitySeconds: number) => {
	timelineItem.activitySeconds += activitySeconds;
};
