import { APP_NAME } from '@/constants/application';
import { activities } from '@/modules/activities';
import { timelineItems } from '@/modules/timelineItems';
import { today, isToday } from '@/modules/time';

export const loadState = () => {
	const serializedState = localStorage.getItem(APP_NAME);
	const state = serializedState ? JSON.parse(serializedState) : {};

	timelineItems.value = isToday(new Date(state.date)) ? state.timelineItems : timelineItems.value;
	activities.value = state.activities || activities.value;
};

export const saveState = () => {
	localStorage.setItem(
		APP_NAME,
		JSON.stringify({
			timelineItems: timelineItems.value,
			activities: activities.value,
			date: today(),
		}),
	);
};
