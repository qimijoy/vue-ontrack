import { ref } from 'vue';

import { PAGE_TIMELINE, PAGE_DEFAULT } from '@/constants/pages';
import { isPageValid } from '@/utils/validators';

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
	// Click on Logo
	if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
		timelineRef.value.scrollToHour();
	} else if (page !== PAGE_TIMELINE) {
		// Scroll to top on Activities & Progress pages
		document.body.scrollIntoView();
	}

	currentPage.value = page;
};

export const currentPage = ref(normalizePageHash());
export const timelineRef = ref();
