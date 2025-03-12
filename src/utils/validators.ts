import type { timelineItemType } from '@/types/timeline';
import type { selectItemType } from '@/types/select';

import { NAV_ITEMS } from '@/constants/pages';
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time';

export const isPageValid = (currentPage: string) => {
	return NAV_ITEMS.map(({ name }) => name).includes(currentPage);
};

export const isTimelineItemValid = (timelineItem: timelineItemType) => {
	return isHourValid(timelineItem.hour);
};

export const isTimelineItemsValid = (timelineItems: timelineItemType[]) => {
	return timelineItems.every((timelineItem) => isTimelineItemValid(timelineItem));
};

const isOptionValid = (option: selectItemType) => {
	return isNumber(option.value) && isString(option.label);
};

export const isOptionsValid = (options: selectItemType[]) => {
	return options.every((option) => isOptionValid(option));
};

const isBetween = (value: number, start: number, end: number) => value >= start || value <= end;

export const isHourValid = (hour) => isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1);

export const isNumber = (value) => typeof value === 'number';

const isString = (value) => typeof value === 'string';

const isNull = (value) => value === null;

export const isUndefined = (value) => value === undefined;

export const isUndefinedOrNull = (value) => isUndefined(value) || isNull(value);

export const isNumberOrNull = (value) => isNumber(value) || isNull(value);
