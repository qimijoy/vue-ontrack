import { ProgressColorClassType } from '@/types';

import { LOW_PERCENT, MEDIUM_PERCENT, HUNDRED_PERCENT } from '@/constants/percentages';

export const getProgressColorClass = (percentage: number): ProgressColorClassType => {
	if (percentage < LOW_PERCENT) {
		return ProgressColorClassType.RED;
	}

	if (percentage < MEDIUM_PERCENT) {
		return ProgressColorClassType.YELLOW;
	}

	if (percentage < HUNDRED_PERCENT) {
		return ProgressColorClassType.BLUE;
	}

	return ProgressColorClassType.GREEN;
};
