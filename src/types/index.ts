// PAGES
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants/pages';

export type PageNameType = typeof PAGE_TIMELINE | typeof PAGE_ACTIVITIES | typeof PAGE_PROGRESS;

export interface NavItemType {
	page: PageNameType;
	icon: string;
}

// ACTIVITY
export interface ActivityType {
	id: string;
	name: string;
	secondsToComplete: number;
}

// TIMELINE ITEM
export interface TimelineItemType {
	hour: number;
	activityId: ActivityType['id'] | null;
	activitySeconds: number;
	isActive: boolean;
}

// PROGRESS
export enum ProgressColorClasstype {
	RED = 'bg-red-500',
	YELLOW = 'bg-yellow-500',
	BLUE = 'bg-blue-500',
	GREEN = 'bg-green-500',
}

// STATE
export interface StateType {
	timelineItems: TimelineItemType[];
	activities: ActivityType[];
	lastActiveAt: Date;
}

// SELECT OPTION
export interface SelectOptionType<T = string> {
	value: T;
	label: string;
}

// BUTTON
import {
	BUTTON_TYPE_PRIMARY,
	BUTTON_TYPE_SUCCESS,
	BUTTON_TYPE_WARNING,
	BUTTON_TYPE_DANGER,
	BUTTON_TYPE_NEUTRAL,
} from '@/constants/buttons';

export type ButtonType =
	| typeof BUTTON_TYPE_PRIMARY
	| typeof BUTTON_TYPE_SUCCESS
	| typeof BUTTON_TYPE_WARNING
	| typeof BUTTON_TYPE_DANGER
	| typeof BUTTON_TYPE_NEUTRAL;
