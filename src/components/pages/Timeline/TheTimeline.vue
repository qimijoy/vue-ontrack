<template>
	<div class="mt-7">
		<ul>
			<TimelineItem
				v-for="timelineItem of timelineItems"
				:key="timelineItem.hour"
				:timeline-item="timelineItem"
				:activity-select-options="activitySelectOptions"
			/>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { timelineItemType } from '@/types/timeline';
	import type { selectItemType } from '@/types/select';

	import { isTimelineItemsValid, isOptionsValid } from '@/utils/validators';

	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';

	defineProps({
		timelineItems: {
			type: Array as PropType<Array<timelineItemType>>,
			required: true,
			validator: (timelineItems: timelineItemType[]) => isTimelineItemsValid(timelineItems),
		},
		activitySelectOptions: {
			type: Array as PropType<selectItemType[]>,
			required: true,
			validator: (value: selectItemType[]) => isOptionsValid(value),
		},
	});
</script>
