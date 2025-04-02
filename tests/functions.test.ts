import { describe, it, test, expect, vi } from 'vitest';

import { formatSeconds, formatSecondsWithSign } from '@/utils/timelines';
import { normalizeSelectValue } from '@/utils/normalizeSelectValue';
import { getProgressColorClass } from '@/utils/progress';
import { id } from '@/utils/generators';
import { ProgressColorClassType } from '@/types';
import { LOW_PERCENT, MEDIUM_PERCENT, HUNDRED_PERCENT } from '@/constants/percentages';
import { SECONDS_IN_MINUTE, SECONDS_IN_HOUR, SECONDS_IN_DAY } from '@/constants/time';

test.each([
	[SECONDS_IN_MINUTE * 0, '00:00:00'],
	[SECONDS_IN_MINUTE * 1, '00:01:00'],
	[SECONDS_IN_MINUTE * 3, '00:03:00'],
	[SECONDS_IN_MINUTE * 30, '00:30:00'],
	[SECONDS_IN_HOUR, '01:00:00'],
	[SECONDS_IN_DAY, '00:00:00'],
])('formatSeconds(%i) -> %o', (seconds: number, formattedSeconds: string) => {
	expect(formatSeconds(seconds)).toBe(formattedSeconds);
});

describe('formatSecondsWithSign', () => {
	test.each([
		[SECONDS_IN_MINUTE * 0, '+00:00:00'],
		[SECONDS_IN_MINUTE * 1, '+00:01:00'],
		[SECONDS_IN_MINUTE * 3, '+00:03:00'],
		[SECONDS_IN_MINUTE * 30, '+00:30:00'],
		[SECONDS_IN_HOUR, '+01:00:00'],
		[SECONDS_IN_DAY, '+00:00:00'],
	])('positive: formatSecondsWithSign(%i) -> %o', (seconds: number, formattedSeconds: string) => {
		expect(formatSecondsWithSign(seconds)).toBe(formattedSeconds);
	});

	test.each([
		[-SECONDS_IN_MINUTE * 0, '+00:00:00'],
		[-SECONDS_IN_MINUTE * 1, '-00:01:00'],
		[-SECONDS_IN_MINUTE * 3, '-00:03:00'],
		[-SECONDS_IN_MINUTE * 30, '-00:30:00'],
		[-SECONDS_IN_HOUR, '-01:00:00'],
		[-SECONDS_IN_DAY, '-00:00:00'],
	])('negative: formatSecondsWithSign(%i) -> %o', (seconds: number, formattedSeconds: string) => {
		expect(formatSecondsWithSign(seconds)).toBe(formattedSeconds);
	});
});

test.each([
	['random-string', 'random-string'],
	[null, null],
	['1', 1],
])('normalizeSelectValue(%o) -> %o', (value: string | null, normalizedValue: number | string | null) => {
	expect(normalizeSelectValue(value)).toBe(normalizedValue);
});

test.each([
	[0, ProgressColorClassType.RED],
	[LOW_PERCENT - 1, ProgressColorClassType.RED],
	[LOW_PERCENT, ProgressColorClassType.YELLOW],
	[MEDIUM_PERCENT - 1, ProgressColorClassType.YELLOW],
	[MEDIUM_PERCENT, ProgressColorClassType.BLUE],
	[HUNDRED_PERCENT - 1, ProgressColorClassType.BLUE],
	[HUNDRED_PERCENT, ProgressColorClassType.GREEN],
])('getProgressColorClass(%i) -> %o', (percentage: number, progressColorClass: ProgressColorClassType) => {
	expect(getProgressColorClass(percentage)).toBe(progressColorClass);
});

it('generates id', () => {
	vi.spyOn(Date, 'now').mockReturnValueOnce(1); // Always return 1 when Date.now() is called
	vi.spyOn(Math, 'random').mockReturnValueOnce(10000); // Always return 10000 when Math.random() is called

	expect(id()).toBe('1s');
});
