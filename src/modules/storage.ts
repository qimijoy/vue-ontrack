import type { timelineItemType } from '@/types/timeline';

import { APP_NAME } from '@/constants/application';
import { activities } from '@/modules/activities';
import { timelineItems } from '@/modules/timeline-items';
import { today, isToday, endOfHour, toSeconds } from '@/modules/time';

export const loadState = () => {
	const serializedState = localStorage.getItem(APP_NAME);
	const state = serializedState ? JSON.parse(serializedState) : {};

	activities.value = state.activities || activities.value;

	const lastActiveAt = new Date(state.lastActiveAt);

	timelineItems.value = isToday(lastActiveAt)
		? syncIdleSeconds(state.timelineItems, lastActiveAt)
		: timelineItems.value;
};

export const saveState = () => {
	localStorage.setItem(
		APP_NAME,
		JSON.stringify({
			timelineItems: timelineItems.value,
			activities: activities.value,
			lastActiveAt: today(),
		}),
	);
};

const syncIdleSeconds = (timelineItems: timelineItemType[], lastActiveAt: Date) => {
	const activeTimelineItem = timelineItems.find(({ isActive }) => isActive);

	if (activeTimelineItem) {
		activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt);
	}

	return timelineItems;
};

const calculateIdleSeconds = (lastActiveAt: Date) => {
	return lastActiveAt.getHours() === today().getHours()
		? toSeconds(today() - lastActiveAt)
		: toSeconds(endOfHour(lastActiveAt) - lastActiveAt);
};
