import type { selectItemType } from '@/types/select';

import { SECONDS_IN_HOUR } from '@/constants/time';

export const PERIOD_SELECT_OPTIONS: selectItemType[] = [
	{ value: 1 * SECONDS_IN_HOUR, label: '01:00' },
	{ value: 2 * SECONDS_IN_HOUR, label: '02:00' },
	{ value: 3 * SECONDS_IN_HOUR, label: '03:00' },
];

export const NULLABLE_ACTIVITY = {
	id: null,
};
