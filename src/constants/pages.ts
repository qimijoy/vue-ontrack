import type { NavItemType } from '@/types';

import { PageNameType, IconNameType } from '@/types';

// NAVIGATION ITEMS
export const NAV_ITEMS: NavItemType[] = [
	{ page: PageNameType.TIMELINE, icon: IconNameType.CLOCK },
	{ page: PageNameType.ACTIVITIES, icon: IconNameType.LIST_BULLET },
	{ page: PageNameType.PROGRESS, icon: IconNameType.CHART_BAR },
];
