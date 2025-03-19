<template>
	<div :class="classes">
		{{ seconds }}
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { ActivityItemType } from '@/types/activity';
	import type { timelineItemType } from '@/types/timeline';

	import { computed, inject } from 'vue';

	import { formatSeconds } from '@/utils/timelines';
	import { isActivityValid } from '@/utils/validators';
	import { getTotalActivitySeconds } from '@/utils/timelines';

	const props = defineProps({
		activity: {
			type: Object as PropType<ActivityItemType>,
			required: true,
			validator: (value: ActivityItemType) => isActivityValid(value),
		},
	});

	// INJECT
	const timelineItems = inject<timelineItemType[]>('timelineItems');

	// COMPUTED
	const secondsDifference = computed(
		() => getTotalActivitySeconds(props.activity, timelineItems) - props.activity.secondsToComplete,
	);
	const sign = computed(() => (secondsDifference.value >= 0 ? '+' : '-'));
	const seconds = computed(() => `${sign.value}${formatSeconds(secondsDifference.value)}`);
	const colorClasses = computed(() =>
		secondsDifference.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600',
	);
	const classes = computed(() => `flex items-center rounded px-2 font-mono text-xl ${colorClasses.value}`);
</script>
