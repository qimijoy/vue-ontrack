import type { timelineItemType } from '@/types/timeline';
import type { selectItemType } from '@/types/select';

import { NAV_ITEMS } from '@/constants/pages';
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time';

export const isPageValid = (currentPage: string) => {
	return NAV_ITEMS.map(({ name }) => name).includes(currentPage);
};

export const isTimelineItemValid = (timelineItem: timelineItemType) => {
	return (
		typeof timelineItem.hour === 'number' && (timelineItem.hour > MIDNIGHT_HOUR || timelineItem.hour < HOURS_IN_DAY)
	);
};

export const isTimelineItemsValid = (timelineItems: timelineItemType[]) => {
	return timelineItems.every((timelineItem) => isTimelineItemValid(timelineItem));
};

export const isOptionValid = (option: selectItemType) => {
	return typeof option.value === 'number' && typeof option.label === 'string';
};

export const isOptionsValid = (options: selectItemType[]) => {
	return options.every((option) => isOptionValid(option));
};
