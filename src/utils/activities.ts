import type { selectItemType } from '@/types/select';

export const generateActivitySelectOptions = (activities: string[]): selectItemType[] => {
	return activities.map((label, value) => ({ label, value }));
};
