import type { PageNameType } from '@/types';
import type { Component } from 'vue';

import { ref } from 'vue';

import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';
import TheActivities from '@/components/pages/Activities/TheActivities.vue';
import TheProgress from '@/components/pages/Progress/TheProgress.vue';

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_DEFAULT } from '@/constants/pages';
import { isPageValid } from '@/utils/validators';

// CONSTANTS
export const routes: Record<PageNameType, Component> = {
	[PAGE_TIMELINE]: TheTimeline,
	[PAGE_ACTIVITIES]: TheActivities,
	[PAGE_PROGRESS]: TheProgress,
};

export const normalizePageHash = (): PageNameType => {
	const page = window.location.hash.slice(1);

	if (isPageValid(page)) {
		return page as PageNameType;
	}

	// If page is undefined, navigate to default page
	window.location.hash = PAGE_DEFAULT;

	return PAGE_DEFAULT;
};

export const navigate = (page: PageNameType): void => {
	document.body.scrollIntoView();

	currentPage.value = page;
};

// STATES
export const currentPage = ref<PageNameType>(normalizePageHash());
