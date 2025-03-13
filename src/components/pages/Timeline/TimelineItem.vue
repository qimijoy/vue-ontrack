<template>
	<li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
		<TimelineHour :hour="timelineItem.hour" />
		<BaseSelect
			:options="activitySelectOptions"
			:placeholder="'Rest'"
			:selected="selectedActivityId"
			@select="selectedActivityId = $event"
		/>
	</li>
</template>

<script setup lang="ts">
	import type { timelineItemType } from '@/types/timeline';
	import type { selectItemType } from '@/types/select';
	import type { PropType } from 'vue';

	import { ref } from 'vue';

	import BaseSelect from '@/components/base/BaseSelect.vue';
	import TimelineHour from '@/components/pages/Timeline/TimelineHour.vue';

	import { isTimelineItemValid, isOptionsValid } from '@/utils/validators';

	defineProps({
		timelineItem: {
			type: Object,
			required: true,
			validator: (timelineItem: timelineItemType) => isTimelineItemValid(timelineItem),
		},
		activitySelectOptions: {
			type: Array as PropType<selectItemType[]>,
			required: true,
			validator: (value: selectItemType[]) => isOptionsValid(value),
		},
	});

	// STATES
	const selectedActivityId = ref(0);
</script>
