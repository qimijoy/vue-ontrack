import type { selectItemType } from '@/types/select';

export const PERIOD_SELECT_OPTIONS: selectItemType[] = [
	{ value: 15 * 60, label: '0:15' },
	{ value: 30 * 60, label: '0:30' },
	{ value: 45 * 60, label: '0:45' },
];
