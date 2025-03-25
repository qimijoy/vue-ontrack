import { LOW_PERCENT, MEDIUM_PERCENT, HUNDRED_PERCENT } from '@/constants/percentages';

export const getProgressColorClass = (percentage: number) => {
	if (percentage < LOW_PERCENT) {
		return 'bg-red-500';
	}

	if (percentage < MEDIUM_PERCENT) {
		return 'bg-yellow-500';
	}

	if (percentage < HUNDRED_PERCENT) {
		return 'bg-blue-500';
	}

	return 'bg-green-500';
};
