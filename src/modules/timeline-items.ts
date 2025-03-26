import type { timelineItemType } from '@/types/timeline';
import type { ActivityItemType } from '@/types/activity';

import { ref, computed, watch } from 'vue';

import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time';
import { endOfHour, isToday, now, toSeconds, today } from '@/modules/time';
import { stopTimelineItemTimer } from '@/modules/timeline-item-timer';

const generateTimelineItems = (): timelineItemType[] => {
	return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
		hour,
		activityId: null,
		activitySeconds: 0,
		isActive: false,
	}));
};

// STATES
export const timelineItems = ref([]);
export const timelineItemRefs = ref([]);

// COMPUTED
export const activeTimelineItem = computed(() => timelineItems.value.find(({ isActive }) => isActive));

// WATCHERS
watch(now, (after, before) => {
	if (activeTimelineItem.value && activeTimelineItem.value.hour !== after.getHours()) {
		stopTimelineItemTimer();
	}

	if (before.getHours() !== after.getHours() && after.getHours() === MIDNIGHT_HOUR) {
		resetTimelineItems();
	}
});

// FUNCTIONS
export const initializeTimelineItems = (state) => {
	const lastActiveAt = new Date(state.lastActiveAt);

	timelineItems.value = state.timelineItems ?? generateTimelineItems();

	if (activeTimelineItem.value && isToday(lastActiveAt)) {
		syncIdleSeconds(lastActiveAt);
	} else if (state.timelineItems && !isToday(lastActiveAt)) {
		resetTimelineItems();
	}
};

export const updateTimelineItem = (timelineItem: timelineItemType, fields) => {
	Object.assign(timelineItem, fields);
};

const resetTimelineItems = () => {
	timelineItems.value.forEach((timelineItem) =>
		updateTimelineItem(timelineItem, {
			activitySeconds: 0,
			isActive: false,
		}),
	);
};

const syncIdleSeconds = (lastActiveAt: Date) => {
	updateTimelineItem(activeTimelineItem.value, {
		activitySeconds: activeTimelineItem.value.activitySeconds + calculateIdleSeconds(lastActiveAt),
	});
};

const calculateIdleSeconds = (lastActiveAt: Date) => {
	return lastActiveAt.getHours() === today().getHours()
		? toSeconds(today() - lastActiveAt)
		: toSeconds(endOfHour(lastActiveAt) - lastActiveAt);
};

const filterTimelineItemsByActivity = (timelineItems: timelineItemType[], { id }: ActivityItemType) => {
	return timelineItems.filter(({ activityId }) => activityId === id);
};

export const resetTimelineItemActivities = (timelineItems: timelineItemType[], activity: ActivityItemType) => {
	filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem) =>
		updateTimelineItem(timelineItem, {
			activityId: null,
			timelineItem: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0,
		}),
	);
};

export const calculateTrackedActivitySeconds = (timelineItems: timelineItemType[], activity: ActivityItemType) => {
	return filterTimelineItemsByActivity(timelineItems, activity)
		.map(({ activitySeconds }) => activitySeconds)
		.reduce((total, seconds) => Math.round(total + seconds), 0);
};

export const scrollToCurrentHour = (isSmooth: boolean = false) => {
	scrollToHour(today().getHours(), isSmooth);
};

export const scrollToHour = (hour: number, isSmooth: boolean = true) => {
	const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el;

	el.scrollIntoView({
		behavior: isSmooth ? 'smooth' : 'instant',
	});
};
