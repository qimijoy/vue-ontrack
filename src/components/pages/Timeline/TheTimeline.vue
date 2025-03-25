<template>
	<div class="mt-7">
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

	import { timelineItemRefs, timelineItems, scrollToCurrentHour } from '@/composables/timelineItems';

	onActivated(() => {
		scrollToCurrentHour(false);
	});
</script>
