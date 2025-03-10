import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

// PAGES
export const PAGE_TIMELINE: string = 'timeline';
export const PAGE_ACTIVITIES: string = 'activities';
export const PAGE_PROGRESS: string = 'progress';
export const PAGE_DEFAULT: string = PAGE_TIMELINE;

// NAVIGATION ITEMS
export const NAV_ITEMS = [
	{ name: PAGE_TIMELINE, icon: ClockIcon },
	{ name: PAGE_ACTIVITIES, icon: ListBulletIcon },
	{ name: PAGE_PROGRESS, icon: ChartBarIcon },
];
