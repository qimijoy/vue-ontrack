import { it, expect, vi } from 'vitest';

import { today, tomorrow, endOfHour, isToday, toSeconds } from '@/modules/time';

it('gets current date', () => {
	const dateA = new Date('1990-01-01');
	const dateB = new Date('2024-03-05');
	const dateC = new Date('2025-04-02');

	vi.setSystemTime(dateA);
	expect(today()).toEqual(dateA);

	vi.setSystemTime(dateB);
	expect(today()).toEqual(dateB);

	vi.setSystemTime(dateC);
	expect(today()).toEqual(dateC);

	vi.useRealTimers();
});

it('gets tomorrow date', () => {
	const dateA = new Date('1990-01-01');
	const tomorrowDateA = new Date('1990-01-02');

	const dateB = new Date('2024-03-05');
	const tomorrowDateB = new Date('2024-03-06');

	const dateC = new Date('2025-04-02');
	const tomorrowDateC = new Date('2025-04-03');

	vi.setSystemTime(dateA);
	expect(tomorrow()).toEqual(tomorrowDateA);

	vi.setSystemTime(dateB);
	expect(tomorrow()).toEqual(tomorrowDateB);

	vi.setSystemTime(dateC);
	expect(tomorrow()).toEqual(tomorrowDateC);

	vi.useRealTimers();
});

it('gets end of hour date', () => {
	const dateA = new Date('2025-04-02T10:15:00');
	const endOfHourDateA = new Date('2025-04-02T11:00:00');

	const dateB = new Date('2025-04-02T20:00:00');
	const endOfHourDateB = new Date('2025-04-02T21:00:00');

	const dateC = new Date('2025-04-02T12:59:00');
	const endOfHourDateC = new Date('2025-04-02T13:00:00');

	expect(endOfHour(dateA)).toEqual(endOfHourDateA);
	expect(endOfHour(dateB)).toEqual(endOfHourDateB);
	expect(endOfHour(dateC)).toEqual(endOfHourDateC);
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

it('converts milliseconds to seconds', () => {
	expect(toSeconds(-10000)).toBe(-10);
	expect(toSeconds(-1000)).toBe(-1);
	expect(toSeconds(0)).toBe(0);
	expect(toSeconds(1000)).toBe(1);
	expect(toSeconds(10000)).toBe(10);
});
