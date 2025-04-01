import { ref, computed } from 'vue';

import { HUNDRED_PERCENT } from '@/constants/percentages';
import { SECONDS_IN_DAY, MILLISECONDS_IN_SECOND, SECONDS_IN_HOUR } from '@/constants/time';

// STATE
export const now = ref(today());

// COMPUTED
export const secondsSinceMidnightInPercentage = computed(
	(): number => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
);

const secondsSinceMidnight = computed((): number => (now.value.getTime() - midnight.value) / MILLISECONDS_IN_SECOND);

const midnight = computed((): number => new Date(now.value).setHours(0, 0, 0, 0));

// FUNCTIONS
export const startCurrentDateTimer = (): void => {
	setInterval((): void => {
		now.value = today();
	}, MILLISECONDS_IN_SECOND);
};

/**
 * @returns Today's date
 */
export function today(): Date {
	return new Date();
}

export const tomorrow = (): Date => {
	const tomorrow = today();

	tomorrow.setDate(tomorrow.getDate() + 1);

	return tomorrow;
};

export const endOfHour = (date: Date): Date => {
	const endOfHour = new Date(date);

	endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND);

	endOfHour.setMinutes(0, 0, 0);

	return endOfHour;
};

export const isToday = (date: Date): boolean => {
	return date.toDateString() === today().toDateString();
};

export const toSeconds = (milliseconds: number): number => {
	return Math.round(milliseconds / MILLISECONDS_IN_SECOND);
};
