<template>
	<TheHeader />
	<TheContent :current-page="currentPage" />
	<TheNavigation :current-page="currentPage" @navigate="currentPage = $event" />
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';

	import TheHeader from '@/components/common/Header/TheHeader.vue';
	import TheContent from '@/components/common/TheContent.vue';
	import TheNavigation from '@/components/common/Navigation/TheNavigation.vue';

	import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_DEFAULT } from '@/constants/pages';

	// HOOKS
	onMounted(() => {
		currentPage.value = normalizePageHash();
	});

	// STATES
	const currentPage = ref('');

	// FUNCTIONS
	const normalizePageHash = () => {
		const pageHash = window.location.hash.slice(1);

		if ([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS].includes(pageHash)) {
			return pageHash;
		}

		// If page is undefined, navigate to default page
		window.location.hash = PAGE_DEFAULT;

		return PAGE_DEFAULT;
	};
</script>
