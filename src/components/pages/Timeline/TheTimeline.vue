<template>
	<div class="mt-7">
		<ul>
			<TimelineItem
				v-for="timelineItem of timelineItems"
				:key="timelineItem.hour"
				:timeline-item="timelineItem"
				:activities="activities"
				:activity-select-options="activitySelectOptions"
				@select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
			/>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { timelineItemType } from '@/types/timeline';
	import type { ActivityItemType } from '@/types/activity';
	import type { selectItemType } from '@/types/select';

	import {
		isTimelineItemValid,
		isTimelineItemsValid,
		isOptionsValid,
		validateActivities,
		isActivityValid,
	} from '@/utils/validators';

	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';

	defineProps({
		timelineItems: {
			type: Array as PropType<Array<timelineItemType>>,
			required: true,
			validator: (timelineItems: timelineItemType[]) => isTimelineItemsValid(timelineItems),
		},
		activities: {
			type: Array as PropType<ActivityItemType[]>,
			required: true,
			validator: (value: ActivityItemType) => validateActivities(value),
		},
		activitySelectOptions: {
			type: Array as PropType<selectItemType[]>,
			required: true,
			validator: (value: selectItemType[]) => isOptionsValid(value),
		},
	});

	const emit = defineEmits({
		setTimelineItemActivity: (timelineItem: timelineItemType, activity: ActivityItemType) =>
			isTimelineItemValid(timelineItem) && isActivityValid(activity),
	});
</script>
