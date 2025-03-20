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

	import type { PropType } from 'vue';
	import type { timelineItemType } from '@/types/timeline';

	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';

	import { isTimelineItemsValid } from '@/utils/validators';
	import { getCurrentHour } from '@/utils/timelines';
	import { MIDNIGHT_HOUR } from '@/constants/time';
	import { PAGE_TIMELINE } from '@/constants/pages';
	import { currentPage } from '@/composables/router';

	defineProps({
		timelineItems: {
			type: Array as PropType<Array<timelineItemType>>,
			required: true,
			validator: (timelineItems: timelineItemType[]) => isTimelineItemsValid(timelineItems),
		},
	});

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
