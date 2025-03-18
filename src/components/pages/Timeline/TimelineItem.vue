<template>
	<li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
		<TimelineHour :hour="timelineItem.hour" />
		<BaseSelect
			:options="activitySelectOptions"
			:placeholder="'Rest'"
			:selected="timelineItem.activityId"
			@select="selectActivity($event)"
		/>
	</li>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { timelineItemType } from '@/types/timeline';
	import type { ActivityItemType } from '@/types/activity';
	import type { selectItemType } from '@/types/select';

	import BaseSelect from '@/components/base/BaseSelect.vue';
	import TimelineHour from '@/components/pages/Timeline/TimelineHour.vue';

	import { isTimelineItemValid, isOptionsValid, isActivityValid, validateActivities, isNull } from '@/utils/validators';

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
		selectActivity: (value) => isActivityValid(value) || isNull(value),
	});

	// FUNCTIONS
	const selectActivity = (id: string) => {
		const findActivity = props.activities.find((activity) => activity.id === id) || null;

		emit('selectActivity', findActivity);
	};
</script>
