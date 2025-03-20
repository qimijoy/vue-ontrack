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
	import { ref, watchPostEffect } from 'vue';

	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';

	import { timelineItems } from '@/composables/timelineItems';
	import { getCurrentHour } from '@/utils/timelines';
	import { MIDNIGHT_HOUR } from '@/constants/time';
	import { PAGE_TIMELINE } from '@/constants/pages';
	import { currentPage } from '@/composables/router';

	// STATES
	const timelineItemRefs = ref([]);

	// FUNCTIONS
	const scrollToHour = (hour: number = null, isSmooth: boolean = true) => {
		if (hour === null) {
			hour = getCurrentHour();
		}

		const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el;

		el.scrollIntoView({
			behavior: isSmooth ? 'smooth' : 'instant',
		});
	};

	// EXPOSE
	defineExpose({ scrollToHour });

	// WATCHERS
	watchPostEffect(async () => {
		if (currentPage.value !== PAGE_TIMELINE) {
			return;
		}

		setTimeout(() => scrollToHour(null, false), 50);
	});
</script>
