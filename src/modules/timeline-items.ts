import type { StateType, TimelineItemType } from '@/types';
import type { ActivityType } from '@/types';

import { ref, computed, watch } from 'vue';

import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time';
import { endOfHour, isToday, now, toSeconds, today } from '@/modules/time';
import { stopTimelineItemTimer } from '@/modules/timeline-item-timer';

// STATES
export const timelineItems = ref<TimelineItemType[]>([]);
export const timelineItemRefs = ref<any>([]);

// COMPUTED
export const activeTimelineItem = computed((): TimelineItemType | undefined =>
	timelineItems.value.find(({ isActive }): boolean => isActive),
);

// WATCHERS
watch<Date>(now, (after, before): void => {
	if (activeTimelineItem.value && activeTimelineItem.value.hour !== after.getHours()) {
		stopTimelineItemTimer();
	}

	if (before.getHours() !== after.getHours() && after.getHours() === MIDNIGHT_HOUR) {
		resetTimelineItems();
	}
});

// FUNCTIONS
export const initializeTimelineItems = (state: StateType): void => {
	const lastActiveAt = new Date(state.lastActiveAt);

	timelineItems.value = state.timelineItems ?? generateTimelineItems();

	if (activeTimelineItem.value && isToday(lastActiveAt)) {
		syncIdleSeconds(lastActiveAt);
	} else if (state.timelineItems && !isToday(lastActiveAt)) {
		resetTimelineItems();
	}
};

export const updateTimelineItem = (
	timelineItem: TimelineItemType,
	fields: Partial<TimelineItemType>,
): TimelineItemType => {
	return Object.assign(timelineItem, fields);
};

export const resetTimelineItemActivities = (timelineItems: TimelineItemType[], activity: ActivityType): void => {
	filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem: TimelineItemType): void => {
		updateTimelineItem(timelineItem, {
			activityId: null,
			timelineItem: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0,
		});

		return;
	});
};

export const calculateTrackedActivitySeconds = (timelineItems: TimelineItemType[], activity: ActivityType): number => {
	return filterTimelineItemsByActivity(timelineItems, activity)
		.map(({ activitySeconds }: TimelineItemType): number => activitySeconds)
		.reduce((total: number, seconds: number): number => Math.round(total + seconds), 0);
};

export const scrollToCurrentHour = (isSmooth: boolean = false): void => {
	scrollToHour(today().getHours(), isSmooth);
};

export const scrollToHour = (hour: number, isSmooth: boolean = true): void => {
	const el: any = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el;

	el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' });
};

const resetTimelineItems = (): void => {
	timelineItems.value.forEach((timelineItem): void => {
		updateTimelineItem(timelineItem, {
			activitySeconds: 0,
			isActive: false,
		});

		return;
	});
};

const syncIdleSeconds = (lastActiveAt: Date): void => {
	updateTimelineItem(activeTimelineItem.value as any, {
		activitySeconds: (activeTimelineItem.value as any).activitySeconds + calculateIdleSeconds(lastActiveAt),
	});

	return;
};

const calculateIdleSeconds = (lastActiveAt: Date): number => {
	return lastActiveAt.getHours() === today().getHours()
		? toSeconds((today() as any) - (lastActiveAt as any))
		: toSeconds((endOfHour(lastActiveAt) as any) - (lastActiveAt as any));
};

const filterTimelineItemsByActivity = (timelineItems: TimelineItemType[], { id }: ActivityType): TimelineItemType[] => {
	return timelineItems.filter(({ activityId }): boolean => activityId === id);
};

/**
 * @returns Timeline items fro each hour of a day
 */
function generateTimelineItems(): TimelineItemType[] {
	return [...Array(HOURS_IN_DAY).keys()].map(
		(hour): TimelineItemType => ({
			hour,
			activityId: null,
			activitySeconds: 0,
			isActive: false,
		}),
	);
}
