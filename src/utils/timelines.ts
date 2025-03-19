import type { timelineItemType } from '@/types/timeline';
import type { ActivityItemType } from '@/types/activity';

import { HOURS_IN_DAY, MILLISECONDS_IN_SECOND } from '@/constants/time';

export const getTotalActivitySeconds = (activity: ActivityItemType, timelineItems: timelineItemType[]) => {
	return timelineItems
		.filter(({ activityId }) => activityId === activity.id)
		.reduce((totalSeconds, timelineItem) => Math.round(timelineItem.activitySeconds + totalSeconds), 0);
};

export const generateTimelineItems = (activities: ActivityItemType[]): timelineItemType[] => {
	return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
		hour,
		// activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
		// activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR,
		activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
		activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
	}));
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
