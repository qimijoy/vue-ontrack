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
	import { onActivated, onDeactivated } from 'vue';

	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';
	import TheTimelineIndicator from '@/components/pages/Timeline/TheTimelineIndicator.vue';

	import { timelineItemRefs, timelineItems, scrollToCurrentHour } from '@/composables/timelineItems';
	import { startTimer, stopTimer } from '@/composables/time';

	onActivated(() => {
		scrollToCurrentHour(false);
		startTimer();
	});

	onDeactivated(() => stopTimer());
</script>
