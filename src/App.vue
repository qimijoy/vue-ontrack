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
			@delete-activity="deleteActivity($event)"
			@create-activity="createActivity($event)"
		/>
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNavigation :current-page="currentPage" @navigate="goTo($event)" />
</template>

<script setup lang="ts">
	import type { ActivityItemType } from '@/types/activity';

	import { ref, computed } from 'vue';

	import TheHeader from '@/components/common/Header/TheHeader.vue';
	import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';
	import TheActivities from '@/components/pages/Activities/TheActivities.vue';
	import TheProgress from '@/components/pages/TheProgress.vue';
	import TheNavigation from '@/components/common/Navigation/TheNavigation.vue';

	import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants/pages';
	import { normalizePageHash } from '@/utils/normalizeHash';
	import { generateTimelineItems } from '@/utils/timelines';
	import { generateActivities, generateActivitySelectOptions } from '@/utils/activities';

	// CONSTANTS
	const timelineItems = generateTimelineItems();

	// STATES
	const currentPage = ref(normalizePageHash());
	const activities = ref(generateActivities());

	// COMPUTED
	const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

	// FUNCTIONS
	const goTo = (page: string) => {
		currentPage.value = page;
	};

	const deleteActivity = (activityId: string) => {
		const index = activities.value.findIndex(({ id }) => id === activityId);
		activities.value.splice(index, 1);
	};

	const createActivity = (activityItem: ActivityItemType) => {
		activities.value.push(activityItem);
	};
</script>
