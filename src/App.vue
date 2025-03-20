<template>
	<TheHeader />

	<main class="flex flex-grow flex-col">
		<TheTimeline v-show="currentPage === PAGE_TIMELINE" ref="timelineRef" :timeline-items="timelineItems" />
		<TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNavigation />
</template>

<script setup lang="ts">
	import type { ActivityItemType } from '@/types/activity';
	import type { timelineItemType } from '@/types/timeline';

	import { ref, computed, provide, readonly } from 'vue';

	import TheHeader from '@/components/common/Header/TheHeader.vue';
	import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';
	import TheActivities from '@/components/pages/Activities/TheActivities.vue';
	import TheProgress from '@/components/pages/TheProgress.vue';
	import TheNavigation from '@/components/common/Navigation/TheNavigation.vue';

	import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants/pages';
	import { generateTimelineItems } from '@/utils/timelines';
	import { generateActivities, generateActivitySelectOptions, generatePeriodSelectOptions } from '@/utils/activities';
	import { currentPage, timelineRef } from '@/router';

	import * as keys from '@/keys';

	// STATES
	const activities = ref(generateActivities());
	const timelineItems = ref(generateTimelineItems(activities.value));

	// COMPUTED
	const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

	// FUNCTIONS
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
		activity.secondsToComplete = secondsToComplete || 0;
	};

	const updateTimelineItemActivitySeconds = (timelineItem: timelineItemType, activitySeconds: number) => {
		timelineItem.activitySeconds += activitySeconds;
	};

	// PROVIDE
	// Readonly
	provide(keys.timelineItemsKey, readonly(timelineItems.value));
	provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value));
	provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));

	provide(keys.deleteActivityKey, deleteActivity);
	provide(keys.createActivityKey, createActivity);
	provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
	provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete);
	provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds);
</script>
