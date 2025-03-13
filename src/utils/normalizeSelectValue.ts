import { isNull } from '@/utils/validators';

export const normalizeSelectValue = (value) => {
	return isNull(value) || isNaN(value) ? value : +value;
};
