import { ICON_CHART_BAR, ICON_CLOCK, ICON_LIST_BULLET } from '@/composables/icons';

// PAGES
export const PAGE_TIMELINE: string = 'timeline';
export const PAGE_ACTIVITIES: string = 'activities';
export const PAGE_PROGRESS: string = 'progress';
export const PAGE_DEFAULT: string = PAGE_TIMELINE;

// NAVIGATION ITEMS
export const NAV_ITEMS = [
	{ page: PAGE_TIMELINE, icon: ICON_CLOCK },
	{ page: PAGE_ACTIVITIES, icon: ICON_LIST_BULLET },
	{ page: PAGE_PROGRESS, icon: ICON_CHART_BAR },
];
