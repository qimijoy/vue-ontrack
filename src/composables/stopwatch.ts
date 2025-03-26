import { ref } from 'vue';

import { MILLISECONDS_IN_SECOND } from '@/constants/time';

export const useStopwatch = (initialSeconds: number) => {
	// CONSTANTS
	const temp = 1;

	// STATES
	const seconds = ref(initialSeconds);
	const isRunning = ref();

	// FUNCTIONS
	const start = () => {
		isRunning.value = setInterval(() => {
			seconds.value += temp;
		}, MILLISECONDS_IN_SECOND);
	};

	const stop = () => {
		clearInterval(isRunning.value);
		isRunning.value = false;
	};

	const reset = () => {
		stop();

		seconds.value = 0;
	};

	return {
		seconds,
		isRunning,
		start,
		stop,
		reset,
	};
};
