import { it, expect } from 'vitest';

import { updateActivity, calculateActivityCompletionPercentage } from '@/modules/activities';
import { ActivityType } from '@/types';

it('updates activity', () => {
	const activity: ActivityType = {
		id: '1',
		name: 'Training',
		secondsToComplete: 3600,
	};

	const updatedFields: ActivityType = {
		id: '2',
		name: 'Reading',
		secondsToComplete: 7200,
	};

	const updatedActivity = updateActivity(activity, updatedFields);

	expect(activity).toEqual(updatedFields);
	expect(updatedActivity).toEqual(updatedFields);
});

it('calculate activity completion percentage', () => {
	const activity: ActivityType = {
		id: '1',
		name: 'Training',
		secondsToComplete: 3600,
	};

	expect(calculateActivityCompletionPercentage(activity, 0)).toBe(0);
	expect(calculateActivityCompletionPercentage(activity, 1800)).toBe(50);
	expect(calculateActivityCompletionPercentage(activity, 3600)).toBe(100);
});
