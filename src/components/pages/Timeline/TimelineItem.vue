<template>
	<li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
		<a href="#" :class="hourLinkClasses"> {{ timelineItem.hour }}:00 </a>
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

	import { getCurrentHour } from '@/utils/time';
	import { isTimelineItemValid } from '@/utils/validators';

	const props = defineProps({
		timelineItem: {
			type: Object,
			required: true,
			validator: (timelineItem: timelineItemType) => isTimelineItemValid(timelineItem),
		},
	});

	// CONSTANTS
	const hourLinkClasses = [
		'absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg',
		props.timelineItem.hour === getCurrentHour() ? 'bg-purple-900 font-black text-white' : 'bg-gray-100 text-gray-500',
	];

	const options: selectItemType[] = [
		{ value: 1, label: 'Coding' },
		{ value: 2, label: 'Reading' },
		{ value: 3, label: 'Training' },
	];

	// STATES
	const selectedActivityId = ref(1);
</script>
