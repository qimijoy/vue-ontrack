<template>
	<TheHeader />

	<main class="flex flex-grow flex-col">
		<TheTimeline v-show="currentPage === PAGE_TIMELINE" />
		<TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNavigation />
</template>

<script setup lang="ts">
	import TheHeader from '@/components/common/Header/TheHeader.vue';
	import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';
	import TheActivities from '@/components/pages/Activities/TheActivities.vue';
	import TheProgress from '@/components/pages/TheProgress.vue';
	import TheNavigation from '@/components/common/Navigation/TheNavigation.vue';

	import { currentPage } from '@/composables/router';
	import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants/pages';
</script>
