import { isNull } from '@/utils/validators';

export const normalizeSelectValue = (value: any): any => {
	return isNull(value) || isNaN(value) ? value : +value;
};
