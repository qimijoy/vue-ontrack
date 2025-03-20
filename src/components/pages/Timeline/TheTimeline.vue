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
	import { watchPostEffect } from 'vue';

	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';

	import { timelineItemRefs, timelineItems, scrollToHour, scrollToCurrentHour } from '@/composables/timelineItems';
	import { PAGE_TIMELINE } from '@/constants/pages';
	import { currentPage } from '@/composables/router';

	// WATCHERS
	watchPostEffect(async () => {
		if (currentPage.value !== PAGE_TIMELINE) {
			return;
		}

		setTimeout(() => scrollToCurrentHour(false), 50);
	});
</script>
