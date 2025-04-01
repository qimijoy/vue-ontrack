import type { StateType } from '@/types';

import { LOCAL_STORAGE_KEY } from '@/constants/application';
import { today } from '@/modules/time';
import { activities, initializeActivities } from '@/modules/activities';
import { activeTimelineItem, initializeTimelineItems, timelineItems } from '@/modules/timeline-items';
import { startTimelineItemTimer, stopTimelineItemTimer } from '@/modules/timeline-item-timer';

export const syncState = (shouldLoad: boolean = true): void => {
	if (shouldLoad) {
		loadState();
	} else {
		saveState();
	}

	if (activeTimelineItem.value) {
		if (shouldLoad) {
			startTimelineItemTimer();
		} else {
			stopTimelineItemTimer();
		}
	}
};

const loadState = (): void => {
	const state = loadFromLocalStorage();

	initializeActivities(state);
	initializeTimelineItems(state);
};

const loadFromLocalStorage = (): StateType => {
	return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}');
};

const saveState = (): void => {
	localStorage.setItem(
		LOCAL_STORAGE_KEY,
		JSON.stringify({
			timelineItems: timelineItems.value,
			activities: activities.value,
			lastActiveAt: today(),
		}),
	);
};
