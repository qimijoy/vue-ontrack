<template>
	<li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
		<TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour', $event)" />
		<BaseSelect
			:options="activitySelectOptions"
			:placeholder="'Rest'"
			:selected="timelineItem.activityId"
			@select="setTimelineItemActivity(timelineItem, $event)"
		/>
		<TimelineStopwatch :timeline-item="timelineItem" />
	</li>
</template>

<script setup lang="ts">
	import type { timelineItemType } from '@/types/timeline';
	import type { selectItemType } from '@/types/select';

	import { inject } from 'vue';

	import BaseSelect from '@/components/base/BaseSelect.vue';
	import TimelineHour from '@/components/pages/Timeline/TimelineHour.vue';
	import TimelineStopwatch from '@/components/pages/Timeline/TimelineStopwatch.vue';

	import { isTimelineItemValid, isUndefined } from '@/utils/validators';

	import { activitySelectOptionsKey, setTimelineItemActivityKey } from '@/keys';

	defineProps({
		timelineItem: {
			type: Object,
			required: true,
			validator: (timelineItem: timelineItemType) => isTimelineItemValid(timelineItem),
		},
	});

	// INJECT
	const activitySelectOptions = inject<selectItemType[]>(activitySelectOptionsKey);
	const setTimelineItemActivity = inject(setTimelineItemActivityKey);

	// EMIT
	const emit = defineEmits({
		scrollToHour: (value) => isUndefined(value),
	});
</script>
