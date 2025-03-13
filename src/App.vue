<template>
	<TheHeader @navigate="goTo($event)" />

	<main class="flex flex-grow flex-col">
		<TheTimeline
			v-show="currentPage === PAGE_TIMELINE"
			:timeline-items="timelineItems"
			:activity-select-options="activitySelectOptions"
		/>
		<TheActivities
			v-show="currentPage === PAGE_ACTIVITIES"
			:activities="activities"
			@delete-activity="deleteActivity"
		/>
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNavigation :current-page="currentPage" @navigate="goTo($event)" />
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	import TheHeader from '@/components/common/Header/TheHeader.vue';
	import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';
	import TheActivities from '@/components/pages/Activities/TheActivities.vue';
	import TheProgress from '@/components/pages/TheProgress.vue';
	import TheNavigation from '@/components/common/Navigation/TheNavigation.vue';

	import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants/pages';
	import { normalizePageHash } from '@/utils/normalizeHash';
	import { generateTimelineItems } from '@/utils/timelines';
	import { generateActivitySelectOptions } from '@/utils/activities';

	// CONSTANTS
	const timelineItems = generateTimelineItems();
	const activities = ref(['Coding', 'Reading', 'Training']);
	const activitySelectOptions = generateActivitySelectOptions(activities.value);

	// STATES
	const currentPage = ref(normalizePageHash());

	// FUNCTIONS
	const goTo = (page: string) => {
		currentPage.value = page;
	};

	const deleteActivity = (activity: string) => {
		activities.value.splice(activities.value.indexOf(activity), 1);
	};
</script>
