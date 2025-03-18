import type { timelineItemType } from '@/types/timeline';
import { HOURS_IN_DAY, MIDNIGHT_HOUR, MILLISECONDS_IN_SECOND } from '@/constants/time';

export const generateTimelineItems = (): timelineItemType[] => {
	const timelineItems = [];

	for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour++) {
		timelineItems.push({
			hour,
			activityId: null,
			activitySeconds: 0,
		});
	}

	return timelineItems;
};

export const getCurrentHour = () => {
	return new Date().getHours();
};

export const formatSeconds = (seconds) => {
	const date = new Date();

	date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND);

	const utc = date.toUTCString();

	return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
};
