import { APP_NAME } from '@/constants/application';
import { today } from '@/modules/time';
import { activities, initializeActivities } from '@/modules/activities';
import { activeTimelineItem, initializeTimelineItems, timelineItems } from '@/modules/timeline-items';
import { startTimelineItemTimer, stopTimelineItemTimer } from '@/modules/timeline-item-timer';

export const syncState = (shouldLoad = true) => {
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

const loadState = () => {
	const state = loadFromLocalStorage();

	initializeActivities(state);
	initializeTimelineItems(state);
};

const loadFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem(APP_NAME) ?? '{}');
};

const saveState = () => {
	localStorage.setItem(
		APP_NAME,
		JSON.stringify({
			timelineItems: timelineItems.value,
			activities: activities.value,
			lastActiveAt: today(),
		}),
	);
};
