<template>
	<div class="relative mt-7">
		<TheTimelineIndicator />
		<ul>
			<TimelineItem
				v-for="timelineItem of timelineItems"
				:key="timelineItem.hour"
				ref="timelineItemRefs"
				:timeline-item="timelineItem"
			/>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import { onActivated } from 'vue';

	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';
	import TheTimelineIndicator from '@/components/pages/Timeline/TheTimelineIndicator.vue';

	import { timelineItemRefs, timelineItems, scrollToCurrentHour } from '@/composables/timelineItems';

	onActivated(() => {
		scrollToCurrentHour(false);
	});
</script>
