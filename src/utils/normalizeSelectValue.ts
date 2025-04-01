export const normalizeSelectValue = (value: string | null): number | string | null => {
	return value === null || isNaN(Number(value)) ? value : +value;
};
