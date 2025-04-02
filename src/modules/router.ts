import type { Component } from 'vue';

import { ref } from 'vue';

import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';
import TheActivities from '@/components/pages/Activities/TheActivities.vue';
import TheProgress from '@/components/pages/Progress/TheProgress.vue';
import { NAV_ITEMS } from '@/constants/pages';
import { PageName } from '@/types';

// CONSTANTS
export const routes: Record<PageName, Component> = {
	[PageName.TIMELINE]: TheTimeline,
	[PageName.ACTIVITIES]: TheActivities,
	[PageName.PROGRESS]: TheProgress,
};

export const normalizePageHash = (): PageName => {
	const page = window.location.hash.slice(1);

	if (NAV_ITEMS.some((naItem): boolean => naItem.page === page)) {
		return page as PageName;
	}

	// If page is undefined, navigate to default page
	window.location.hash = PageName.TIMELINE;

	return PageName.TIMELINE;
};

export const navigate = (page: PageName): void => {
	document.body.scrollIntoView();

	currentPage.value = page;
};

// STATES
export const currentPage = ref<PageName>(normalizePageHash());
