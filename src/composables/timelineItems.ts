import type { timelineItemType } from '@/types/timeline';
import type { ActivityItemType } from '@/types/activity';

import { ref } from 'vue';

import { activities } from '@/composables/activities';
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time';
import { getCurrentHour } from '@/utils/timelines';

const generateTimelineItems = (activities: ActivityItemType[]): timelineItemType[] => {
	return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
		hour,
		// activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
		// activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR,
		activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
		activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
	}));
};

// STATES
export const timelineItems = ref(generateTimelineItems(activities.value));
export const timelineItemRefs = ref([]);

// FUNCTIONS
export const updateTimelineItem = (timelineItem: timelineItemType, fields) => {
	Object.assign(timelineItem, fields);
};

const hasActivity = (timelineItem: timelineItemType, activity: ActivityItemType) => {
	return timelineItem.activityId === activity.id;
};

export const resetTimelineItemActivities = (activity: ActivityItemType) => {
	timelineItems.value
		.filter((timelineItem) => hasActivity(timelineItem, activity))
		.forEach((timelineItem) => updateTimelineItem(timelineItem, { activityId: null, timelineItem: 0 }));
};

export const getTotalActivitySeconds = (activity: ActivityItemType) => {
	return timelineItems.value
		.filter((timelineItem) => hasActivity(timelineItem, activity))
		.reduce((totalSeconds, timelineItem) => Math.round(timelineItem.activitySeconds + totalSeconds), 0);
};

export const scrollToCurrentHour = (isSmooth: boolean = true) => {
	scrollToHour(getCurrentHour(), isSmooth);
};

export const scrollToHour = (hour: number, isSmooth: boolean = true) => {
	const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el;

	el.scrollIntoView({
		behavior: isSmooth ? 'smooth' : 'instant',
	});
};
