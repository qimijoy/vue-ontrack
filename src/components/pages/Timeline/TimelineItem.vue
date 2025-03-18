<template>
	<li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
		<TimelineHour :hour="timelineItem.hour" />
		<BaseSelect
			:options="activitySelectOptions"
			:placeholder="'Rest'"
			:selected="timelineItem.activityId"
			@select="selectActivity($event)"
		/>
		<TimelineStopwatch :seconds="timelineItem.activitySeconds" :hour="timelineItem.hour" />
	</li>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { timelineItemType } from '@/types/timeline';
	import type { ActivityItemType } from '@/types/activity';
	import type { selectItemType } from '@/types/select';

	import BaseSelect from '@/components/base/BaseSelect.vue';
	import TimelineHour from '@/components/pages/Timeline/TimelineHour.vue';
	import TimelineStopwatch from '@/components/pages/Timeline/TimelineStopwatch.vue';

	import { isTimelineItemValid, isOptionsValid, isActivityValid, validateActivities } from '@/utils/validators';
	import { findActivityById } from '@/utils/activities';

	const props = defineProps({
		timelineItem: {
			type: Object,
			required: true,
			validator: (timelineItem: timelineItemType) => isTimelineItemValid(timelineItem),
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
		selectActivity: (value) => isActivityValid(value),
	});

	// FUNCTIONS
	const selectActivity = (id: string) => {
		emit('selectActivity', findActivityById(props.activities, id));
	};
</script>
