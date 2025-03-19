<template>
	<TheHeader @navigate="goTo($event)" />

	<main class="flex flex-grow flex-col">
		<TheTimeline
			v-show="currentPage === PAGE_TIMELINE"
			ref="timeline"
			:timeline-items="timelineItems"
			:current-page="currentPage"
		/>
		<TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNavigation :current-page="currentPage" @navigate="goTo($event)" />
</template>

<script setup lang="ts">
	import type { ActivityItemType } from '@/types/activity';
	import type { timelineItemType } from '@/types/timeline';

	import { ref, computed, provide } from 'vue';

	import TheHeader from '@/components/common/Header/TheHeader.vue';
	import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';
	import TheActivities from '@/components/pages/Activities/TheActivities.vue';
	import TheProgress from '@/components/pages/TheProgress.vue';
	import TheNavigation from '@/components/common/Navigation/TheNavigation.vue';

	import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants/pages';
	import { normalizePageHash } from '@/utils/normalizeHash';
	import { generateTimelineItems } from '@/utils/timelines';
	import { generateActivities, generateActivitySelectOptions, generatePeriodSelectOptions } from '@/utils/activities';

	// STATES
	const currentPage = ref(normalizePageHash());
	const activities = ref(generateActivities());
	const timelineItems = ref(generateTimelineItems(activities.value));
	const timeline = ref();

	// COMPUTED
	const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

	// FUNCTIONS
	const goTo = (page: string) => {
		// Click on Logo
		if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
			timeline.value.scrollToHour();
		}

		// Scroll to top on Activities & Progress pages
		if (page !== PAGE_TIMELINE) {
			document.body.scrollIntoView();
		}

		currentPage.value = page;
	};

	const deleteActivity = (activity: ActivityItemType) => {
		timelineItems.value.forEach((timelineItem) => {
			if (timelineItem.activityId === activity.id) {
				timelineItem.activityId = null;
				timelineItem.activitySeconds = 0;
			}
		});

		const index = activities.value.findIndex(({ id }) => id === activity.id);
		activities.value.splice(index, 1);
	};

	const createActivity = (activity: ActivityItemType) => {
		activities.value.push(activity);
	};

	const setTimelineItemActivity = (timelineItem: timelineItemType, activityId: string) => {
		timelineItem.activityId = activityId;
	};

	const setActivitySecondsToComplete = (activity: ActivityItemType, secondsToComplete: number) => {
		activity.secondsToComplete = secondsToComplete;
	};

	const updateTimelineItemActivitySeconds = (timelineItem: timelineItemType, activitySeconds: number) => {
		timelineItem.activitySeconds += activitySeconds;
	};

	// PROVIDE
	provide('timelineItems', timelineItems.value);
	provide('activitySelectOptions', activitySelectOptions.value);
	provide('periodSelectOptions', generatePeriodSelectOptions());

	provide('deleteActivity', deleteActivity);
	provide('createActivity', createActivity);
	provide('setTimelineItemActivity', setTimelineItemActivity);
	provide('setActivitySecondsToComplete', setActivitySecondsToComplete);
	provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds);
</script>
