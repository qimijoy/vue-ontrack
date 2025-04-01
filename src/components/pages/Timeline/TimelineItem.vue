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
	import type { TimelineItemType } from '@/types';

	import BaseSelect from '@/components/base/BaseSelect.vue';
	import TimelineHour from '@/components/pages/Timeline/TimelineHour.vue';
	import TimelineStopwatch from '@/components/pages/Timeline/TimelineStopwatch.vue';

	import { updateTimelineItem } from '@/modules/timeline-items';
	import { activitySelectOptions } from '@/modules/activities';

	defineProps<{ timelineItem: TimelineItemType }>();
</script>
