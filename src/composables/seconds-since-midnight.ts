import { ref, computed, watchEffect, onActivated, onDeactivated } from 'vue';

import { HUNDRED_PERCENT } from '@/constants/percentages';
import { SECONDS_IN_DAY, SECONDS_IN_MINUTE, MINUTES_IN_HOUR, MILLISECONDS_IN_SECOND } from '@/constants/time';

const calculateSecondsSinceMidnight = () => {
	const now = new Date();

	return SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() + SECONDS_IN_MINUTE * now.getMinutes() + now.getSeconds();
};

export const useSecondsSinceMidnight = () => {
	const secondsSinceMidnight = ref(calculateSecondsSinceMidnight());

	const secondsSinceMidnightInPercentage = computed(
		() => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
	);

	watchEffect(() => {
		if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
			secondsSinceMidnight.value = 0;
		}
	});

	let timer = null;

	onActivated(() => {
		secondsSinceMidnight.value = calculateSecondsSinceMidnight();

		timer = setInterval(() => {
			secondsSinceMidnight.value += 5 * 60;
		}, MILLISECONDS_IN_SECOND);
	});

	onDeactivated(() => clearInterval(timer));

	return {
		secondsSinceMidnightInPercentage,
	};
};
