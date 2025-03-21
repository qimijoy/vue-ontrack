import { ref } from 'vue';

import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';
import TheActivities from '@/components/pages/Activities/TheActivities.vue';
import TheProgress from '@/components/pages/TheProgress.vue';

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_DEFAULT } from '@/constants/pages';
import { isPageValid } from '@/utils/validators';

export const routes = {
	[PAGE_TIMELINE]: TheTimeline,
	[PAGE_ACTIVITIES]: TheActivities,
	[PAGE_PROGRESS]: TheProgress,
};

export const normalizePageHash = () => {
	const pageHash = window.location.hash.slice(1);

	if (isPageValid(pageHash)) {
		return pageHash;
	}

	// If page is undefined, navigate to default page
	window.location.hash = PAGE_DEFAULT;

	return PAGE_DEFAULT;
};

export const navigate = (page: string) => {
	document.body.scrollIntoView();
	currentPage.value = page;
};

export const currentPage = ref(normalizePageHash());
