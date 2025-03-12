<template>
	<li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
		<TimelineHour :hour="timelineItem.hour" />
		<BaseSelect
			:options="options"
			:placeholder="'Rest'"
			:selected="selectedActivityId"
			@select="selectedActivityId = $event"
		/>
	</li>
</template>

<script setup lang="ts">
	import type { timelineItemType } from '@/types/timeline';
	import type { selectItemType } from '@/types/select';

	import { ref } from 'vue';

	import BaseSelect from '@/components/base/BaseSelect.vue';
	import TimelineHour from '@/components/pages/Timeline/TimelineHour.vue';

	import { isTimelineItemValid } from '@/utils/validators';

	defineProps({
		timelineItem: {
			type: Object,
			required: true,
			validator: (timelineItem: timelineItemType) => isTimelineItemValid(timelineItem),
		},
	});

	// CONSTANTS

	const options: selectItemType[] = [
		{ value: 1, label: 'Coding' },
		{ value: 2, label: 'Reading' },
		{ value: 3, label: 'Training' },
	];

	// STATES
	const selectedActivityId = ref(1);
</script>
