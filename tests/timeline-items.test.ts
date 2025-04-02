import { it, expect, vi } from 'vitest';

import { TimelineItemType, ActivityType, HourType } from '@/types';
import {
	calculateTrackedActivitySeconds,
	resetTimelineItemActivities,
	updateTimelineItem,
} from '@/modules/timeline-items';

it('updates timiline item', () => {
	const timelineItem: TimelineItemType = {
		hour: 1,
		activityId: '1',
		activitySeconds: 0,
		isActive: false,
	};

	const updatedFields: TimelineItemType = {
		hour: 2,
		activityId: '2',
		activitySeconds: 3600,
		isActive: true,
	};

	const updatedActivity = updateTimelineItem(timelineItem, updatedFields);

	expect(timelineItem).toEqual(updatedFields);
	expect(updatedActivity).toEqual(updatedFields);
});

it('resets timiline item activities', () => {
	const date = new Date('2024-02-01T02:00:00');

	vi.setSystemTime(date);

	const trainingActivity: ActivityType = {
		id: '1',
		name: 'Training',
		secondsToComplete: 3600,
	};

	const readingActivity: ActivityType = {
		id: '2',
		name: 'Reading',
		secondsToComplete: 7200,
	};

	const timilineItems: TimelineItemType[] = [
		{
			hour: 1,
			activityId: trainingActivity.id,
			activitySeconds: 1800,
			isActive: false,
		},
		{
			hour: date.getHours() as HourType,
			activityId: trainingActivity.id,
			activitySeconds: 3600,
			isActive: false,
		},
		{
			hour: 2,
			activityId: readingActivity.id,
			activitySeconds: 3600,
			isActive: true,
		},
	];

	resetTimelineItemActivities(timilineItems, trainingActivity);

	expect(timilineItems).toEqual([
		{
			hour: 1,
			activityId: null,
			activitySeconds: 0,
			isActive: false,
		},
		{
			hour: date.getHours(),
			activityId: null,
			activitySeconds: 3600,
			isActive: false,
		},
		{
			hour: 2,
			activityId: readingActivity.id,
			activitySeconds: 3600,
			isActive: true,
		},
	]);

	vi.useRealTimers();
});

it('calculates tracked activity seconds', () => {
	const trainingActivity: ActivityType = {
		id: '1',
		name: 'Training',
		secondsToComplete: 3600,
	};

	const readingActivity: ActivityType = {
		id: '2',
		name: 'Reading',
		secondsToComplete: 7200,
	};

	const timilineItems: TimelineItemType[] = [
		{
			hour: 1,
			activityId: trainingActivity.id,
			activitySeconds: 1800,
			isActive: false,
		},
		{
			hour: 2,
			activityId: trainingActivity.id,
			activitySeconds: 3600,
			isActive: false,
		},
		{
			hour: 2,
			activityId: readingActivity.id,
			activitySeconds: 3600,
			isActive: true,
		},
	];

	const trackedReadingActivitySeconds = calculateTrackedActivitySeconds(timilineItems, readingActivity);
	const trackedTrainingActivitySeconds = calculateTrackedActivitySeconds(timilineItems, trainingActivity);

	expect(trackedReadingActivitySeconds).toBe(3600);
	expect(trackedTrainingActivitySeconds).toBe(5400);
});
