import { ProgressColorClasstype } from '@/types';

import { LOW_PERCENT, MEDIUM_PERCENT, HUNDRED_PERCENT } from '@/constants/percentages';

export const getProgressColorClass = (percentage: number): ProgressColorClasstype => {
	if (percentage < LOW_PERCENT) {
		return ProgressColorClasstype.RED;
	}

	if (percentage < MEDIUM_PERCENT) {
		return ProgressColorClasstype.YELLOW;
	}

	if (percentage < HUNDRED_PERCENT) {
		return ProgressColorClasstype.BLUE;
	}

	return ProgressColorClasstype.GREEN;
};
