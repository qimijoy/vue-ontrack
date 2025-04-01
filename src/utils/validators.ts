import type { ActivityType, TimelineItemType, SelectOptionType } from '@/types';

import { NAV_ITEMS } from '@/constants/pages';
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time';
import { BUTTON_TYPES } from '@/constants/buttons';
import { ICONS } from '@/modules/icons';

// PAGES
export const isPageValid = (page: any): boolean => {
	return NAV_ITEMS.some((naItem): boolean => naItem.page === page);
};

export const isNavItemValid = (navItem: any): boolean => {
	return NAV_ITEMS.includes(navItem);
};

// TIMELINES
export const isTimelineItemValid = ({ hour }: TimelineItemType): boolean => {
	return isHourValid(hour);
};

// ACTIVITIES
export const isActivityValid = ({ id, name, secondsToComplete }: ActivityType): boolean => {
	if (isNull(id)) {
		return true;
	}

	return isNotEmptyString(id) && isNotEmptyString(name) && isNumber(secondsToComplete);
};

// COMPONENTS
const isOptionValid = (option: SelectOptionType): boolean => {
	return isNumber(option.value) || (isNotEmptyString(option.value) && isNotEmptyString(option.label));
};

export const isOptionsValid = (options: SelectOptionType[]): boolean => {
	return options.every((option) => isOptionValid(option));
};

export const isButtonTypeValid = (type: any): boolean => BUTTON_TYPES.includes(type);

export const isSelectValueValid = (value: any) => {
	return isNotEmptyString(value) || isNumberOrNull(value);
};

export const isIconValid = (name: any): boolean => {
	return Object.keys(ICONS).includes(name);
};

// COMMON
const isBetween = (value: number, start: number, end: number): boolean => value >= start || value <= end;

export const isHourValid = (hour: any): boolean => isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1);

const isNumber = (value: any): boolean => typeof value === 'number';

export const isString = (value: any): boolean => typeof value === 'string';

const isNotEmptyString = (value: any): boolean => isString(value) && value.length > 0;

export const isNull = (value: any): boolean => value === null;

const isUndefined = (value?: any): boolean => value === undefined;

export const isUndefinedOrNull = (value: any): boolean => isUndefined(value) || isNull(value);

const isNumberOrNull = (value: any): boolean => isNumber(value) || isNull(value);
