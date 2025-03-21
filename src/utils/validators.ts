import type { timelineItemType } from '@/types/timeline';
import type { selectItemType } from '@/types/select';

import { NAV_ITEMS } from '@/constants/pages';
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time';
import { BUTTON_TYPES } from '@/constants/buttons';
import { ICONS } from '@/composables/icons';

// PAGES
export const isPageValid = (currentPage: string) => {
	return NAV_ITEMS.some(({ page }) => page === currentPage);
};

export const isNavItemValid = (navItem) => {
	return NAV_ITEMS.includes(navItem);
};

// TIMELINES
export const isTimelineItemValid = (timelineItem: timelineItemType) => {
	return isHourValid(timelineItem.hour);
};

export const isTimelineItemsValid = (timelineItems: timelineItemType[]) => {
	return timelineItems.every((timelineItem) => isTimelineItemValid(timelineItem));
};

// ACTIVITIES
export const isActivityValid = ({ id, name, secondsToComplete }) => {
	if (isNull(id)) {
		return true;
	}

	return isNotEmptyString(id) && isNotEmptyString(name) && isNumber(secondsToComplete);
};

export const validateActivities = (activities) => {
	return activities.every((activity) => isActivityValid(activity));
};

// COMPONENTS
const isOptionValid = (option: selectItemType) => {
	return isNumber(option.value) || (isNotEmptyString(option.value) && isNotEmptyString(option.label));
};

export const isOptionsValid = (options: selectItemType[]) => {
	return options.every((option) => isOptionValid(option));
};

export const isButtonTypeValid = (type) => BUTTON_TYPES.includes(type);

export const isSelectValueValid = (value) => {
	return isNotEmptyString(value) || isNumberOrNull(value);
};

export const isIconValid = (name: string) => {
	return Object.keys(ICONS).includes(name);
};

// COMMON
const isBetween = (value: number, start: number, end: number) => value >= start || value <= end;

export const isHourValid = (hour) => isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1);

export const isNumber = (value) => typeof value === 'number';

export const isString = (value) => typeof value === 'string';

export const isNotEmptyString = (value) => isString(value) && value.length > 0;

export const isNull = (value) => value === null;

export const isUndefined = (value?) => value === undefined;

export const isUndefinedOrNull = (value) => isUndefined(value) || isNull(value);

export const isNumberOrNull = (value) => isNumber(value) || isNull(value);
