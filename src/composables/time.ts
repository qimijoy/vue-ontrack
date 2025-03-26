import { ref, computed } from 'vue';

import { HUNDRED_PERCENT } from '@/constants/percentages';
import { SECONDS_IN_DAY, MILLISECONDS_IN_SECOND } from '@/constants/time';

// STATES
export const now = ref(new Date());

// COMPUTED
export const secondsSinceMidnightInPercentage = computed(
	() => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
);

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0));
const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND);

let timer = null;

// FUNCTIONS
export const startTimer = () => {
	now.value = new Date();

	timer = setInterval(() => {
		now.value = new Date(now.value.getTime() + 5 * 60 * MILLISECONDS_IN_SECOND);
	}, MILLISECONDS_IN_SECOND);
};

export const stopTimer = () => {
	clearInterval(timer);
};
