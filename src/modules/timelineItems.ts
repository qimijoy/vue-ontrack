import type { timelineItemType } from '@/types/timeline';
import type { ActivityItemType } from '@/types/activity';

import { ref } from 'vue';

import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time';
import { now } from '@/modules/time';

const generateTimelineItems = (): timelineItemType[] => {
	return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
		hour,
		// activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
		// activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR,
		activityId: null, // [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
		activitySeconds: 0, // [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
		isActive: false,
	}));
};

// STATES
export const timelineItems = ref(generateTimelineItems());
export const timelineItemRefs = ref([]);

// FUNCTIONS
export const updateTimelineItem = (timelineItem: timelineItemType, fields) => {
	Object.assign(timelineItem, fields);
};

const filterTimelineItemsByActivity = (timelineItems: timelineItemType[], { id }: ActivityItemType) => {
	return timelineItems.filter(({ activityId }) => activityId === id);
};

export const resetTimelineItemActivities = (timelineItems: timelineItemType[], activity: ActivityItemType) => {
	filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem) =>
		updateTimelineItem(timelineItem, {
			activityId: null,
			timelineItem: timelineItem.hour === now.value.getHours() ? timelineItem.activitySeconds : 0,
		}),
	);
};

export const calculateTrackedActivitySeconds = (timelineItems: timelineItemType[], activity: ActivityItemType) => {
	return filterTimelineItemsByActivity(timelineItems, activity)
		.map(({ activitySeconds }) => activitySeconds)
		.reduce((total, seconds) => Math.round(total + seconds), 0);
};

export const scrollToCurrentHour = (isSmooth: boolean = true) => {
	scrollToHour(now.value.getHours(), isSmooth);
};

export const scrollToHour = (hour: number, isSmooth: boolean = true) => {
	const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el;

	el.scrollIntoView({
		behavior: isSmooth ? 'smooth' : 'instant',
	});
};
