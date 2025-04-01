import type { TimelineItemType } from '@/types';

import { NAV_ITEMS } from '@/constants/pages';
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time';
import { ICONS } from '@/modules/icons';

// PAGES
export const isPageValid = (page: any): boolean => {
	return NAV_ITEMS.some((naItem): boolean => naItem.page === page);
};

// TIMELINES
export const isTimelineItemValid = ({ hour }: TimelineItemType): boolean => {
	return isHourValid(hour);
};

// COMPONENTS
export const isIconValid = (name: any): boolean => {
	return Object.keys(ICONS).includes(name);
};

// COMMON
const isBetween = (value: number, start: number, end: number): boolean => value >= start || value <= end;

export const isHourValid = (hour: any): boolean => isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1);

const isNumber = (value: any): boolean => typeof value === 'number';

export const isString = (value: any): boolean => typeof value === 'string';

export const isNull = (value: any): boolean => value === null;

const isUndefined = (value?: any): boolean => value === undefined;

export const isUndefinedOrNull = (value: any): boolean => isUndefined(value) || isNull(value);
