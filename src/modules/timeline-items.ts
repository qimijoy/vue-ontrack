import type { timelineItemType } from '@/types/timeline';
import type { ActivityItemType } from '@/types/activity';

import { ref } from 'vue';

import { HOURS_IN_DAY, MIDNIGHT_HOUR, MILLISECONDS_IN_SECOND } from '@/constants/time';
import { now } from '@/modules/time';

const generateTimelineItems = (): timelineItemType[] => {
	return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
		hour,
		activityId: null,
		activitySeconds: 0,
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

let timelineItemTimer = null;

export const startTimelineItemTimer = (activeTimelineItem) => {
	timelineItemTimer = setInterval(() => {
		updateTimelineItem(activeTimelineItem, {
			activitySeconds: activeTimelineItem.activitySeconds + 1,
		});
	}, MILLISECONDS_IN_SECOND);
};

export const stopTimelineItemTimer = () => {
	clearInterval(timelineItemTimer);
};

export const findActiveTimelineItem = () => {
	return timelineItems.value.find(({ isActive }) => isActive);
};
