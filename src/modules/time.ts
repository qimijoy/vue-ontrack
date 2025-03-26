import { ref, computed } from 'vue';

import { HUNDRED_PERCENT } from '@/constants/percentages';
import { SECONDS_IN_DAY, MILLISECONDS_IN_SECOND, SECONDS_IN_HOUR } from '@/constants/time';

export const today = () => {
	return new Date();
};

// STATE
export const now = ref(today());

// COMPUTED
export const secondsSinceMidnightInPercentage = computed(
	() => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
);

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND);

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0));

// FUNCTIONS
const currentDateTimer = null;

export const startCurrentDateTimer = () => {
	setInterval(() => (now.value = today()), MILLISECONDS_IN_SECOND);
};

export const stopCurrentDateTimer = () => {
	clearInterval(currentDateTimer);
};

export const tomorrow = () => {
	const tomorrow = today();

	tomorrow.setDate(tomorrow.getDate() + 1);

	return tomorrow;
};

export const isToday = (date: Date) => {
	return date.toDateString() === today().toDateString();
};

export const endOfHour = (date: Date) => {
	const endOfHour = new Date(date);

	endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND);

	endOfHour.setMinutes(0, 0, 0);

	return endOfHour;
};

export const toSeconds = (milliseconds) => {
	return Math.round(milliseconds / MILLISECONDS_IN_SECOND);
};
