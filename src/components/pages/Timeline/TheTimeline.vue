<template>
	<div class="mt-7">
		<ul>
			<TimelineItem
				v-for="timelineItem of timelineItems"
				:key="timelineItem.hour"
				ref="timelineItemRefs"
				:timeline-item="timelineItem"
				@scroll-to-hour="scrollToHour($event)"
				@select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
			/>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import { ref, watchPostEffect } from 'vue';

	import type { PropType } from 'vue';
	import type { timelineItemType } from '@/types/timeline';
	import type { ActivityItemType } from '@/types/activity';

	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';

	import { isTimelineItemValid, isTimelineItemsValid, isActivityValid, isPageValid } from '@/utils/validators';
	import { MIDNIGHT_HOUR } from '@/constants/time';
	import { PAGE_TIMELINE } from '@/constants/pages';

	const props = defineProps({
		timelineItems: {
			type: Array as PropType<Array<timelineItemType>>,
			required: true,
			validator: (timelineItems: timelineItemType[]) => isTimelineItemsValid(timelineItems),
		},
		currentPage: {
			type: String,
			required: true,
			validator: (value: string) => isPageValid(value),
		},
	});

	// EMIT
	const emit = defineEmits({
		setTimelineItemActivity: (timelineItem: timelineItemType, activity: ActivityItemType) =>
			isTimelineItemValid(timelineItem) && isActivityValid(activity),
	});

	// STATES
	const timelineItemRefs = ref([]);

	// FUNCTIONS
	const scrollToHour = (hour: number = null, isSmooth: boolean = true) => {
		if (hour === null) {
			hour = new Date().getHours();
		}

		const options = { behavior: isSmooth ? 'smooth' : 'instant' };

		if (hour === MIDNIGHT_HOUR) {
			document.body.scrollIntoView(options);
		} else {
			timelineItemRefs.value[hour - 1].$el.scrollIntoView(options);
		}
	};

	// EXPOSE
	defineExpose({ scrollToHour });

	// WATCHERS
	watchPostEffect(async () => {
		if (props.currentPage !== PAGE_TIMELINE) {
			return;
		}

		setTimeout(() => scrollToHour(null, false), 50);
	});
</script>
