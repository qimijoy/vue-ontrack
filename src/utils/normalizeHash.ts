import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_DEFAULT } from '@/constants/pages';

export const normalizePageHash = () => {
	const pageHash = window.location.hash.slice(1);

	if ([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS].includes(pageHash)) {
		return pageHash;
	}

	// If page is undefined, navigate to default page
	window.location.hash = PAGE_DEFAULT;

	return PAGE_DEFAULT;
};
