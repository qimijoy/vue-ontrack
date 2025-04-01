import type { Component } from 'vue';

import { ref } from 'vue';

import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';
import TheActivities from '@/components/pages/Activities/TheActivities.vue';
import TheProgress from '@/components/pages/Progress/TheProgress.vue';
import { NAV_ITEMS } from '@/constants/pages';
import { PageNameType } from '@/types';

// CONSTANTS
export const routes: Record<PageNameType, Component> = {
	[PageNameType.TIMELINE]: TheTimeline,
	[PageNameType.ACTIVITIES]: TheActivities,
	[PageNameType.PROGRESS]: TheProgress,
};

export const normalizePageHash = (): PageNameType => {
	const page = window.location.hash.slice(1);

	if (NAV_ITEMS.some((naItem): boolean => naItem.page === page)) {
		return page as PageNameType;
	}

	// If page is undefined, navigate to default page
	window.location.hash = PageNameType.TIMELINE;

	return PageNameType.TIMELINE;
};

export const navigate = (page: PageNameType): void => {
	document.body.scrollIntoView();

	currentPage.value = page;
};

// STATES
export const currentPage = ref<PageNameType>(normalizePageHash());
