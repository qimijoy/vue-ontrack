import type { timelineItemType } from '@/types/timeline';
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time';

export const generateTimelineItems = (): timelineItemType[] => {
	const timelineItems = [];

	for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour++) {
		timelineItems.push({ hour });
	}

	return timelineItems;
};

export const getCurrentHour = () => {
	return new Date().getHours();
};
