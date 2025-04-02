import { it, expect, vi } from 'vitest';

import { formatSeconds, formatSecondsWithSign } from '@/utils/timelines';
import { normalizeSelectValue } from '@/utils/normalizeSelectValue';
import { getProgressColorClass } from '@/utils/progress';
import { id } from '@/utils/generators';
import { ProgressColorClassType } from '@/types';
import { LOW_PERCENT, MEDIUM_PERCENT, HUNDRED_PERCENT } from '@/constants/percentages';

it('formats seconds', () => {
	expect(formatSeconds(0)).toBe('00:00:00');
	expect(formatSeconds(60)).toBe('00:01:00');
	expect(formatSeconds(180)).toBe('00:03:00');
	expect(formatSeconds(1800)).toBe('00:30:00');
	expect(formatSeconds(3600)).toBe('01:00:00');
	expect(formatSeconds(60 * 60 * 24)).toBe('00:00:00');
});

it('formats seconds with sign', () => {
	expect(formatSecondsWithSign(0)).toBe('+00:00:00');
	expect(formatSecondsWithSign(60)).toBe('+00:01:00');
	expect(formatSecondsWithSign(180)).toBe('+00:03:00');
	expect(formatSecondsWithSign(1800)).toBe('+00:30:00');
	expect(formatSecondsWithSign(3600)).toBe('+01:00:00');
	expect(formatSecondsWithSign(60 * 60 * 24)).toBe('+00:00:00');

	expect(formatSecondsWithSign(-0)).toBe('+00:00:00');
	expect(formatSecondsWithSign(-60)).toBe('-00:01:00');
	expect(formatSecondsWithSign(-180)).toBe('-00:03:00');
	expect(formatSecondsWithSign(-1800)).toBe('-00:30:00');
	expect(formatSecondsWithSign(-3600)).toBe('-01:00:00');
	expect(formatSecondsWithSign(-60 * 60 * 24)).toBe('-00:00:00');
});

it('normalizes select value', () => {
	expect(normalizeSelectValue('random-string')).toBe('random-string');
	expect(normalizeSelectValue(null)).toBe(null);
	expect(normalizeSelectValue('1')).toBe(1);
});

it('gets progress color class', () => {
	expect(getProgressColorClass(0)).toBe(ProgressColorClassType.RED);
	expect(getProgressColorClass(LOW_PERCENT - 1)).toBe(ProgressColorClassType.RED);
	expect(getProgressColorClass(LOW_PERCENT)).toBe(ProgressColorClassType.YELLOW);
	expect(getProgressColorClass(MEDIUM_PERCENT - 1)).toBe(ProgressColorClassType.YELLOW);
	expect(getProgressColorClass(MEDIUM_PERCENT)).toBe(ProgressColorClassType.BLUE);
	expect(getProgressColorClass(HUNDRED_PERCENT - 1)).toBe(ProgressColorClassType.BLUE);
	expect(getProgressColorClass(HUNDRED_PERCENT)).toBe(ProgressColorClassType.GREEN);
});

it('generates id', () => {
	vi.spyOn(Date, 'now').mockReturnValueOnce(1); // Always return 1 when Date.now() is called
	vi.spyOn(Math, 'random').mockReturnValueOnce(10000); // Always return 10000 when Math.random() is called

	expect(id()).toBe('1s');
});
