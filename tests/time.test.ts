import { it, expect, vi, test } from 'vitest';

import { today, tomorrow, endOfHour, isToday, toSeconds } from '@/modules/time';
import { MILLISECONDS_IN_SECOND } from '@/constants/time';

test.each([
	[new Date('1990-01-01'), new Date('1990-01-01')],
	[new Date('2024-03-05'), new Date('2024-03-05')],
	[new Date('2025-04-02'), new Date('2025-04-02')],
])('today(%o) -> %o', (date: Date, expectedDate: Date) => {
	vi.setSystemTime(date);

	expect(today()).toEqual(expectedDate);

	vi.useRealTimers();
});

test.each([
	[new Date('1990-01-01'), new Date('1990-01-02')],
	[new Date('2024-03-05'), new Date('2024-03-06')],
	[new Date('2025-04-02'), new Date('2025-04-03')],
])('tomorrow(%o) -> %o', (date: Date, expectedDate: Date) => {
	vi.setSystemTime(date);

	expect(tomorrow()).toEqual(expectedDate);

	vi.useRealTimers();
});

test.each([
	[new Date('2025-04-02T10:15:00'), new Date('2025-04-02T11:00:00')],
	[new Date('2025-04-02T20:00:00'), new Date('2025-04-02T21:00:00')],
	[new Date('2025-04-02T12:59:00'), new Date('2025-04-02T13:00:00')],
])('endOfHour(%o) -> %o', (date: Date, expectedDate: Date) => {
	expect(endOfHour(date)).toEqual(expectedDate);
});

it('checks if passed date is today', () => {
	const dateA = new Date('1990-01-01');
	const dateB = new Date('2024-03-05');

	vi.setSystemTime(dateA);
	expect(isToday(dateA)).toBe(true);
	expect(isToday(dateB)).toBe(false);

	vi.setSystemTime(dateB);
	expect(isToday(dateA)).toBe(false);
	expect(isToday(dateB)).toBe(true);

	vi.useRealTimers();
});

test.each([
	[-MILLISECONDS_IN_SECOND * 10, -10],
	[-MILLISECONDS_IN_SECOND * 1, -1],
	[MILLISECONDS_IN_SECOND * 0, 0],
	[MILLISECONDS_IN_SECOND * 1, 1],
	[MILLISECONDS_IN_SECOND * 10, 10],
])('toSeconds(%i) -> %i', (milliseconds: number, seconds: number) => {
	expect(toSeconds(milliseconds)).toBe(seconds);
});
