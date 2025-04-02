import { describe, it, expect, vi, beforeEach } from 'vitest';

import { TimelineItemType, ActivityType } from '@/types';
import {
	calculateTrackedActivitySeconds,
	resetTimelineItemActivities,
	updateTimelineItem,
} from '@/modules/timeline-items';
import { SECONDS_IN_HOUR } from '@/constants/time';

describe('updateTimelineItem', () => {
	const updatedFields: TimelineItemType = {
		hour: 2,
		activityId: '2',
		activitySeconds: SECONDS_IN_HOUR * 1,
		isActive: true,
	};

	it('updates original timeline item', () => {
		const timelineItem: TimelineItemType = {
			hour: 1,
			activityId: '1',
			activitySeconds: SECONDS_IN_HOUR * 0,
			isActive: false,
		};

		updateTimelineItem(timelineItem, updatedFields);

		expect(timelineItem).toEqual(updatedFields);
	});

	it('returns updated timeline item', () => {
		const timelineItem: TimelineItemType = {
			hour: 1,
			activityId: '1',
			activitySeconds: SECONDS_IN_HOUR * 0,
			isActive: false,
		};

		expect(updateTimelineItem(timelineItem, updatedFields)).toEqual(updatedFields);
	});
});

describe('timeline itams', () => {
	const trainingActivity: ActivityType = {
		id: '1',
		name: 'Training',
		secondsToComplete: SECONDS_IN_HOUR * 1,
	};

	const readingActivity: ActivityType = {
		id: '2',
		name: 'Reading',
		secondsToComplete: SECONDS_IN_HOUR * 2,
	};

	let timilineItems: TimelineItemType[];

	beforeEach(() => {
		timilineItems = [
			{
				hour: 1,
				activityId: trainingActivity.id,
				activitySeconds: SECONDS_IN_HOUR * 0.5,
				isActive: false,
			},
			{
				hour: 2,
				activityId: trainingActivity.id,
				activitySeconds: SECONDS_IN_HOUR * 1,
				isActive: false,
			},
			{
				hour: 3,
				activityId: readingActivity.id,
				activitySeconds: SECONDS_IN_HOUR * 1,
				isActive: true,
			},
		];
	});

	it('resets timeline item activities', () => {
		const date = new Date('2024-02-01T02:00:00');

		vi.setSystemTime(date);

		resetTimelineItemActivities(timilineItems, trainingActivity);

		expect(timilineItems).toEqual([
			{
				hour: 1,
				activityId: null,
				activitySeconds: SECONDS_IN_HOUR * 0,
				isActive: false,
			},
			{
				hour: date.getHours(),
				activityId: null,
				activitySeconds: SECONDS_IN_HOUR * 1,
				isActive: false,
			},
			{
				hour: 3,
				activityId: readingActivity.id,
				activitySeconds: SECONDS_IN_HOUR * 1,
				isActive: true,
			},
		]);

		vi.useRealTimers();
	});

	it('calculates tracked activity seconds', () => {
		const trackedReadingActivitySeconds = calculateTrackedActivitySeconds(timilineItems, readingActivity);
		const trackedTrainingActivitySeconds = calculateTrackedActivitySeconds(timilineItems, trainingActivity);

		expect(trackedReadingActivitySeconds).toBe(SECONDS_IN_HOUR * 1);
		expect(trackedTrainingActivitySeconds).toBe(SECONDS_IN_HOUR * 1.5);
	});
});
