import type { SelectOptionType } from '@/types';

import { generatePeriodSelectOptions } from '@/utils/activities';

export const MIDNIGHT_HOUR: number = 0;
export const HOURS_IN_DAY: number = 24;

export const MILLISECONDS_IN_SECOND: number = 1000;
export const SECONDS_IN_MINUTE: number = 60;
export const MINUTES_IN_HOUR: number = 60;
export const SECONDS_IN_HOUR: number = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
export const SECONDS_IN_DAY: number = HOURS_IN_DAY * SECONDS_IN_HOUR;

export const PERIOD_SELECT_OPTIONS: SelectOptionType<number>[] = generatePeriodSelectOptions();
