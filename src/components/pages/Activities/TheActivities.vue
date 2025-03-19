<template>
	<div class="flex grow flex-col">
		<ul v-if="activities.length > 0" class="grow divide-y">
			<ActivityItem
				v-for="activity of activities"
				:key="activity.id"
				:activity="activity"
				:timeline-items="timelineItems"
				@delete="emit('deleteActivity', activity)"
				@set-seconds-to-complete="setSecondsToComplete(activity, $event)"
			/>
		</ul>

		<TheActivitiesEmptyState v-else />

		<TheActivityForm @submit="emit('createActivity', $event)" />
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { ActivityItemType } from '@/types/activity';
	import type { timelineItemType } from '@/types/timeline';

	import ActivityItem from '@/components/pages/Activities/ActivityItem.vue';
	import TheActivitiesEmptyState from '@/components/pages/Activities/TheActivitiesEmptyState.vue';
	import TheActivityForm from '@/components/pages/Activities/TheActivityForm.vue';

	import { validateActivities, isActivityValid, isNumber, isTimelineItemsValid } from '@/utils/validators';

	defineProps({
		activities: {
			type: Array as PropType<ActivityItemType[]>,
			required: true,
			validator: (value) => validateActivities(value),
		},
		timelineItems: {
			type: Array as PropType<Array<timelineItemType>>,
			required: true,
			validator: (timelineItems: timelineItemType[]) => isTimelineItemsValid(timelineItems),
		},
	});

	const emit = defineEmits({
		deleteActivity: (value) => isActivityValid(value),
		createActivity: (value) => isActivityValid(value),
		setActivitySecondsToComplete: (activity, secondsToComplete) =>
			isActivityValid(activity) && isNumber(secondsToComplete),
	});

	// FUNCTIONS
	const setSecondsToComplete = (activity: ActivityItemType, secondsToComplete: number) => {
		emit('setActivitySecondsToComplete', activity, secondsToComplete);
	};
</script>
