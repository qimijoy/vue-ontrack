import type { NavItemType } from '@/types';

import { PageName, IconNameType } from '@/types';

// NAVIGATION ITEMS
export const NAV_ITEMS: NavItemType[] = [
	{ page: PageName.TIMELINE, icon: IconNameType.CLOCK },
	{ page: PageName.ACTIVITIES, icon: IconNameType.LIST_BULLET },
	{ page: PageName.PROGRESS, icon: IconNameType.CHART_BAR },
];
