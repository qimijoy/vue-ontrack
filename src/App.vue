<template>
	<TheHeader />

	<main class="flex flex-grow flex-col">
		<TheTimeline v-show="currentPage === PAGE_TIMELINE" ref="timelineRef" />
		<TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNavigation />
</template>

<script setup lang="ts">
	import { provide, readonly } from 'vue';

	import TheHeader from '@/components/common/Header/TheHeader.vue';
	import TheTimeline from '@/components/pages/Timeline/TheTimeline.vue';
	import TheActivities from '@/components/pages/Activities/TheActivities.vue';
	import TheProgress from '@/components/pages/TheProgress.vue';
	import TheNavigation from '@/components/common/Navigation/TheNavigation.vue';

	import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants/pages';

	import { generatePeriodSelectOptions } from '@/utils/activities';
	import { currentPage, timelineRef } from '@/composables/router';
	import {
		setTimelineItemActivity,
		updateTimelineItemActivitySeconds,
		resetTimelineItemActivities,
	} from '@/composables/timelineItems';
	import {
		activitySelectOptions,
		createActivity,
		deleteActivity,
		setActivitySecondsToComplete,
	} from '@/composables/activities';

	import * as keys from '@/keys';

	// PROVIDE
	// Readonly
	provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions));
	provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));

	provide(keys.createActivityKey, createActivity);
	provide(keys.deleteActivityKey, (activity) => {
		resetTimelineItemActivities(activity);
		deleteActivity(activity);
	});
	provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
	provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete);
	provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds);
</script>
