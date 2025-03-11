<template>
	<div class="mt-7">
		<ul>
			<TimelineItem v-for="timelineItem of timelineItems" :key="timelineItem.hour" :timeline-item="timelineItem" />
		</ul>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { timelineItemType } from '@/types/timeline';

	import { isTimelineItemsValid } from '@/utils/validators';

	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';

	defineProps({
		timelineItems: {
			type: Array as PropType<Array<timelineItemType>>,
			required: true,
			validator: (timelineItems: timelineItemType[]) => isTimelineItemsValid(timelineItems),
		},
	});
</script>
