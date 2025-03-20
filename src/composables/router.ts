import { ref } from 'vue';

import { PAGE_DEFAULT } from '@/constants/pages';
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
	document.body.scrollIntoView();
	currentPage.value = page;
};

export const currentPage = ref(normalizePageHash());
