import type { timelineItemType } from '@/types/timeline';
import { HOURS_IN_DAY } from '@/constants/time';

export const generateTimelineItems = () => {
	const timelineItems: timelineItemType[] = [];

	for (let hour = 0; hour < HOURS_IN_DAY; hour++) {
		timelineItems.push({ hour });
	}

	return timelineItems;
};

export const getCurrentHour = () => {
	return new Date().getHours();
};
