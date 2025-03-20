import { generatePeriodSelectOptions } from '@/utils/activities';

export const MIDNIGHT_HOUR = 0;
export const HOURS_IN_DAY = 24;

export const MILLISECONDS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;

export const PERIOD_SELECT_OPTIONS = generatePeriodSelectOptions();
