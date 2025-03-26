import { ref, computed } from 'vue';

import { HUNDRED_PERCENT } from '@/constants/percentages';
import { SECONDS_IN_DAY, MILLISECONDS_IN_SECOND, SECONDS_IN_MINUTE } from '@/constants/time';

// FUNCTIONS
let timer = null;

export const startTimer = () => {
	now.value = today();

	timer = setInterval(() => {
		now.value = new Date(now.value.getTime() + SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND);
	}, MILLISECONDS_IN_SECOND);
};

export const stopTimer = () => {
	clearInterval(timer);
};

export const today = () => {
	const today = new Date();
	today.setHours(0, 0);

	return today;
};

export const tomorrow = () => {
	const tomorrow = today();

	tomorrow.setDate(tomorrow.getDate() + 1);

	return tomorrow;
};

export const isToday = (date: Date) => {
	return date.toDateString() === today().toDateString();
};

// STATE
export const now = ref(today());

// COMPUTED
export const secondsSinceMidnightInPercentage = computed(
	() => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
);

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0));
const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND);
