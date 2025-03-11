<template>
	<main class="flex flex-grow flex-col">
		<TheTimeline v-show="currentPage === PAGE_TIMELINE" />
		<TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>
</template>

<script setup lang="ts">
	import TheActivities from '@/components/pages/TheActivities.vue';
	import TheProgress from '@/components/pages/TheProgress.vue';
	import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';

	import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants/pages';

	defineProps({
		currentPage: {
			type: String,
			required: true,
		},
	});
</script>
