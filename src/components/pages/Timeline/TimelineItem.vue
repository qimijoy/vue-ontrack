<template>
	<li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
		<TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour', $event)" />
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

	import { isTimelineItemValid, isUndefined } from '@/utils/validators';

	import { updateTimelineItem } from '@/composables/timelineItems';
	import { activitySelectOptions } from '@/composables/activities';

	defineProps({
		timelineItem: {
			type: Object as PropType<timelineItemType>,
			required: true,
			validator: (timelineItem: timelineItemType) => isTimelineItemValid(timelineItem),
		},
	});

	// EMIT
	const emit = defineEmits({
		scrollToHour: (value) => isUndefined(value),
	});
</script>
