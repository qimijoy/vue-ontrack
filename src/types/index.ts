// PAGES
export enum PageName {
	TIMELINE = 'timeline',
	ACTIVITIES = 'activities',
	PROGRESS = 'progress',
}

export interface NavItemType {
	page: PageName;
	icon: IconNameType;
}

// ACTIVITY
export interface ActivityType {
	id: string;
	name: string;
	secondsToComplete: number;
}

// TIMELINE
export interface TimelineItemType {
	hour: HourType;
	activityId: ActivityType['id'] | null;
	activitySeconds: number;
	isActive: boolean;
}

export type HourType =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23;

// PROGRESS
export enum ProgressColorClassType {
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
export enum ButtonType {
	PRIMARY = 'primary',
	SUCCESS = 'success',
	WARNING = 'warning',
	DANGER = 'danger',
	NEUTRAL = 'neutral',
}

// ICON
export enum IconNameType {
	CHECK_CIRCLE = 'CheckCircle',
	LIST_BULLET = 'ListBullet',
	ARROW_PATH = 'ArrowPath',
	CHART_BAR = 'ChartBar',
	CLOCK = 'Clock',
	TRASH = 'Trash',
	X_MARK = 'XMark',
	PAUSE = 'Pause',
	PLAY = 'Play',
	PLUS = 'Plus',
}
