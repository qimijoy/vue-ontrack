<template>
	<TheHeader @go-to-home="goTo(PAGE_DEFAULT)" @go-to-progress="goTo(PAGE_PROGRESS)" />

	<main class="flex flex-grow flex-col">
		<TheTimeline v-show="currentPage === PAGE_TIMELINE" :timeline-items="timelineItems" />
		<TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNavigation :current-page="currentPage" @navigate="goTo($event)" />
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';

	import TheHeader from '@/components/common/Header/TheHeader.vue';
	import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';
	import TheActivities from '@/components/pages/TheActivities.vue';
	import TheProgress from '@/components/pages/TheProgress.vue';
	import TheNavigation from '@/components/common/Navigation/TheNavigation.vue';

	import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_DEFAULT } from '@/constants/pages';
	import { normalizePageHash } from '@/utils/normalizeHash';
	import { generateTimelineItems } from '@/utils/time';

	// CONSTANTS
	const timelineItems = generateTimelineItems();

	// HOOKS
	onMounted(() => {
		currentPage.value = normalizePageHash();
	});

	// STATES
	const currentPage = ref('');

	// FUNCTIONS
	const goTo = (page: string) => {
		currentPage.value = page;
	};
</script>
