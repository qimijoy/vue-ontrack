import type { selectItemType } from '@/types/select';

import { generatePeriodSelectOptions } from '@/utils/activities';

const PERIODS_IN_MINUTES = [15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480];

export const PERIOD_SELECT_OPTIONS: selectItemType[] = generatePeriodSelectOptions(PERIODS_IN_MINUTES);

export const NULLABLE_ACTIVITY = {
	id: null,
};
