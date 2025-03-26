<template>
	<li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
		<TimelineHour :hour="timelineItem.hour" />
		<BaseSelect
			:options="activitySelectOptions"
			:placeholder="'Rest'"
			:selected="timelineItem.activityId"
			@select="updateTimelineItem(timelineItem, { activityId: $event })"
		/>
		<TimelineStopwatch :timeline-item="timelineItem" />
	</li>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { timelineItemType } from '@/types/timeline';

	import BaseSelect from '@/components/base/BaseSelect.vue';
	import TimelineHour from '@/components/pages/Timeline/TimelineHour.vue';
	import TimelineStopwatch from '@/components/pages/Timeline/TimelineStopwatch.vue';

	import { isTimelineItemValid } from '@/utils/validators';

	import { updateTimelineItem } from '@/modules/timelineItems';
	import { activitySelectOptions } from '@/modules/activities';

	defineProps({
		timelineItem: {
			type: Object as PropType<timelineItemType>,
			required: true,
			validator: (timelineItem: timelineItemType) => isTimelineItemValid(timelineItem),
		},
	});
</script>
