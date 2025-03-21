<template>
	<div class="mt-7">
		<ul>
			<TimelineItem
				v-for="timelineItem of timelineItems"
				:key="timelineItem.hour"
				ref="timelineItemRefs"
				:timeline-item="timelineItem"
				@scroll-to-hour="scrollToHour(timelineItem.hour)"
			/>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import { onActivated } from 'vue';

	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';

	import { timelineItemRefs, timelineItems, scrollToHour, scrollToCurrentHour } from '@/composables/timelineItems';

	onActivated(() => {
		scrollToCurrentHour(false);
	});
</script>
