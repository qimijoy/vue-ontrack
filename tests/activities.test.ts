import type { ActivityType } from '@/types';

import { describe, it, expect, beforeEach } from 'vitest';

import { updateActivity, calculateActivityCompletionPercentage } from '@/modules/activities';

import { SECONDS_IN_HOUR } from '@/constants/time';
import { HUNDRED_PERCENT } from '@/constants/percentages';

let activity: ActivityType;

beforeEach(() => {
	activity = {
		id: '1',
		name: 'Training',
		secondsToComplete: SECONDS_IN_HOUR * 1,
	};
});

describe('updateActivity', () => {
	const updatedFields: ActivityType = {
		id: '2',
		name: 'Reading',
		secondsToComplete: SECONDS_IN_HOUR * 2,
	};

	it('updates original activity', () => {
		updateActivity(activity, updatedFields);

		expect(activity).toEqual(updatedFields);
	});

	it('returns updated activity', () => {
		expect(updateActivity(activity, updatedFields)).toEqual(updatedFields);
	});
});

it.each([
	{ trackedSeconds: SECONDS_IN_HOUR * 0, percentage: 0 },
	{ trackedSeconds: SECONDS_IN_HOUR * 0.5, percentage: 50 },
	{ trackedSeconds: SECONDS_IN_HOUR * 1, percentage: HUNDRED_PERCENT },
])(
	'calculateActivityCompletionPercentage(activity, $trackedSeconds) -> $percentage',
	({ trackedSeconds, percentage }) => {
		expect(calculateActivityCompletionPercentage(activity, trackedSeconds)).toBe(percentage);
	},
);
